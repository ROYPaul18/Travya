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
  isOwner
}: SortableItineraryProps) {
  return (
    <div className="space-y-4">
      {locations.map((item) => (
        <ItineraryItem key={item.id} item={item} tripId={tripId} />
      ))}
    </div>
  );
}