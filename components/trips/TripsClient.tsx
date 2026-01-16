"use client";

import { useState, useMemo } from "react";
import { useIntlayer } from "next-intlayer";
import { Calendar } from "lucide-react";
import { TripCardItem, Trip } from "@/components/trips/TripCardItem";
import { Cormorant_Garamond } from 'next/font/google';
import { Link } from "../Link";

export interface TripsClientProps {
  trips: Trip[];
  favoriteTrips: Trip[]; 
  locale: string;
  user: { name?: string | null };
}

const cormorant = Cormorant_Garamond({
  weight: ['300', '400', '500'],
  subsets: ['latin'],
  display: 'swap',
  style: ["normal", "italic"]
});

type TabType = "ALL" | "DRAFTS" | "FAVORITES";

export default function TripsClient({ trips, favoriteTrips, locale, user }: TripsClientProps) {
  const content = useIntlayer('trips-client');
  const [activeTab, setActiveTab] = useState<TabType>("ALL");
  const [query, setQuery] = useState("");

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const filteredAndSorted = useMemo(() => {
    let list = [...trips];

    if (activeTab === "DRAFTS") {
      list = list.filter(t => (t as any).status === "draft"); 
    } else if (activeTab === "FAVORITES") {
      list = [...favoriteTrips];
    }

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
  }, [query, trips, favoriteTrips, today, activeTab]);

  return (
    <div className="min-h-screen">
       <div className="flex justify-between items-center pt-16 sm:pt-20 md:pt-[80px] pb-6 sm:pb-8 md:pb-[30px]">
        <div className="flex mt-12">
          <h1 className={`${cormorant.className} italic text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-light leading-tight`}>
            Ma Collection
          </h1>
        </div>
        <Link href="trips/new" className="bg-black text-white px-6 py-2 rounded-xs text-sm font-medium hover:bg-gray-800 transition-colors">
          Nouveau voyage
        </Link>
      </div>
      
      <div className="flex gap-8 border-b border-gray-100 mb-10">
        <button 
          onClick={() => setActiveTab("ALL")}
          className={`pb-4 text-[11px] font-bold tracking-[0.2em] uppercase transition-all relative ${
            activeTab === "ALL" ? "text-black" : "text-gray-400 hover:text-gray-600"
          }`}
        >
          Tous mes voyages ({trips.length})
          {activeTab === "ALL" && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-black" />}
        </button>
        
        <button 
          onClick={() => setActiveTab("DRAFTS")}
          className={`pb-4 text-[11px] font-bold tracking-[0.2em] uppercase transition-all relative ${
            activeTab === "DRAFTS" ? "text-black" : "text-gray-400 hover:text-gray-600"
          }`}
        >
          Brouillons
          {activeTab === "DRAFTS" && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-black" />}
        </button>

        <button 
          onClick={() => setActiveTab("FAVORITES")}
          className={`pb-4 text-[11px] font-bold tracking-[0.2em] uppercase transition-all relative ${
            activeTab === "FAVORITES" ? "text-black" : "text-gray-400 hover:text-gray-600"
          }`}
        >
          Favoris ({favoriteTrips.length})
          {activeTab === "FAVORITES" && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-black" />}
        </button>
      </div>

      <div className="flex-1">
        {filteredAndSorted.length === 0 ? (
          <div className="border border-dashed border-gray-100 rounded-3xl py-32 flex flex-col items-center">
            <p className="text-gray-400 font-light text-sm tracking-widest uppercase text-logo">Aucun voyage trouvé</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
            {filteredAndSorted.map((trip) => (
              <TripCardItem key={trip.id} trip={trip} locale={locale} today={today} content={content} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}