"use server";
import { auth } from "@/lib/auth";
import { prisma } from "../prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getUser } from "../auth-server";
import { NextResponse } from "next/server";

// Fonction utilitaire pour calculer le nombre de jours entre deux dates
function getDaysBetween(startDate: Date, endDate: Date): number {
  const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays + 1; // +1 pour inclure le jour de départ
}

// Fonction utilitaire pour générer les dates de chaque jour
function generateDayDates(startDate: Date, endDate: Date): Date[] {
  const dates: Date[] = [];
  const current = new Date(startDate);
  
  while (current <= endDate) {
    dates.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }
  
  return dates;
}

export async function createTrip(formData: FormData) {
  const user = await getUser();

  if (!user) {
    return new NextResponse("Not authenticated", { status: 401 });
  }

  const title = formData.get("title")?.toString();
  const description = formData.get("description")?.toString();
  const imageUrl = formData.get("imageUrl")?.toString();
  const startDateStr = formData.get("startDate")?.toString();
  const endDateStr = formData.get("endDate")?.toString();

  if (!title || !description || !startDateStr || !endDateStr) {
    throw new Error("Tous les champs sont requis");
  }

  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);

  if (endDate < startDate) {
    throw new Error("La date de fin doit être après la date de début");
  }

  const dayDates = generateDayDates(startDate, endDate);

  const trip = await prisma.trip.create({
    data: {
      title,
      description,
      imageUrl,
      startDate,
      endDate,
      userId: user.id,
      locations: {
        create: dayDates.map((date, index) => ({
          locationTitle: "",
          lat: 0,
          lng: 0,
          order: index,
          createdAt: date,
        })),
      },
    },
  });

  redirect("/trips");
}

export async function editTrip(formData: FormData, tripId: string) {
  const user = await getUser();
  if (!user) {
    return new NextResponse("Not authenticated", { status: 401 });
  }

  const title = formData.get("title")?.toString();
  const description = formData.get("description")?.toString();
  const imageUrl = formData.get("imageUrl")?.toString();
  const startDateStr = formData.get("startDate")?.toString();
  const endDateStr = formData.get("endDate")?.toString();

  if (!title || !description || !startDateStr || !endDateStr) {
    throw new Error("Tous les champs sont requis !");
  }

  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);

  if (endDate < startDate) {
    throw new Error("La date de fin doit être après la date de début");
  }

  const existingTrip = await prisma.trip.findUnique({
    where: { id: tripId },
    include: { locations: true },
  });

  if (!existingTrip || existingTrip.userId !== user.id) {
    throw new Error("Accès non autorisé !");
  }

  // Calculer le nombre de jours avant et après modification
  const oldDaysCount = getDaysBetween(existingTrip.startDate, existingTrip.endDate);
  const newDaysCount = getDaysBetween(startDate, endDate);
  const dayDates = generateDayDates(startDate, endDate);

  // Utiliser une transaction pour garantir la cohérence des données
  await prisma.$transaction(async (tx) => {
    // Mettre à jour le voyage
    await tx.trip.update({
      where: { id: tripId },
      data: {
        title,
        description,
        imageUrl,
        startDate,
        endDate,
      },
    });

    // Si le nombre de jours a changé, ajuster les itinéraires
    if (newDaysCount !== oldDaysCount) {
      if (newDaysCount > oldDaysCount) {
        // Ajouter des jours manquants
        const newDays = dayDates.slice(oldDaysCount);
        await tx.location.createMany({
          data: newDays.map((date, index) => ({
            locationTitle: `Jour ${oldDaysCount + index + 1}`,
            lat: 0,
            lng: 0,
            tripId: tripId,
            order: oldDaysCount + index,
            createdAt: date,
          })),
        });
      } else {
        // Supprimer les jours en trop (les derniers)
        const locationsToDelete = existingTrip.locations
          .sort((a, b) => b.order - a.order)
          .slice(0, oldDaysCount - newDaysCount);

        await tx.location.deleteMany({
          where: {
            id: { in: locationsToDelete.map((l) => l.id) },
          },
        });
      }
    }
  });

  revalidatePath(`/trips/${tripId}`);
  return { success: true };
}

export async function deleteTrip(tripId: string) {
  const user = await getUser();
  if (!user) {
    return new NextResponse("Not authenticated", { status: 401 });
  }

  const existingTrip = await prisma.trip.findUnique({
    where: { id: tripId },
  });

  if (!existingTrip) {
    throw new Error("Voyage introuvable !");
  }

  if (existingTrip.userId !== user.id) {
    throw new Error("Accès non autorisé !");
  }

  await prisma.trip.delete({
    where: { id: tripId },
  });

  revalidatePath("/trips");
  redirect("/trips");
}