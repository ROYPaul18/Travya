import { prisma } from "@/lib/prisma";
import { getUser } from "@/lib/auth-server";
import TripsCommunity from "@/components/explore/TripsCommunity";
import { unauthorized } from "next/navigation";

interface PageProps {
  params: Promise<{ locale: string }>
}

export default async function ExplorePage({ params }: PageProps) {
  const user = await getUser();
  const { locale } = await params;

  if (!user) {
    return unauthorized();
  }
  const trips = await prisma.trip.findMany({
    where: { visibility: "COMMUNITY" },
    include: {
      favoritedBy: {
        where: { userId: user.id },
        select: { id: true }
      }
    }
  });

  const tripsWithLikeStatus = trips.map(trip => ({
    ...trip,
    isAlreadyLiked: trip.favoritedBy.length > 0
  }));

  const sortedTrips = [...tripsWithLikeStatus].sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  );

  return (
    <div className="min-h-screen bg-[#FDFDFD] max-w-[1440px] mx-auto px-6 py-6 lg:px-24 sm:px-6 ">
      <div className="relative z-10">
        <TripsCommunity
          trips={JSON.parse(JSON.stringify(sortedTrips))}
          locale={locale}
        />
      </div>
    </div>
  );
}