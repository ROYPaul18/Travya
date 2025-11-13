"use server";
import { auth } from "@/lib/auth";
import { prisma } from "../prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getUser } from "../auth-server";
import { NextResponse } from "next/server";

export async function createTrip(formdData: FormData) {
  const user = await getUser();

  if (!user) {
    return new NextResponse("Not authenticated", { status: 401 });
  }
  const title = formdData.get("title")?.toString();
  const description = formdData.get("description")?.toString();
  const imageUrl = formdData.get("imageUrl")?.toString();
  const startDateStr = formdData.get("startDate")?.toString();
  const endDateStr = formdData.get("endDate")?.toString();

  if (!title || !description || !startDateStr || !endDateStr) {
    throw new Error("Tous les champs ne sont requis");
  }

  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);

  await prisma.trip.create({
    data: {
      title,
      description,
      imageUrl,
      startDate,
      endDate,
      userId: user.id,
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

  const existingTrip = await prisma.trip.findUnique({
    where: { id: tripId },
  });

  if (!existingTrip || existingTrip.userId !== user.id) {
    throw new Error("Accès non autorisé !");
  }

  await prisma.trip.update({
    where: { id: tripId },
    data: {
      title,
      description,
      imageUrl,
      startDate,
      endDate,
    },
  });
  revalidatePath(`/trips/${tripId}`);
  redirect(`/trips/${tripId}`);
}

export async function deleteTrip(tripId: string) {
  const user = await getUser();
  if (!user) {
    return new NextResponse("Not authenticated", { status: 401 });
  }

  // Vérifier que le voyage existe et appartient à l'utilisateur
  const existingTrip = await prisma.trip.findUnique({
    where: { id: tripId },
  });

  if (!existingTrip) {
    throw new Error("Voyage introuvable !");
  }

  if (existingTrip.userId !== user.id) {
    throw new Error("Accès non autorisé !");
  }

  // Supprimer le voyage (cascade automatique pour locations et activities)
  await prisma.trip.delete({
    where: { id: tripId },
  });
  revalidatePath("/trips");
  redirect("/trips");
}
