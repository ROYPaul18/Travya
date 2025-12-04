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
  const daysUntil = daysBetween(start, today);

  return (
    <Link href={`/trips/${trip.id}`} className="block h-full">
      <article className="group relative rounded-lg overflow-hidden border border-gray-200/50 bg-white transition-all duration-500 h-full flex flex-col p-2 hover:shadow-sm">
        {upcoming && (
          <div className="absolute top-4 left-4 z-10 bg-green-950 text-white text-xs font-semibold px-3 py-1.5 rounded-sm">
            {content.daysUntil.value.replace('{days}', daysUntil.toString())}
          </div>
        )}

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

        <div className="py-3 sm:py-2 flex flex-col flex-1">
          <h3 className="font-medium text-base sm:text-lg text-gray-900 group-hover:text-gray-700 transition-colors duration-300 line-clamp-2">
            {trip.title}
          </h3>

          {trip.description && (
            <p className="text-sm text-gray-400 line-clamp-2 mb-3 leading-relaxed">
              {trip.description}
            </p>
          )}

          <div className="mt-auto space-y-3">
            <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-gray-600">
                <span className="font-medium">
                  {start.toLocaleDateString(locale, { 
                    day: "numeric", 
                    month: "short", 
                    year: "numeric" 
                  })} - {end.toLocaleDateString(locale, { 
                    day: "numeric", 
                    month: "short", 
                    year: "numeric" 
                  })}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              {upcoming ? (
                <span className="text-xs font-medium text-gray-900 bg-gray-100 px-3 py-1.5 rounded-full border border-gray-200">
                  {content.upcomingStatus.value}
                </span>
              ) : (
                <span className="text-xs font-medium text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-200">
                  {content.completedStatus.value}
                </span>
              )}

              <div className="flex items-center gap-2 text-gray-900 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                <span className="text-xs font-semibold hidden sm:inline">
                  {content.viewMore.value}
                </span>
                <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}