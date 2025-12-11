"use client";

import React from "react";
import { Euro, Loader2, Trash2, Pencil, MoreHorizontal, Tag } from "lucide-react";
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
  const isDeleting = deletingId === activity.id;

  const getTranslatedCategory = (category: string) => {
    return (
      content.categories[category as keyof typeof content.categories] ||
      category
    );
  };

  return (
    <div
      className={`bg-white border-b border-gray-300 py-5 transition-all  mb-5 ${isDeleting || isEditing ? "opacity-50 pointer-events-none" : ""
        }`}
    >
      <div className="flex gap-6 items-start">
        <div className="w-[130px] h-[130px] flex-shrink-0">
          {activity.images && activity.images.length > 0 ? (
            <img
              src={activity.images[0]}
              alt={activity.name}
              className="w-full h-full rounded-md object-cover border border-gray-200"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 rounded-md" />
          )}
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start mb-2">
            <div className="flex flex-col gap-2">
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-700">
                  {getTranslatedCategory(activity.category)}
                </span>
              </div>
              <h3 className="text-lg text-gray-900 font-medium">
                {activity.name}
              </h3>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  disabled={isDeleting || isEditing}
                  className="p-1.5 hover:bg-gray-100 rounded-md transition disabled:opacity-50"
                >
                  <MoreHorizontal className="h-5 w-5 text-gray-600" />
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onEditClick(activity)}>
                  <Pencil className="w-4 h-4 mr-2" />
                  Modifier
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => onDeleteClick(activity)}
                  className="text-red-600"
                >
                  {isDeleting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Suppression...
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

          {activity.description && (
            <p className="text-sm text-gray-600 mb-3">
              {activity.description}
            </p>
          )}
          {activity.address && (
            <p className="text-sm text-gray-500 mb-3">{activity.address}</p>
          )}
          <div className="flex flex-wrap gap-5 text-sm text-gray-700">
            {activity.startTime && activity.endTime && (
              <div>
                <strong className="text-gray-900">Horaires :</strong>{" "}
                {formatTime(activity.startTime)} – {formatTime(activity.endTime)}
              </div>
            )}

            {typeof activity.budget === "number" && activity.budget > 0 && (
              <div className="flex items-center gap-1 text-gray-900 font-medium">
                <Euro className="h-4 w-4" />
                <span>{activity.budget} €</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityItem;
