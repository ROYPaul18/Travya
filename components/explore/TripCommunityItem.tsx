"use client";

import { Link } from "@/components/Link";
import { MapPin } from "lucide-react";
import Image from "next/image";
import { Trip } from "@/lib/utils/types/types";
import { useIntlayer } from "next-intlayer";

export const TripsCommunityItem = ({
  trip,
  isLoading = false,
}: {
  trip: Trip;
  locale: string;
  today?: Date;
  content?: any;
  isAlreadyLiked: boolean;
  isLoading?: boolean;
}) => {
  const itemContent = useIntlayer("trips-community-item");

  const fakeTitle = "Aventure inoubliable 🌍";
  const fakeBudget = 1299;
  const fakeCurrency = "€";
  const start = new Date(trip.startDate || new Date());
  const end = new Date(trip.endDate || new Date(start.getTime() + 3 * 86400000));
  const days = Math.ceil((end.getTime() - start.getTime()) / 86400000);
  
  if (isLoading) {
    return (
      <article className="flex flex-col h-full">
        <div className="relative w-full aspect-4/5 sm:aspect-3/4 bg-linear-to-br from-gray-200 via-gray-100 to-gray-200 overflow-hidden">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-linear-to-r from-transparent via-white/40 to-transparent" />
        </div>
        <div className="pt-4 sm:pt-6 space-y-2 sm:space-y-3">
          <div className="h-2.5 sm:h-3 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-3/4 animate-pulse" />
          <div className="h-5 sm:h-6 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-full animate-pulse" />
          <div className="h-3.5 sm:h-4 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-1/2 animate-pulse" />
        </div>
      </article>
    );
  }

  return (
    <article className="group flex flex-col">
      <Link 
        href={`/explore/${trip.id}`} 
        className="relative w-full aspect-4/5 sm:aspect-3/4 overflow-hidden bg-gray-100 mb-3 sm:mb-4"
      >
        {trip.wallpaper ? (
          <Image
            src={trip.wallpaper}
            alt={trip.title || fakeTitle}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            loading="eager"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <MapPin className="h-10 w-10 sm:h-12 sm:w-12 text-gray-400" />
          </div>
        )}
        
        {/* Badge communauté */}
        <div className="absolute top-2 left-2 sm:top-3 sm:left-3">
          <span className="bg-black text-white text-[7px] sm:text-[8px] font-medium tracking-[0.15em] px-1.5 py-0.5 sm:px-2 sm:py-1 uppercase">
            Communauté
          </span>
        </div>
        
        {/* Heart button */}
        {/* <div className="absolute top-2 right-2 sm:top-3 sm:right-3 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
          <HeartButton tripId={trip.id} initialFavorited={isAlreadyLiked} />
        </div> */}
      </Link>

      <Link href={`/explore/${trip.id}`} className="flex flex-col">
        {/* Metadata */}
        <p className="text-[9px] sm:text-[10px] tracking-[0.12em] sm:tracking-[0.15em] uppercase text-gray-400 font-medium mb-1 sm:mb-1.5">
          Indonésie · Par Nomade Luxe
        </p>
        
        {/* Title */}
        <h3 className="font-logo text-xl sm:text-2xl leading-tight text-gray-900 font-light group-hover:text-[#B59E80] transition-colors duration-300 mb-2 sm:mb-3">
          {trip.title || fakeTitle}
        </h3>

        {/* Footer info */}
        <div className="flex items-center justify-between border-t border-gray-100 pt-2">
          <span className="text-[11px] sm:text-xs font-medium text-gray-900">
            {days} Jours
          </span>
          <span className="text-[11px] sm:text-xs font-bold text-gray-900">
            {fakeBudget} {trip.currency || fakeCurrency}
          </span>
        </div>
      </Link>
    </article>
  );
};

export const TripsCommunityItemSkeleton = () => {
  return (
    <article className="flex flex-col">
      <div className="relative w-full aspect-4/5 sm:aspect-3/4 bg-linear-to-br from-gray-200 via-gray-100 to-gray-200 overflow-hidden mb-4 sm:mb-6">
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-linear-to-r from-transparent via-white/40 to-transparent" />
      </div>
      <div className="space-y-2 sm:space-y-3">
        <div className="h-2.5 sm:h-3 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-3/4 animate-pulse" />
        <div className="h-5 sm:h-6 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-full animate-pulse" />
        <div className="h-3.5 sm:h-4 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-1/2 animate-pulse" />
      </div>
    </article>
  );
};