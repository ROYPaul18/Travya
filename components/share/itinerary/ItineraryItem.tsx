"use client";
import { Location } from "@/app/generated/prisma/client";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import SortableActivities from "../activity/SortableActivities";
import { useIntlayer } from "next-intlayer";


export interface LocationWithActivities extends Location {
    activities?: Array<{ id: string }>;
}

interface ItineraryItemProps {
    item: LocationWithActivities;
    tripId: string;
}

function formatDate(date: Date, locale: string = "fr-FR"): string {
    return new Intl.DateTimeFormat(locale, {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(date);
}

export default function ItineraryItem({ item, tripId }: ItineraryItemProps) {
    const [open, setOpen] = useState(false);
    const content = useIntlayer("itinerary");

    const activitiesCount = item.activities?.length || 0;
    const hasMoreThanTwo = activitiesCount > 2;

      return (
    <section className="relative z-10">
      {/* Header Jour */}
      <div className="flex items-center gap-10 mb-16">
        {/* Badge Jour */}
        <div className="w-[120px] h-[120px] rounded-full border border-gray-900
                        flex flex-col items-center justify-center shrink-0 bg-white">
          <span className="text-[10px] font-bold uppercase tracking-[2px]">
            {content.day}
          </span>
          <span className="font-logo text-4xl italic leading-none">
            {String(item.order + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Titre + compteur */}
        <div>
          <h2 className="font-logo text-5xl italic font-light mb-2">
            {item.tripId}
          </h2>

          <span className="text-[10px] font-bold uppercase tracking-[2px] text-gray-500">
            ({activitiesCount}{" "}
            {activitiesCount > 1 ? content.activities : content.activity})
          </span>
        </div>
      </div>

      {/* Activités */}
      <SortableActivities
        tripId={tripId}
        locationId={item.id}
        
      />
    </section>
  );
}