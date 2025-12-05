"use client";

import { useState, useTransition } from "react";
import { Heart } from "lucide-react";
import { toggleFavorite } from "@/lib/actions/ToggleFavorite";

interface HeartButtonProps {
  tripId: string;
  initialFavorited: boolean;
}

const HeartButton = ({ tripId, initialFavorited }: HeartButtonProps) => {
  const [isFavorited, setIsFavorited] = useState(initialFavorited);
  const [isPending, startTransition] = useTransition();

  return (
    <button
      onClick={() =>
        startTransition(async () => {
          const res = await toggleFavorite(tripId);
             setIsFavorited(Boolean(res.favorited));
       
        })
      }
      aria-label={
        isFavorited ? "Retirer des favoris" : "Ajouter aux favoris"
      }
      className="absolute top-4 right-4 z-10 p-2 rounded-full transition-colors duration-300 backdrop-blur-sm bg-white/70 hover:bg-white/90"
      disabled={isPending}
    >
      <Heart
        className={`w-5 h-5 transition-all duration-300 ${
          isFavorited
            ? "fill-red-500 text-red-500 scale-110"
            : "fill-gray-500/20 text-gray-500 hover:text-red-500"
        }`}
      />
    </button>
  );
};

export default HeartButton;
