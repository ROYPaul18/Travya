import AddActivityPage from "@/components/share/activity/AddActivityPage";
import { prisma } from "@/lib/prisma";
import { getUser } from "@/lib/auth-server";
import { unauthorized } from "next/navigation";
import { notFound } from "next/navigation";

export default async function AddActivity({
  params,
}: {
  params: Promise<{ tripId: string; locationId: string }>;
}) {
  const { tripId, locationId } = await params;
  const user = await getUser();

  if (!user) {
    return unauthorized();
  }

  const trip = await prisma.trip.findFirst({
    where: {
      id: tripId,
      userId: user.id,
    },
  });

  if (!trip) {
    return notFound();
  }

  // Vérifier que la location existe et appartient au voyage
  const location = await prisma.location.findFirst({
    where: {
      id: locationId,
      tripId: tripId,
    },
  });

  if (!location) {
    return notFound();
  }

  return <AddActivityPage tripId={tripId} locationId={locationId} />;
}