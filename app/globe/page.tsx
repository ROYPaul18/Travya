"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Plane, Camera } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const Globe = dynamic(() => import("react-globe.gl"), {
  ssr: false,
  loading: () => (
    <div className="flex flex-col items-center justify-center h-[600px] gap-4">
      <div className="relative">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200/20 border-t-blue-400"></div>
        <MapPin className="h-8 w-8 text-blue-300 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
      </div>
      <p className="text-blue-200 animate-pulse">Loading globe...</p>
    </div>
  ),
});

export interface TransformedLocation {
  lat: number;
  lng: number;
  name: string;
  country: string;
}

export default function GlobePage() {
  const globeRef = useRef<any>(undefined);

  const [visitedCountries, setVisitedCountries] = useState<Set<string>>(
    new Set()
  );
  const [locations, setLocations] = useState<TransformedLocation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch("/api/trips");
        const data = await response.json();
        setLocations(data);
        const countries = new Set<string>(
          data.map((loc: TransformedLocation) => loc.country)
        );

        setVisitedCountries(countries);
      } catch (err) {
        console.error("error", err);
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
  }, []);

  const countryLocations = Array.from(visitedCountries).reduce((acc, country) => {
    const count = locations.filter(loc => loc.country === country).length;
    acc[country] = count;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header avec animation */}
          <div className="text-center mb-12 space-y-4">
            <div className="inline-flex items-center gap-2 bg-blue-500/20 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-400/30 mb-4">
              <MapPin className="h-5 w-5 text-blue-300 animate-pulse" />
              <span className="text-blue-100 text-sm font-medium">Explore Your Journey</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-200 via-cyan-200 to-blue-200 bg-clip-text text-transparent">
              Your Travel Odyssey
            </h1>
            <p className="text-blue-200/80 text-lg max-w-2xl mx-auto">
              Discover the world through your adventures, one destination at a time
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Globe Section */}
            <div className="lg:col-span-2 bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-white/20">
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
                    <Plane className="h-6 w-6 text-blue-300" />
                    Your Footprint on Earth
                  </h2>
                  <div className="flex items-center gap-2 text-blue-200 text-sm bg-blue-500/20 px-3 py-1 rounded-full">
                    <MapPin className="h-4 w-4" />
                    <span>{locations.length} locations</span>
                  </div>
                </div>

                <div className="h-[600px] w-full relative rounded-xl overflow-hidden bg-gradient-to-b from-blue-950/50 to-slate-900/50">
                  {isLoading ? (
                    <div className="flex flex-col items-center justify-center h-full gap-4">
                      <div className="relative">
                        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200/20 border-t-blue-400"></div>
                        <MapPin className="h-8 w-8 text-blue-300 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                      </div>
                      <p className="text-blue-200 animate-pulse">Loading your adventures...</p>
                    </div>
                  ) : (
                    <Globe
                      ref={globeRef}
                      globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
                      bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                      backgroundColor="rgba(0,0,0,0)"
                      pointColor={() => "#60A5FA"}
                      pointLabel="name"
                      pointsData={locations}
                      pointRadius={0.6}
                      pointAltitude={0.15}
                      pointsMerge={true}
                      atmosphereColor="#60A5FA"
                      atmosphereAltitude={0.2}
                      width={800}
                      height={600}
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <div className="lg:col-span-1 space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-md border-blue-400/30 text-white">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center">
                      <MapPin className="h-8 w-8 text-blue-300 mb-2" />
                      <p className="text-3xl font-bold">{visitedCountries.size}</p>
                      <p className="text-sm text-blue-200">Countries</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 backdrop-blur-md border-cyan-400/30 text-white">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center">
                      <Camera className="h-8 w-8 text-cyan-300 mb-2" />
                      <p className="text-3xl font-bold">{locations.length}</p>
                      <p className="text-sm text-cyan-200">Locations</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Countries List */}
              <Card className="bg-white/10 backdrop-blur-md border-white/20 sticky top-8">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-blue-300" />
                    Countries Visited
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="flex items-center justify-center h-32">
                      <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-200/20 border-t-blue-400"></div>
                    </div>
                  ) : (
                    <div className="space-y-3 max-h-[450px] overflow-y-auto pr-2">
                      {Array.from(visitedCountries)
                        .sort()
                        .map((country, key) => (
                          <div
                            key={key}
                            onMouseEnter={() => setHoveredCountry(country)}
                            onMouseLeave={() => setHoveredCountry(null)}
                            className={`flex items-center justify-between gap-2 p-3 rounded-lg transition-all duration-300 border ${
                              hoveredCountry === country
                                ? 'bg-blue-500/30 border-blue-400/50 scale-105 shadow-lg'
                                : 'bg-white/5 border-white/10 hover:bg-white/10'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <MapPin className="h-4 w-4 text-blue-300" />
                              <span className="font-medium text-white">{country}</span>
                            </div>
                            <span className="text-xs bg-blue-500/30 text-blue-200 px-2 py-1 rounded-full">
                              {countryLocations[country]} {countryLocations[country] === 1 ? 'spot' : 'spots'}
                            </span>
                          </div>
                        ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Footer Stats */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 backdrop-blur-sm px-6 py-3 rounded-full border border-blue-400/20">
              <Plane className="h-5 w-5 text-blue-300" />
              <span className="text-blue-200">
                Keep exploring! The world is waiting for you.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}