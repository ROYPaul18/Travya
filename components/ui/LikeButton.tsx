"use client";

import { useState, useTransition } from "react";
import { Heart, Share2 } from "lucide-react";
import { toggleFavorite } from "@/lib/actions/ToggleFavorite";

interface LikeButtonProps {
    tripId: string;
    initialFavorited: boolean;
}

const LikeButton = ({ tripId, initialFavorited }: LikeButtonProps) => {
    const [isFavorited, setIsFavorited] = useState(initialFavorited);
    const [isPending, startTransition] = useTransition();
    const [isAnimating, setIsAnimating] = useState(false);

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 300);

        startTransition(async () => {
            const res = await toggleFavorite(tripId);
            setIsFavorited(Boolean(res.favorited));
        });
    };

    return (
        <div className="flex items-center gap-2">
            <button
                onClick={handleClick}
                aria-label={isFavorited ? "Retirer des favoris" : "Ajouter aux favoris"}
                className="flex items-center gap-2 px-4 py-2 rounded-sm hover:bg-gray-100 transition-colors duration-200 text-sm font-medium underline"
                disabled={isPending}
            >
                <div className="relative">
                    <Heart
                        className={`w-4 h-4 transition-all duration-200 ${
                            isFavorited
                                ? "fill-red-500 text-red-500"
                                : "fill-transparent text-gray-700 stroke-[2px]"
                        } ${isAnimating ? "scale-125" : "scale-100"}`}
                    />
                    {isAnimating && isFavorited && (
                        <div className="absolute inset-0 animate-ping">
                            <Heart className="w-4 h-4 fill-red-500 text-red-500 opacity-75" />
                        </div>
                    )}
                </div>
                <span className={isFavorited ? "text-gray-900" : "text-gray-700"}>
                    Favoris
                </span>
            </button>
        </div>
    );
};

export default LikeButton;