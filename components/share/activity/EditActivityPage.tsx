"use client";

import { Button } from "@/components/ui/button";
import { Activity, Categorie } from "@/app/generated/prisma/client";
import { updateActivity } from "@/lib/actions/Activity";
import { UploadButton } from "@/lib/uploadthings";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState, useTransition } from "react";
import { Loader2, ArrowLeft, Clock, X } from "lucide-react";
import { Link } from "@/components/Link";
import { useRouter } from "next/navigation";
import GooglePlacesAutocomplete from "@/components/ui/GooglePlacesAutocompleted";
import { useIntlayer } from "next-intlayer";

interface EditActivityPageProps {
    activity: Activity;
    tripId: string;
}

export default function EditActivityPage({ activity, tripId }: EditActivityPageProps) {
    const content = useIntlayer("activity-page");
    const [isPending, startTransition] = useTransition();
    const [image, setImage] = useState<string | null>(activity.wallpaper || null);
    const router = useRouter();
    const [selectedCategory, setSelectedCategory] = useState<Categorie>(activity.category || "AUTRE");

    const [coordinates, setCoordinates] = useState<{
        lat: number | null;
        lng: number | null;
    }>({
        lat: activity.lat || null,
        lng: activity.lng || null,
    });

    const handleSubmit = (formData: FormData) => {
        if (image) {
            formData.append("image", image);
        }
        formData.set("category", selectedCategory);

        if (coordinates.lat !== null) {
            formData.set("lat", coordinates.lat.toString());
        }
        if (coordinates.lng !== null) {
            formData.set("lng", coordinates.lng.toString());
        }

        startTransition(async () => {
            try {
                await updateActivity(activity.id, formData, tripId);
                router.push(`/trips/${tripId}`);
            } catch (error) {
                console.error("Erreur lors de la mise à jour:", error);
                alert(content.errorUpdate.value);
            }
        });
    };

    const categories = [
        { value: "RESTAURANT", label: `🍽️ ${content.categories.restaurant.value}` },
        { value: "VISITE", label: `🏛️ ${content.categories.visit.value}` },
        { value: "ACTIVITE", label: `🚴 ${content.categories.activity.value}` },
        { value: "HEBERGEMENT", label: `🏠 ${content.categories.accommodation.value}` },
        { value: "TRANSPORT", label: `🚗 ${content.categories.transport.value}` },
        { value: "SHOPPING", label: `🛍️ ${content.categories.shopping.value}` },
        { value: "AUTRE", label: `🎯 ${content.categories.other.value}` }
    ];

    return (
        <div className="min-h-screen bg-white">
            <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 max-w-4xl">
                {/* Header */}
                <div className="mb-8">
                    <Link href={`/trips/${tripId}`}>
                        <Button
                            variant="ghost"
                            className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 gap-2 pl-0 rounded-sm transition-colors font-light"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            <span>{content.backToTrip.value}</span>
                        </Button>
                    </Link>
                </div>

                <div className="mb-8">
                    <h1 className="text-3xl sm:text-4xl font-light text-gray-900 mb-2">
                        {content.editActivityTitle.value}
                    </h1>
                    <p className="text-gray-500 font-light">
                        {content.editActivitySubtitle.value}
                    </p>
                </div>

                {/* Form */}
                <div className="space-y-8">
                    <form
                        className="space-y-8"
                        action={(formData: FormData) => handleSubmit(formData)}
                    >
                        {/* Champ caché pour la catégorie */}
                        <input
                            type="hidden"
                            name="category"
                            value={selectedCategory}
                        />

                        {/* Informations générales */}
                        <div className="space-y-6">
                            <h2 className="text-lg font-light text-gray-900 border-b border-gray-200 pb-2">
                                {content.generalInfo.value}
                            </h2>

                            {/* Category */}
                            <div className="space-y-2">
                                <label className="text-sm font-light text-gray-900 flex items-center gap-2">
                                    {content.category.value}
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {categories.map((cat) => (
                                        <button
                                            key={cat.value}
                                            type="button"
                                            onClick={() => setSelectedCategory(cat.value as Categorie)}
                                            className={cn(
                                                "px-4 py-2 rounded-sm border text-sm",
                                                selectedCategory === cat.value
                                                    ? "bg-green-950 text-white"
                                                    : "bg-white text-gray-700 border-green-900 hover:border-gray-400"
                                            )}
                                        >
                                            {cat.label}
                                        </button>
                                    ))}
                                </div>
                           
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-light text-gray-900 flex items-center gap-2">
                                    {content.activityName.value}
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    defaultValue={activity.name}
                                    className={cn(
                                        "w-full bg-white border border-gray-300 text-gray-900",
                                        "placeholder-gray-400 px-4 py-3 rounded-sm font-light",
                                        "focus:outline-none focus:ring-2 focus:ring-gray-200",
                                        "focus:border-gray-500 transition-all duration-200",
                                    )}
                                    placeholder={content.namePlaceholder.value}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-light text-gray-900 flex items-center gap-2">
                                    {content.price.value}
                                </label>
                                <input
                                    type="number"
                                    name="budget"
                                    defaultValue={activity.budget || ""}
                                    min="0"
                                    className={cn(
                                        "w-full bg-white border border-gray-300 text-gray-900",
                                        "placeholder-gray-400 px-4 py-3 rounded-sm font-light",
                                        "focus:outline-none focus:ring-2 focus:ring-gray-200",
                                        "focus:border-gray-500 transition-all duration-200",
                                    )}
                                    placeholder="0.00"
                                />
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h2 className="text-lg font-light text-gray-900 border-b border-gray-200 pb-2">
                                {content.location.value}
                            </h2>

                            <div className="space-y-2">
                                <label className="text-sm font-light text-gray-900 flex items-center gap-2">
                                    {content.address.value}
                                </label>
                                <GooglePlacesAutocomplete
                                    name="address"
                                    defaultValue={activity.address || ""}
                                    onPlaceSelected={(place) => {
                                        if (place.geometry?.location) {
                                            const lat = place.geometry.location.lat();
                                            const lng = place.geometry.location.lng();
                                            setCoordinates({ lat, lng });
                                            console.log("📍 Nouvelles coordonnées:", { lat, lng });
                                        } else {
                                            setCoordinates({ lat: null, lng: null });
                                        }
                                    }}
                                    placeholder={content.addressPlaceholder.value}
                                    showIcon
                                />
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h2 className="text-lg font-light text-gray-900 border-b border-gray-200 pb-2 flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                {content.schedule.value}
                            </h2>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-light text-gray-900 flex items-center gap-2">
                                        {content.startTime.value}
                                    </label>
                                    <input
                                        type="time"
                                        name="startTime"
                                        defaultValue={activity.startTime || ""}
                                        className={cn(
                                            "w-full bg-white border border-gray-300 text-gray-900",
                                            "placeholder-gray-400 px-4 py-3 rounded-sm font-light",
                                            "focus:outline-none focus:ring-2 focus:ring-gray-200",
                                            "focus:border-gray-500 transition-all duration-200",
                                        )}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-light text-gray-900 flex items-center gap-2">
                                        {content.endTime.value}
                                    </label>
                                    <input
                                        type="time"
                                        name="endTime"
                                        defaultValue={activity.endTime || ""}
                                        className={cn(
                                            "w-full bg-white border border-gray-300 text-gray-900",
                                            "placeholder-gray-400 px-4 py-3 rounded-sm font-light",
                                            "focus:outline-none focus:ring-2 focus:ring-gray-200",
                                            "focus:border-gray-500 transition-all duration-200",
                                        )}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h2 className="text-lg font-light text-gray-900 border-b border-gray-200 pb-2">
                                {content.image.value}
                            </h2>

                            <div className="space-y-3">
                                <label className="text-sm font-light text-gray-900 flex items-center gap-2">
                                    {content.activityPhoto.value}
                                </label>

                                {image && (
                                    <div className="relative rounded-sm overflow-hidden border border-gray-300">
                                        <Image
                                            src={image}
                                            alt="Image de l'activité"
                                            className="w-full h-64 object-cover"
                                            width={800}
                                            height={256}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setImage(null)}
                                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                    </div>
                                )}

                                {!image && (
                                    <div className="bg-white border-2 border-dashed border-gray-300 rounded-sm p-6 sm:p-8 text-center hover:border-gray-400 transition-all duration-200">
                                        <UploadButton
                                            endpoint={"imageUploader"}
                                            onClientUploadComplete={(res) => {
                                                if (res && res[0].url) {
                                                    setImage(res[0].url);
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
                        </div>

                        <div className="space-y-6">
                            <h2 className="text-lg font-light text-gray-900 border-b border-gray-200 pb-2">
                                {content.description.value}
                            </h2>

                            <div className="space-y-2">
                                <label className="text-sm font-light text-gray-900 flex items-center gap-2">
                                    {content.activityDetails.value}
                                </label>
                                <textarea
                                    name="description"
                                    rows={6}
                                    defaultValue={activity.description || ""}
                                    className={cn(
                                        "w-full bg-white border border-gray-300 text-gray-900",
                                        "placeholder-gray-400 px-4 py-3 rounded-sm font-light",
                                        "focus:outline-none focus:ring-2 focus:ring-gray-200",
                                        "focus:border-gray-500 transition-all duration-200",
                                        "resize-none",
                                    )}
                                    placeholder={content.descriptionPlaceholder.value}
                                />
                            </div>
                        </div>

                        <div className="h-px bg-gray-200" />
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 pt-4">
                            <Link href={`/trips/${tripId}`} className="w-full sm:w-auto">
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="w-full sm:w-auto border-gray-300 text-gray-700 hover:bg-gray-50 font-medium py-3 px-8 rounded-sm h-auto"
                                    disabled={isPending}
                                >
                                    {content.cancel.value}
                                </Button>
                            </Link>
                            <Button
                                type="submit"
                                className="w-full sm:w-auto bg-green-950 hover:bg-green-900 text-white font-medium py-3 px-8 rounded-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 h-auto"
                                disabled={isPending}
                            >
                                {isPending ? (
                                    <>
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                        {content.saving.value}
                                    </>
                                ) : (
                                    <>{content.saveChanges.value}</>
                                )}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}