import { prisma } from "@/lib/prisma";
import { getUser } from "@/lib/auth-server";
import { unauthorized } from "next/navigation";
import TripsFavorite from "@/components/favorite/TripsFavorite";

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
        where: { favoritedBy: { some: {} } }
    });

    const sortedTrips = [...trips].sort(
        (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
    );

    return (
        <div className="min-h-screen bg-white">
            <div className="py-12 px-24 relative z-10 space-y-8">
                <TripsFavorite
                    trips={JSON.parse(JSON.stringify(sortedTrips))}
                    locale={locale}
                />
            </div>
        </div>
    );
}