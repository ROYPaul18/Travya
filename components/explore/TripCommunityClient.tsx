"use client";

import { TripWithLocation } from "@/lib/utils/types/types";
import { TripMeta } from "../share/TripMeta";
import { TripItineraryCommunity } from "./TripItineraryCommunity";
import { TripMapCommunity } from "./TripMapCommunity";
import TripMetaInfo from "./TripMetaInfo";
import { TripHeader } from "@/components/share/TripHeader";

interface Props {
  trip: TripWithLocation;
  isAlreadyLiked: boolean;
}

export default function TripCommunityClient({ trip }: Props) {
  const allActivities = trip.locations.flatMap(
    (location) => location.activities,
  );

  return (

    <div className="min-h-screen bg-[#FDFDFD]">
      
      <TripHeader trip={{
        ...trip,
        description: trip.description ?? "" 
      }} />

      <main className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        <TripMeta
          description={trip.description}
          startDate={trip.startDate}
          endDate={trip.endDate}
          editable={false}
        />
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-10 lg:gap-20 pb-20">
          <TripItineraryCommunity
            locations={trip.locations}
            tripId={trip.id}
          />
          
          <aside className="flex flex-col gap-2">
            <TripMetaInfo 
              tripId={trip.id} 
              author={{
                name: trip.user.name || "Unknown",
                image: trip.user.image || null
              }} 
            />
          </aside>
        </div>

        {/* Map Section */}
        <section className="pb-20">
          <TripMapCommunity
            activities={allActivities
              .filter((a) => a.address)
              .map((a) => ({
                id: a.id,
                name: a.name,
                lat: a.lat,
                lng: a.lng,
                address: a.address as string,
              }))}
            tripId={trip.id}
          />
        </section>
      </main>
    </div>
  );
}