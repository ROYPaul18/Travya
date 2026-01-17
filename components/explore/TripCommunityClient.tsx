"use client";

import { TripWithLocation } from "@/lib/utils/types/types";
// import { TripHeaderCommunity } from "./TripHeaderCommunity";
import { TripImagesCommunity } from "./TripImagesCommunity";
import { TripMeta} from "./TripMeta";
import { TripItineraryCommunity } from "./TripItineraryCommunity";
import { TripMapCommunity } from "./TripMapCommunity";
import TripMetaInfo from "./TripMetaInfo";

interface Props {
  trip: TripWithLocation;
  isAlreadyLiked: boolean;
}

export default function TripCommunityClient({ trip }: Props) {
  const allActivities = trip.locations.flatMap(
    (location) => location.activities,
  );
  return (
    <div className="min-h-screen bg-white">
      <TripImagesCommunity trip={trip} />
      <div className="px-4 sm:px-6 lg:px-12 xl:px-24 2xl:px-42 pb-8 sm:pb-12">
        <div className="relative w-full max-w-7xl mx-auto">
          {/* <TripHeaderCommunity trip={trip} isAlreadyLiked={isAlreadyLiked} /> */}
          <TripMeta
            description={trip.description}
            startDate={trip.startDate}
            endDate={trip.endDate}
            editable={true}
          />

          <div className="grid grid-cols-[1fr_350px] gap-20 pb-20 ">
            <TripItineraryCommunity
              locations={trip.locations}
              tripId={trip.id}
            />
            <div className="flex flex-col gap-2">
              <TripMetaInfo tripId={trip.id} author={{
                name: trip.user.name || "Unknown",
                image: trip.user.image || null
              }} />
            </div>
          </div>


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