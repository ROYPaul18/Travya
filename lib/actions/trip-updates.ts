"use server";

import { prisma } from "../prisma";
import { revalidatePath } from "next/cache";
import { getUser } from "../auth-server";

async function checkTripPermission(tripId: string) {
  const user = await getUser();
  
  if (!user) {
    throw new Error("Non authentifié");
  }

  const trip = await prisma.trip.findUnique({
    where: { id: tripId },
    select: { userId: true },
  });

  if (!trip) {
    throw new Error("Voyage introuvable");
  }

  if (trip.userId !== user.id) {
    throw new Error("Accès non autorisé");
  }

  return user;
}

export async function updateTripDescription(tripId: string, description: string) {
  await checkTripPermission(tripId);

  const trip = await prisma.trip.update({
    where: { id: tripId },
    data: { description },
  });

  revalidatePath(`/trips/${tripId}`);
  revalidatePath(`/explore/${tripId}`);
  
  return { success: true, trip };
}

export async function updateTripTitle(tripId: string, title: string) {
  await checkTripPermission(tripId);

  if (!title || title.trim().length === 0) {
    throw new Error("Le titre ne peut pas être vide");
  }

  const trip = await prisma.trip.update({
    where: { id: tripId },
    data: { title },
  });

  revalidatePath(`/trips/${tripId}`);
  revalidatePath(`/explore/${tripId}`);
  
  return { success: true, trip };
}

export async function updateTripWallpaper(tripId: string, wallpaper: string) {
  await checkTripPermission(tripId);

  const trip = await prisma.trip.update({
    where: { id: tripId },
    data: { wallpaper },
  });

  revalidatePath(`/trips/${tripId}`);
  revalidatePath(`/explore/${tripId}`);
  
  return { success: true, trip };
}