"use client";

import React from "react";
import { Euro, Loader2, Trash2, Pencil, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useIntlayer } from "next-intlayer";
import { Activity } from "@/lib/utils/types/types";

interface ActivityItemProps {
  activity: Activity;
  onDeleteClick: (activity: Activity) => void;
  onEditClick: (activity: Activity) => void;
  deletingId: string | null;
  isEditing: boolean;
}

const formatTime = (time: string | null): string => {
  if (!time) return "";
  return time;
};

const ActivityItem = ({
  activity,
  onDeleteClick,
  onEditClick,
  deletingId,
  isEditing,
}: ActivityItemProps) => {
  const content = useIntlayer("activities");

  const getTranslatedCategory = (category: string) => {
    return (
      content.categories[category as keyof typeof content.categories] ||
      category
    );
  };

  const isDeleting = deletingId === activity.id;

  return (
    <div
      className={`bg-white border border-gray-300 rounded-sm p-5 transition-all hover:shadow-sm mb-4 ${
        isDeleting || isEditing ? "opacity-50 pointer-events-none" : ""
      }`}
    >

      {activity.images && activity.images.length > 0 && (
        <div className="flex overflow-x-auto gap-2 -mx-5 px-5 mb-4 pb-2 scrollbar-hide">
          {activity.images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`${activity.name} ${idx + 1}`}
              className="w-[140px] min-w-[140px] h-[100px] rounded-sm object-cover border border-gray-300"
            />
          ))}
        </div>
      )}

      <div className="flex justify-between items-start gap-4 mb-3">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <h3 className="font-light text-lg text-gray-900 truncate">
            {activity.name}
          </h3>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              disabled={isDeleting || isEditing}
              className="p-1.5 hover:bg-gray-100 rounded-sm transition-colors disabled:opacity-50 flex-shrink-0"
            >
              <MoreHorizontal className="h-5 w-5 text-gray-600" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="border-gray-300 rounded-sm"
          >
            <DropdownMenuItem
              onClick={() => onEditClick(activity)}
              className="font-light"
            >
              <Pencil className="h-4 w-4 mr-2" />
              Modifier
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onDeleteClick(activity)}
              className="text-red-600 focus:text-red-600 font-light"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Suppression...
                </>
              ) : (
                <>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Supprimer
                </>
              )}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {activity.address && (
        <div className="flex items-start gap-2 text-sm text-gray-600 mb-3 font-light">
          <span>{activity.address}</span>
        </div>
      )}

      {/* Description */}
      {activity.description && (
        <p className="text-sm text-gray-600 leading-relaxed mb-3 font-light">
          {activity.description}
        </p>
      )}

      {/* Category Badge */}
      <div className="mb-3">
        <span className="inline-block text-xs px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 font-light">
          {getTranslatedCategory(activity.category)}
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 font-light">
        {activity.startTime && activity.endTime && (
          <div className="flex items-center gap-1.5">
            <span>
              {formatTime(activity.startTime)} - {formatTime(activity.endTime)}
            </span>
          </div>
        )}
        {typeof activity.budget === "number" && activity.budget > 0 && (
          <div className="flex items-center gap-1 text-gray-900 font-medium">
            <Euro className="h-4 w-4" />
            <span>{activity.budget}€</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityItem;