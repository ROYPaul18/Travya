"use client";

import { useState, useMemo } from "react";
import { useIntlayer } from "next-intlayer";
import { Search, SlidersHorizontal } from "lucide-react";
import { TripsCommunityItem } from "@/components/explore/TripCommunityItem";
import { TripsFilters } from "@/components/explore/TripCommunityFilters";
import { Trip } from "@/lib/utils/types/types"

export interface TripsClientProps {
  trips: Trip[];
  locale: string;
}

const DAYS = 1000 * 60 * 60 * 24;
const daysBetween = (d1: Date, d2: Date) => Math.ceil((d1.getTime() - d2.getTime()) / DAYS);

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
    <div className="min-h-screen bg-white px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-24 py-6 sm:py-8">
      <div className="max-w-[1920px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row gap-3 mb-6 sm:mb-8">
              <div className="relative flex-1 max-w-full sm:max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={content.searchPlaceholder.value}
                  aria-label={content.searchLabel.value}
                  className="w-full h-[36px] pl-9 pr-4 text-sm rounded-md bg-white border border-gray-300 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-green-950 transition-all focus:text-green-950"
                />
              </div>

              {/* Filtres */}
              <div className="flex-1">
                <TripsFilters />
              </div>
            </div>

            {/* Résultats */}
            {filtered.length === 0 ? (
              <div className="text-center py-12 sm:py-16 lg:py-24">
                <div className="p-4 sm:p-6 bg-gray-50 rounded-full inline-flex mb-4 sm:mb-6 border border-gray-200">
                  <Search className="h-10 w-10 sm:h-12 sm:w-12 text-gray-300" />
                </div>
                <p className="text-gray-900 text-base sm:text-lg lg:text-xl font-medium mb-2">
                  {content.noResults.value}
                </p>
                <p className="text-gray-500 text-xs sm:text-sm">
                  {content.noResultsHint.value}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
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
          </div>
        </div>
      </div>
    </div>
  );
}