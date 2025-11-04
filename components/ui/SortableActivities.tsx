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
import ActivityForm from "./ActivityForm";
import { addActivity, deleteActivity } from "@/lib/actions/Activity";

interface Activity {
  id: string;
  name: string;
  address: string;
  category: string;
  description: string | null;
  startTime: string | null;
  endTime: string | null;
  budget: number;
  images: string[];
  order: number;
}

const getCategoryIcon = (category: string) => {
  const icons: Record<string, JSX.Element> = {
    RESTAURANT: <Utensils className="h-4 w-4" />,
    CAFE: <Utensils className="h-4 w-4" />,
    VISITE: <Building className="h-4 w-4" />,
    HOTEL: <Building className="h-4 w-4" />,
    TRANSPORT: <MapPin className="h-4 w-4" />,
    SHOPPING: <Building className="h-4 w-4" />,
    NATURE: <TreePine className="h-4 w-4" />,
    SPORT: <Camera className="h-4 w-4" />,
    AUTRE: <MapPin className="h-4 w-4" />,
  };
  return icons[category] || <MapPin className="h-4 w-4" />;
};

const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    RESTAURANT: "bg-orange-500/20 text-orange-300 border-orange-500/30",
    CAFE: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    VISITE: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    HOTEL: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
    TRANSPORT: "bg-gray-500/20 text-gray-300 border-gray-500/30",
    SHOPPING: "bg-pink-500/20 text-pink-300 border-pink-500/30",
    NATURE: "bg-green-500/20 text-green-300 border-green-500/30",
    SPORT: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
    AUTRE: "bg-slate-500/20 text-slate-300 border-slate-500/30",
  };
  return colors[category] || "bg-gray-500/20 text-gray-300 border-gray-500/30";
};

function SortableActivityItem({ activity }: { activity: Activity }) {
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

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={`bg-white/5 rounded-xl border border-white/10 transition-all ${
        isDragging ? "shadow-2xl scale-105 opacity-50" : "hover:bg-white/10"
      }`}
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
                <span className="capitalize">{activity.category}</span>
              </div>
              <button
                // onClick={() => editTrip(activity.id)}
                className="group-hover:opacity-100 transition-opacity bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-300 p-2 rounded-lg border border-yellow-500/30"
                title="Modifier l'activité"
              >
                <Pencil className="h-4 w-4" />
              </button>
              <button
                // onClick={() => deleteActivity(activity.id)}
                className="group-hover:opacity-100 transition-opacity bg-red-500/20 hover:bg-red-500/30 text-red-300 p-2 rounded-lg border border-red-500/30"
                title="Supprimer l'activité"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm text-blue-200/70">
            {activity.startTime && activity.endTime && (
              <div className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                <span>
                  {activity.startTime} - {activity.endTime}
                </span>
              </div>
            )}
            {activity.budget > 0 && (
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

  // ✅ Fonction réutilisable pour charger les activités
  const fetchActivities = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(`/api/locations/${locationId}/activities`);

      if (!response.ok) {
        throw new Error("Erreur lors du chargement des activités");
      }

      const data = await response.json();
      setActivities(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
      console.error("Erreur:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Charger les activités au montage du composant
  useEffect(() => {
    fetchActivities();
  }, [locationId]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = activities.findIndex((item) => item.id === active.id);
      const newIndex = activities.findIndex((item) => item.id === over!.id);
      setActivities((prev) => arrayMove(prev, oldIndex, newIndex));

      // TODO: Appeler une API pour sauvegarder le nouvel ordre
      // await updateActivitiesOrder(tripId, locationId, newOrder);
    }
  };

  // ✅ Callback appelé après ajout d'une activité
  const handleActivityAdded = () => {
    setShowForm(false);
    fetchActivities(); // Re-charge les activités
  };

  if (isLoading) {
    return (
      <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 text-blue-300 animate-spin" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/10 rounded-2xl p-6 border border-red-500/30">
        <p className="text-red-300 text-center">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
      {activities.length > 0 && (
        <div className="bg-blue-500/10 backdrop-blur-sm rounded-lg p-3 mb-4 border border-blue-400/20">
          <p className="text-sm text-blue-200/80 flex items-center gap-2">
            <GripVertical className="h-4 w-4" />
            💡 Drag and drop to reorganize your activities
          </p>
        </div>
      )}

      {activities.length > 0 ? (
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
                <SortableActivityItem key={activity.id} activity={activity} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      ) : (
        <div className="text-center py-8 text-blue-200/60">
          Aucune activité pour ce jour
        </div>
      )}

      <div className="mt-4">
        {showForm ? (
          <ActivityForm
            locationId={locationId}
            tripId={tripId}
            onCancel={() => setShowForm(false)}
            addActivity={addActivity}
            onSuccess={handleActivityAdded} // ✅ Passe le callback
          />
        ) : (
          <button
            onClick={() => setShowForm(true)}
            className="w-full bg-white/5 hover:bg-white/10 border-2 border-dashed border-white/20 hover:border-blue-400/50 rounded-xl p-4 transition-all group"
          >
            <div className="flex items-center justify-center gap-2 text-blue-200/70 group-hover:text-blue-200">
              <Plus className="h-5 w-5" />
              <span className="font-medium">Add an activity</span>
            </div>
          </button>
        )}
      </div>
    </div>
  );
};

export default SortableActivities;