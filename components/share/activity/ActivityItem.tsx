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
import { Link } from "../../Link";

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
      className={`relative ml-40 mb-20 transition-all ${
        isDeleting || isEditing ? "opacity-50 pointer-events-none" : ""
      }`}
    >
      {/* Point de timeline */}
      <span className="absolute -left-[103px] top-[15px] w-[7px] h-[7px] rounded-full bg-accent" />

      {/* Heure */}
      {activity.startTime && activity.endTime && (
        <span className="block mb-4 text-[10px] font-bold uppercase tracking-[2px] text-[#B59E80]">
          {activity.startTime} — {activity.endTime} - {getTranslatedCategory(activity.category)}
        </span>
      )}

      {/* Contenu principal */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Texte */}
        <div className="space-y-5">
          {/* Header + menu */}
          <div className="flex justify-between items-start gap-4">
            <h3 className="font-logo text-4xl font-normal">
              {activity.name}
            </h3>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-2 rounded-md hover:bg-gray-100">
                  <MoreHorizontal className="w-5 h-5 text-gray-600" />
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link
                    href={`/trips/${tripId}/${locationId}/${activity.id}/edit`}
                    className="flex items-center gap-2"
                  >
                    <Pencil className="w-4 h-4" />
                    Modifier
                  </Link>
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

          {/* Description */}
          {activity.description && (
            <p className="text-[16px] leading-[32px] text-gray-600 font-light">
              {activity.description}
            </p>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-3">
            {typeof activity.budget === "number" && activity.budget > 0 && (
              <span className="inline-flex items-center gap-1 px-4 py-2 text-[9px] font-bold uppercase tracking-wide border rounded-full">
                <Euro className="w-3 h-3" />
                {activity.budget} €
              </span>
            )}

            {activity.address && (
              <span className="inline-flex items-center gap-1 px-4 py-2 text-[9px] font-bold uppercase tracking-wide border rounded-full">
                <MapPin className="w-3 h-3" />
                {activity.address}
              </span>
            )}
          </div>
        </div>

        {/* Image */}
        <div className="w-full">
          {activity.images?.[0] ? (
            <img
              src={activity.images[0]}
              alt={activity.name}
              className="w-full aspect-[4/5] object-cover"
            />
          ) : (
            <div className="w-full aspect-[4/5] bg-gray-200" />
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivityItem;
