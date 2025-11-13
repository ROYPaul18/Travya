"use client"

import { useTransition, useState } from "react"
import { Button } from "./ui/button"
import { addLocation } from "@/lib/actions/Itinerary"
import { MapPin, Loader2 } from "lucide-react"
import { useIntlayer } from "next-intlayer"
import GooglePlacesAutocomplete from "@/components/ui/GooglePlacesAutocompleted"

export default function NewLocation({ tripId }: { tripId: string }) {
    const [isPending, startTransition] = useTransition()
    const [selectedPlace, setSelectedPlace] = useState<google.maps.places.PlaceResult | null>(null)
    const [address, setAddress] = useState("")
    const content = useIntlayer("new-location")

    const handlePlaceSelected = (place: google.maps.places.PlaceResult) => {
        console.log("Place sélectionné:", place)
        setSelectedPlace(place)
        setAddress(place.formatted_address || "")
    }

    const handleSubmit = (formData: FormData) => {
        if (selectedPlace) {
            formData.set("placeId", selectedPlace.place_id || "")
            formData.set("latitude", selectedPlace.geometry?.location?.lat()?.toString() || "")
            formData.set("longitude", selectedPlace.geometry?.location?.lng()?.toString() || "")
            formData.set("formattedAddress", selectedPlace.formatted_address || "")
        }
        startTransition(() => {
            addLocation(formData, tripId)
        })
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
            <div className="w-full max-w-md mx-auto px-4 relative z-10">
                <div className="bg-white/10 backdrop-blur-md p-8 shadow-2xl rounded-2xl border border-white/20">

                    <div className="text-center mb-8 space-y-4">
                        <div className="inline-flex items-center justify-center bg-blue-500/20 p-4 rounded-full mb-2">
                            <MapPin className="h-10 w-10 text-blue-300" />
                        </div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-200 via-cyan-200 to-blue-200 bg-clip-text text-transparent">
                            {content.title}
                        </h1>
                        <p className="text-blue-200/80">{content.subtitle}</p>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-blue-100 mb-2 flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-blue-300" />
                                {content.addressLabel}
                            </label>

                            <GooglePlacesAutocomplete
                                value={address}
                                onChange={setAddress}
                                onPlaceSelected={handlePlaceSelected}
                                placeholder={content.addressPlaceholder.value}
                            />
                        </div>

                        <Button
                            type="button"
                            onClick={() => {
                                const formData = new FormData()
                                formData.set("address", address)
                                handleSubmit(formData)
                            }}
                            disabled={isPending || !address.trim()}
                            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-medium py-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isPending ? (
                                <>
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                    {content.addingButton}
                                </>
                            ) : (
                                <>
                                    <MapPin className="h-5 w-5" />
                                    {content.addButton}
                                </>
                            )}
                        </Button>
                    </div>

                    <div className="mt-6 p-4 bg-blue-500/10 rounded-lg border border-blue-400/20">
                        <p className="text-sm text-blue-200/80 text-center">
                            {content.helperText}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}