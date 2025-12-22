import EditActivityPage from "@/components/activity/EditActivityPage";
import { prisma } from "@/lib/prisma";
import { getUser } from "@/lib/auth-server";
import { unauthorized } from "next/navigation";
import { notFound } from "next/navigation";

export default async function EditActivity({
  params,
}: {
  params: Promise<{ tripId: string; activityId: string }>;
}) {
  const { tripId, activityId } = await params;
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
  const activity = await prisma.activity.findFirst({
    where: {
      id: activityId,
    },
    include: {
      location: {
        include: {
          trip: true,
        },
      },
    },
  });

  if (!activity || activity.location.trip.userId !== user.id) {
    return notFound();
  }

  return <EditActivityPage activity={activity} tripId={tripId} />;
}