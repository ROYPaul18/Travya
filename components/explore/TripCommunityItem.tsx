"use client";

import { Link } from "@/components/Link";
import { ArrowRight, MapPin, Lock, Calendar, RefreshCw, User } from "lucide-react";
import Image from "next/image";

import HeartButton from "@/components/ui/HeartButton";

export interface Trip {
  id: string;
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  imageUrl: string;
  pricePerPerson?: number;
  currency?: string;
  isPrivate?: boolean;
  hasFreeReschedule?: boolean;
  hasTourGuide?: boolean;
}

export const TripsCommunityItem = ({
  trip,
  locale,
  today,
  content,
  isAlreadyLiked
}: {
  trip: Trip;
  locale: string;
  today: Date;
  content: any;
  isAlreadyLiked: boolean;
}) => {
  const start = new Date(trip.startDate);
  const end = new Date(trip.endDate);

  const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

  return (
    <article
      className="group relative rounded-lg overflow-hidden border border-gray-200/50 bg-white transition-all duration-500 h-full flex flex-col p-2 hover:shadow-sm">
      <Link href={`/explore/${trip.id}`} className="block">
        <div className="relative h-48 sm:h-56 bg-gray-100 rounded-sm overflow-hidden">
          {trip.imageUrl ? (
            <Image
              src={trip.imageUrl}
              alt={trip.title}
              width={600}
              height={400}
              className="rounded-sm object-cover w-full h-full"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <MapPin className="h-8 w-8 text-gray-400" />
            </div>
          )}
          <div className="absolute inset-0 bg-gray-300 opacity-10 group-hover:opacity-30 transition-opacity duration-500" />
        </div>
      </Link>

      <HeartButton tripId={trip.id} initialFavorited={isAlreadyLiked} />
      <Link href={`/explore/${trip.id}`} className="block flex-1">
        <div className="py-3 sm:py-2 flex flex-col h-full">
          <h3 className="font-medium text-base sm:text-lg text-gray-900 group-hover:text-gray-700 transition-colors duration-300 line-clamp-2">
            {trip.title}
          </h3>

          <p className="text-sm text-gray-400 line-clamp-2 mb-3 leading-relaxed">
            France
          </p>

          <div className="mt-auto space-y-3">
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-bold text-gray-900">
                {trip.currency || "$"} à venir...
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">

              <div className="flex items-center gap-1.5">
                <Lock className="h-3.5 w-3.5" />
                <span>à venir...</span>
              </div>


              <div className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                <span>{days} {days === 1 ? 'Day' : 'Days'}</span>
              </div>


              <div className="flex items-center gap-1.5">
                <RefreshCw className="h-3.5 w-3.5" />
                <span>à venir...</span>
              </div>

              <div className="flex items-center gap-1.5">
                <User className="h-3.5 w-3.5" />
                <span>à venir...</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
};