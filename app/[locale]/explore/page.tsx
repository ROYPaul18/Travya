import { prisma } from "@/lib/prisma";
import { getUser } from "@/lib/auth-server";
import { unauthorized } from "next/navigation";
import TripsCommunity from "@/components/explore/TripsCommunity";

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
  });

  const sortedTrips = [...trips].sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12 relative z-10 space-y-8">
        <TripsCommunity
          trips={JSON.parse(JSON.stringify(sortedTrips))}
          locale={locale}
        />
      </div>
    </div>
  );
}