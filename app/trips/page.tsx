import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";

export default async function TripsPage() {
    const session = await auth()
    const trips = await prisma.trip.findMany({
        where: {userId: session?.user?.id}
    })

    if (!session) {
        return <div className="flex justify-center items-center h-screen text-gray-700 text-xl"> Please Sign In.</div>
    }

    return <div className="space-y-6 container mx-auto px-4 py-8">
        <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight"> Dashboard</h1>
            <Link href={"/trips/new"}>
                <Button> New Trip</Button>
            </Link>
        </div>
        <Card>
            <CardHeader>
                <CardTitle> Welcome back, {session.user?.name} </CardTitle>
            </CardHeader>
            <CardContent>
                <p> 
                    {trips.length === 0 ? "Start planning your first trip" : `You have ${trips.length} ${trips.length === 1 ? "trip" : "trips planned"}`}
                </p>
            </CardContent>
        </Card>

    </div>
}