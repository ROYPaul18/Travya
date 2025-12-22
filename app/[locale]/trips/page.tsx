import { prisma } from "@/lib/prisma";
import { useIntlayer } from "next-intlayer/server";
import { getUser } from "@/lib/auth-server";
import { unauthorized } from "next/navigation";
import TripsClient from "@/components/trips/TripsClient";

interface PageProps {
  params: Promise<{ locale: string }>
}

export default async function TripsPage({ params }: PageProps) {
  const user = await getUser();
  const { locale } = await params;

  if (!user) {
    return unauthorized();
  }

  const content = useIntlayer("trips-page", locale);

  const trips = await prisma.trip.findMany({
    where: { userId: user.id },
  });

  const sortedTrips = [...trips].sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-24 py-6 sm:py-8 max-w-[1920px] mx-auto relative z-10">
        <TripsClient
          trips={JSON.parse(JSON.stringify(sortedTrips))}
          locale={locale}
        />
      </div>
    </div>
  );
}