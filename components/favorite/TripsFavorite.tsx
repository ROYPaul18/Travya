"use client";

import { useState, useMemo } from "react";
import { useIntlayer } from "next-intlayer";
import { Search } from "lucide-react";
import { TripsCommunityItem } from "@/components/explore/TripCommunityItem";

export interface Trip {
  id: string;
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  imageUrl: string;
}

export interface TripsClientProps {
  trips: Trip[];
  locale: string;
}

export default function TripsCommunity({ trips, locale }: TripsClientProps) {
  const content = useIntlayer('favoris');
  
  const [query, setQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
    <div className="flex flex-col lg:flex-row gap-6 lg:gap-0">
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

      <div className="flex-1 lg:pl-6">
        <div className="py-4">
        <h1 className="text-4xl"> {content.mainTitle}</h1>
        </div>
            
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
              <TripsCommunityItem 
                key={trip.id} 
                trip={trip} 
                locale={locale} 
                today={today} 
                content={content} 
                isAlreadyLiked
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}