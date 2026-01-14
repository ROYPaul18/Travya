import { prisma } from "@/lib/prisma";

import { notFound, unauthorized } from "next/navigation";
import EditTripPage from "@/components/trips/EditTripPage";
import { getUser } from "@/lib/auth-server";

interface PageProps {
    params: Promise<{
        locale: string;
        tripId: string;
    }>;
}

export default async function Page({ params }: PageProps) {

    const user = await getUser();

    if (!user) {
        return unauthorized()
    }

    // Récupération des paramètres
    const { tripId } = await params;
    const trip = await prisma.trip.findUnique({
        where: { id: tripId },
    });

    // Vérification de l'existence du voyage
    if (!trip) {
        return notFound();
    }

    // Vérification que l'utilisateur est bien le propriétaire
    if (trip.userId !== user.id) {
        return unauthorized();
    }

    return <EditTripPage trip={trip} />;
}