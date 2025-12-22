"use client";
import { MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const Globe = dynamic(() => import("react-globe.gl"), {
  ssr: false,
  loading: () => (
    <div className="flex flex-col items-center justify-center h-screen gap-4 bg-white">
      <div className="relative">
        <div className="animate-spin rounded-lg h-16 w-16 border-4 border-gray-200 border-t-gray-900"></div>
        <MapPin className="h-8 w-8 text-gray-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
      </div>
      <p className="text-gray-600 animate-pulse">Chargement de vos aventures...</p>
    </div>
  ),
});

export interface TransformedLocation {
  lat: number;
  lng: number;
  name: string;
  country: string;
}

const getSpotsText = (count: number) => {
  return count === 1 ? "spot" : "spots";
};

export default function GlobePage() {
  const globeRef = useRef<any>(undefined);
  const [visitedCountries, setVisitedCountries] = useState<Set<string>>(new Set());
  const [locations, setLocations] = useState<TransformedLocation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);

  useEffect(() => {
    const fetchLocations = async () => {
      try {

        const response = await fetch("/api/trips");
        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }
        const data: TransformedLocation[] = await response.json();

        setLocations(data);

        const countries = new Set<string>(
          data.map((loc: TransformedLocation) => loc.country)
        );
        setVisitedCountries(countries);
      } catch (err) {
        console.error("Erreur lors du chargement des lieux", err);

        setLocations([]);
        setVisitedCountries(new Set());
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocations();
  }, []);

  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.controls().autoRotate = true;
      globeRef.current.controls().autoRotateSpeed = 0.5;
      globeRef.current.pointOfView({ altitude: 2.5 }, 2000);
    }
  }, [isLoading]);

  const countryLocations = Array.from(visitedCountries).reduce((acc, country) => {
    const count = locations.filter(loc => loc.country === country).length;
    acc[country] = count;
    return acc;
  }, {} as Record<string, number>);

  const sortedCountries = Array.from(visitedCountries).sort();

  return (
    <div className="relative w-full h-screen overflow-hidden bg-white">

      <div className="absolute inset-0">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-full gap-4 bg-white">
            <div className="relative">
              <div className="animate-spin rounded-lg h-16 w-16 border-4 border-gray-200 border-t-green-900"></div>
              <MapPin className="h-8 w-8 text-green-950 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
            </div>
            <p className="text-gray-600 animate-pulse">Chargement de vos aventures...</p>
          </div>
        ) : (
            <Globe
            ref={globeRef}
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
            bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
            backgroundColor="#FFF"
            pointColor={() => "#ef4444"}
            pointLabel={(d: any) => `<div style="background: rgba(0,0,0,0.85); color: white; padding: 8px 12px; border-radius: 6px; font-size: 13px; font-weight: 500;">${d.name}</div>`}
            pointsData={locations}
            pointRadius={0.8}
            pointAltitude={0.2}
            pointsMerge={false}
            width={typeof window !== 'undefined' ? window.innerWidth : 1920}
            height={typeof window !== 'undefined' ? window.innerHeight : 1080}
          />
        )}
      </div>
      <div className="absolute top-6 left-6 z-10 space-y-4">

        <div className="bg-white rounded-sm p-2 border border-gray-200 space-y-4 min-w-[220px]">
          <h2 className="text-base font-medium text-gray-900 flex items-center gap-2">
            Mon Bilan Voyage
          </h2>

          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-600 font-light tracking-wide">Pays Visitées</p>
            <p className="text-xs font-light text-neutral-950">
              {visitedCountries.size}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-600 font-light tracking-wide">Lieux Capturés</p>
            <p className="text-xs font-light  text-neutral-950">
              {locations.length}
            </p>
          </div>
        </div>
        <div className="bg-white/90  rounded-sm p-2 border border-gray-200 space-y-4 min-w-[220px] max-h-64 overflow-y-auto custom-scrollbar">
          <h2 className="text-base font-medium text-gray-900 mb-2">
            Pays Explorés
          </h2>

          {isLoading ? (
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <MapPin className="h-4 w-4 animate-pulse" />
              Chargement...
            </div>
          ) : sortedCountries.length === 0 ? (
            <p className="text-xs text-gray-500">Aucun pays enregistré. Commencez votre premier voyage !</p>
          ) : (
            sortedCountries.map((country, key) => (
              <div
                key={key}
                onMouseEnter={() => setHoveredCountry(country)}
                onMouseLeave={() => setHoveredCountry(null)}
                className={`flex items-center justify-between gap-2 rounded-lg transition-all duration-300`}
              >

                <div className="flex items-center gap-3 w-3/4">
                  <span className="font-light text-gray-800 text-sm truncate">{country}</span>
                </div>

                <span className="text-xs text-gray-600 font-semibold shrink-0">
                  {countryLocations[country]} {getSpotsText(countryLocations[country])}
                </span>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}