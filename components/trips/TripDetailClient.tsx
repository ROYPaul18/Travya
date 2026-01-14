"use client";

import TripImageGallery from "@/components/trips/TripImageGallery";
import { TripWithLocation } from "@/lib/utils/types/types";
import { useTripActions } from "@/hooks/useTripActions";
import { TripHeader } from "./TripHeader";
import { TripMeta } from "./TripMeta";
import { TripItinerarySection } from "./TripItinerarySection";
import { TripMapSection } from "./TripMapSection";
import { TripDeleteDialog } from "./TripDeleteDialog";

interface Props {
  trip: TripWithLocation;
}
export default function TripDetailClient({ trip }: Props) {
  const { isDeleting, showDeleteDialog, openDeleteDialog, closeDeleteDialog, confirmDelete, handleVisibilityChange,
  } = useTripActions(trip.id);

  const allActivities = trip.locations.flatMap(
    (location) => location.activities,
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="px-6 lg:px-42 2xl:px-60">
        <TripHeader
          trip={{
            ...trip,
            description: trip.description ?? "",
          }}
          onDelete={openDeleteDialog}
          onVisibilityChange={handleVisibilityChange}
        />

        <TripImageGallery trip={{
          id: trip.id,
          title: trip.title,
          description: trip.description ?? undefined,
          startDate: trip.startDate.toISOString(),
          endDate: trip.endDate.toISOString(),
          images: trip.images,
          wallpaper: trip.wallpaper ?? undefined,
        }} />

        <div className="pt-8 mx-auto">
          <TripMeta
            description={trip.description}
            startDate={new Date(trip.startDate)}
            endDate={new Date(trip.endDate)}
          />

          <div className="my-8 space-y-12">
            <TripItinerarySection
              locations={trip.locations}
              tripId={trip.id}
            />

            <TripMapSection
              activities={allActivities
                .filter((a) => a.address)
                .map((a) => ({
                  id: a.id,
                  name: a.name,
                  lat: a.lat,
                  lng: a.lng,
                  address: a.address as string,
                }))}
              tripId={trip.id}
            />
          </div>
        </div>

        <TripDeleteDialog
          open={showDeleteDialog}
          onOpenChange={(open) =>
            open ? openDeleteDialog() : closeDeleteDialog()
          }
          onConfirm={confirmDelete}
          isDeleting={isDeleting}
          title={trip.title}
        />
      </div>
    </div>
  );
}
