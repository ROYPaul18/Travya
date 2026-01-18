import TripCommunityClient from "@/components/explore/TripCommunityClient";
import { prisma } from "@/lib/prisma";
import { getUser } from "@/lib/auth-server";
import { unauthorized } from "next/navigation";

export default async function TripDetail({ params, }: { params: Promise<{ tripId: string }>; }) {
  const { tripId } = await params;
  const user = await getUser();

  if (!user) {
    return unauthorized()
  }

  const trip = await prisma.trip.findFirst({
    where: { id: tripId },
    include: {
      user: {
        select: { name: true, image: true },
      },
      locations: {
        orderBy: { order: "asc" },
        include: {
          activities: true,
        },
      },
      favoritedBy: {
        where: { userId: user.id },
        select: { id: true },
      },
    },
  });

  if (!trip) {
    return <div> Trip not found !</div>;
  }

  const isAlreadyLiked = trip.favoritedBy.length > 0;


  return <TripCommunityClient trip={trip} isAlreadyLiked={isAlreadyLiked} />;
}