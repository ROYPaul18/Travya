"use server";

import { getUser } from "@/lib/auth-server";
import { prisma } from "../prisma";

export async function reorderItinerary(tripId: string, newOrder: string[]) {
  const user = await getUser(); 
  
  if (!user || !user.id) {
    throw new Error("L'utilisateur n'est pas connecté !");
  }

  const trip = await prisma.trip.findFirst({
    where: {
      id: tripId,
      userId: user.id,
    },
  });

  if (!trip) {
    throw new Error("Voyage non trouvé ou accès non autorisé !");
  }

  await prisma.$transaction(
    newOrder.map((locationId: string, index: number) =>
      prisma.location.updateMany({
        where: { 
          id: locationId,

        },
        data: { order: index },
      }),
    ),
  );

  return { success: true };
}