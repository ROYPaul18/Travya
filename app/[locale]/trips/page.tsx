import { Button } from "@/components/ui/button";
import { Link } from "@/components/Link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { Plus, Calendar, MapPin, Plane, ArrowRight, Globe, Clock, TrendingUp } from "lucide-react";
import { useIntlayer } from "next-intlayer/server";
import { getUser } from "@/lib/auth-server";
import { unauthorized } from "next/navigation";

interface PageProps {
  params: Promise<{ locale: string }>
}

export default async function TripsPage({ params }: PageProps) {
  const user = await getUser();
  const { locale } = await params;

  if (!user) {
    return unauthorized()
  }

  const content = useIntlayer("trips-page", locale);

  const trips = await prisma.trip.findMany({
    where: { userId: user.id },
  });

  const sortedTrips = [...trips].sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
  );

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const upcomingTrips = sortedTrips.filter(
    (trip) => new Date(trip.startDate) >= today,
  );
  const pastTrips = sortedTrips.filter(
    (trip) => new Date(trip.startDate) < today,
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Floating orbs background effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" style={{ animationDelay: '1s', animation: 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}></div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10 space-y-8">
        {/* Header with Stats */}
        <div className="space-y-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-200 via-cyan-200 to-blue-200 bg-clip-text text-transparent">
                {content.dashboard[locale as "en" | "fr" | "es"]}
              </h1>
              <p className="text-blue-200/80">
                {content.dashboardSubtitle[locale as "en" | "fr" | "es"]}
              </p>
            </div>
            <Link href={"/trips/new"}>
              <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-medium px-6 py-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 hover:scale-105">
                <Plus className="h-5 w-5" />
                {content.newTrip[locale as "en" | "fr" | "es"]}
              </Button>
            </Link>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-xl hover:scale-105 transition-transform duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <Globe className="w-8 h-8 text-blue-300" />
                  <TrendingUp className="w-5 h-5 text-blue-200" />
                </div>
                <div className="text-3xl font-bold text-white mb-1">{trips.length}</div>
                <div className="text-sm text-blue-200/80">
                  Total {trips.length === 1 ? "Trip" : "Trips"}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-xl hover:scale-105 transition-transform duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <Calendar className="w-8 h-8 text-cyan-300" />
                  <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
                </div>
                <div className="text-3xl font-bold text-white mb-1">{upcomingTrips.length}</div>
                <div className="text-sm text-blue-200/80">Upcoming</div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-xl hover:scale-105 transition-transform duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <Clock className="w-8 h-8 text-blue-300" />
                  <MapPin className="w-5 h-5 text-blue-200" />
                </div>
                <div className="text-3xl font-bold text-white mb-1">{pastTrips.length}</div>
                <div className="text-sm text-blue-200/80">Memories</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* All Trips Section */}
        <div>
          {trips.length === 0 ? (
            <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-2xl">
              <CardContent className="flex flex-col items-center justify-center py-16">
                <div className="bg-blue-500/20 p-6 rounded-full mb-6">
                  <MapPin className="h-16 w-16 text-blue-300" />
                </div>
                <h2 className="text-2xl font-medium mb-3 text-white">
                  {content.noTripsYet[locale as "en" | "fr" | "es"]}
                </h2>
                <p className="text-center mb-6 max-w-md text-blue-200/80">
                  {content.emptyStateMessage[locale as "en" | "fr" | "es"]}
                </p>
                <Link href={"/trips/new"}>
                  <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-medium px-8 py-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    {content.createFirstTrip[locale as "en" | "fr" | "es"]}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Upcoming Trips */}
              {upcomingTrips.length > 0 && (
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-1 h-6 bg-gradient-to-b from-blue-400 to-cyan-400 rounded-full"></div>
                    <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                      <Plane className="h-5 w-5 text-blue-300" />
                      {content.upcoming[locale as "en" | "fr" | "es"]}
                    </h2>
                    <div className="flex-1 h-px bg-gradient-to-r from-blue-500/30 to-transparent"></div>
                  </div>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {upcomingTrips.map((trip, key) => {
                      const daysUntil = Math.ceil(
                        (new Date(trip.startDate).getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
                      );
                      return (
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
                                    {trip.startDate.toLocaleDateString(locale, {
                                      day: "2-digit",
                                      month: "2-digit",
                                      year: "numeric",
                                    })}{" "}
                                    -{" "}
                                    {trip.endDate.toLocaleDateString(locale, {
                                      day: "2-digit",
                                      month: "2-digit",
                                      year: "numeric",
                                    })}
                                  </span>
                                </div>
                                <div className="inline-flex items-center gap-2 bg-cyan-500/30 text-cyan-200 text-xs px-3 py-1.5 rounded-full">
                                  <div className="w-2 h-2 bg-cyan-300 rounded-full animate-pulse"></div>
                                  {daysUntil === 0
                                    ? "Today!"
                                    : `${daysUntil} day${daysUntil > 1 ? "s" : ""} away`}
                                </div>
                              </CardContent>
                              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                <ArrowRight className="w-5 h-5 text-blue-300" />
                              </div>
                            </Card>
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Past Trips */}
              {pastTrips.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-1 h-6 bg-gradient-to-b from-blue-400/50 to-cyan-400/50 rounded-full"></div>
                    <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-blue-300" />
                      Past Adventures
                    </h3>
                    <div className="flex-1 h-px bg-gradient-to-r from-blue-500/30 to-transparent"></div>
                  </div>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pastTrips.map((trip, key) => (
                      <div key={key} className="relative group">
                        <Link href={`trips/${trip.id}`}>
                          <Card className="h-full bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 hover:border-blue-400/30 hover:shadow-xl hover:scale-105 transition-all duration-300">
                            <CardHeader>
                              <CardTitle className="line-clamp-1 text-white/80 group-hover:text-blue-200 transition-colors flex items-start gap-2">
                                <MapPin className="h-5 w-5 text-blue-300/60 flex-shrink-0" />
                                <span>{trip.title}</span>
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                              <p className="text-sm line-clamp-2 text-blue-100/60">
                                {trip.description}
                              </p>
                              <div className="flex items-center gap-2 text-sm text-blue-200/70 bg-blue-500/10 px-3 py-2 rounded-lg">
                                <Calendar className="h-4 w-4" />
                                <span>
                                  {trip.startDate.toLocaleDateString(locale, {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                  })}{" "}
                                  -{" "}
                                  {trip.endDate.toLocaleDateString(locale, {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                  })}
                                </span>
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Show all trips if less than 6 */}
              {trips.length > 6 && upcomingTrips.length === 0 && pastTrips.length === 0 && (
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
                                {trip.startDate.toLocaleDateString(locale, {
                                  day: "2-digit",
                                  month: "2-digit",
                                  year: "numeric",
                                })}{" "}
                                -{" "}
                                {trip.endDate.toLocaleDateString(locale, {
                                  day: "2-digit",
                                  month: "2-digit",
                                  year: "numeric",
                                })}
                              </span>
                            </div>
                            {new Date(trip.startDate) >= today && (
                              <div className="inline-flex items-center gap-1 bg-cyan-500/30 text-cyan-200 text-xs px-2 py-1 rounded-full">
                                <div className="w-2 h-2 bg-cyan-300 rounded-full animate-pulse"></div>
                                {content.upcoming[locale as "en" | "fr" | "es"]}
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}