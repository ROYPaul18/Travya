"use client";

import React, { useState, useEffect } from "react";
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  GripVertical,
  Clock,
  MapPin,
  Utensils,
  Building,
  Camera,
  TreePine,
  Euro,
  Plus,
  Loader2,
  Trash2,
  Pencil,
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
import ActivityForm from "./ActivityForm";
import ActivityEditForm from './ActivityEditForm';
import { addActivity, deleteActivity, updateActivity } from "@/lib/actions/Activity";
import { useIntlayer } from "next-intlayer";
import { getCategoryColor } from "@/lib/utils/style"
import { Activity } from "@/lib/utils/types/types";

const getCategoryIcon = (category: string) => {
  const icons: Record<string, React.ElementType> = {
    RESTAURANT: Utensils,
    CAFE: Utensils,
    VISITE: Building,
    HOTEL: Building,
    TRANSPORT: MapPin,
    SHOPPING: Building,
    NATURE: TreePine,
    SPORT: Camera,
    AUTRE: MapPin,
  };

  const Icon = icons[category] || MapPin;
  return <Icon className="h-4 w-4" />;
};


// Helper function to format time
const formatTime = (date: Date | null): string => {
  if (!date) return "";
  return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
};

function SortableActivityItem({
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
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: activity.id,
  });

  const content = useIntlayer("activities");

  const getTranslatedCategory = (category: string) => {
    return content.categories[category as keyof typeof content.categories] || category;
  };

  const isDeleting = deletingId === activity.id;

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={`bg-white/5 rounded-xl border border-white/10 transition-all ${isDragging ? "shadow-2xl scale-105 opacity-50" : "hover:bg-white/10"
        } ${isDeleting || isEditing ? "opacity-50 pointer-events-none" : ""}`}
    >
      <div className="flex items-center gap-3 p-4">
        {/* Drag Handle */}
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing text-blue-300/50 hover:text-blue-300 transition-colors"
        >
          <GripVertical className="h-5 w-5" />
        </div>

        {/* Emoji/Image */}
        {activity.images.length > 0 && (
          <div className="text-3xl flex-shrink-0">{activity.images[0]}</div>
        )}

        {/* Contenu principal */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 mb-1">
            <h4 className="text-white font-semibold truncate">
              {activity.name} - {activity.address}
            </h4>
            <div className="flex items-center gap-2 flex-shrink-0">
              <div
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${getCategoryColor(
                  activity.category
                )}`}
              >
                {getCategoryIcon(activity.category)}
                <span className="capitalize">
                  {getTranslatedCategory(activity.category)}
                </span>
              </div>
              <button
                onClick={() => onEditClick(activity)}
                disabled={isDeleting || isEditing}
                className="group-hover:opacity-100 transition-opacity bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-300 p-2 rounded-lg border border-yellow-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                title={content.editActivity?.value || content.editActivity}
              >
                <Pencil className="h-4 w-4" />
              </button>
              <button
                onClick={() => onDeleteClick(activity)}
                disabled={isDeleting || isEditing}
                className="group-hover:opacity-100 transition-opacity bg-red-500/20 hover:bg-red-500/30 text-red-300 p-2 rounded-lg border border-red-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                title={content.deleteActivity?.value || content.deleteActivity}
              >
                {isDeleting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Trash2 className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm text-blue-200/70">
            {activity.startTime && activity.endTime && (
              <div className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                <span>
                  {formatTime(activity.startTime)} - {formatTime(activity.endTime)}
                </span>
              </div>
            )}
            {typeof activity.budget === 'number' && activity.budget > 0 && (
              <div className="flex items-center gap-1 text-green-300">
                <span>{activity.budget}</span>
                <Euro className="h-3.5 w-3.5" />
              </div>
            )}
          </div>
          {activity.description && (
            <p className="text-sm text-blue-200/60 mt-2">
              {activity.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

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

      // Convert string dates to Date objects
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

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = activities.findIndex((item) => item.id === active.id);
      const newIndex = activities.findIndex((item) => item.id === over!.id);
      setActivities((prev) => arrayMove(prev, oldIndex, newIndex));
    }
  };

  const handleActivityAdded = () => {
    setShowForm(false);
    fetchActivities();
  };

  const handleEditClick = (activity: Activity) => {
    setActivityToEdit(activity);
    setShowForm(false); // Fermer le formulaire d'ajout si ouvert
  };

  const handleEditSuccess = () => {
    setActivityToEdit(null);
    fetchActivities();
  };

  const handleEditCancel = () => {
    setActivityToEdit(null);
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
      <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 text-blue-300 animate-spin" />
          <span className="ml-2 text-blue-200">{content.loadingActivities?.value || content.loadingActivities}</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/10 rounded-2xl p-6 border border-red-500/30">
        <p className="text-red-300 text-center">{error}</p>
        <button
          onClick={() => fetchActivities()}
          className="mt-4 mx-auto block px-4 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg text-red-200"
        >
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
        {activities.length > 0 && !activityToEdit && (
          <div className="bg-blue-500/10 backdrop-blur-sm rounded-lg p-3 mb-4 border border-blue-400/20">
            <p className="text-sm text-blue-200/80 flex items-center gap-2">
              <GripVertical className="h-4 w-4" />
              {content.dragHint?.value || content.dragHint}
            </p>
          </div>
        )}

        {/* Formulaire d'édition */}
        {activityToEdit && (
          <div className="mb-4">
            <ActivityEditForm
              activity={activityToEdit}
              locationId={locationId}
              tripId={tripId}
              onCancel={handleEditCancel}
              onSuccess={handleEditSuccess}
              updateActivity={updateActivity}
            />
          </div>
        )}

        {/* Liste des activités */}
        {!activityToEdit && activities.length > 0 && (
          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={activities.map((a) => a.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-3">
                {activities.map((activity) => (
                  <SortableActivityItem
                    key={activity.id}
                    activity={activity}
                    onDeleteClick={handleDeleteClick}
                    onEditClick={handleEditClick}
                    deletingId={deletingId}
                    isEditing={!!activityToEdit}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}

        {!activityToEdit && activities.length === 0 && (
          <div className="text-center py-8 text-blue-200/60">
            {content.noActivities?.value || content.noActivities}
          </div>
        )}

        {/* Formulaire d'ajout */}
        {!activityToEdit && (
          <div className="mt-4">
            {showForm ? (
              <ActivityForm
                locationId={locationId}
                tripId={tripId}
                onCancel={() => setShowForm(false)}
                addActivity={addActivity}
                onSuccess={handleActivityAdded}
              />
            ) : (
              <button
                onClick={() => setShowForm(true)}
                className="w-full bg-white/5 hover:bg-white/10 border-2 border-dashed border-white/20 hover:border-blue-400/50 rounded-xl p-4 transition-all group"
              >
                <div className="flex items-center justify-center gap-2 text-blue-200/70 group-hover:text-blue-200">
                  <Plus className="h-5 w-5" />
                  <span className="font-medium">{content.addActivity?.value || content.addActivity}</span>
                </div>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Dialog de confirmation de suppression */}
      <AlertDialog open={!!activityToDelete} onOpenChange={(open) => !open && setActivityToDelete(null)}>
        <AlertDialogContent className="bg-slate-900 border-slate-800">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">
              {content.confirmDeleteTitle?.value || content.confirmDeleteTitle || "Supprimer l'activité"}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-slate-400">
              {content.confirmDeleteDescription?.value || content.confirmDeleteDescription ||
                `Êtes-vous sûr de vouloir supprimer "${activityToDelete?.name}" ? Cette action est irréversible.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-slate-800 text-white hover:bg-slate-700 border-slate-700">
              {content.cancel?.value || content.cancel || "Annuler"}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-red-500 text-white hover:bg-red-600"
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