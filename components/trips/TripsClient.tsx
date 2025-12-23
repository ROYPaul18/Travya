"use client";

import { useState, useMemo } from "react";
import { useIntlayer } from "next-intlayer";
import { Calendar, Plus, Search } from "lucide-react";
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

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const filtered = useMemo(() => {
    let list = trips;
    if (tab === "upcoming") list = trips.filter(t => new Date(t.startDate) >= today);
    if (tab === "past") list = trips.filter(t => new Date(t.startDate) < today);

    if (query.trim().length > 0) {
      const q = query.toLowerCase();
      list = list.filter(t => t.title.toLowerCase().includes(q));
    }
    return list;
  }, [tab, query, trips, today]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header avec Titre et Action */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-medium text-gray-900 tracking-tight">Mes voyages</h1>
          <p className="text-gray-500 mt-1">Gérez vos aventures passées et futures.</p>
        </div>

        <Link href="/trips/new">
          <button className="flex items-center gap-2 bg-green-950 text-white px-6 py-3 rounded-sm cursor-pointer transition-all shadow-sm hover:shadow-md font-medium">
            <Plus className="w-5 h-5" />
            {content.newTrip.value}
          </button>
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar de navigation des statuts */}
        <aside className="w-full lg:w-64 shrink-0">
          <TripsStatusFilters tab={tab} onTabChange={setTab} content={content} />
          
          <div className="mt-8 relative">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
             <input 
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-green-950/10 transition-all outline-none"
             />
          </div>
        </aside>

        {/* Grille de voyages */}
        <div className="flex-1">
          {filtered.length === 0 ? (
            <div className="border-2 border-dashed border-gray-200 rounded-3xl py-20 flex flex-col items-center">
              <Calendar className="w-12 h-12 text-gray-300 mb-4" />
              <p className="text-gray-500 font-medium">{content.noResults.value}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
              {filtered.map((trip) => (
                <TripCardItem key={trip.id} trip={trip} locale={locale} today={today} content={content} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}