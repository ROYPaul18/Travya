"use client";

import { Link } from "@/components/Link";
import { ArrowRight, MapPin, Lock, Calendar, RefreshCw, User } from "lucide-react";
import Image from "next/image";
import { Trip } from "@/lib/utils/types/types"
import HeartButton from "@/components/ui/HeartButton";
import { useIntlayer } from "next-intlayer";

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
  const itemContent = useIntlayer("trips-community-item");
  
  const start = new Date(trip.startDate);
  const end = new Date(trip.endDate);
  const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

  return (
    <article
      className="group relative rounded-lg overflow-hidden border border-gray-200/50 bg-white transition-all duration-500 h-full flex flex-col  hover:shadow-sm">
      <Link href={`/explore/${trip.id}`} className="block">
        <div className="relative h-32 xs:h-48 sm:h-52 md:h-56 lg:h-48 xl:h-52 bg-gray-100 rounded-sm overflow-hidden">
          {trip.wallpaper ? (
            <Image
              src={trip.wallpaper}
              alt={trip.title}
              width={600}
              height={400}
              className="rounded-sm object-cover w-full h-full"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <MapPin className="h-6 w-6 sm:h-8 sm:w-8 text-gray-400" />
            </div>
          )}
          <div className="absolute inset-0 bg-gray-300 opacity-10 group-hover:opacity-30 transition-opacity duration-500" />
        </div>
      </Link>

      <HeartButton tripId={trip.id} initialFavorited={isAlreadyLiked} />
      
      <Link href={`/explore/${trip.id}`} className="block flex-1 px-2 py-1">
        <div className="py-2 sm:py-3 flex flex-col h-full">
          <h3 className="font-medium text-sm sm:text-base lg:text-lg text-gray-900 group-hover:text-gray-700 transition-colors duration-300 line-clamp-2 mb-1 flex items-baseline gap-2">
            {trip.title} <span className="text-xs text-gray-400">{itemContent.comingSoon}</span>
          </h3>

          <div className="mt-auto space-y-2 sm:space-y-3">
            <div className="flex items-baseline gap-1">
              <span className="text-sm sm:text-base font-light text-gray-900">
                {trip.currency || "$"} {itemContent.comingSoon}
              </span>
            </div>

            {/* Mobile */}
            <div className="flex items-center gap-1.5 text-xs text-gray-600 sm:hidden">
              <Calendar className="h-3 w-3 shrink-0" />
              <span>{days} {days === 1 ? itemContent.day : itemContent.days}</span>
            </div>

            {/* Desktop */}
            <div className="hidden sm:grid grid-cols-2 gap-2 text-xs text-gray-600">
              <div className="flex items-center gap-1.5">
                <Lock className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">{itemContent.comingSoon}</span>
              </div>

              <div className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">{days} {days === 1 ? itemContent.day : itemContent.days}</span>
              </div>

              <div className="flex items-center gap-1.5">
                <RefreshCw className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">{itemContent.comingSoon}</span>
              </div>

              <div className="flex items-center gap-1.5">
                <User className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">{itemContent.comingSoon}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
};