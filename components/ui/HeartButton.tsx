"use client";

import { useState } from "react";
import { Heart } from "lucide-react";

interface HeartButtonProps {
  tripId: string;
}

const HeartButton = ({ tripId }: HeartButtonProps) => {

  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault(); 
    e.stopPropagation(); 
    
    console.log(`Basculement du favori pour le voyage ${tripId}: ${!isFavorite}`);
    setIsFavorite(!isFavorite);
  };

  return (
    <button
      onClick={toggleFavorite}
      aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
      className="absolute top-4 right-4 z-10 p-2 rounded-full transition-colors duration-300 backdrop-blur-sm bg-white/70 hover:bg-white/90"
    >
      <Heart 
        className={`w-5 h-5 transition-all duration-300 ${
          isFavorite 
            ? "fill-red-500 text-red-500 scale-110" 
            : "fill-gray-500/20 text-gray-500 hover:text-red-500" 
        }`}
      />
    </button>
  );
};

export default HeartButton;