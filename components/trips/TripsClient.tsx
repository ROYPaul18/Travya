"use client";

import { useState, useMemo } from "react";
import { useIntlayer } from "next-intlayer";
import { Plus, Search } from "lucide-react";
import { TripCardItem, Trip } from "@/components/trips/TripCardItem";
import { TripsStatusFilters } from "@/components/trips/TripsFilters";
import { Link } from "../Link";
import { Button } from "../ui/button";

export interface TripsClientProps {
  trips: Trip[];
  locale: string;
}

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
          t.description?.toLowerCase().includes(q)
      );
    }
    return list;
  }, [tab, query, trips, upcoming, past]);

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

      <TripsStatusFilters
        tab={tab}
        onTabChange={setTab}
        content={content}
        sidebarOpen={sidebarOpen}
      />

      <div className="flex-1 lg:pl-6">
        <div className="flex items-center  mb-6 lg:mb-8">
          <div className="relative max-w-full lg:max-w-md pr-8">
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
          <Link href={"/trips/new"}>
            <Button className="py-5 bg-green-950 hover:bg-green-900 text-white hover:shadow-lg transition-all duration-200 flex items-center gap-2 font-light cursor-pointer">
              <Plus className="h-5 w-5" />
               Nouveau Voyage
            </Button>
          </Link>
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
              <TripCardItem
                key={trip.id}
                trip={trip}
                locale={locale}
                today={today}
                content={content}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}