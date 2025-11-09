"use client";

import { Location, Trip } from "@/app/generated/prisma";
import Image from "next/image";
import { Calendar, MapPin, Plus, ArrowLeft, Pencil, Trash2, Loader2 } from "lucide-react";
import { Link } from "@/components/Link";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { useState } from "react";
import Map from "@/components/ui/Map";
import SortableItinerary from "@/components/ui/SortableItinerary";
import { formatDate } from "@/lib/utils/formatDate";
import { useIntlayer } from "next-intlayer";
import { deleteTrip } from "@/lib/actions/Trip";
import { useRouter } from "next/navigation";
import EditTripDialog from "@/components/EditTripDialog";
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

export type TripWithLocation = Trip & {
  locations: Location[];
};

interface TripDetailClientProps {
  trip: TripWithLocation;
}

export default function TripDetailClient({ trip }: TripDetailClientProps) {
  const [activeTab, setActiveTab] = useState("overview");
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

  const getDaysText = (days: number) => {
    return days === 1 ? content.day : content.days;
  };

  const getLocationsText = (count: number) => {
    return count === 1 ? content.location : content.locations;
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="container mx-auto px-4 py-8 space-y-8 relative z-10">
        {/* Hero Image */}
        {trip.imageUrl && (
          <div className="w-full h-72 md:h-96 overflow-hidden rounded-2xl shadow-2xl relative border border-white/20">
            <Image
              src={trip.imageUrl}
              alt={trip.title}
              className="object-cover"
              fill
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
          </div>
        )}
        {/* Header Section */}
        <div className="bg-white/10 backdrop-blur-md shadow-2xl rounded-2xl border border-white/20 overflow-hidden">
          {/* Hero Section with Title and Actions */}
          <div className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="space-y-3 flex-1">
              <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-200 via-cyan-200 to-blue-200 bg-clip-text text-transparent">
                {trip.title}
              </h1>
              <div className="flex items-center text-blue-200 gap-2 bg-blue-500/20 px-3 py-2 rounded-lg w-fit">
                <Calendar className="h-5 w-5" />
                <span className="text-lg">
                  {formattedStartDate} - {formattedEndDate}
                </span>
                <span className="text-cyan-300 font-semibold ml-2">
                  • {tripDays} {getDaysText(tripDays)}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 flex-shrink-0">
              <Button
                onClick={() => setShowEditDialog(true)}
                variant="outline"
                className="bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-300 p-2 rounded-lg border border-yellow-500/30 transition-all duration-300"
                disabled={isDeleting}
                title="Modifier le voyage"
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Link href={`/trips/${trip.id}/itinerary/new`}>
                <Button 
                  className="bg-gradient-to-r from-blue-500/80 to-cyan-500/80 hover:from-blue-500 hover:to-cyan-500 text-white font-medium px-4 py-2 rounded-lg shadow-lg hover:shadow-xl backdrop-blur-sm border border-white/20 transition-all duration-300 flex items-center gap-2"
                  disabled={isDeleting}
                >
                  <Plus className="h-5 w-5" />
                  <span className="hidden sm:inline">{content.add}</span>
                </Button>
              </Link>
              <Button
                onClick={handleDeleteClick}
                disabled={isDeleting}
                className="bg-red-500/20 hover:bg-red-500/30 text-red-300 p-2 rounded-lg border border-red-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                title="Supprimer le voyage"
              >
                {isDeleting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Trash2 className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Description Section - Below */}
          {trip.description && (
            <div className="px-6 pb-6">
              <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <h3 className="text-base font-semibold text-blue-200 mb-2 tracking-wide">
                  {content.description}
                </h3>
                <p className="text-blue-100/90 leading-relaxed text-lg">
                  {trip.description}
                </p>
              </div>
            </div>
          )}
        </div>
        {/* Tabs Section */}
        <div className="bg-white/10 backdrop-blur-md p-6 shadow-2xl rounded-2xl border border-white/20">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6 bg-white/5 border border-white/20 p-1">
              <TabsTrigger
                value="overview"
                className="text-lg data-[state=active]:bg-blue-500/30 data-[state=active]:text-white text-blue-200"
              >
                {content.overview}
              </TabsTrigger>
              <TabsTrigger
                value="itinerary"
                className="text-lg data-[state=active]:bg-blue-500/30 data-[state=active]:text-white text-blue-200"
              >
                {content.itinerary}
              </TabsTrigger>
              <TabsTrigger
                value="map"
                className="text-lg data-[state=active]:bg-blue-500/30 data-[state=active]:text-white text-blue-200"
              >
                {content.map}
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Trip Summary */}
                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                  <h2 className="text-2xl font-semibold mb-4 text-white flex items-center gap-2">
                    <Calendar className="h-6 w-6 text-blue-300" />
                    {content.tripSummary}
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 bg-blue-500/10 p-4 rounded-lg">
                      <Calendar className="h-6 w-6 text-blue-300 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-medium text-blue-100">{content.dates}</p>
                        <p className="text-sm text-blue-200/80">
                          {formattedStartDate} - {formattedEndDate}
                          <br />
                          <span className="text-cyan-300">
                            {tripDays} {getDaysText(tripDays)}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 bg-cyan-500/10 p-4 rounded-lg">
                      <MapPin className="h-6 w-6 text-cyan-300 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-medium text-blue-100">
                          {content.destinations}
                        </p>
                        <p className="text-sm text-blue-200/80">
                          <span className="text-cyan-300 font-semibold">
                            {trip.locations.length}
                          </span>{" "}
                          {getLocationsText(trip.locations.length)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Map */}
                <div className="h-72 rounded-xl overflow-hidden shadow-xl border border-white/20">
                  {trip.locations.length === 0 ? (
                    <div className="h-full bg-white/5 flex flex-col items-center justify-center text-center p-4">
                      <MapPin className="h-12 w-12 text-blue-300 mb-3" />
                      <p className="text-blue-200 mb-4">
                        {content.addLocationsMap}
                      </p>
                      <Link href={`/trips/${trip.id}/itinerary/new`}>
                        <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white">
                          <Plus className="mr-2 h-4 w-4" />
                          {content.addLocationButton}
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <Map itineraries={trip.locations} />
                  )}
                </div>
              </div>
            </TabsContent>

            {/* Itinerary Tab */}
            <TabsContent value="itinerary" className="space-y-6">
              {trip.locations.length === 0 ? (
                <div className="bg-white/5 p-12 rounded-xl border border-white/10 text-center">
                  <MapPin className="h-16 w-16 text-blue-300 mx-auto mb-4" />
                  <p className="text-blue-200 mb-6 text-lg">
                    {content.addLocationsItinerary}
                  </p>
                  <Link href={`/trips/${trip.id}/itinerary/new`}>
                    <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white">
                      <Plus className="mr-2 h-5 w-5" />
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
            </TabsContent>

            {/* Map Tab */}
            <TabsContent value="map" className="space-y-6">
              <div className="h-96 rounded-xl overflow-hidden shadow-xl border border-white/20">
                {trip.locations.length === 0 ? (
                  <div className="h-full bg-white/5 flex flex-col items-center justify-center text-center p-4">
                    <MapPin className="h-16 w-16 text-blue-300 mb-4" />
                    <p className="text-blue-200 mb-6 text-lg">
                      {content.addLocationsMap}
                    </p>
                    <Link href={`/trips/${trip.id}/itinerary/new`}>
                      <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white">
                        <Plus className="mr-2 h-5 w-5" />
                        {content.addLocationButton}
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <Map itineraries={trip.locations} />
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
        {/* Back Button */}
        <div className="text-center">
          <Link href={`/trips`}>
            <Button className="bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm px-6 py-3 rounded-lg transition-all duration-300 flex items-center gap-2 mx-auto">
              <ArrowLeft className="h-5 w-5" />
              {content.backToTrips}
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Edit Trip Dialog */}
      <EditTripDialog
        trip={trip}
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
      />
      
      {/* Alert Dialog pour confirmation de suppression */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent className="bg-slate-900 border-slate-800">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">
              Supprimer le voyage
            </AlertDialogTitle>
            <AlertDialogDescription className="text-slate-400">
              Êtes-vous sûr de vouloir supprimer "{trip.title}" ? Cette action supprimera également toutes les locations et activités associées. Cette action est irréversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-slate-800 text-white hover:bg-slate-700 border-slate-700">
              Annuler
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-red-500 text-white hover:bg-red-600"
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Suppression...
                </>
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