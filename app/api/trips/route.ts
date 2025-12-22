import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getCountryFromCoordinates } from "@/lib/actions/getCountryFromCoordinates";
import { getUser } from "@/lib/auth-server";

export async function GET() {
  try {
    const user = await getUser();

    if (!user) {
      return new NextResponse("Not authenticated", { status: 401 });
    }

    // Récupérer toutes les activités avec leurs coordonnées
    const activities = await prisma.activity.findMany({
      where: {
        location: {
          trip: {
            userId: user.id,
          },
        },
      },
      select: {
        name: true,
        lat: true,
        lng: true,
        address: true,
        location: {
          select: {
            locationTitle: true,
            trip: {
              select: {
                title: true,
              },
            },
          },
        },
      },
    });

    const transformedLocations = await Promise.all(
      activities.map(async (activity) => {
        const geocodeResult = await getCountryFromCoordinates(
          activity.lat,
          activity.lng
        );

        return {
          name: `${activity.location.trip.title} - ${activity.name}`,
          lat: activity.lat,
          lng: activity.lng,
          country: geocodeResult.country,
        };
      })
    );

    return NextResponse.json(transformedLocations);
  } catch (err) {
    console.error("Error in /api/trips:", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}