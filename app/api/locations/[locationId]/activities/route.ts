import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ locationId: string }> }
) {
  try {
    const session = await auth();

    if (!session || !session.user?.id) {
      return NextResponse.json(
        { error: "Non authentifié" },
        { status: 401 }
      );
    }

    // Await the params Promise first
    const { locationId } = await params;

    const location = await prisma.location.findUnique({
      where: { id: locationId },
      include: {
        trip: true,
      },
    });

    if (!location) {
      return NextResponse.json(
        { error: "Location introuvable" },
        { status: 404 }
      );
    }

    if (location.trip.userId !== session.user.id) {
      return NextResponse.json(
        { error: "Non autorisé" },
        { status: 403 }
      );
    }

    // Récupérer les activités de cette location
    const activities = await prisma.activity.findMany({
      where: { locationId },
      orderBy: { order: "asc" },
    });

    // Formater les données pour correspondre à votre interface
    const formattedActivities = activities.map((activity) => ({
      id: activity.id,
      name: activity.name,
      address: activity.adress, 
      category: activity.category,
      description: activity.description,
      startTime: activity.startTime
        ? new Date(activity.startTime).toLocaleTimeString("fr-FR", {
            hour: "2-digit",
            minute: "2-digit",
          })
        : null,
      endTime: activity.endTime
        ? new Date(activity.endTime).toLocaleTimeString("fr-FR", {
            hour: "2-digit",
            minute: "2-digit",
          })
        : null,
      budget: activity.budget || 0,
      images: activity.images,
      order: activity.order,
    }));

    return NextResponse.json(formattedActivities);
  } catch (error) {
    console.error("Erreur lors de la récupération des activités:", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}