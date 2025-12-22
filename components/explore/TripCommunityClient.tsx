"use client";

import { TripWithLocation } from "@/lib/utils/types/types";
import { TripHeaderCommunity } from "./TripHeaderCommunity";
import { TripImagesCommunity } from "./TripImagesCommunity";
import { TripMetaCommunity } from "./TripMetaCommunity";
import { TripItineraryCommunity } from "./TripItineraryCommunity";
import { TripMapCommunity } from "./TripMapCommunity";

interface Props {
  trip: TripWithLocation;
  isAlreadyLiked: boolean;
}

export default function TripCommunityClient({ trip, isAlreadyLiked }: Props) {
  
  const allActivities = trip.locations.flatMap(
    (location) => location.activities,
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="px-4 sm:px-6 lg:px-12 xl:px-24 2xl:px-42 pb-8 sm:pb-12">
        <div className="relative w-full max-w-7xl mx-auto">
          <TripHeaderCommunity trip={trip} isAlreadyLiked={isAlreadyLiked} />
          <TripImagesCommunity trip={trip} />
          <TripMetaCommunity
            description={trip.description}
            startDate={new Date(trip.startDate)}
            endDate={new Date(trip.endDate)}
          />
          
          <TripItineraryCommunity 
            locations={trip.locations} 
            tripId={trip.id} 
          />
          
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
        </div>
      </div>
    </div>
  );
}