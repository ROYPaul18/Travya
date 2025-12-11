"use client";

import { Location, Trip, Activity } from "@/app/generated/prisma";
import Image from "next/image";
import {
  MapPin,
  Plus,
  Loader2,
  ImageIcon,
} from "lucide-react";
import { Link } from "@/components/Link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Map from "@/components/ui/Map";
import SortableItinerary from "@/components/itineraty/SortableItinerary";
import { formatDate } from "@/lib/utils/formatDate";
import { useIntlayer } from "next-intlayer";
import { deleteTrip, updateTripVisibility } from "@/lib/actions/Trip";
import EditTripDialog from "@/components/trips/EditTripDialog";
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
import LikeButton from "../ui/LikeButton";

export type LocationWithActivities = Location & {
  activities: Activity[];
};

export type TripWithLocation = Trip & {
  locations: LocationWithActivities[];
};

interface TripDetailClientProps {
  trip: TripWithLocation;
  isAlreadyLiked: boolean;
}

export default function TripCommunityClient({ trip, isAlreadyLiked }: TripDetailClientProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const content = useIntlayer("trip-detail");

  const startDate = new Date(trip.startDate);
  const endDate = new Date(trip.endDate);

  const tripDays = Math.round(
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
  );

  const formattedStartDate = formatDate(startDate);
  const formattedEndDate = formatDate(endDate);

  const allActivities = trip.locations.flatMap(
    (location) => location.activities,
  );

  const getDaysText = (days: number) => {
    return days <= 1 ? content.day : content.days;
  };

  const handleDeleteClick = () => {
    setShowDeleteDialog(true);
  };

  const handleShare = async (
    visibility: "PRIVATE" | "COMMUNITY" | "FRIENDS",
  ) => {
    try {
      await updateTripVisibility(trip.id, visibility);
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la mise à jour de la visibilité");
    }
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteTrip(trip.id);
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
      alert("Erreur lors de la suppression du voyage");
      setIsDeleting(false);
      setShowDeleteDialog(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="px-4 sm:px-6 lg:px-12 xl:px-24 2xl:px-42 pb-8 sm:pb-12">
        <div className="relative w-full max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-4 sm:pt-6 gap-3 sm:gap-4">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-medium text-neutral-900">
              {trip.title}
            </h1>

            <div className="flex items-center gap-2">
              <LikeButton tripId={trip.id} initialFavorited={isAlreadyLiked} />
            </div>
          </div>

          {/* Images Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 h-[200px] sm:h-[300px] md:h-[350px] lg:h-[450px] pt-4 sm:pt-6">
            <div className="col-span-1 sm:col-span-2 relative rounded-lg sm:rounded-l-lg overflow-hidden">
              {trip.imageUrl ? (
                <Image
                  src={trip.imageUrl}
                  alt={trip.title}
                  className="object-cover"
                  fill
                  priority
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <ImageIcon className="h-12 w-12 sm:h-16 sm:w-16 lg:h-20 lg:w-20 text-gray-300" />
                </div>
              )}
            </div>
            <div className="hidden sm:grid sm:col-span-2 grid-cols-2 gap-2">
              <div className="relative overflow-hidden">
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <ImageIcon className="h-12 w-12 sm:h-16 sm:w-16 lg:h-20 lg:w-20 text-gray-300" />
                </div>
              </div>
              <div className="relative rounded-tr-lg overflow-hidden">
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <ImageIcon className="h-12 w-12 sm:h-16 sm:w-16 lg:h-20 lg:w-20 text-gray-300" />
                </div>
              </div>
              <div className="relative overflow-hidden">
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <ImageIcon className="h-12 w-12 sm:h-16 sm:w-16 lg:h-20 lg:w-20 text-gray-300" />
                </div>
              </div>
              <div className="relative rounded-br-lg overflow-hidden">
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <ImageIcon className="h-12 w-12 sm:h-16 sm:w-16 lg:h-20 lg:w-20 text-gray-300" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="pt-6 sm:pt-8 max-w-7xl mx-auto">
          {/* Description and Info */}
          <div className="space-y-2 pb-4 sm:pb-6 border-b border-gray-200/50">
            {trip.description && (
              <p className="text-neutral-800 text-lg sm:text-xl lg:text-2xl leading-relaxed font-medium">
                {trip.description}
              </p>
            )}
            <div className="flex flex-wrap gap-1 items-center text-sm sm:text-base text-[#222222] font-light">
              <div className="flex items-center gap-1.5">
                <span>
                  {formattedStartDate} - {formattedEndDate}
                </span>
              </div>
              <span className="text-neutral-300">·</span>
              <div className="flex items-center gap-1.5">
                <span>
                  {tripDays} {getDaysText(tripDays)}
                </span>
              </div>
              <span className="text-neutral-300">·</span>
            </div>
          </div>

          {/* Itinerary and Map Sections */}
          <div className="mt-6 sm:mt-8 space-y-8 sm:space-y-12">
            {/* Itinerary Section */}
            <div>
              <h2 className="text-xl sm:text-2xl font-medium text-gray-900 mb-4 sm:mb-6">
                {content.itinerary}
              </h2>
              {trip.locations.length === 0 ? (
                <div className="border border-dashed border-gray-200/50 rounded-lg p-8 sm:p-12 text-center bg-gray-50">
                  <MapPin className="h-10 w-10 sm:h-12 sm:w-12 text-gray-400 mx-auto mb-3 sm:mb-4" />
                  <h3 className="text-lg sm:text-xl font-light text-gray-900 mb-2">
                    Aucune étape
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 font-light">
                    Commencez à planifier votre voyage en ajoutant votre
                    première étape.
                  </p>
                  <Link href={`/trips/${trip.id}/itinerary/new`}>
                    <Button className="bg-neutral-900 hover:bg-neutral-800 text-white font-medium rounded-lg h-10 sm:h-11 text-sm sm:text-base">
                      <Plus className="mr-2 h-4 w-4" />
                      {content.addLocationButton}
                    </Button>
                  </Link>
                </div>
              ) : (
                <SortableItinerary
                  locations={trip.locations}
                  tripId={trip.id}
                />
              )}
            </div>

            {/* Map Section */}
            <div>
              <h2 className="text-xl sm:text-2xl font-medium text-gray-900 mb-4 sm:mb-6">
                {content.map}
              </h2>
              <div className="h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] rounded-lg overflow-hidden border border-gray-300">
                {allActivities.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-4 sm:p-6 bg-gray-50">
                    <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 font-light">
                      {content.addLocationsMap}
                    </p>
                    <Link href={`/trips/${trip.id}/itinerary/new`}>
                      <Button className="bg-neutral-900 hover:bg-neutral-800 text-white font-medium rounded-lg h-10 sm:h-11 text-sm sm:text-base">
                        {content.addLocationButton}
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <Map activities={allActivities} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <EditTripDialog
        trip={trip}
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
      />
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent className="border-gray-300 rounded-lg w-[90vw] max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-light text-lg sm:text-xl">
              Supprimer le voyage
            </AlertDialogTitle>
            <AlertDialogDescription className="font-light text-sm sm:text-base">
              Êtes-vous sûr de vouloir supprimer{" "}
              <span className="font-medium text-gray-900">"{trip.title}"</span>{" "}
              ?
              <br />
              Cette action est irréversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0">
            <AlertDialogCancel className="font-light rounded-lg w-full sm:w-auto">
              Annuler
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-red-600 hover:bg-red-700 font-medium rounded-lg w-full sm:w-auto"
              disabled={isDeleting}
            >
              {isDeleting ? (
                <span className="flex items-center gap-2 justify-center">
                  <Loader2 className="h-4 w-4 animate-spin" /> Suppression...
                </span>
              ) : (
                "Supprimer"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}