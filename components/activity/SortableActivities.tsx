"use client";

import React, { useState, useEffect } from "react";
import {
  Clock,
  MapPin,
  Euro,
  Plus,
  Loader2,
  Trash2,
  Pencil,
  MoreHorizontal,
} from "lucide-react";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ActivityForm from "@/components/activity/ActivityForm";
import ActivityEditForm from '@/components/activity/ActivityEditForm';
import { addActivity, deleteActivity, updateActivity } from "@/lib/actions/Activity";
import { useIntlayer } from "next-intlayer";
import { Activity } from "@/lib/utils/types/types";

// Fonction pour formater l'heure
const formatTime = (date: Date | null): string => {
  if (!date) return "";
  return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
};

// Composant d'activité individuelle
function ActivityItem({
  activity,
  onDeleteClick,
  onEditClick,
  deletingId,
  isEditing
}: {
  activity: Activity;
  onDeleteClick: (activity: Activity) => void;
  onEditClick: (activity: Activity) => void;
  deletingId: string | null;
  isEditing: boolean;
}) {
  const content = useIntlayer("activities");

  const getTranslatedCategory = (category: string) => {
    return content.categories[category as keyof typeof content.categories] || category;
  };

  const isDeleting = deletingId === activity.id;

  return (
    <div
      className={`bg-white border border-gray-300 rounded-sm p-5 transition-all hover:shadow-sm mb-4 ${
        isDeleting || isEditing ? "opacity-50 pointer-events-none" : ""
      }`}
    >
      {/* Images Gallery */}
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

      {/* Header */}
      <div className="flex justify-between items-start gap-4 mb-3">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <h3 className="font-light text-lg text-gray-900 truncate">
            {activity.name}
          </h3>
        </div>

        {/* Actions */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              disabled={isDeleting || isEditing}
              className="p-1.5 hover:bg-gray-100 rounded-sm transition-colors disabled:opacity-50 flex-shrink-0"
            >
              <MoreHorizontal className="h-5 w-5 text-gray-600" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="border-gray-300 rounded-sm">
            <DropdownMenuItem onClick={() => onEditClick(activity)} className="font-light">
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

      {/* Category Badge */}
      <div className="mb-3">
        <span className="inline-block text-xs px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 font-light">
          {getTranslatedCategory(activity.category)}
        </span>
      </div>

      {/* Description */}
      {activity.description && (
        <p className="text-sm text-gray-600 leading-relaxed mb-3 font-light">
          {activity.description}
        </p>
      )}

      {/* Address */}
      {activity.address && (
        <div className="flex items-start gap-2 text-sm text-gray-600 mb-3 font-light">
          <span>{activity.address}</span>
        </div>
      )}

      {/* Time & Budget */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 font-light">
        {activity.startTime && activity.endTime && (
          <div className="flex items-center gap-1.5">
            <span>
              {formatTime(activity.startTime)} - {formatTime(activity.endTime)}
            </span>
          </div>
        )}
        {typeof activity.budget === 'number' && activity.budget > 0 && (
          <div className="flex items-center gap-1 text-gray-900 font-medium">
            <Euro className="h-4 w-4" />
            <span>{activity.budget}€</span>
          </div>
        )}
      </div>
    </div>
  );
}

// Composant principal
const SortableActivities = ({
  tripId,
  locationId,
}: {
  tripId: string;
  locationId: string;
}) => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [activityToDelete, setActivityToDelete] = useState<Activity | null>(null);
  const [activityToEdit, setActivityToEdit] = useState<Activity | null>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const content = useIntlayer("activities");

  const fetchActivities = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(`/api/locations/${locationId}/activities`);

      if (!response.ok) {
        throw new Error(content.errorLoading?.value || content.errorLoading);
      }

      const data = await response.json();
      const activitiesWithDates = data.map((activity: any) => ({
        ...activity,
        startTime: activity.startTime ? new Date(activity.startTime) : null,
        endTime: activity.endTime ? new Date(activity.endTime) : null,
      }));

      setActivities(activitiesWithDates);
    } catch (err) {
      setError(err instanceof Error ? err.message : (content.errorLoading?.value || content.errorLoading));
      console.error("Erreur:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, [locationId]);

  const handleActivityAdded = () => {
    setShowForm(false);
    setShowAddDialog(false);
    fetchActivities();
  };

  const handleEditClick = (activity: Activity) => {
    setActivityToEdit(activity);
    setShowEditDialog(true);
    setShowForm(false);
  };

  const handleEditSuccess = () => {
    setActivityToEdit(null);
    setShowEditDialog(false);
    fetchActivities();
  };

  const handleEditCancel = () => {
    setActivityToEdit(null);
    setShowEditDialog(false);
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
      setError(err instanceof Error ? err.message : "Erreur lors de la suppression");
    } finally {
      setDeletingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-sm p-8 border border-gray-300">
        <div className="flex items-center justify-center gap-2">
          <Loader2 className="h-5 w-5 text-gray-600 animate-spin" />
          <span className="text-gray-600 font-light">{content.loadingActivities?.value || content.loadingActivities}</span>
        </div>
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
        {activities.length > 0 && (
          <div>
            {activities.map((activity) => (
              <ActivityItem
                key={activity.id}
                activity={activity}
                onDeleteClick={handleDeleteClick}
                onEditClick={handleEditClick}
                deletingId={deletingId}
                isEditing={showEditDialog}
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
          <button
            onClick={() => setShowAddDialog(true)}
            className="w-full bg-white hover:bg-gray-50 border-2 border-dashed border-gray-300 hover:border-neutral-900 rounded-sm p-4 transition-all group"
          >
            <div className="flex items-center justify-center gap-2 text-gray-600 group-hover:text-gray-900">
              <Plus className="h-5 w-5" />
              <span className="font-medium">{content.addActivity?.value || content.addActivity}</span>
            </div>
          </button>
        </div>
      </div>

      {/* Edit Activity Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="bg-white max-w-2xl max-h-[90vh] overflow-y-auto border-gray-300 rounded-sm">
          <DialogHeader>
            <DialogTitle>
            </DialogTitle>
          </DialogHeader>
          {activityToEdit && (
            <ActivityEditForm
              activity={activityToEdit}
              locationId={locationId}
              tripId={tripId}
              onCancel={handleEditCancel}
              onSuccess={handleEditSuccess}
              updateActivity={updateActivity}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Add Activity Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="max-h-[90vh] overflow-y-auto border-gray-300 rounded-sm">
          <DialogTitle></DialogTitle>
          <ActivityForm
            locationId={locationId}
            tripId={tripId}
            onCancel={() => setShowAddDialog(false)}
            addActivity={addActivity}
            onSuccess={handleActivityAdded}
          />
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!activityToDelete} onOpenChange={(open) => !open && setActivityToDelete(null)}>
        <AlertDialogContent className="bg-white border-gray-300 rounded-sm">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-gray-900 font-light">
              {content.confirmDeleteTitle?.value || content.confirmDeleteTitle || "Supprimer l'activité"}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600 font-light">
              {content.confirmDeleteDescription?.value || content.confirmDeleteDescription ||
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
              {content.confirmDelete?.value || content.confirmDelete || "Supprimer"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default SortableActivities;