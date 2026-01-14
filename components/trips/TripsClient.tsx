"use client";

import { useState, useMemo } from "react";
import { useIntlayer } from "next-intlayer";
import { Calendar, Search } from "lucide-react";
import { TripCardItem, Trip } from "@/components/trips/TripCardItem";
import { Cormorant_Garamond } from 'next/font/google';

export interface TripsClientProps {
  trips: Trip[];
  locale: string;
  user: { name?: string | null };
}


const cormorant = Cormorant_Garamond({
  weight: ['300', '400', '500'],
  subsets: ['latin'],
  display: 'swap',
  style:["normal", "italic"]
});


export default function TripsClient({ trips, locale, user }: TripsClientProps) {
  const content = useIntlayer('trips-client');
  const [query, setQuery] = useState("");

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const filteredAndSorted = useMemo(() => {

    let list = [...trips];
    if (query.trim().length > 0) {
      const q = query.toLowerCase();
      list = list.filter(t => t.title.toLowerCase().includes(q));
    }

    return list.sort((a, b) => {
      const dateA = new Date(a.startDate).getTime();
      const dateB = new Date(b.startDate).getTime();
      const isPastA = dateA < today.getTime();
      const isPastB = dateB < today.getTime();

      if (!isPastA && !isPastB) return dateA - dateB;
      if (isPastA && isPastB) return dateB - dateA;
      return isPastA ? 1 : -1;
    });
  }, [query, trips, today]);

  return (
    <div className="px-24 max-w-[1400px] mx-auto">
      <div className="flex justify-between">
        <div className="flex items-center justify-start pt-[80px] pb-[30px] text-[64px] font-logo font-italic tracking-normal">
          <h1 className={`${cormorant.className} italic mb-10`}> Ma Collection </h1>
        </div>
      </div>

      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-black transition-colors" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher un voyage..."
          className="w-full pl-11 pr-4 py-3 bg-white rounded-full text-sm border border-gray-200 shadow-sm focus:shadow-md transition-all outline-none focus:ring-2 focus:ring-gray-100"
        />
      </div>
      <div className="flex-1">
        {filteredAndSorted.length === 0 ? (
          <div className="border border-dashed border-gray-200 rounded-3xl py-20 flex flex-col items-center">
            <Calendar className="w-12 h-12 text-gray-200 mb-4" />
            <p className="text-gray-400 font-light text-lg">Aucun voyage trouvé</p>
          </div>
        ) : (

          <div className="gap-x-8 gap-y-12 space-y-4">
            {filteredAndSorted.map((trip) => (
              <TripCardItem key={trip.id} trip={trip} locale={locale} today={today} content={content} />
            ))}
          </div>
        )}
      </div>
    </div >
  );
}


