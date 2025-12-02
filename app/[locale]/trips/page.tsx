import { Button } from "@/components/ui/button";
import { Link } from "@/components/Link";
import { prisma } from "@/lib/prisma";
import { Plus } from "lucide-react";
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
      <div className="container mx-auto px-4 py-12 relative z-10 space-y-8">
        <div className="space-y-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-2">
              <h1 className="text-xl font-medium text-gray-900">
                {content.dashboard}
              </h1>
              <p className="text-sm font-light text-gray-600">{content.dashboardSubtitle}</p>
            </div>
            <Link href={"/trips/new"}>
              <Button className="bg-neutral-950 hover:bg-gray-900 text-white hover:shadow-lg transition-all duration-200 flex items-center gap-2 font-light cursor-pointer">
                <Plus className="h-5 w-5" />
                {content.newTrip}
              </Button>
            </Link>
          </div>
        </div>
        <TripsClient
          trips={JSON.parse(JSON.stringify(sortedTrips))}
          locale={locale}
        />
      </div>
    </div>
  );
}