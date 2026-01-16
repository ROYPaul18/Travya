"use client";

import { TripWithLocation } from "@/lib/utils/types/types";
import Image from "next/image";
import { ImageIcon } from "lucide-react";

interface Props {
  trip: TripWithLocation;
}

export function TripImagesCommunity({ trip }: Props) {
  return (
    <div className="w-screen h-screen relative">
      <div className="col-span-1 sm:col-span-2 relative h-full w-full overflow-hidden">
        {trip.wallpaper ? (
          <Image
            src={trip.wallpaper}
            alt={trip.title}
            fill
            priority
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <ImageIcon className="h-12 w-12 sm:h-16 sm:w-16 lg:h-20 lg:w-20 text-gray-300" />
          </div>
        )}
      </div>
    </div>
  );
}