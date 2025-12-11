"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Autocomplete from "react-google-autocomplete"
import { cn } from "@/lib/utils" 
import { MapPin, Loader2 } from "lucide-react"

interface PlaceResult extends google.maps.places.PlaceResult {}

interface GooglePlacesAutocompleteProps {
    value?: string
    onChange?: (value: string) => void
    onPlaceSelected?: (place: PlaceResult) => void
    placeholder?: string
    className?: string
    disabled?: boolean
    types?: string[]
    fields?: string[]
    showIcon?: boolean
    error?: string
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
    ],
    showIcon = true,
    error
}: GooglePlacesAutocompleteProps) {
    
    const [inputValue, setInputValue] = useState(value)
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (value !== inputValue) {
            setInputValue(value)
        }
    }, [value])
    useEffect(() => {
        const checkGoogleMaps = () => {
            if (window.google && window.google.maps && window.google.maps.places) {
                setIsLoaded(true)
                setIsLoading(false)
                return true
            }
            return false
        }

        if (checkGoogleMaps()) return
        const interval = setInterval(() => {
            if (checkGoogleMaps()) {
                clearInterval(interval)
            }
        }, 200)

        const timeout = setTimeout(() => {
            clearInterval(interval)
            setIsLoading(false)
            if (!isLoaded) {
               
            }
        }, 3000) 

        return () => {
            clearInterval(interval)
            clearTimeout(timeout)
        }
    }, [])

    
    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value) 
        onChange?.(e.target.value)    
    }, [onChange])

    const handlePlaceSelected = useCallback((place: PlaceResult) => {
        const placeName = place.formatted_address || place.name || ""
        
        setInputValue(placeName)
        
        onChange?.(placeName)
        
        onPlaceSelected?.(place)
    }, [onChange, onPlaceSelected])

    const inputClasses = cn(
        "w-full px-4 py-3 rounded-lg",
        "border transition-all duration-200",
        "focus:outline-none focus:ring-2",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        error 
            ? "border-red-300 focus:border-red-500 focus:ring-red-500/20" 
            : "border-gray-200 focus:border-blue-500 focus:ring-blue-500/20",
        showIcon && "pl-11",
        className
    )

    if (isLoading && !isLoaded) {
        return (
            <div className="relative">
                {showIcon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <Loader2 className="h-5 w-5 animate-spin" />
                    </div>
                )}
                <input 
                    type="text" 
                    placeholder="Chargement de Google Maps..." 
                    disabled 
                    className={inputClasses}
                />
            </div>
        )
    }

    if (!isLoaded && !isLoading) {
        return (
            <div className="space-y-2">
                <div className="relative">
                    {showIcon && (
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-red-400">
                            <MapPin className="h-5 w-5" />
                        </div>
                    )}
                    <input 
                        type="text" 
                        placeholder="Erreur de chargement de Google Maps" 
                        disabled 
                        className={cn(inputClasses, "border-red-300 bg-red-50")}
                    />
                </div>
                <p className="text-xs text-red-500">
                    Impossible de charger Google Maps. Vérifiez l'inclusion du script API.
                </p>
            </div>
        )
    }

    return (
        <div className="space-y-1">
            <div className="relative">
                {showIcon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10">
                        <MapPin className="h-5 w-5" />
                    </div>
                )}
     
                <Autocomplete
                    apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
                    value={inputValue} 
                    onChange={handleChange}
                    onPlaceSelected={handlePlaceSelected}
                    options={{
                        types,
                        fields
                    }}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={inputClasses}
                    
                />
            </div>
            {error && (
                <p className="text-xs text-red-500 ml-1">
                    {error}
                </p>
            )}
        </div>
    )
}