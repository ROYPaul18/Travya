"use client";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();
  const isExplorePage = pathname?.includes("/explore");
  const editable = !isExplorePage;

  return (
    <div className="">
      <div className="space-y-24">
        {locations.map((item) => (
          <ItineraryItem key={item.id} item={item} tripId={tripId} editable={editable} />
        ))}
      </div>
    </div>
  );
}