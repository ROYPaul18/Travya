"use client";

import Map from "@/components/ui/Map";
import { Button } from "@/components/ui/button";
import { Link } from "@/components/Link";
import { MapActivity } from "@/lib/utils/types/types";
import { useIntlayer } from "next-intlayer";

interface Props {
  activities: MapActivity[];
  tripId: string;
}

export function TripMapSection({ activities, tripId }: Props) {
  const content = useIntlayer("trip-detail");

  return (
    <div>
      <h2 className="text-2xl font-medium text-gray-900 mb-6">
        {content.map}
      </h2>

      <div className="h-[400px] md:h-[600px] rounded-sm overflow-hidden border border-gray-300">
        {activities.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 bg-gray-50">
            <p className="text-gray-600 mb-4 font-light">
              {content.addLocationsMap}
            </p>
            <Link href={`/trips/${tripId}/itinerary/new`}>
              <Button className="bg-neutral-900 text-white rounded-sm h-11">
                {content.addLocationButton}
              </Button>
            </Link>
          </div>
        ) : (
          <Map activities={activities} />
        )}
      </div>
    </div>
  );
}
