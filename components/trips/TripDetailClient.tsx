"use client";

import { TripWithLocation } from "@/lib/utils/types/types";
import { useTripActions } from "@/hooks/useTripActions";
import { TripHeader } from "@/components/share/TripHeader";
import { TripMeta } from "@/components/share/TripMeta";
import { TripItinerarySection } from "./TripItinerarySection";
import { TripMapSection } from "./TripMapSection";
import { TripDeleteDialog } from "./TripDeleteDialog";
import { updateTripDescription } from "@/lib/actions/trip-updates";
import { toast } from "sonner";
import { TripItineraryCommunity } from "../explore/TripItineraryCommunity";
import TripMetaInfo from "../explore/TripMetaInfo";
import { TripMapCommunity } from "../explore/TripMapCommunity";


interface Props {
  trip: TripWithLocation;
}
export default function TripDetailClient({ trip }: Props) {
  const { isDeleting, showDeleteDialog, openDeleteDialog, closeDeleteDialog, confirmDelete, handleVisibilityChange,
  } = useTripActions(trip.id);

  const allActivities = trip.locations.flatMap(
    (location) => location.activities,
  );

  const handleDescriptionUpdate = async (newDescription: string) => {
    try {
      await updateTripDescription(trip.id, newDescription);
      toast?.success?.('Description mise à jour');
    } catch (error) {
      console.error('Erreur:', error);
      toast?.error?.('Erreur lors de la mise à jour');
      throw error;
    }
  };
  return (
    <div className="min-h-screen bg-[#FDFDFD]">
      <div className="">
        <TripHeader
          trip={{
            ...trip,
            description: trip.description ?? "",
          }}
          editable={true}
        />

        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          <TripMeta
            description={trip.description}
            startDate={trip.startDate}
            endDate={trip.endDate}
            editable={true}
          />

          <div className="grid grid-cols-1 md:grid-cols-[1fr_350px] gap-10 md:gap-20 pb-20">
            <TripItineraryCommunity
              locations={trip.locations}
              tripId={trip.id}

            />
            <div className="flex flex-col">
              <TripMetaInfo
                tripId={trip.id}
                author={{
                  name: trip.user.name || "Unknown",
                  image: trip.user.image || null
                }}
              />
            </div>
          </div>

          <TripMapCommunity
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
