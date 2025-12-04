"use client";

import { Location, Trip, Activity } from "@/app/generated/prisma";
import Image from "next/image";
import { Calendar, MapPin, Plus, ArrowLeft, Pencil, Trash2, Loader2, Clock, MoreHorizontal, Share2, ImageIcon } from "lucide-react";
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
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { VisibilitySelector } from "@/components/ui/VisibilitySelector";

export type LocationWithActivities = Location & {
  activities: Activity[];
};

export type TripWithLocation = Trip & {
  locations: LocationWithActivities[];
};

interface TripDetailClientProps {
  trip: TripWithLocation;
}

export default function TripDetailClient({ trip }: TripDetailClientProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const content = useIntlayer("trip-detail");

  const startDate = new Date(trip.startDate);
  const endDate = new Date(trip.endDate);

  const tripDays = Math.round(
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  const formattedStartDate = formatDate(startDate);
  const formattedEndDate = formatDate(endDate);

  const allActivities = trip.locations.flatMap(location => location.activities);

  const getDaysText = (days: number) => {
    return days <= 1 ? content.day : content.days;
  };

  const handleDeleteClick = () => {
    setShowDeleteDialog(true);
  };

  const handleShare = async (visibility: "PRIVATE" | "COMMUNITY" | "FRIENDS") => {
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
      <div className="px-4 sm:px-6 lg:px-42 pb-12">
        {/* Hero Images Grid */}
        <div className="relative w-full">
          <div className="flex items-center justify-between py-6">
            <h1 className="text-2xl font-medium text-neutral-900">
              {trip.title}
            </h1>

            <div className="flex items-center gap-2">

              <VisibilitySelector
                currentVisibility={trip.visibility}
                onVisibilityChange={handleShare}
                showLabel={true}
              />

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="rounded-sm">
                    <MoreHorizontal className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-40 rounded-sm">
                  <DropdownMenuItem onClick={() => setShowEditDialog(true)}>
                    <Pencil className="h-4 w-4 mr-2" /> Modifier
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    className="text-red-600"
                    onClick={() => setShowDeleteDialog(true)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" /> Supprimer
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2 h-[250px] sm:h-[350px] md:h-[450px]">
            <div className="col-span-4 sm:col-span-2 relative rounded-l-lg overflow-hidden">
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
                  <ImageIcon className="h-20 w-20 text-gray-300" />
                </div>
              )}
            </div>
            <div className="hidden sm:grid sm:col-span-2 grid-cols-2 gap-2">
              <div className="relative overflow-hidden">
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <ImageIcon className="h-20 w-20 text-gray-300" />
                </div>
              </div>
              <div className="relative rounded-tr-sm overflow-hidden">
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <ImageIcon className="h-20 w-20 text-gray-300" />
                </div>
              </div>
              <div className="relative overflow-hidden">
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <ImageIcon className="h-20 w-20 text-gray-300" />
                </div>
              </div>
              <div className="relative rounded-br-sm overflow-hidden">
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <ImageIcon className="h-20 w-20 text-gray-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 mx-auto">
          <div className="space-y-2 pb-6 border-b border-gray-200/50">
            {trip.description && (
              <p className="text-neutral-800 text-xl leading-relaxed font-medium">
                {trip.description}
              </p>
            )}
            <div className="flex flex-wrap gap-3 items-center text-sm text-neutral-600 font-light">
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                <span>{formattedStartDate} - {formattedEndDate}</span>
              </div>
              <span className="text-neutral-300">·</span>
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                <span>{tripDays} {getDaysText(tripDays)}</span>
              </div>
              <span className="text-neutral-300">·</span>
            </div>
          </div>
          <div className="mt-8 space-y-12">
            <div>
              <h2 className="text-2xl font-medium text-gray-900 mb-6">{content.itinerary}</h2>
              {trip.locations.length === 0 ? (
                <div className="border border-dashed border-gray-200/50 rounded-sm p-12 text-center bg-gray-50">
                  <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-light text-gray-900 mb-2">Aucune étape</h3>
                  <p className="text-gray-600 mb-6 font-light">
                    Commencez à planifier votre voyage en ajoutant votre première étape.
                  </p>
                  <Link href={`/trips/${trip.id}/itinerary/new`}>
                    <Button className="bg-neutral-900 hover:bg-neutral-800 text-white font-medium rounded-sm h-11">
                      <Plus className="mr-2 h-4 w-4" />
                      {content.addLocationButton}
                    </Button>
                  </Link>
                </div>
              ) : (
                <SortableItinerary locations={trip.locations} tripId={trip.id} />
              )}
            </div>

            <div>
              <h2 className="text-2xl font-medium text-gray-900 mb-6">{content.map}</h2>
              <div className="h-[400px] md:h-[600px] rounded-sm overflow-hidden border border-gray-300">
                {allActivities.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6 bg-gray-50">
                    <p className="text-gray-600 mb-4 font-light">{content.addLocationsMap}</p>
                    <Link href={`/trips/${trip.id}/itinerary/new`}>
                      <Button className="bg-neutral-900 hover:bg-neutral-800 text-white font-medium rounded-sm h-11">
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

      {/* Delete Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent className="border-gray-300 rounded-sm">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-light">Supprimer le voyage</AlertDialogTitle>
            <AlertDialogDescription className="font-light">
              Êtes-vous sûr de vouloir supprimer <span className="font-medium text-gray-900">"{trip.title}"</span> ?
              <br />Cette action est irréversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="font-light rounded-sm">Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-red-600 hover:bg-red-700 font-medium rounded-sm"
              disabled={isDeleting}
            >
              {isDeleting ? (
                <span className="flex items-center gap-2">
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