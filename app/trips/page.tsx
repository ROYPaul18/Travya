import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { Plus, Calendar, MapPin, Plane, Menu } from "lucide-react";

export default async function TripsPage() {
  const session = await auth();
  const trips = await prisma.trip.findMany({
    where: { userId: session?.user?.id },
  });
  const sortedTrips = [...trips].sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
  );

  if (!session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex justify-center items-center">
        <div className="text-center space-y-4">
          <MapPin className="h-16 w-16 text-blue-300 mx-auto animate-pulse" />
          <p className="text-blue-100 text-xl">
            Please Sign In to view your trips.
          </p>
        </div>
      </div>
    );
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const upcommingsTrips = sortedTrips.filter(
    (trip) => new Date(trip.startDate) >= today,
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="space-y-8 container mx-auto px-4 py-12 relative z-10">
        {/* Welcome Card */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2 text-2xl">
              <Plane className="h-6 w-6 text-blue-300" />
              Welcome back, {session.user?.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-blue-100 text-lg">
              {trips.length === 0
                ? "Start planning your first trip and begin your adventure! ✈️"
                : `You have ${trips.length}
                            ${trips.length === 1 ? "trip" : "trips"} planned. ${
                              upcommingsTrips.length > 0
                                ? `🎉 ${upcommingsTrips.length} upcoming ${
                                    upcommingsTrips.length === 1
                                      ? "adventure"
                                      : "adventures"
                                  }!`
                                : ""
                            }   `}
            </p>
          </CardContent>
        </Card>
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-200 via-cyan-200 to-blue-200 bg-clip-text text-transparent">
              Dashboard
            </h1>
            <p className="text-blue-200/80">
              Manage and explore your travel adventures
            </p>
          </div>
          <Link href={"/trips/new"}>
            <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-medium px-6 py-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2">
              <Plus className="h-5 w-5" />
              New Trip
            </Button>
          </Link>
        </div>

        {/* Trips Grid */}
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-white flex items-center gap-2">
            <MapPin className="h-6 w-6 text-blue-300" />
            Your Recent Trips
          </h2>

          {trips.length === 0 ? (
            <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-2xl">
              <CardContent className="flex flex-col items-center justify-center py-16">
                <div className="bg-blue-500/20 p-6 rounded-full mb-6">
                  <MapPin className="h-16 w-16 text-blue-300" />
                </div>
                <h3 className="text-2xl font-medium mb-3 text-white">
                  No trips yet
                </h3>
                <p className="text-center mb-6 max-w-md text-blue-200/80">
                  Start planning your adventure by creating your first trip. The
                  world is waiting for you! 🌍
                </p>
                <Link href={"/trips/new"}>
                  <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-medium px-8 py-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    Create Your First Trip
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedTrips.slice(0, 6).map((trip, key) => (
                <div key={key} className="relative group">
                  <Link href={`trips/${trip.id}`}>
                    <Card className="h-full bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 hover:border-blue-400/40 hover:shadow-2xl hover:scale-105 transition-all duration-300">
                      <CardHeader>
                        <CardTitle className="line-clamp-1 text-white group-hover:text-blue-200 transition-colors flex items-start gap-2">
                          <Plane className="h-5 w-5 text-blue-300 flex-shrink-0 group-hover:rotate-12 transition-transform" />
                          <span>{trip.title}</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <p className="text-sm line-clamp-2 text-blue-100/80">
                          {trip.description}
                        </p>
                        <div className="flex items-center gap-2 text-sm text-blue-200 bg-blue-500/20 px-3 py-2 rounded-lg">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {trip.startDate.toLocaleDateString("fr-FR", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            })}{" "}
                            -{" "}
                            {trip.endDate.toLocaleDateString("fr-FR", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                        {new Date(trip.startDate) >= today && (
                          <div className="inline-flex items-center gap-1 bg-cyan-500/30 text-cyan-200 text-xs px-2 py-1 rounded-full">
                            <div className="w-2 h-2 bg-cyan-300 rounded-full animate-pulse"></div>
                            Upcoming
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
