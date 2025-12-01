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
import { deleteTrip } from "@/lib/actions/Trip";
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

  const getLocationsText = (count: number) => {
    return count <= 1 ? content.location : content.locations;
  };

  const handleDeleteClick = () => {
    setShowDeleteDialog(true);
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

      {/* Top Navigation Bar */}
      <div className="bg-white ">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <Link href={`/trips`}>
              <Button variant="ghost" className="text-gray-700 hover:bg-gray-100 gap-2 pl-0">
                <ArrowLeft className="h-4 w-4" />
                {content.backToTrips}
              </Button>
            </Link>

            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-gray-700 hover:bg-gray-100">
                    <MoreHorizontal className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => setShowEditDialog(true)}>
                    <Pencil className="h-4 w-4 mr-2" />
                    Modifier
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={handleDeleteClick}
                    className="text-red-600 focus:text-red-600"
                    disabled={isDeleting}
                  >
                    {isDeleting ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Suppression...
                      </>
                    ) : (
                      <>
                        <Trash2 className="h-4 w-4 mr-2 text-red-600" />
                        Supprimer
                      </>
                    )}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12">

        {/* Hero Images Grid */}
        <div className="relative w-full -mx-4 sm:mx-0 mt-6">
          <div className="grid grid-cols-4 gap-2 h-[300px] sm:h-[400px] md:h-[500px]">
            {/* Main large image - left side */}
            <div className="col-span-4 sm:col-span-2 relative sm:rounded-l-2xl overflow-hidden">
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

            {/* Right grid - 4 smaller images */}
            <div className="hidden sm:grid sm:col-span-2 grid-cols-2 gap-2">
              {/* Top right image */}
              <div className="relative overflow-hidden">
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <ImageIcon className="h-20 w-20 text-gray-300" />
                </div>
              </div>

              {/* Top far right image */}
              <div className="relative rounded-tr-2xl overflow-hidden ">
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <ImageIcon className="h-20 w-20 text-gray-300" />
                </div>
              </div>

              {/* Bottom right image */}
              <div className="relative overflow-hidden">
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <ImageIcon className="h-20 w-20 text-gray-300" />
                </div>
              </div>

              {/* Bottom far right image with button */}
              <div className="relative rounded-br-2xl overflow-hidden">
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <ImageIcon className="h-20 w-20 text-gray-300" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="mt-8 mx-auto">

          {/* Title & Meta */}
          <div className="space-y-4 pb-6 border-b border-gray-200">
            <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900">
              {trip.title}
            </h1>

            {trip.description && (
              <p className="text-gray-700 text-base leading-relaxed">
                {trip.description}
              </p>
            )}

            <div className="flex flex-wrap gap-3 items-center text-sm text-gray-700">
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                <span>{formattedStartDate} - {formattedEndDate}</span>
              </div>
              <span className="text-gray-300">·</span>
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                <span>{tripDays} {getDaysText(tripDays)}</span>
              </div>
              <span className="text-gray-300">·</span>
            </div>
          </div>
          {/* Content Sections */}
          <div className="mt-8 space-y-12">
            {/* Itinerary Section */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">{content.itinerary}</h2>
              {trip.locations.length === 0 ? (
                <div className="border border-dashed border-gray-300 rounded-2xl p-12 text-center bg-gray-50">
                  <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucune étape</h3>
                  <p className="text-gray-600 mb-6">
                    Commencez à planifier votre voyage en ajoutant votre première étape.
                  </p>
                  <Link href={`/trips/${trip.id}/itinerary/new`}>
                    <Button className="bg-gray-900 hover:bg-gray-800 text-white">
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
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">{content.map}</h2>
              <div className="h-[400px] md:h-[600px] rounded-2xl overflow-hidden border border-gray-200">
                {allActivities.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6 bg-gray-50">
                    <p className="text-gray-600 mb-4">{content.addLocationsMap}</p>
                    <Link href={`/trips/${trip.id}/itinerary/new`}>
                      <Button className="bg-gray-900 hover:bg-gray-800 text-white">
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
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer le voyage</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer <span className="font-medium text-gray-900">"{trip.title}"</span> ?
              <br />Cette action est irréversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-red-600 hover:bg-red-700"
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