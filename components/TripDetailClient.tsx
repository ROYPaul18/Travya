"use client";

import { Location, Trip } from "@/app/generated/prisma";
import Image from "next/image";
import { Calendar, MapPin, Plus, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { useState } from "react";
import Map from "@/components/ui/Map";
import SortableItinerary from "@/components/ui/SortableItinerary";

export type TripWithLocation = Trip & {
  locations: Location[];
};

interface TripDetailClientProps {
  trip: TripWithLocation;
}

export default function TripDetailClient({ trip }: TripDetailClientProps) {
  const [activeTab, setActiveTab] = useState("overview");

  const tripDays = Math.round(
    (trip.endDate.getTime() - trip.startDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      

      <div className="container mx-auto px-4 py-8 space-y-8 relative z-10">
        {/* Hero Image */}
        {trip.imageUrl && (
          <div className="w-full h-72 md:h-96 overflow-hidden rounded-2xl shadow-2xl relative border border-white/20">
            <Image
              src={trip.imageUrl}
              alt={trip.title}
              className="object-cover"
              fill
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
          </div>
        )}

        {/* Header Section */}
        <div className="bg-white/10 backdrop-blur-md p-6 shadow-2xl rounded-2xl border border-white/20 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-3">
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-200 via-cyan-200 to-blue-200 bg-clip-text text-transparent">
              {trip.title}
            </h1>
            <div className="flex items-center text-blue-200 gap-2 bg-blue-500/20 px-3 py-2 rounded-lg w-fit">
              <Calendar className="h-5 w-5" />
              <span className="text-lg">
                {trip.startDate.toLocaleDateString()} - {trip.endDate.toLocaleDateString()}
              </span>
            </div>
          </div>
          <div className="mt-4 md:mt-0">
            <Link href={`/trips/${trip.id}/itinerary/new`}>
              <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-medium px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Add Location
              </Button>
            </Link>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="bg-white/10 backdrop-blur-md p-6 shadow-2xl rounded-2xl border border-white/20">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6 bg-white/5 border border-white/20 p-1">
              <TabsTrigger 
                value="overview" 
                className="text-lg data-[state=active]:bg-blue-500/30 data-[state=active]:text-white text-blue-200"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger 
                value="itinerary" 
                className="text-lg data-[state=active]:bg-blue-500/30 data-[state=active]:text-white text-blue-200"
              >
                Itinerary
              </TabsTrigger>
              <TabsTrigger 
                value="map" 
                className="text-lg data-[state=active]:bg-blue-500/30 data-[state=active]:text-white text-blue-200"
              >
                Map
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Trip Summary */}
                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                  <h2 className="text-2xl font-semibold mb-4 text-white flex items-center gap-2">
                    <Calendar className="h-6 w-6 text-blue-300" />
                    Trip Summary
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 bg-blue-500/10 p-4 rounded-lg">
                      <Calendar className="h-6 w-6 text-blue-300 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-medium text-blue-100">Dates</p>
                        <p className="text-sm text-blue-200/80">
                          {trip.startDate.toLocaleDateString()} - {trip.endDate.toLocaleDateString()}
                          <br />
                          <span className="text-cyan-300">{tripDays} day(s)</span>
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 bg-cyan-500/10 p-4 rounded-lg">
                      <MapPin className="h-6 w-6 text-cyan-300 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-medium text-blue-100">Destinations</p>
                        <p className="text-sm text-blue-200/80">
                          <span className="text-cyan-300 font-semibold">{trip.locations.length}</span>{" "}
                          {trip.locations.length === 1 ? "location" : "locations"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Map */}
                <div className="h-72 rounded-xl overflow-hidden shadow-xl border border-white/20">
                  {trip.locations.length === 0 ? (
                    <div className="h-full bg-white/5 flex flex-col items-center justify-center text-center p-4">
                      <MapPin className="h-12 w-12 text-blue-300 mb-3" />
                      <p className="text-blue-200 mb-4">Add locations to see them on the map</p>
                      <Link href={`/trips/${trip.id}/itinerary/new`}>
                        <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white">
                          <Plus className="mr-2 h-4 w-4" />
                          Add Location
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <Map itineraries={trip.locations} />
                  )}
                </div>

                {/* Description */}
                <div className="md:col-span-2 bg-white/5 p-6 rounded-xl border border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-3">Description</h3>
                  <p className="text-blue-100/80 leading-relaxed">
                    {trip.description}
                  </p>
                </div>
              </div>
            </TabsContent>

            {/* Itinerary Tab */}
            <TabsContent value="itinerary" className="space-y-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
                  <MapPin className="h-6 w-6 text-blue-300" />
                  Full Itinerary
                </h2>
              </div>

              {trip.locations.length === 0 ? (
                <div className="bg-white/5 p-12 rounded-xl border border-white/10 text-center">
                  <MapPin className="h-16 w-16 text-blue-300 mx-auto mb-4" />
                  <p className="text-blue-200 mb-6 text-lg">Add locations to build your itinerary</p>
                  <Link href={`/trips/${trip.id}/itinerary/new`}>
                    <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white">
                      <Plus className="mr-2 h-5 w-5" />
                      Add Location
                    </Button>
                  </Link>
                </div>
              ) : (
                <SortableItinerary locations={trip.locations} tripId={trip.id} />
              )}
            </TabsContent>

            {/* Map Tab */}
            <TabsContent value="map" className="space-y-6">
              <div className="h-96 rounded-xl overflow-hidden shadow-xl border border-white/20">
                {trip.locations.length === 0 ? (
                  <div className="h-full bg-white/5 flex flex-col items-center justify-center text-center p-4">
                    <MapPin className="h-16 w-16 text-blue-300 mb-4" />
                    <p className="text-blue-200 mb-6 text-lg">Add locations to see them on the map</p>
                    <Link href={`/trips/${trip.id}/itinerary/new`}>
                      <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white">
                        <Plus className="mr-2 h-5 w-5" />
                        Add Location
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <Map itineraries={trip.locations} />
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Back Button */}
        <div className="text-center">
          <Link href={`/trips`}>
            <Button className="bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm px-6 py-3 rounded-lg transition-all duration-300 flex items-center gap-2 mx-auto">
              <ArrowLeft className="h-5 w-5" />
              Back to Trips
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}