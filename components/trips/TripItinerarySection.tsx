"use client";

import { MapPin, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/components/Link";
import SortableItinerary from "@/components/share/itinerary/SortableItinerary";
import { LocationWithActivities } from "@/lib/utils/types/types";
import { useIntlayer } from "next-intlayer";

interface Props {
  locations: LocationWithActivities[];
  tripId: string;
}

export function TripItinerarySection({ locations, tripId }: Props) {
  const content = useIntlayer("trip-detail");

  return (
    <div>
      {locations.length === 0 ? (
        <div className="border border-dashed border-gray-200/50 rounded-sm p-12 text-center bg-gray-50">
          <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-light text-gray-900 mb-2">
            Aucune étape
          </h3>
          <p className="text-gray-600 mb-6 font-light">
            Commencez à planifier votre voyage.
          </p>
          <Link href={`/trips/${tripId}/itinerary/new`}>
            <Button className="bg-neutral-900 text-white rounded-sm h-11">
              <Plus className="mr-2 h-4 w-4" />
              {content.addLocationButton}
            </Button>
          </Link>
        </div>
      ) : (
        <SortableItinerary locations={locations} tripId={tripId} isOwner={true}/>
      )}
    </div>
  );
}
