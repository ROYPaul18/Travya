"use client";

import { Button } from "@/components/ui/button";
import { Categorie } from "@/app/generated/prisma/client";
import { addActivity } from "@/lib/actions/Activity";
import { UploadButton } from "@/lib/uploadthings";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState, useTransition } from "react";
import { Loader2, ArrowLeft, X } from "lucide-react";
import { Link } from "@/components/Link";
import { useRouter } from "next/navigation";
import GooglePlacesAutocomplete from "@/components/ui/GooglePlacesAutocompleted";
import { useIntlayer } from "next-intlayer";

interface AddActivityPageProps {
    tripId: string;
    locationId: string;
}

export default function AddActivityPage({ tripId, locationId }: AddActivityPageProps) {
    const content = useIntlayer("activity-page");
    const [isPending, startTransition] = useTransition();
    const [image, setImage] = useState<string | null>(null);
    const router = useRouter();
    const [selectedCategory, setSelectedCategory] = useState<Categorie>("AUTRE");

    const [coordinates, setCoordinates] = useState<{ lat: number | null; lng: number | null }>({
        lat: null,
        lng: null,
    });

    const categories = [
        { value: "RESTAURANT", label: content.categories.restaurant.value },
        { value: "VISITE", label: content.categories.visit.value },
        { value: "ACTIVITE", label: content.categories.activity.value },
        { value: "HEBERGEMENT", label: content.categories.accommodation.value },
        { value: "TRANSPORT", label: content.categories.transport.value },
        { value: "SHOPPING", label: content.categories.shopping.value },
        { value: "AUTRE", label: content.categories.other.value }
    ];

    const handleSubmit = (formData: FormData) => {
        if (!locationId || locationId === "undefined") return;
        if (image) formData.append("image", image);
        formData.set("category", selectedCategory);
        formData.set("locationId", locationId);
        if (coordinates.lat) formData.set("lat", coordinates.lat.toString());
        if (coordinates.lng) formData.set("lng", coordinates.lng.toString());

        startTransition(async () => {
            try {
                await addActivity(formData, locationId, tripId);
                router.push(`/trips/${tripId}`);
            } catch (error) {
                console.error(error);
            }
        });
    };

    // Style commun pour les labels de section
    const SectionLabel = ({ children }: { children: React.ReactNode }) => (
        <h2 className="text-[10px] tracking-[0.2em] font-semibold text-[#999] uppercase mb-6 border-b border-[#EEE] pb-2">
            {children}
        </h2>
    );

    // Style commun pour les inputs
    const inputClasses = "w-full bg-transparent border-b border-gray-200 text-gray-900 placeholder-gray-300 py-3 rounded-none font-light focus:outline-none focus:border-black transition-colors duration-300";

    return (
        <div className="min-h-screen bg-white font-sans">
            <div className="container mx-auto px-6 py-12 max-w-3xl">
                
                {/* Back Link */}
                <div className="mb-12">
                    <Link href={`/trips/${tripId}`}>
                        <button className="flex items-center gap-2 text-[10px] tracking-widest uppercase text-gray-400 hover:text-black transition-colors">
                            <ArrowLeft className="h-3 w-3" />
                            {content.backToTrip.value}
                        </button>
                    </Link>
                </div>

                <header className="mb-16">
                    <h1 className="text-4xl font-extralight tracking-tight text-gray-900 mb-4 font-logo italic">
                        {content.addActivityTitle.value}
                    </h1>
                    <p className="text-[#999] font-light tracking-wide text-sm uppercase">
                        {content.addActivitySubtitle.value}
                    </p>
                </header>

                <form action={handleSubmit} className="space-y-16">
                    
                    {/* Catégories - Style Boutons Minimalistes */}
                    <div className="space-y-6">
                        <SectionLabel>{content.category.value}</SectionLabel>
                        <div className="flex flex-wrap gap-3">
                            {categories.map((cat) => (
                                <button
                                    key={cat.value}
                                    type="button"
                                    onClick={() => setSelectedCategory(cat.value as Categorie)}
                                    className={cn(
                                        "px-5 py-2 text-[10px] tracking-widest uppercase border transition-all duration-300",
                                        selectedCategory === cat.value
                                            ? "bg-black text-white border-black"
                                            : "bg-transparent text-gray-400 border-gray-200 hover:border-gray-400"
                                    )}
                                >
                                    {cat.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Infos Générales */}
                    <div className="space-y-10">
                        <SectionLabel>{content.generalInfo.value}</SectionLabel>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="space-y-2">
                                <label className="text-[9px] uppercase tracking-widest text-gray-400">{content.activityName.value}</label>
                                <input type="text" name="name" className={inputClasses} placeholder="..." required />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[9px] uppercase tracking-widest text-gray-400">{content.price.value} (€)</label>
                                <input type="number" name="budget" className={inputClasses} placeholder="0.00" />
                            </div>
                        </div>
                    </div>

                    {/* Localisation */}
                    <div className="space-y-8">
                        <SectionLabel>{content.location.value}</SectionLabel>
                        <div className="space-y-2">
                            <label className="text-[9px] uppercase tracking-widest text-gray-400">{content.address.value}</label>
                            <GooglePlacesAutocomplete
                                name="address"
                                onPlaceSelected={(place) => {
                                    const loc = place.geometry?.location;
                                    setCoordinates({ lat: loc?.lat() || null, lng: loc?.lng() || null });
                                }}
                                // Note: Ton composant GooglePlacesAutocomplete devra idéalement accepter des classes pour l'input
                            />
                        </div>
                    </div>

                    {/* Image Upload - Style Épuré */}
                    <div className="space-y-8">
                        <SectionLabel>{content.image.value}</SectionLabel>
                        {image ? (
                            <div className="relative group grayscale hover:grayscale-0 transition-all duration-500">
                                <Image src={image} alt="Preview" className="w-full h-80 object-cover border border-gray-100" width={1200} height={400} />
                                <button onClick={() => setImage(null)} className="absolute top-4 right-4 bg-black p-2 text-white">
                                    <X className="h-4 w-4" />
                                </button>
                            </div>
                        ) : (
                            <div className="border border-dashed border-gray-200 py-20 flex flex-col items-center justify-center bg-gray-50/30 group hover:bg-white transition-colors">
                                <UploadButton
                                    endpoint="imageUploader"
                                    onClientUploadComplete={(res) => void (res?.[0]?.url && setImage(res[0].url))}
                                    appearance={{
                                        button: "bg-black text-white rounded-none text-[10px] uppercase tracking-[0.3em] px-8 py-4 h-auto",
                                        allowedContent: "text-[10px] text-gray-400 uppercase tracking-widest mt-4"
                                    }}
                                />
                            </div>
                        )}
                    </div>

                    {/* Description */}
                    <div className="space-y-8">
                        <SectionLabel>{content.description.value}</SectionLabel>
                        <textarea
                            name="description"
                            rows={4}
                            className={cn(inputClasses, "resize-none border border-gray-100 p-4 focus:border-black")}
                            placeholder={content.descriptionPlaceholder.value}
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-10">
                        <Button
                            type="submit"
                            disabled={isPending}
                            className="flex-1 bg-black hover:bg-[#B59E80] text-white rounded-none py-8 text-[11px] tracking-[0.4em] uppercase transition-all duration-500"
                        >
                            {isPending ? <Loader2 className="animate-spin" /> : content.createActivity.value}
                        </Button>
                        <Link href={`/trips/${tripId}`} className="flex-1">
                            <Button variant="outline" className="w-full rounded-none py-8 text-[11px] tracking-[0.4em] uppercase border-gray-200 hover:bg-gray-50">
                                {content.cancel.value}
                            </Button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}