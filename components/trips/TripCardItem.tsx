"use client";

import { Link } from "@/components/Link";
import { ArrowRight, MapPin } from "lucide-react";
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

export function TripCardItem({ trip, locale, today, content }: TripCardItemProps) {
  const start = new Date(trip.startDate);
  const end = new Date(trip.endDate);
  const upcoming = start >= today;

  return (
    <Link href={`/trips/${trip.id}`} className="group block">
      <article className="bg-white rounded-xl overflow-hidden flex flex-row items-center gap-4 transition-all duration-300 hover:bg-gray-50 active:scale-[0.98]">
        <div className="relative h-24 w-24 sm:h-32 sm:w-32 shrink-0 overflow-hidden rounded-xl shadow-sm">
          {trip.wallpaper ? (
            <Image
              src={trip.wallpaper}
              alt={trip.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
               <MapPin className="w-6 h-6" />
            </div>
          )}
        </div>
        <div className="flex flex-col flex-1 min-w-0 py-2 pr-2">
          <div className="flex flex-col">
             <span className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${
               upcoming ? "text-green-800" : "text-gray-500"
             }`}>
               {upcoming ? "À venir" : "Terminé"}
             </span>
            <h3 className="text-base font-semibold text-gray-900 truncate group-hover:text-green-950">
              {trip.title}
            </h3>
            <p className="text-sm text-gray-500 mt-0.5">
              {start.toLocaleDateString(locale, { day: "numeric", month: "short" })} — {end.toLocaleDateString(locale, { day: "numeric", month: "short", year: "numeric" })}
            </p>
          </div>
          {trip.description && (
            <p className="text-xs text-gray-400 line-clamp-1 mt-2 hidden sm:block italic">
              {trip.description}
            </p>
          )}
        </div>
        <div className="px-4 hidden sm:block">
            <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-gray-900 transition-colors" />
        </div>
      </article>
    </Link>
  );
}