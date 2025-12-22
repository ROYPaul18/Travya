"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Categorie } from "@/generated/prisma/client";
import { getUser } from "../auth-server";

function mapCategory(category: string): Categorie {
  const mapping: Record<string, Categorie> = {
    restaurant: Categorie.RESTAURANT,
    café: Categorie.CAFE,
    monument: Categorie.VISITE,
    musée: Categorie.VISITE,
    parc: Categorie.NATURE,
    shopping: Categorie.SHOPPING,
    activité: Categorie.SPORT,
    transport: Categorie.TRANSPORT,
    hébergement: Categorie.HOTEL,
  };
  return mapping[category] || Categorie.AUTRE;
}

export async function addActivity(
  formData: FormData,
  locationId: string,
  tripId: string
) {
  const user = await getUser();

  if (!user) {
    throw new Error("Not authenticated");
  }

  const location = await prisma.location.findUnique({
    where: { id: locationId },
    include: { trip: true },
  });

  if (!location) {
    throw new Error("Location introuvable");
  }

  if (location.trip.userId !== user.id) {
    throw new Error("Non autorisé");
  }

  const name = formData.get("name")?.toString();
  const address = formData.get("address")?.toString();
  const category = formData.get("category")?.toString();
  const description = formData.get("description")?.toString() || null;
  const startTime = formData.get("startTime")?.toString();
  const endTime = formData.get("endTime")?.toString();
  const budget = formData.get("budget")?.toString();
  const imagesJson = formData.get("images")?.toString();
  
  const lat = parseFloat(formData.get("lat")?.toString() || "0");
  const lng = parseFloat(formData.get("lng")?.toString() || "0");

  if (!name || !address || !category || !lat || !lng) {
    throw new Error("Champs obligatoires manquants");
  }

  if (lat === 0 || lng === 0) {
    throw new Error("Coordonnées invalides");
  }

  const images = imagesJson ? JSON.parse(imagesJson) : [];
  const count = await prisma.activity.count({
    where: { locationId },
  });

  await prisma.activity.create({
    data: {
      name,
      address: address,
      lat, 
      lng, 
      category: mapCategory(category),
      description,
      images,
      startTime: startTime || null,
      endTime: endTime || null,
      budget: budget ? parseFloat(budget) : null,
      locationId,
      order: count,
    },
  });

  revalidatePath(`/trips/${tripId}`);
  return { success: true };
}

export async function deleteActivity(activityId: string, tripId: string) {
  const user = await getUser();
  if (!user) {
    throw new Error("Not authenticated");
  }

  const activity = await prisma.activity.findUnique({
    where: { id: activityId },
    include: {
      location: {
        include: {
          trip: true,
        },
      },
    },
  });

  if (!activity || !activity.location) {
    throw new Error("Activité introuvable");
  }

  if (activity.location.trip.userId !== user.id) {
    throw new Error("Non autorisé");
  }

  await prisma.activity.delete({
    where: { id: activityId },
  });

  revalidatePath(`/trips/${tripId}`);
  return { success: true };
}

export async function updateActivity(
  activityId: string,
  formData: FormData,
  tripId: string
) {
  const user = await getUser();

  if (!user) {
    throw new Error("Not authenticated");
  }

  const activity = await prisma.activity.findUnique({
    where: { id: activityId },
    include: {
      location: {
        include: { trip: true },
      },
    },
  });

  if (!activity || !activity.location) {
    throw new Error("Activité introuvable");
  }

  if (activity.location.trip.userId !== user.id) {
    throw new Error("Non autorisé");
  }

  const name = formData.get("name")?.toString();
  const address = formData.get("address")?.toString();
  const category = formData.get("category")?.toString();
  const description = formData.get("description")?.toString() || null;
  const startTime = formData.get("startTime")?.toString();
  const endTime = formData.get("endTime")?.toString();
  const budget = formData.get("budget")?.toString();
  const imagesJson = formData.get("images")?.toString();

  const lat = parseFloat(formData.get("lat")?.toString() || "0");
  const lng = parseFloat(formData.get("lng")?.toString() || "0");

  if (!name || !address || !category || !lat || !lng) {
    throw new Error("Champs obligatoires manquants");
  }

  if (lat === 0 || lng === 0) {
    throw new Error("Coordonnées invalides");
  }

  const images = imagesJson ? JSON.parse(imagesJson) : [];

  await prisma.activity.update({
    where: { id: activityId },
    data: {
      name,
      address: address,
      lat,
      lng,
      category: mapCategory(category),
      description,
      images,
      startTime: startTime || null,
      endTime: endTime || null,
      budget: budget ? parseFloat(budget) : null,
    },
  });

  revalidatePath(`/trips/${tripId}`);
  return { success: true };
}