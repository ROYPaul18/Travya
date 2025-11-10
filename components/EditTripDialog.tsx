"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Trip } from "@/app/generated/prisma";
import { editTrip } from "@/lib/actions/Trip";
import { UploadButton } from "@/lib/uploadthings";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState, useTransition } from "react";
import {
  Plane,
  Calendar,
  FileText,
  Image as ImageIcon,
  Loader2,
} from "lucide-react";
import { useRouter } from "next/router";

interface EditTripDialogProps {
  trip: Trip;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function EditTripDialog({
  trip,
  open,
  onOpenChange,
}: EditTripDialogProps) {
  const [isPending, startTransition] = useTransition();
  const [imageUrl, setImageUrl] = useState<string | null>(trip.imageUrl);
  

  // Formater les dates pour l'input date (YYYY-MM-DD)
  const formatDateForInput = (date: Date) => {
    return new Date(date).toISOString().split("T")[0];
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    if (imageUrl) {
      formData.append("imageUrl", imageUrl);
    }
    
    startTransition(async () => {
      try {
        await editTrip(formData, trip.id);
        onOpenChange(false);
        // Le revalidatePath est fait côté serveur, le refresh se fera automatiquement
      } catch (error) {
        console.error("Erreur lors de la mise à jour:", error);
        alert("Erreur lors de la mise à jour du voyage");
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-slate-900 border-slate-800 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2 text-white">
            <Plane className="h-6 w-6 text-blue-300" />
            Modifier le voyage
          </DialogTitle>
        </DialogHeader>

        <form
          className="space-y-6 mt-4"
          onSubmit={handleSubmit}
        >
          {/* Title Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-blue-100 flex items-center gap-2">
              <Plane className="h-4 w-4 text-blue-300" />
              Titre du voyage
            </label>
            <input
              type="text"
              name="title"
              defaultValue={trip.title}
              className={cn(
                "w-full bg-white/5 border border-white/20 text-white",
                "placeholder-blue-200/50 px-4 py-3 rounded-lg",
                "focus:outline-none focus:ring-2 focus:ring-blue-400/50",
                "focus:border-blue-400/50 backdrop-blur-sm transition-all duration-300",
              )}
              placeholder="Ex: Voyage à Tokyo"
              required
            />
          </div>

          {/* Description Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-blue-100 flex items-center gap-2">
              <FileText className="h-4 w-4 text-blue-300" />
              Description
            </label>
            <textarea
              name="description"
              rows={4}
              defaultValue={trip.description}
              className={cn(
                "w-full bg-white/5 border border-white/20 text-white",
                "placeholder-blue-200/50 px-4 py-3 rounded-lg",
                "focus:outline-none focus:ring-2 focus:ring-blue-400/50",
                "focus:border-blue-400/50 backdrop-blur-sm transition-all duration-300",
                "resize-none",
              )}
              placeholder="Décrivez votre voyage..."
              required
            />
          </div>

          {/* Date Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-blue-100 flex items-center gap-2">
                <Calendar className="h-4 w-4 text-blue-300" />
                Date de début
              </label>
              <input
                type="date"
                name="startDate"
                defaultValue={formatDateForInput(trip.startDate)}
                className={cn(
                  "w-full bg-white/5 border border-white/20 text-white",
                  "px-4 py-3 rounded-lg",
                  "focus:outline-none focus:ring-2 focus:ring-blue-400/50",
                  "focus:border-blue-400/50 backdrop-blur-sm transition-all duration-300",
                  "[color-scheme:dark]",
                )}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-blue-100 flex items-center gap-2">
                <Calendar className="h-4 w-4 text-blue-300" />
                Date de fin
              </label>
              <input
                type="date"
                name="endDate"
                defaultValue={formatDateForInput(trip.endDate)}
                className={cn(
                  "w-full bg-white/5 border border-white/20 text-white",
                  "px-4 py-3 rounded-lg",
                  "focus:outline-none focus:ring-2 focus:ring-blue-400/50",
                  "focus:border-blue-400/50 backdrop-blur-sm transition-all duration-300",
                  "[color-scheme:dark]",
                )}
                required
              />
            </div>
          </div>

          {/* Image Upload */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-blue-100 flex items-center gap-2">
              <ImageIcon className="h-4 w-4 text-blue-300" />
              Image du voyage
            </label>

            {imageUrl && (
              <div className="relative rounded-lg overflow-hidden border border-white/20 shadow-lg">
                <Image
                  src={imageUrl}
                  alt="Image du voyage"
                  className="w-full max-h-64 object-cover"
                  width={600}
                  height={256}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
              </div>
            )}

            <div className="bg-white/5 border border-white/20 rounded-lg p-6 text-center hover:bg-white/10 transition-all duration-300">
              <UploadButton
                endpoint={"imageUploader"}
                onClientUploadComplete={(res) => {
                  if (res && res[0].url) {
                    setImageUrl(res[0].url);
                  }
                }}
                onUploadError={(error: Error) => {
                  console.error("Upload error", error);
                }}
                appearance={{
                  button:
                    "bg-blue-500/30 text-blue-100 hover:bg-blue-500/40 border border-blue-400/30",
                  allowedContent: "text-blue-200/60",
                }}
              />
              <p className="text-sm text-blue-200/60 mt-3">
                Choisissez une nouvelle image pour remplacer l'actuelle
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 bg-white/5 border-white/20 text-white hover:bg-white/10"
              disabled={isPending}
            >
              Annuler
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Enregistrement...
                </>
              ) : (
                <>
                  <Plane className="h-5 w-5" />
                  Enregistrer
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}