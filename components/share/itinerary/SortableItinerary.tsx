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
    <div className="relative pl-[120px]">
      {/* Ligne de timeline – centrée sur le badge (120px / 2 = 60px) */}
    
      <div className="space-y-24">
        {locations.map((item) => (
          <ItineraryItem key={item.id} item={item} tripId={tripId} />
        ))}
      </div>
    </div>
  );
}
