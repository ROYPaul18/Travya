"use server";

import { prisma } from "../prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getUser } from "../auth-server";
import { NextResponse } from "next/server";

function getDaysBetween(startDate: Date, endDate: Date): number {
  const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays + 1;
}

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
  const wallpaper = formData.get("wallpaper")?.toString();
  const startDateStr = formData.get("startDate")?.toString();
  const endDateStr = formData.get("endDate")?.toString();

  const imagesStr = formData.get("images")?.toString();
  const images = imagesStr ? JSON.parse(imagesStr) : [];

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
      wallpaper: wallpaper || null,
      images,
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

  redirect(`/trips/${trip.id}`);
}

export async function editTrip(formData: FormData, tripId: string) {
  const user = await getUser();
  if (!user) {
    return new NextResponse("Not authenticated", { status: 401 });
  }

  const title = formData.get("title")?.toString();
  const description = formData.get("description")?.toString();
  const wallpaper = formData.get("wallpaper")?.toString();
  const startDateStr = formData.get("startDate")?.toString();
  const endDateStr = formData.get("endDate")?.toString();

  const imagesStr = formData.get("images")?.toString();
  const images = imagesStr ? JSON.parse(imagesStr) : [];

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

  const oldDaysCount = getDaysBetween(
    existingTrip.startDate,
    existingTrip.endDate,
  );
  const newDaysCount = getDaysBetween(startDate, endDate);
  const dayDates = generateDayDates(startDate, endDate);

  await prisma.$transaction(async (tx) => {
    await tx.trip.update({
      where: { id: tripId },
      data: {
        title,
        description,
        wallpaper: wallpaper || null,
        images,
        startDate,
        endDate,
      },
    });

    if (newDaysCount !== oldDaysCount) {
      if (newDaysCount > oldDaysCount) {
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

export async function updateTripVisibility(
  id: string,
  visibility: "COMMUNITY" | "FRIENDS" | "PRIVATE",
) {
  await prisma.trip.update({
    where: { id },
    data: { visibility },
  });

  revalidatePath(`/trips/${id}`);
}

export async function copyTrip(tripId: string) {
  const user = await getUser();

  if (!user) {
    throw new Error("Non authentifié");
  }

  const originalTrip = await prisma.trip.findUnique({
    where: { id: tripId },
    include: {
      locations: {
        include: {
          activities: true,
        },
      },
    },
  });

  if (!originalTrip) {
    throw new Error("Voyage original introuvable");
  }

  const clonedTrip = await prisma.$transaction(async (tx) => {
    return await tx.trip.create({
      data: {
        title: `${originalTrip.title} (Copie)`,
        description: originalTrip.description,
        wallpaper: originalTrip.wallpaper,
        images: originalTrip.images,
        startDate: originalTrip.startDate,
        endDate: originalTrip.endDate,
        userId: user.id, 
        visibility: "PRIVATE", 
        
        locations: {
          create: originalTrip.locations.map((loc) => ({
            locationTitle: loc.locationTitle,
            lat: loc.lat,
            lng: loc.lng,
            order: loc.order,
            activities: {
              create: loc.activities.map((act) => ({
                name: act.name,
                address: act.address,
                lat: act.lat,
                lng: act.lng,
                category: act.category,
                description: act.description,
                wallpaper: act.wallpaper,
                images: act.images,
                startTime: act.startTime,
                endTime: act.endTime,
                budget: act.budget,
                order: act.order,
              })),
            },
          })),
        },
      },
    });
  });

  revalidatePath("/trips");
  redirect(`/trips/${clonedTrip.id}`);
}