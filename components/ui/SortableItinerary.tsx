"use client";
import { Location } from "@/app/generated/prisma";
import { reorderItinerary } from "@/lib/actions/reorderItinerary";
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useId, useState } from "react";
import { Button } from "./button";
import {
  Calendar,
  ChevronDown,
  ChevronUp,
  GripVertical,
  Link,
  MapPin,
  Plus,
} from "lucide-react";
import SortableActivities from "./SortableActivities";

interface SortableItineraryProps {
  locations: Location[];
  tripId: string;
}

function SortableItem({ item, tripId }: { item: Location; tripId: string }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });

  const [open, setOpen] = useState(false);
  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className="rounded-lg transition-all border-b-2 border-white/5"
    >
      <div className="flex items-center justify-between py-4">
        
        <div className="flex items-center gap-4 flex-1 min-w-0">
        
          <div className="flex-shrink-0 bg-blue-500/10 p-3 rounded-full">
            <Calendar className="h-8 w-8 text-blue-300" />
          </div>

        
          <div className="flex-1 min-w-0">
            <h4 className="text-white font-semibold text-lg truncate">
              Day {item.order + 1} - {item.locationTitle}
            </h4>
            <p className="text-blue-100/80 text-sm">
              4 Nov 2025 · 1 activity
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 flex-shrink-0">
          <div
            {...attributes}
            {...listeners}
            className="cursor-grab active:cursor-grabbing p-2 hover:bg-white/10 rounded-lg transition-colors"
            onClick={(e) => e.preventDefault()}
          >
            <GripVertical className="h-5 w-5 text-white/60 group-hover:text-white transition-colors" />
          </div>
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            {open ? (
              <ChevronUp className="h-5 w-5 text-white/70" />
            ) : (
              <ChevronDown className="h-5 w-5 text-white/70" />
            )}
          </button>
        </div>
      </div>
      {open && <SortableActivities tripId={tripId} locationId={item.id} />}
    </div>
  );
}

export default function SortableItinerary({
  locations,
  tripId,
}: SortableItineraryProps) {
  const id = useId();
  const [localLocation, setLocalLocation] = useState(locations);

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = localLocation.findIndex((item) => item.id == active.id);
      const newIndex = localLocation.findIndex((item) => item.id == over!.id);

      const newLocationsOrder = arrayMove(
        localLocation,
        oldIndex,
        newIndex,
      ).map((item, index) => ({ ...item, order: index }));
      setLocalLocation(newLocationsOrder);

      await reorderItinerary(
        tripId,
        newLocationsOrder.map((item) => item.id),
      );
    }
  };

  return (
    <DndContext
      id={id}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={localLocation.map((loc) => loc.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-4">
          {localLocation.map((item, key) => (
            <SortableItem key={key} item={item} tripId={tripId} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
