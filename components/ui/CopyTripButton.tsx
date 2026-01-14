
"use client";

import { Copy } from "lucide-react";
import { copyTrip } from "@/lib/actions/Trip";
import { useState } from "react";
import { toast } from "sonner"; 

export function CopyTripButton({ tripId }: { tripId: string }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault(); 
    setIsLoading(true);
    
    try {
      await copyTrip(tripId);
      toast.success("Voyage copié dans votre collection");
    } catch (error) {
      toast.error("Erreur lors de la copie");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleCopy}
      disabled={isLoading}
      className="bg-white/90 backdrop-blur-sm p-2.5 rounded-full border border-neutral-100 shadow-sm hover:bg-white transition-all duration-300 group overflow-hidden"
      title="Copier cet itinéraire"
    >
      <div className="flex items-center gap-0 group-hover:gap-2 transition-all duration-500">
         <Copy className={`h-4 w-4 text-neutral-900 ${isLoading ? 'animate-pulse' : ''}`} />
         <span className="max-w-0 overflow-hidden group-hover:max-w-[100px] transition-all duration-500 text-[10px] uppercase tracking-widest font-bold whitespace-nowrap">
            {isLoading ? "Copie..." : "Copier"}
         </span>
      </div>
    </button>
  );
}