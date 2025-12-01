"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { getUser } from "../auth-server";
import { NextResponse } from "next/server";

async function geocodeAddress(address: string) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!;
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${apiKey}`
  );

  const data = await response.json();
  const { lat, lng } = data.results[0].geometry.location;
  return { lat, lng };
}

export async function addLocation(formData: FormData, tripId: string) {
  const user = await getUser();

  if (!user) {
    return new NextResponse("Not authenticated", { status: 401 });
  }

  const address = formData.get("address")?.toString();

  if (!address) {
    throw new Error("Missing address");
  }

  const { lat, lng } = await geocodeAddress(address);

  const count = await prisma.location.count({
    where: { tripId },
  });

  await prisma.location.create({
    data: {
      locationTitle: address,
      lat,
      lng,
      tripId,
      order: count,
    },
  });

  redirect(`/trips/${tripId}`);
}

export async function deleteLocation(locationId: string, tripId: string) {
  const user = await getUser();

  if (!user) {
    return new NextResponse("Not authenticated", { status: 401 });
  }

  const location = await prisma.location.findUnique({
    where: { id: locationId },
    include: {
      trip: true,
    },
  });

  if (!location) {
    throw new Error("Location not found");
  }

  if (location.trip.userId !== user.id) {
    throw new Error("Not authorized");
  }

  await prisma.location.delete({
    where: { id: locationId },
  });
}
