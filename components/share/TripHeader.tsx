"use client";

import { TripWithLocation } from "@/lib/utils/types/types";
import Image from "next/image";
import {
  ImageIcon,
  Upload,
  X,
  Check,
  Loader2,
} from "lucide-react";
import { useEditableField } from "@/hooks/useEditableField";
import {
  updateTripTitle,
  updateTripWallpaper,
} from "@/lib/actions/trip-updates";
import { useUploadThing } from "@/lib/uploadthings";
import { toast } from "sonner";
import { useState, useRef, useEffect } from "react";
import { Cormorant_Garamond } from "next/font/google";

// Configuration de la police pour le titre
const cormorant = Cormorant_Garamond({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  display: "swap",
  style: "italic",
});

interface Props {
  trip: TripWithLocation;
  editable?: boolean;
}

export function TripHeader({ trip, editable = false }: Props) {
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  /* ---------------- PARALLAX REF ---------------- */
  const bgRef = useRef<HTMLDivElement>(null);

  /* ---------------- PARALLAX EFFECT ---------------- */
  useEffect(() => {
    const handleScroll = () => {
      if (!bgRef.current) return;

      const scrollY = window.scrollY;

      bgRef.current.style.transform = `
        translateY(${scrollY * 0.4}px)
        scale(1.05)
      `;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ---------------- UPLOAD ---------------- */
  const { startUpload } = useUploadThing("imageUploader", {
    onClientUploadComplete: async (res) => {
      if (res && res[0]) {
        try {
          await updateTripWallpaper(trip.id, res[0].url);
          toast.success("Image mise à jour");
          setPreviewImage(null);
          setSelectedFile(null);
        } catch {
          toast.error("Erreur de sauvegarde");
        }
      }
      setIsUploadingImage(false);
    },
    onUploadError: () => setIsUploadingImage(false),
  });

  /* ---------------- TITLE EDIT ---------------- */
  const {
    isEditing: isEditingTitle,
    value: titleValue,
    isSaving: isSavingTitle,
    inputRef: titleInputRef,
    setValue: setTitleValue,
    startEditing: startEditingTitle,
    handleKeyDown: handleTitleKeyDown,
    handleBlur: handleTitleBlur,
  } = useEditableField({
    initialValue: trip.title,
    onSave: async (newTitle) => {
      await updateTripTitle(trip.id, newTitle);
      toast.success("Titre mis à jour");
    },
    enabled: editable,
  });

  /* ---------------- AUTO RESIZE ---------------- */
  const autoResize = (el: HTMLTextAreaElement) => {
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  };

  const titleStyle = {
    fontSize: "clamp(3rem, 10vw, 8rem)",
    lineHeight: 0.9,
    color: "white",
    fontWeight: 300,
  };

  const currentImage = previewImage || trip.wallpaper;

  return (
    <div className="w-full h-screen relative bg-[#f8f5f2]">
      <div className="relative h-full w-full overflow-hidden">
        {/* ---------------- BACKGROUND ---------------- */}
        {currentImage ? (
          <div
            ref={bgRef}
            className="absolute inset-0 will-change-transform"
          >
            <Image
              src={currentImage}
              alt={trip.title}
              fill
              priority
              className="object-cover"
            />
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-stone-100">
            <ImageIcon className="h-12 w-12 text-stone-300" />
          </div>
        )}

        {/* ---------------- OVERLAY ---------------- */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/15">
          <span className="text-white uppercase tracking-[0.5em] font-bold text-[10px] mb-8 opacity-80 select-none">
            Itinéraire partagé
          </span>

          <div className="w-full max-w-[90%] md:max-w-[1200px] mx-auto text-center px-4">
            {isEditingTitle && editable ? (
              <textarea
                ref={(el) => {
                  if (el) {
                    titleInputRef.current = el;
                    autoResize(el);
                  }
                }}
                value={titleValue}
                onChange={(e) => {
                  setTitleValue(e.target.value);
                  autoResize(e.target);
                }}
                onBlur={handleTitleBlur}
                onKeyDown={handleTitleKeyDown}
                disabled={isSavingTitle}
                className={`${cormorant.className} italic`}
                style={{
                  ...titleStyle,
                  width: "100%",
                  border: "none",
                  outline: "none",
                  resize: "none",
                  background: "transparent",
                  textAlign: "center",
                  opacity: isSavingTitle ? 0.6 : 1,
                }}
                placeholder="Titre du voyage"
              />
            ) : (
              <h1
                onClick={editable ? startEditingTitle : undefined}
                className={`${cormorant.className} italic transition-opacity duration-300 ${
                  editable ? "cursor-text hover:opacity-80" : ""
                }`}
                style={titleStyle}
              >
                {titleValue}
              </h1>
            )}
          </div>
        </div>

        {/* ---------------- UPLOAD BUTTON ---------------- */}
        {editable && (
          <div className="absolute bottom-8 right-8 z-20">
            {selectedFile && !isUploadingImage ? (
              <div className="flex gap-2 animate-in fade-in slide-in-from-right-4">
                <button
                  onClick={() => {
                    setPreviewImage(null);
                    setSelectedFile(null);
                  }}
                  className="p-3 bg-white/90 backdrop-blur-md text-stone-800 hover:bg-white transition-all shadow-sm"
                >
                  <X className="h-4 w-4" />
                </button>
                <button
                  onClick={() => startUpload([selectedFile!])}
                  className="flex items-center gap-2 px-4 py-3 bg-stone-900 text-white hover:bg-black transition-all shadow-lg"
                >
                  <Check className="h-4 w-4" />
                  <span className="text-xs font-medium tracking-widest uppercase">
                    Valider
                  </span>
                </button>
              </div>
            ) : (
              <label className="cursor-pointer group">
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () =>
                        setPreviewImage(reader.result as string);
                      reader.readAsDataURL(file);
                      setSelectedFile(file);
                    }
                  }}
                  disabled={isUploadingImage}
                />
                <div className="p-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white transition-all rounded-full">
                  {isUploadingImage ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <Upload className="h-5 w-5 opacity-80" />
                  )}
                </div>
              </label>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
