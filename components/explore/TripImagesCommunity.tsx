"use client";

import { TripWithLocation } from "@/lib/utils/types/types";
import Image from "next/image";
import { ImageIcon } from "lucide-react";

interface Props {
  trip: TripWithLocation;
}

export function TripImagesCommunity({ trip }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 h-[200px] sm:h-[300px] md:h-[350px] lg:h-[450px] pt-4 sm:pt-6">
      <div className="col-span-1 sm:col-span-2 relative rounded-lg sm:rounded-l-lg overflow-hidden">
        {trip.wallpaper ? (
          <Image src={trip.wallpaper} alt={trip.title} className="object-cover" fill priority />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <ImageIcon className="h-12 w-12 sm:h-16 sm:w-16 lg:h-20 lg:w-20 text-gray-300" />
          </div>
        )}
      </div>

      <div className="hidden sm:grid sm:col-span-2 grid-cols-2 gap-2">
        {Array(4).fill(0).map((_, i) => (
          <div key={i} className={`relative overflow-hidden ${i === 1 ? "rounded-tr-lg" : i === 3 ? "rounded-br-lg" : ""}`}>
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <ImageIcon className="h-12 w-12 sm:h-16 sm:w-16 lg:h-20 lg:w-20 text-gray-300" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
