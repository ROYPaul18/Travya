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
const daysBetween = (d1: Date, d2: Date) => 
  Math.ceil((d1.getTime() - d2.getTime()) / DAYS);

export function TripCardItem({ trip, locale, today, content }: TripCardItemProps) {
  const start = new Date(trip.startDate);
  const end = new Date(trip.endDate);
  const upcoming = start >= today;

  return (
    <Link href={`/trips/${trip.id}`} className="group block">
      <article className="bg-white rounded-sm overflow-hidden border border-gray-100 hover:border-gray-300 transition-all duration-300 shadow-xs hover:shadow-md h-full flex flex-col">
        {/* Image avec Overlay Statut */}
        <div className="relative h-44 w-full overflow-hidden">
          {trip.wallpaper ? (
            <Image
              src={trip.wallpaper}
              alt={trip.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
               <MapPin className="w-8 h-8" />
            </div>
          )}
          
          {/* Badge discret sur l'image */}
          <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
            upcoming ? "bg-green-950 text-white" : "bg-white/90 text-gray-900 backdrop-blur-md"
          }`}>
            {upcoming ? "À venir" : "Terminé"}
          </div>
        </div>

        {/* Détails */}
        <div className="p-5 flex flex-col flex-1">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 line-clamp-1 group-hover:text-green-950 transition-colors">
              {trip.title}
            </h3>
            <p className="text-sm text-gray-500 mt-1 font-medium">
              {start.toLocaleDateString(locale, { day: "numeric", month: "long" })} — {end.toLocaleDateString(locale, { day: "numeric", month: "long", year: "numeric" })}
            </p>
            {trip.description && (
              <p className="text-sm text-gray-400 line-clamp-2 mt-3 leading-relaxed italic">
                "{trip.description}"
              </p>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-gray-50 flex items-center justify-between text-sm">
             <span className="text-green-950 font-semibold group-hover:underline">
               Voir les détails
             </span>
             <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-green-950 transition-colors" />
          </div>
        </div>
      </article>
    </Link>
  );
}