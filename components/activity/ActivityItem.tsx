"use client";

import React from "react";
import {
  Euro,
  Loader2,
  Trash2,
  Pencil,
  MoreHorizontal,
  Clock,
  MapPin,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useIntlayer } from "next-intlayer";
import { Activity } from "@/lib/utils/types/types";
import { Link } from "../Link";

interface ActivityItemProps {
  activity: Activity;
  onDeleteClick: (activity: Activity) => void;
  onEditClick: (activity: Activity) => void;
  deletingId: string | null;
  isEditing: boolean;
  tripId: string;
  locationId: string;
}

const ActivityItem = ({
  activity,
  tripId,
  locationId,
  onDeleteClick,
  deletingId,
  isEditing,
}: ActivityItemProps) => {
  const content = useIntlayer("activities");
  const isDeleting = deletingId === activity.id;

  const getTranslatedCategory = (category: string) =>
    content.categories[category as keyof typeof content.categories] || category;

  return (
    <div
      className={`border-b border-gray-300 py-4 transition-all ${isDeleting || isEditing ? "opacity-50 pointer-events-none" : ""
        }`}
    >
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Image */}
        <div className="w-full sm:w-[130px] h-[180px] sm:h-[130px] shrink-0">
          {activity.images?.[0] ? (
            <img
              src={activity.images[0]}
              alt={activity.name}
              className="w-full h-full object-cover rounded-md border border-gray-200"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 rounded-md" />
          )}
        </div>

        {/* Contenu */}
        <div className="flex-1 flex flex-col gap-2">
          {/* Header */}
          <div className="flex justify-between items-start gap-2">
            <h3 className="text-base sm:text-lg font-medium text-gray-900">
              {activity.name}
            </h3>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-2 hover:bg-gray-100 rounded-md">
                  <MoreHorizontal className="w-5 h-5 text-gray-600" />
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Link href={`/trips/${tripId}/${locationId}/${activity.id}/edit`} className="flex gap-2"><Pencil className="w-4 h-4 mr-2" />
                    Modifier</Link>
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => onDeleteClick(activity)}
                  className="text-red-600"
                >
                  {isDeleting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Suppression…
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-4 h-4 mr-2" />
                      Supprimer
                    </>
                  )}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 font-medium">
              {getTranslatedCategory(activity.category)}
            </span>

            {activity.startTime && activity.endTime && (
              <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {activity.startTime} – {activity.endTime}
              </span>
            )}

            {typeof activity.budget === "number" && activity.budget > 0 && (
              <span className="px-3 py-1 rounded-full bg-green-50 text-green-700 flex items-center gap-1">
                <Euro className="w-3 h-3" />
                {activity.budget} €
              </span>
            )}

            {activity.address && (
              <span className="px-3 py-1 rounded-full bg-purple-50 text-purple-700 flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {activity.address}
              </span>
            )}
          </div>

          {activity.description && (
            <p className="text-sm text-gray-600 line-clamp-2 sm:line-clamp-none">
              {activity.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivityItem;
