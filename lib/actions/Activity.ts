"use server";


import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Categorie } from "@/app/generated/prisma";
import { getUser } from "../auth-server";

async function geocodeAddress(address: string) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!;
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${apiKey}`
  );
  const data = await response.json();

  if (!data.results || data.results.length === 0) {
    throw new Error("Adresse introuvable");
  }

  const { lat, lng } = data.results[0].geometry.location;
  return { lat, lng };
}
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

  if (!name || !address || !category) {
    throw new Error("Champs obligatoires manquants");
  }
  const { lat, lng } = await geocodeAddress(address);
  const images = imagesJson ? JSON.parse(imagesJson) : [];
  const count = await prisma.activity.count({
    where: { locationId },
  });

  await prisma.activity.create({
    data: {
      name,
      adress: address,
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

  if (!name || !address || !category) {
    throw new Error("Champs obligatoires manquants");
  }

  let lat = activity.lat;
  let lng = activity.lng;
  if (address !== activity.adress) {
    const coords = await geocodeAddress(address);
    lat = coords.lat;
    lng = coords.lng;
  }

  const images = imagesJson ? JSON.parse(imagesJson) : [];

  await prisma.activity.update({
    where: { id: activityId },
    data: {
      name,
      adress: address,
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
