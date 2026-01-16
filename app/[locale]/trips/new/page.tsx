"use client";

import { Button } from "@/components/ui/button";
import { createTrip } from "@/lib/actions/Trip";
import { UploadButton } from "@/lib/uploadthings";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState, useTransition } from "react";
import { Loader2, ArrowLeft, Calendar as CalendarIcon, X, Plus } from "lucide-react";
import { useIntlayer } from "next-intlayer";
import { Link } from "@/components/Link";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Cormorant_Garamond } from 'next/font/google';

const cormorant = Cormorant_Garamond({
  weight: ['300', '400', '500'],
  subsets: ['latin'],
  style: ["italic"]
});

export default function NewTrip() {
  const [isPending, startTransition] = useTransition();
  const [wallpaper, setWallpaper] = useState<string | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const content = useIntlayer("new-trip-page");

  const inputBaseStyle = "w-full bg-transparent border-b border-gray-200 text-gray-900 placeholder-gray-300 py-3 font-light focus:outline-none focus:border-black transition-colors duration-300 rounded-none";

  const handleSubmit = (formData: FormData) => {
    if (wallpaper) formData.append("wallpaper", wallpaper);
    if (images.length > 0) formData.append("images", JSON.stringify(images));
    if (startDate) formData.append("startDate", startDate.toISOString().split("T")[0]);
    if (endDate) formData.append("endDate", endDate.toISOString().split("T")[0]);

    startTransition(() => {
      createTrip(formData);
    });
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] max-w-[1440px] mx-auto px-6 py-6 lg:px-24 sm:px-6">
      <div className="pt-16 sm:pt-20 md:pt-[80px] pb-6 sm:pb-8 md:pb-[30px]">
        <div className="mb-16">
          <Link href="/trips" className="group flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-black transition-colors">
            <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-1" />
            Retour à la collection
          </Link>
        </div>

        <div className="mt-12 mb-12">
          <h1 className={`${cormorant.className} italic text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-light leading-tight`}>
            {content.tripDetails}
          </h1>
          <p className="text-gray-400 font-light text-xs tracking-widest uppercase italic">
            Nouveau récit de voyage
          </p>
        </div>

        <form action={handleSubmit} className="space-y-24">
          <div className="space-y-10">

            {/* Wallpaper Section */}
            <div className="space-y-6">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Couverture (Wallpaper)</label>
              {wallpaper ? (
                <div className="relative aspect-21/9 w-full overflow-hidden bg-gray-50 group">
                  <Image src={wallpaper} alt="Preview" fill className="object-cover" />
                  <button
                    type="button"
                    onClick={() => setWallpaper(null)}
                    className="absolute top-4 right-4 bg-white/90 p-2 backdrop-blur-md hover:bg-red-50 transition-colors"
                  >
                    <X className="h-4 w-4 text-red-500" />
                  </button>
                </div>
              ) : (
                <div className="border border-dashed border-gray-100 aspect-21/9 flex items-center justify-center bg-gray-50/30 hover:bg-gray-50 transition-colors">
                  <UploadButton
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => { if (res?.[0].ufsUrl) setWallpaper(res[0].ufsUrl); }}
                    appearance={{
                      button: "bg-white text-black border border-gray-200 text-[10px] font-bold uppercase tracking-widest px-10 py-4 shadow-sm hover:border-black transition-all",
                      allowedContent: "hidden"
                    }}
                  />
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 gap-12">
              <div className="">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">{content.titleLabel}</label>
                <input
                  type="text"
                  name="title"
                  className={inputBaseStyle}
                  placeholder={content.titlePlaceholder.value}
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">{content.descriptionLabel}</label>
                <textarea
                  name="description"
                  rows={1}
                  className={cn(inputBaseStyle, "resize-none")}
                  placeholder={content.descriptionPlaceholder.value}
                  required
                />
              </div>
            </div>

            {/* Dates côte à côte */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">{content.startDateLabel}</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <button type="button" className={inputBaseStyle + " flex justify-between items-center text-left"}>
                      <span className={!startDate ? "text-gray-300" : ""}>
                        {startDate ? format(startDate, "dd MMMM yyyy") : "Date de départ"}
                      </span>
                      <CalendarIcon className="h-3 w-3 text-gray-300" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 border-none shadow-2xl" align="start">
                    <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">{content.endDateLabel}</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <button type="button" className={inputBaseStyle + " flex justify-between items-center text-left"}>
                      <span className={!endDate ? "text-gray-300" : ""}>
                        {endDate ? format(endDate, "dd MMMM yyyy") : "Date de retour"}
                      </span>
                      <CalendarIcon className="h-3 w-3 text-gray-300" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 border-none shadow-2xl" align="start">
                    <Calendar mode="single" selected={endDate} onSelect={setEndDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>



          {/* Galerie Images Supplémentaires
          <div className="space-y-6">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Galerie d'instants</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {images.map((img, index) => (
                <div key={index} className="relative aspect-square bg-gray-50 overflow-hidden group">
                  <Image src={img} alt={`Moment ${index}`} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                  <button 
                    type="button"
                    onClick={() => removeImage(index)} 
                    className="absolute top-2 right-2 bg-white/90 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
              <div className="aspect-square border border-dashed border-gray-100 flex items-center justify-center hover:bg-gray-50 transition-colors">
                 <UploadButton
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => { if (res?.[0].ufsUrl) setImages([...images, res[0].ufsUrl]); }}
                  content={{ button: <Plus className="w-5 h-5 text-gray-300" /> }}
                  appearance={{
                    button: "bg-transparent border-0 w-full h-full",
                    allowedContent: "hidden"
                  }}
                />
              </div>
            </div>
          </div> */}

          {/* Submit */}
          <div className="pt-10 flex flex-col md:flex-row items-center justify-between gap-8 border-t border-gray-50">
            <p className="text-[10px] text-gray-300 uppercase tracking-widest  italic">
              {content.imageHelper}
            </p>
            <Button
              type="submit"
              disabled={isPending || !startDate || !endDate}
              className="bg-black text-white px-6 py-2 rounded-xs text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              {isPending ? (
                <span className="flex items-center gap-3"><Loader2 className="h-4 w-4 animate-spin" /> {content.submitButtonCreating}</span>
              ) : (
                content.submitButtonSave
              )}
            </Button>
          </div>

        </form>
      </div>
    </div>
  );
}