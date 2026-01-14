"use client";

import { Link } from "@/components/Link";
import { ArrowRight, Clock, Heart, MapPin } from "lucide-react";
import Image from "next/image";

export interface Trip {
  id: string;
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  imageUrl: string;
  wallpaper:string;
}

interface TripCardItemProps {
  trip: Trip;
  locale: string;
  today: Date;
  content: any;
}

const DAYS = 1000 * 60 * 60 * 24;

export function TripCardItem({ trip, locale, today }: TripCardItemProps) {
  const start = new Date(trip.startDate);
  const diffDays = Math.floor((today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

  return (
    <Link href={`/trips/${trip.id}`} className="group block mb-8 rounded-xs">
      <article className="bg-white overflow-hidden flex flex-col gap-6 transition-all duration-300">
        <div className="relative aspect-4/3 w-full overflow-hidden">
          {trip.wallpaper ? (
            <Image
              src={trip.wallpaper}
              alt={trip.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-50" />
          )}
          <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm px-4 py-1.5 text-[10px] font-bold tracking-[0.2em] uppercase">
            Détails
          </div>
        </div>
        <div className="flex flex-col">
          <h3 className="text-[28px] font-logo italic text-gray-800 tracking-tight leading-tight mb-2">
            {trip.title}
          </h3>

          <div className="flex items-center gap-5 text-[10px] font-bold uppercase tracking-widest text-gray-400">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {Math.abs(diffDays)} Jours
            </span>
            <span className="flex items-center gap-1">
              <Heart className="w-3 h-3" />
              Favoris
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}