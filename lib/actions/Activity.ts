"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { Categorie } from "@/app/generated/prisma";

// Fonction helper pour géocoder l'adresse
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

// Mapper les catégories du formulaire vers l'enum Prisma
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

// Ajouter une activité
export async function addActivity(
  formData: FormData,
  locationId: string,
  tripId: string
) {
  const session = await auth();
  if (!session || !session.user?.id) {
    throw new Error("Non authentifié");
  }

  // Vérifier que la location appartient au trip de l'utilisateur
  const location = await prisma.location.findUnique({
    where: { id: locationId },
    include: { trip: true },
  });

  if (!location) {
    throw new Error("Location introuvable");
  }

  if (location.trip.userId !== session.user.id) {
    throw new Error("Non autorisé");
  }

  // Récupérer les données du formulaire
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

  // Géocoder l'adresse
  const { lat, lng } = await geocodeAddress(address);

  // Parser les images
  const images = imagesJson ? JSON.parse(imagesJson) : [];

  // Compter les activités existantes pour définir l'ordre
  const count = await prisma.activity.count({
    where: { locationId },
  });

  // Créer l'activité
  await prisma.activity.create({
    data: {
      name,
      adress: address,
      lat,
      lng,
      category: mapCategory(category),
      description,
      images,
      startTime: startTime ? new Date(`1970-01-01T${startTime}:00`) : null,
      endTime: endTime ? new Date(`1970-01-01T${endTime}:00`) : null,
      budget: budget ? parseFloat(budget) : null,
      locationId,
      order: count,
    },
  });
  return { success: true };
}

// ✅ Supprimer une activité (corrigé)
export async function deleteActivity(activityId: string, tripId: string) {
  const session = await auth();
  if (!session || !session.user?.id) {
    throw new Error("Non authentifié");
  }

  // Vérifier que l'activité existe et appartient au trip de l'utilisateur
  const activity = await prisma.activity.findUnique({
    where: { id: activityId },
    include: {
      Location: {
        include: {
          trip: true,
        },
      },
    },
  });

  if (!activity || !activity.Location) {
    throw new Error("Activité introuvable");
  }

  if (activity.Location.trip.userId !== session.user.id) {
    throw new Error("Non autorisé");
  }

  // Supprimer l'activité
  await prisma.activity.delete({
    where: { id: activityId },
  });

  return { success: true };
}

// Mettre à jour une activité
export async function updateActivity(
  activityId: string,
  formData: FormData,
  tripId: string,
) {
  const session = await auth();
  if (!session || !session.user?.id) {
    throw new Error("Non authentifié");
  }

  const activity = await prisma.activity.findUnique({
    where: { id: activityId },
    include: {
      Location: {
        include: { trip: true },
      },
    },
  });

  if (!activity || !activity.Location) {
    throw new Error("Activité introuvable");
  }

  if (activity.Location.trip.userId !== session.user.id) {
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
      startTime: startTime ? new Date(`1970-01-01T${startTime}:00`) : null,
      endTime: endTime ? new Date(`1970-01-01T${endTime}:00`) : null,
      budget: budget ? parseFloat(budget) : null,
    },
  });

  revalidatePath(`/trips/${tripId}`);
  return { success: true }; 
}
