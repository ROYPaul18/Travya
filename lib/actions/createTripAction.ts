"use server"
import { auth } from "@/auth";
import { prisma } from "../prisma";
import { redirect } from "next/navigation";


export async function createTrip(formdData: FormData) {
  const session = await auth();
  if (!session || !session.user?.id) {
    throw new Error("L'utilisateur n'est pas connecté !");
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
      userId: session.user.id,
    },
  });
  redirect("/trips")
}
