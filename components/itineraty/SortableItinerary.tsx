"use client";
import { Location } from "@/app/generated/prisma";
import { useState } from "react";

import {
  ChevronDown,
  ChevronUp,
  MapPin,
  Calendar,
} from "lucide-react";
import SortableActivities from "../activity/SortableActivities";
import { useIntlayer } from "next-intlayer";

// Typage étendu pour inclure les activités
interface LocationWithActivities extends Location {
  activities?: Array<{ id: string }>;
}

interface SortableItineraryProps {
  locations: LocationWithActivities[];
  tripId: string;
}

// Fonction pour formater la date
function formatDate(date: Date, locale: string = "fr-FR"): string {
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

function ItineraryItem({
  item,
  tripId
}: {
  item: LocationWithActivities;
  tripId: string
}) {
  const [open, setOpen] = useState(false);
  const content = useIntlayer("itinerary");

  const activitiesCount = item.activities?.length || 0;

  const getActivitiesText = (count: number) => {
    return count === 1 ? content.activity : content.activities;
  };

  const formattedDate = formatDate(new Date(item.createdAt));

  return (
    <div className="transition-all bg-white hover:bg-gray-50 rounded-sm border border-gray-300 p-6">
      <div className="flex items-start justify-between gap-4">
        {/* Left side - Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-950 text-white font-medium flex-shrink-0">
              {item.order + 1}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-light text-gray-900 truncate">
                {content.day} {item.order + 1}
              </h3>
              <div className="flex items-center gap-2 text-sm text-gray-600 font-light mt-1">
                <span className="truncate">{formattedDate}</span>
              </div>
            </div>
          </div>

          {/* Activities count badge */}
          {activitiesCount > 0 && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-200 rounded-full text-sm text-gray-600 font-light">
              <span>{activitiesCount} {getActivitiesText(activitiesCount)}</span>
            </div>
          )}
        </div>

        {/* Right side - Toggle button */}
        <div className="flex items-center flex-shrink-0">
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="p-2 hover:bg-gray-100 rounded-sm transition-colors"
            aria-label={open ? "Réduire" : "Développer"}
          >
            {open ? (
              <ChevronUp className="h-5 w-5 text-gray-600" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-600" />
            )}
          </button>
        </div>
      </div>

      {/* Expandable activities section */}
      {open && (
        <div className="mt-6 pt-6 border-t border-gray-300">
          <SortableActivities tripId={tripId} locationId={item.id} />
        </div>
      )}
    </div>
  );
}

export default function SortableItinerary({
  locations,
  tripId,
}: SortableItineraryProps) {
  return (
    <div className="space-y-4">
      {locations.map((item, key) => (
        <ItineraryItem key={item.id} item={item} tripId={tripId} />
      ))}
    </div>
  );
}