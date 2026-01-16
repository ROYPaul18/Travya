"use client";

import { useState, useMemo } from "react";
import { useIntlayer } from "next-intlayer";
import { Search } from "lucide-react";
import { TripsCommunityItem } from "@/components/explore/TripCommunityItem";
import { TripsFilters } from "@/components/explore/TripCommunityFilters";
import { Trip } from "@/lib/utils/types/types";
import { Cormorant_Garamond } from 'next/font/google';

export interface TripsClientProps {
  trips: Trip[];
  locale: string;
}

const cormorant = Cormorant_Garamond({
  weight: ['300', '400', '500'],
  subsets: ['latin'],
  display: 'swap',
  style: ["normal", "italic"]
});

export default function TripsCommunity({ trips, locale }: TripsClientProps) {
  const content = useIntlayer('trips-client');
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    let list = trips;
    if (query.trim().length > 0) {
      const q = query.toLowerCase();
      list = list.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.description?.toLowerCase().includes(q)
      );
    }
    return list;
  }, [query, trips]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className="min-h-screen">
      <div className="pt-16 sm:pt-20 md:pt-[80px] pb-6 sm:pb-8 md:pb-[30px]">
        <div className="flex mt-12 mb-12">
          <h1 className={`${cormorant.className} italic text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-light leading-tight`}>
            Découvrir de nouveaux horizons
          </h1>
        </div>

        <div className="flex items-center w-full border-b border-gray-300 pb-2 mb-4 hover:border-gray-500 transition-colors">
          <Search className="w-4 h-4 text-gray-400 mr-2 sm:mr-3 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={content.searchPlaceholder.value}
            className="flex-1 bg-transparent border-none outline-none text-sm placeholder:text-gray-400 font-serif italic"
          />
        </div>

        {/* Filters bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 border-y border-gray-200 py-3 sm:py-4 mb-6 sm:mb-8 md:mb-10">
          <TripsFilters />
          <div className="flex">
            <p className="text-[10px] sm:text-[11px] uppercase text-gray-600">
              {trips.length} Itinéraires partagés
            </p>
          </div>
        </div>
      </div>

      <main>
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 sm:py-32">
            <Search className="h-10 w-10 sm:h-12 sm:w-12 text-gray-200 mb-3 sm:mb-4" />
            <p className="text-gray-900 text-lg sm:text-xl font-medium">{content.noResults.value}</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10">
            {filtered.map((trip) => (
              <TripsCommunityItem
                key={trip.id}
                trip={trip}
                locale={locale}
                today={today}
                content={content}
                isAlreadyLiked={trip.isAlreadyLiked ?? false}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}