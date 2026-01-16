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

    const getActivitiesText = (count: number) => {
        return count === 1 ? content.activity : content.activities;
    };

    const formattedDate = formatDate(new Date(item.createdAt));

    return (
        <div className="transition-all bg-white rounded-sm">
            <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-950 text-white font-medium">
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

                        {activitiesCount > 0 && (
                            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-200 rounded-full text-sm text-gray-600 font-light">
                                <span>
                                    {activitiesCount} {getActivitiesText(activitiesCount)}
                                </span>
                            </div>
                        )}
                    </div>

                </div>
                {hasMoreThanTwo && (
                    <div className="flex items-center shrink-0">
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
                )}
            </div>
            <div className="mt-6 pt-6 border-t border-gray-300">
                <SortableActivities
                    tripId={tripId}
                    locationId={item.id}
                    maxVisible={open ? undefined : 2}
                />
            </div>
        </div>
    );
}