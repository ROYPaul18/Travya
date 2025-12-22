"use client";

import { Button } from "@/components/ui/button";
import { createTrip } from "@/lib/actions/Trip";
import { UploadButton } from "@/lib/uploadthings";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState, useTransition } from "react";
import { Loader2, ArrowLeft, Calendar as CalendarIcon, X } from "lucide-react";
import { useIntlayer } from "next-intlayer";
import { Link } from "@/components/Link";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function NewTrip() {
  const [isPending, startTransition] = useTransition();
  const [wallpaper, setWallpaper] = useState<string | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const content = useIntlayer("new-trip-page");

  const handleSubmit = (formData: FormData) => {
    if (wallpaper) {
      formData.append("wallpaper", wallpaper);
    }
    if (images.length > 0) {
      formData.append("images", JSON.stringify(images));
    }
    if (startDate) {
      formData.append("startDate", startDate.toISOString().split("T")[0]);
    }
    if (endDate) {
      formData.append("endDate", endDate.toISOString().split("T")[0]);
    }
    startTransition(() => {
      createTrip(formData);
    });
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link href="/trips">
            <Button
              variant="ghost"
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 gap-2 pl-0 rounded-sm transition-colors font-light"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Retour aux voyages</span>
            </Button>
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-light text-gray-900 mb-2">
            {content.tripDetails}
          </h1>
          <p className="text-gray-500 font-light">
            Créez un nouveau voyage et commencez à planifier votre aventure
          </p>
        </div>

        {/* Form */}
        <div className="space-y-8">
          <form
            className="space-y-8"
            action={(formData: FormData) => handleSubmit(formData)}
          >
            {/* Title */}
            <div className="space-y-2">
              <label className="text-sm font-light text-gray-900 flex items-center gap-2">
                {content.titleLabel}
              </label>
              <input
                type="text"
                name="title"
                className={cn(
                  "w-full bg-white border border-gray-300 text-gray-900",
                  "placeholder-gray-400 px-4 py-3 rounded-sm font-light",
                  "focus:outline-none focus:ring-2 focus:ring-gray-200",
                  "focus:border-gray-500 transition-all duration-200",
                )}
                placeholder={content.titlePlaceholder.value}
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-sm font-light text-gray-900 flex items-center gap-2">
                {content.descriptionLabel}
              </label>
              <textarea
                name="description"
                rows={4}
                className={cn(
                  "w-full bg-white border border-gray-300 text-gray-900",
                  "placeholder-gray-400 px-4 py-3 rounded-sm font-light",
                  "focus:outline-none focus:ring-2 focus:ring-gray-200",
                  "focus:border-gray-500 transition-all duration-200",
                  "resize-none",
                )}
                placeholder={content.descriptionPlaceholder.value}
                required
              />
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-light text-gray-900 flex items-center gap-2">
                  {content.startDateLabel}
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-light",
                        "bg-white border border-gray-300 text-gray-900",
                        "hover:bg-gray-50 hover:text-gray-900",
                        "px-4 py-3 rounded-sm h-auto",
                        !startDate && "text-gray-400",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4 opacity-50" />
                      {startDate
                        ? format(startDate, "PPP")
                        : "Sélectionner une date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                      className="bg-white rounded-sm shadow-lg border border-gray-300"
                      disabled={(date) =>
                        date < new Date() || (endDate ? date > endDate : false)
                      }
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-light text-gray-900 flex items-center gap-2">
                  {content.endDateLabel}
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-light",
                        "bg-white border border-gray-300 text-gray-900",
                        "hover:bg-gray-50 hover:text-gray-900",
                        "px-4 py-3 rounded-sm h-auto",
                        !endDate && "text-gray-400",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4 opacity-50" />
                      {endDate
                        ? format(endDate, "PPP")
                        : "Sélectionner une date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      initialFocus
                      className="bg-white rounded-sm shadow-lg border border-gray-300"
                      disabled={(date) =>
                        date < new Date() ||
                        (startDate ? date < startDate : false)
                      }
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Wallpaper Upload */}
            <div className="space-y-3">
              <label className="text-sm font-light text-gray-900 flex items-center gap-2">
                Image de couverture (Wallpaper)
              </label>

              {wallpaper && (
                <div className="relative rounded-sm overflow-hidden border border-gray-300">
                  <Image
                    src={wallpaper}
                    alt="Wallpaper du voyage"
                    className="w-full h-64 object-cover"
                    width={800}
                    height={256}
                  />
                  <button
                    type="button"
                    onClick={() => setWallpaper(null)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}

              {!wallpaper && (
                <div className="bg-white border-2 border-dashed border-gray-300 rounded-sm p-6 sm:p-8 text-center hover:border-gray-400 transition-all duration-200">
                  <UploadButton
                    endpoint={"imageUploader"}
                    onClientUploadComplete={(res) => {
                      if (res && res[0].ufsUrl) {
                        setWallpaper(res[0].ufsUrl);
                      }
                    }}
                    onUploadError={(error: Error) => {
                      console.error("Upload error", error);
                    }}
                    appearance={{
                      button:
                        "bg-gray-900 text-white hover:bg-gray-800 border-0 rounded-sm font-medium py-3 px-4 h-auto",
                      allowedContent: "text-gray-500 text-sm font-light",
                    }}
                  />
                </div>
              )}
            </div>

            {/* Additional Images Gallery */}
            <div className="space-y-3">
              <label className="text-sm font-light text-gray-900 flex items-center gap-2">
                Galerie d'images supplémentaires
              </label>

              {images.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {images.map((img, index) => (
                    <div
                      key={index}
                      className="relative rounded-sm overflow-hidden border border-gray-300"
                    >
                      <Image
                        src={img}
                        alt={`Image ${index + 1}`}
                        className="w-full h-32 object-cover"
                        width={300}
                        height={128}
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="bg-white border-2 border-dashed border-gray-300 rounded-sm p-6 sm:p-8 text-center hover:border-gray-400 transition-all duration-200">
                <UploadButton
                  endpoint={"imageUploader"}
                  onClientUploadComplete={(res) => {
                    if (res && res[0].ufsUrl) {
                      setImages([...images, res[0].ufsUrl]);
                    }
                  }}
                  onUploadError={(error: Error) => {
                    console.error("Upload error", error);
                  }}
                  appearance={{
                    button:
                      "bg-gray-900 text-white hover:bg-gray-800 border-0 rounded-sm font-medium py-3 px-4 h-auto",
                    allowedContent: "text-gray-500 text-sm font-light",
                  }}
                />
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-gray-200" />

            {/* Submit Button */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4">
              <p className="text-xs text-gray-500 font-light">
                {content.imageHelper}
              </p>
              <Button
                type="submit"
                className="w-full sm:w-auto bg-neutral-900 hover:bg-gray-800 text-white font-medium py-3 px-8 rounded-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 h-auto"
                disabled={isPending || !startDate || !endDate}
              >
                {isPending ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    {content.submitButtonCreating}
                  </>
                ) : (
                  <>{content.submitButtonSave}</>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
