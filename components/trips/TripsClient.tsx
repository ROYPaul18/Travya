"use client";

import { useState, useMemo } from "react";
import { useIntlayer } from "next-intlayer";
import { Link } from "@/components/Link";
import {
  ArrowRight,
  Search,
  MapPin,
} from "lucide-react";
import Image from "next/image";

export interface Trip {
  id: string;
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  destination?: string;
  imageUrl: string;
}

export interface TripsClientProps {
  trips: Trip[];
  locale: string;
}

const DAYS = 1000 * 60 * 60 * 24;
const daysBetween = (d1: Date, d2: Date) => Math.ceil((d1.getTime() - d2.getTime()) / DAYS);

const TripCardItem = ({ trip, locale, today, content }: { trip: Trip; locale: string; today: Date; content: any }) => {
  const start = new Date(trip.startDate);
  const end = new Date(trip.endDate);
  const upcoming = start >= today;
  const daysUntil = daysBetween(start, today);

  return (
    <Link href={`/trips/${trip.id}`} className="block h-full">
      <article 
      className="group relative rounded-lg overflow-hidden border border-[#E3E3E3] bg-white transition-all duration-500 h-full flex flex-col p-2 hover:shadow-sm">

        {upcoming && (
          <div className="absolute top-4 left-4 z-10 bg-gray-900 text-white text-xs font-semibold px-3 py-1.5 rounded-sm">
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

        
        <div className="px-3 sm:px-4 py-3 sm:py-2 flex flex-col flex-1">
          <div>
            <h3 className="font-bold text-base sm:text-lg text-gray-900 group-hover:text-gray-700 transition-colors duration-300 line-clamp-2 mb-1">
              {trip.title}
            </h3>
            {trip.destination && (
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <MapPin className="h-4 w-4 text-gray-500 flex-shrink-0 mr-1" />
                <span className="font-medium">{trip.destination}</span>
              </div>
            )}
          </div>

          {trip.description && (
            <p className="text-xs text-gray-600 line-clamp-2 mb-3 leading-relaxed">
              {trip.description}
            </p>
          )}

          <div className="mt-auto space-y-3">
            <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-gray-600">
                <span className="font-medium">
                  {start.toLocaleDateString(locale, { day: "numeric", month: "short", year: "numeric" })} - {end.toLocaleDateString(locale, { day: "numeric", month: "short", year: "numeric" })}
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
                <span className="text-xs font-semibold hidden sm:inline">{content.viewMore.value}</span>
                <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default function TripsClient({ trips, locale }: TripsClientProps) {
  const content = useIntlayer('trips-client');
  
  const [tab, setTab] = useState<"all" | "upcoming" | "past">("all");
  const [query, setQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcoming = useMemo(
    () => trips.filter((t) => new Date(t.startDate) >= today),
    [trips, today]
  );

  const past = useMemo(
    () => trips.filter((t) => new Date(t.startDate) < today),
    [trips, today]
  );

  const filtered = useMemo(() => {
    let list = tab === "upcoming" ? upcoming : tab === "past" ? past : trips;

    if (query.trim().length > 0) {
      const q = query.toLowerCase();
      list = list.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.description?.toLowerCase().includes(q) ||
          (t.destination && t.destination.toLowerCase().includes(q))
      );
    }
    return list;
  }, [tab, query, trips, upcoming, past]);

  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:gap-0">
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 font-medium"
        >
          <span>Filtres</span>
          <svg
            className={`w-5 h-5 transition-transform ${sidebarOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Sidebar Filters */}
      <aside className={`
        w-full lg:w-60 lg:border-r lg:border-gray-100 lg:pr-6
        ${sidebarOpen ? 'block' : 'hidden lg:block'}
      `}>
        {/* Trip Status Filter */}
        <div className="bg-white lg:bg-transparent p-4 lg:p-0 rounded-lg lg:rounded-none border lg:border-0 border-gray-200">
          <h3 className="text-base lg:text-lg font-medium text-gray-900 mb-4">Statut du voyage</h3>
          <div className="space-y-3">
            {[
              { id: "all", label: content.allTrips.value },
              { id: "upcoming", label: content.upcoming.value },
              { id: "past", label: content.previous.value },
            ].map((t) => (
              <label key={t.id} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={tab === t.id}
                  onChange={() => setTab(t.id as "all" | "upcoming" | "past")}
                  className="w-4 h-4 lg:w-4.5 lg:h-4.5 rounded accent-gray-900 border-gray-300 text-gray-900 focus:ring-gray-900 cursor-pointer peer-checked/draft:block"
                />
                
                <span className="text-gray-700 font-extralight text-sm group-hover:text-gray-900 transition-colors">
                  {t.label}
                </span>
              </label>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 lg:pl-6">
        {/* Search Bar */}
        <div className="mb-6 lg:mb-8">
          <div className="relative max-w-full lg:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={content.searchPlaceholder.value}
              aria-label={content.searchLabel.value}
              className="w-full pl-10 pr-4 py-3 text-sm rounded-sm bg-white border border-gray-300 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-200 transition-all"
            />
          </div>
        </div>

        {/* Trips Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 lg:py-32">
            <div className="p-6 bg-gray-100 rounded-full inline-flex mb-6 border border-gray-200">
              <Search className="h-12 w-12 text-gray-300" />
            </div>
            <p className="text-gray-600 text-lg lg:text-xl font-medium">
              {content.noResults.value}
            </p>
            <p className="text-gray-500 text-sm mt-2">
              {content.noResultsHint.value}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {filtered.map((trip) => (
              <TripCardItem key={trip.id} trip={trip} locale={locale} today={today} content={content} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}