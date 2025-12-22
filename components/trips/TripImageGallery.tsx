import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { Trip } from "@/lib/utils/types/types"

interface TripImageGalleryProps {
  trip: Trip;
}

export default function TripImageGallery({ trip }: TripImageGalleryProps) {
  return (
    <div className="grid grid-cols-4 gap-2 h-[250px] sm:h-[350px] md:h-[450px] pt-8">
      <div className="col-span-4 sm:col-span-2 relative rounded-l-lg overflow-hidden">
        {trip.wallpaper ? (
          <Image
            src={trip.wallpaper}
            alt={trip.title}
            className="object-cover"
            fill
            priority
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <ImageIcon className="h-20 w-20 text-gray-300" />
          </div>
        )}
      </div>
      <div className="hidden sm:grid sm:col-span-2 grid-cols-2 gap-2">
        {[0, 1, 2, 3].map((index) => (
          <div
            key={index}
            className={`relative overflow-hidden ${index === 1 ? "rounded-tr-lg" : ""
              } ${index === 3 ? "rounded-br-lg" : ""}`}
          >
            {trip.images?.[index] ? (
              <Image
                src={trip.images[index]}
                alt={`${trip.title} - Image ${index + 1}`}
                className="object-cover"
                fill
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <ImageIcon className="h-12 w-12 text-gray-300" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}