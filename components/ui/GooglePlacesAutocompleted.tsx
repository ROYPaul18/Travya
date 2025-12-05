"use client"

import { useState, useEffect } from "react"
import Autocomplete from "react-google-autocomplete"
import Script from "next/script" // 1. Import de Script
import { cn } from "@/lib/utils"

interface GooglePlacesAutocompleteProps {
    value?: string
    onChange?: (value: string) => void
    onPlaceSelected?: (place: google.maps.places.PlaceResult) => void
    placeholder?: string
    className?: string
    disabled?: boolean
    types?: string[]
    fields?: string[]
}

export default function GooglePlacesAutocomplete({
    value = "",
    onChange,
    onPlaceSelected,
    placeholder = "Rechercher une adresse...",
    className,
    disabled = false,
    types = [],
    fields = [
        "address_components",
        "geometry",
        "place_id",
        "formatted_address",
        "name"
    ]
}: GooglePlacesAutocompleteProps) {
    
    const [isScriptLoaded, setIsScriptLoaded] = useState(false);

    
    useEffect(() => {
        if (window.google && window.google.maps && window.google.maps.places) {
            setIsScriptLoaded(true);
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value)
    }

    const handlePlaceSelected = (place: google.maps.places.PlaceResult) => {
        onPlaceSelected?.(place)
    }

    return (
        <>
            {/* 3. Chargement explicite du script Google Maps */}
            <Script
                src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
                strategy="lazyOnload"
                onLoad={() => setIsScriptLoaded(true)}
            />

            {/* 4. On n'affiche l'Autocomplete que si le script est prêt */}
            {isScriptLoaded ? (
                <Autocomplete
                    value={value}
                    onChange={handleChange}
                    onPlaceSelected={handlePlaceSelected}
                    options={{
                        types,
                        fields
                    }}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={cn(
                        "w-full bg-white/5 border border-white/20 text-black placeholder-blue-200/50",
                        "px-4 py-3 rounded-lg",
                        "focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50",
                        "backdrop-blur-sm transition-all duration-300",
                        "disabled:opacity-50 disabled:cursor-not-allowed",
                        className
                    )}
                  
                    style={{
                        width: '100%',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        color: 'black',
                        padding: '0.75rem 1rem',
                        borderRadius: '0.5rem'
                    }}
                />
            ) : (
                <input 
                    type="text" 
                    placeholder="Chargement de Google Maps..." 
                    disabled 
                    className={cn(
                        "w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-400 animate-pulse",
                        className
                    )}
                />
            )}
        </>
    )
}