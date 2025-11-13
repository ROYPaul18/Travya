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
    const locations = await prisma.location.findMany({
      where: {
        trip: {
          userId: user.id,
        },
      },
      select: {
        locationTitle: true,
        lat: true,
        lng: true,
        trip: {
          select: {
            title: true,
          },
        },
      },
    });

    const transformedLocations = await Promise.all(
      locations.map(async (loc) => {
        const geocodeResult = await getCountryFromCoordinates(loc.lat, loc.lng);
        
        return {
          name: `${loc.trip.title} - ${geocodeResult.formattedAddress}`,
          lat: loc.lat,
          lng: loc.lng,
          country: geocodeResult.country,
        };
      })
    );
    
    return NextResponse.json(transformedLocations);
  } catch (err) {
    console.error("Error in /api/locations:", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}