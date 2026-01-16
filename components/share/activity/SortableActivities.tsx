"use client";

import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import ActivityItem from "@/components/share/activity/ActivityItem";
import { deleteActivity, } from "@/lib/actions/Activity";
import { useIntlayer } from "next-intlayer";
import { Activity, Location } from "@/lib/utils/types/types";
import { useRouter } from "next/navigation";
import ActivityItemSkeleton from "./ActivityItemSkeleton";
import { Link } from "../../Link";

const SortableActivities = ({
  tripId,
  locationId,
  maxVisible,
}: {
  tripId: string;
  locationId: string;
  maxVisible?: number;
}) => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [activityToDelete, setActivityToDelete] = useState<Activity | null>(null);
  const content = useIntlayer("activities");
  const router = useRouter();

  const fetchActivities = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(`/api/locations/${locationId}/activities`);

      if (!response.ok) {
        throw new Error(content.errorLoading?.value || content.errorLoading);
      }

      const data = await response.json();
      setActivities(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : content.errorLoading?.value || content.errorLoading
      );
      console.error("Erreur:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, [locationId]);

  const handleEditClick = (activity: Activity) => {
    router.push(`/trips/${tripId}/${locationId}/${activity.id}/edit`);
  };

  const handleDeleteClick = (activity: Activity) => {
    setActivityToDelete(activity);
  };

  const handleConfirmDelete = async () => {
    if (!activityToDelete) return;

    try {
      setDeletingId(activityToDelete.id);
      await deleteActivity(activityToDelete.id, tripId);
      await fetchActivities();
      setActivityToDelete(null);
    } catch (err) {
      console.error("Erreur lors de la suppression:", err);
      setError(
        err instanceof Error ? err.message : "Erreur lors de la suppression"
      );
    } finally {
      setDeletingId(null);
    }
  };

  const displayedActivities =
    maxVisible !== undefined ? activities.slice(0, maxVisible) : activities;

  if (isLoading) {
    return (
      <div className="bg-white rounded-sm p-4 space-y-4">
        {Array.from({ length: maxVisible ?? 3 }).map((_, index) => (
          <ActivityItemSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 rounded-sm p-6 border border-red-300">
        <p className="text-red-800 text-center mb-4 font-light">{error}</p>
        <button
          onClick={() => fetchActivities()}
          className="mx-auto block px-4 py-2 bg-white hover:bg-gray-50 rounded-sm text-red-800 border border-red-300 text-sm font-medium transition-colors"
        >
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        {displayedActivities.length > 0 && (
          <div>
            {displayedActivities.map((activity) => (
              <ActivityItem
                key={activity.id}
                tripId={tripId}
                locationId={locationId}
                activity={activity}
                onDeleteClick={handleDeleteClick}
                onEditClick={handleEditClick}
                deletingId={deletingId}
                isEditing={false}
              />
            ))}
          </div>
        )}

        {activities.length === 0 && (
          <div className="text-center py-8 text-gray-600 bg-gray-50 rounded-sm border border-dashed border-gray-300 font-light">
            {content.noActivities?.value || content.noActivities}
          </div>
        )}

        <div className="mt-4">
          <Link
            href={`/trips/${tripId}/${locationId}/add`}
            className="block w-full"
          >
            <div className="bg-white hover:bg-gray-50 border-2 border-dashed border-gray-300 hover:border-neutral-900 rounded-sm p-4 transition-all group">
              <div className="flex items-center justify-center gap-2 text-gray-600 group-hover:text-gray-900">
                <Plus className="h-5 w-5" />
                <span className="font-medium">
                  {content.addActivity?.value || content.addActivity}
                </span>
              </div>
            </div>
          </Link>

        </div>
      </div>

      <AlertDialog
        open={!!activityToDelete}
        onOpenChange={(open) => !open && setActivityToDelete(null)}
      >
        <AlertDialogContent className="bg-white border-gray-300 rounded-sm">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-gray-900 font-light">
              {content.confirmDeleteTitle?.value ||
                content.confirmDeleteTitle ||
                "Supprimer l'activité"}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600 font-light">
              {content.confirmDeleteDescription?.value ||
                content.confirmDeleteDescription ||
                `Êtes-vous sûr de vouloir supprimer "${activityToDelete?.name}" ? Cette action est irréversible.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-white border-gray-300 text-gray-600 hover:bg-gray-50 font-light rounded-sm">
              {content.cancel?.value || content.cancel || "Annuler"}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-red-600 hover:bg-red-700 text-white font-medium rounded-sm"
            >
              {content.confirmDelete?.value ||
                content.confirmDelete ||
                "Supprimer"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default SortableActivities;