"use client";

import { Link } from "@/components/Link";
import { MapPin, Star } from "lucide-react"; // Ajout de Star pour le look 4,94
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

  // Formattage des dates type "2–8 mars"
  const dateRange = `${start.getDate()}–${end.getDate()} ${start.toLocaleDateString(locale, { month: 'short' })}`;

  return (
    <article className="group flex flex-col h-full cursor-pointer">
      {/* Image Container - Très arrondi comme Airbnb */}
      <div className="relative w-full aspect-square mb-3 overflow-hidden rounded-sm">
        <Link href={`/explore/${trip.id}`} className="block h-full">
          {trip.wallpaper ? (
            <Image
              src={trip.wallpaper}
              alt={trip.title}
              fill
              className="object-cover transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <MapPin className="h-12 w-12 text-gray-300" />
            </div>
          )}
        </Link>

        {/* Heart Button - Positionné exactement comme sur l'image */}
        <div className="absolute top-1 right-1 z-10">
          <HeartButton tripId={trip.id} initialFavorited={isAlreadyLiked} />
        </div>
      </div>
      
      {/* Content Container */}
      <Link href={`/explore/${trip.id}`} className="flex flex-col flex-1">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-sm text-gray-900 line-clamp-1 flex-1">
            {trip.title || "Hébergement · Milton Keynes"}
          </h3>
          
          {/* Note style Airbnb */}
          <div className="flex items-center gap-1 ml-2">
            <Star className="h-3 w-3 fill-current text-gray-900" />
            <span className="text-xs text-gray-900">4,94</span>
          </div>
        </div>

        {/* Infos secondaires avec séparateurs dot */}
        <p className="text-xs text-gray-500 mt-0.5">
            {dateRange} · {itemContent.host || "Hôte particulier"}
        </p>

        <p className="text-xs text-gray-500">
            {days} {days === 1 ? itemContent.day : itemContent.days}
        </p>

        {/* Prix */}
        <div className="">
          <span className="font-semibold text-gray-900 text-xs" >
            1504 {trip.currency || "€"}
          </span>
          <span className="text-gray-900 text-xs"> pour {days} jours</span>
        </div>
      </Link>
    </article>
  );
};