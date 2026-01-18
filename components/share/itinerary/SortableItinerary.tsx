"use client";
import ItineraryItem, {
  LocationWithActivities,
} from "./ItineraryItem";

interface SortableItineraryProps {
  locations: LocationWithActivities[];
  tripId: string;
  isOwner: boolean;
}

export default function SortableItinerary({
  locations,
  tripId,
}: SortableItineraryProps) {
  return (
    <div className="">
      <div className="space-y-24">
        {locations.map((item) => (
          <ItineraryItem key={item.id} item={item} tripId={tripId} editable={true} />
        ))}
      </div>
    </div>
  );
}
