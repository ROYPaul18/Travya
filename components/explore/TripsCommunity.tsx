"use client";

import { useState, useMemo } from "react";
import { useIntlayer } from "next-intlayer";
import { Search } from "lucide-react";
import { TripsCommunityItem } from "@/components/explore/TripCommunityItem";
import { TripsFilters } from "@/components/explore/TripCommunityFilters";
import { Trip } from "@/lib/utils/types/types";

export interface TripsClientProps {
  trips: Trip[];
  locale: string;
}

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
    <div className="min-h-screen bg-white">
      {/* Sticky Header pour les filtres (Optionnel mais très Airbnb) */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-[2520px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 py-4">
            
            {/* Barre de recherche style "Pill" */}
            <div className="relative w-full lg:max-w-md">
              <div className="flex items-center w-full h-12 pl-5 pr-2 rounded-full border border-gray-200 shadow-xs hover:shadow-sm transition-shadow cursor-pointer bg-white">
                <Search className="w-4 h-4 text-green-950 mr-3" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={content.searchPlaceholder.value}
                  className="flex-1 bg-transparent border-none outline-none text-sm placeholder:text-gray-500"
                />
              </div>
            </div>

            {/* Filtres déportés à droite */}
            <TripsFilters />
          </div>
        </div>
      </div>

      <main className="max-w-[2520px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 py-8">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32">
            <Search className="h-12 w-12 text-gray-200 mb-4" />
            <p className="text-gray-900 text-xl font-medium">{content.noResults.value}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-x-6 gap-y-10">
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