"use server";

import { prisma } from "../prisma";
import { getUser } from "../auth-server";
import { revalidatePath } from "next/cache";
async function checkTripPermission(tripId: string) {
  const user = await getUser();
  if (!user) throw new Error("Non authentifié");

  const trip = await prisma.trip.findUnique({
    where: { id: tripId },
    select: { userId: true },
  });

  if (!trip) throw new Error("Voyage introuvable");
  if (trip.userId !== user.id) throw new Error("Accès non autorisé");

  return user.id;
}

export async function updateLocationTitle(locationId: string, title: string) {
  const location = await prisma.location.findUnique({
    where: { id: locationId },
    select: { tripId: true },

  });

  if (!location) throw new Error("Étape introuvable");
  await checkTripPermission(location.tripId);

  const updatedLocation = await prisma.location.update({
    where: { id: locationId },
    data: { locationTitle: title },
  });

  revalidatePath(`/trips/${location.tripId}`);
  revalidatePath(`/explore/${location.tripId}`);

  return { success: true, location: updatedLocation };
}
