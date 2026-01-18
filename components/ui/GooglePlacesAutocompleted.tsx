"use client"

import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import { Loader2, X } from "lucide-react"

interface PlaceResult extends google.maps.places.PlaceResult { }

interface GooglePlacesAutocompleteProps {
    value?: string
    defaultValue?: string
    onChange?: (value: string) => void
    onPlaceSelected?: (place: PlaceResult) => void
    placeholder?: string
    className?: string
    disabled?: boolean
    types?: string[]
    fields?: string[]
    showIcon?: boolean
    error?: string
    name?: string
}

export default function GooglePlacesAutocomplete({
    value,
    defaultValue = "",
    onChange,
    onPlaceSelected,
    placeholder = "Rechercher une adresse...",
    className,
    disabled = false,
    types = [],
    fields = ["address_components", "geometry", "place_id", "formatted_address", "name"],
    showIcon = true,
    error,
    name
}: GooglePlacesAutocompleteProps) {

    const [isLoaded, setIsLoaded] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [inputValue, setInputValue] = useState(defaultValue || value || "")
    const inputRef = useRef<HTMLInputElement>(null)
    const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null)
    const listenerRef = useRef<google.maps.MapsEventListener | null>(null)

    const onChangeRef = useRef(onChange)
    const onPlaceSelectedRef = useRef(onPlaceSelected)

    useEffect(() => {
        onChangeRef.current = onChange
        onPlaceSelectedRef.current = onPlaceSelected
    }, [onChange, onPlaceSelected])

    useEffect(() => {
        const checkGoogleMaps = () => {
            if (window.google?.maps?.places) {
                setIsLoaded(true)
                setIsLoading(false)
                return true
            }
            return false
        }
        if (checkGoogleMaps()) return
        const interval = setInterval(() => { if (checkGoogleMaps()) clearInterval(interval) }, 200)
        return () => clearInterval(interval)
    }, [])

    const initAutocomplete = () => {
        if (!isLoaded || !inputRef.current) return
        
        const options: google.maps.places.AutocompleteOptions = { fields }
        if (types?.length) options.types = types

        const autocomplete = new google.maps.places.Autocomplete(inputRef.current, options)
        
        // Custom styling for the Google dropdown (Injecting into head)
        const styleId = "google-autocomplete-custom-style"
        if (!document.getElementById(styleId)) {
            const style = document.createElement('style')
            style.id = styleId
            style.innerHTML = `
                .pac-container {
                    background-color: #ffffff;
                    border: 1px solid #EEE !important;
                    border-top: none !important;
                    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05) !important;
                    border-radius: 0px !important;
                    font-family: inherit !important;
                    margin-top: 0px !important;
                }
                .pac-item {
                    padding: 12px 16px !important;
                    border-top: 1px solid #F9F9F9 !important;
                    cursor: pointer !important;
                    font-size: 12px !important;
                }
                .pac-item:hover { background-color: #FBFBFB !important; }
                .pac-item-query { font-size: 13px !important; color: #000 !important; }
                .pac-logo:after { display: none !important; }
            `
            document.head.appendChild(style)
        }

        const listener = autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace()
            const placeName = place.formatted_address || place.name || ""
            if (placeName) {
                setInputValue(placeName)
                onChangeRef.current?.(placeName)
                onPlaceSelectedRef.current?.(place)
            }
        })
        autocompleteRef.current = autocomplete
        listenerRef.current = listener
    }

    useEffect(() => {
        initAutocomplete()
        return () => { if (listenerRef.current) google.maps.event.removeListener(listenerRef.current) }
    }, [isLoaded, types, fields])

    useEffect(() => { if (value !== undefined) setInputValue(value) }, [value])

    const inputClasses = cn(
        "w-full bg-transparent py-3 rounded-none font-light transition-all duration-300",
        "border-b text-gray-900 placeholder-gray-300",
        "focus:outline-none focus:border-black",
        error ? "border-red-400" : "border-gray-200",
        disabled && "opacity-50 cursor-not-allowed",
        className
    )

    return (
        <div className="space-y-1 w-full">
            <div className="relative group">
                {isLoading && (
                    <div className="absolute right-0 top-1/2 -translate-y-1/2">
                        <Loader2 className="h-3 w-3 animate-spin text-gray-300" />
                    </div>
                )}

                <input
                    ref={inputRef}
                    type="text"
                    name={name}
                    value={inputValue}
                    onChange={(e) => {
                        setInputValue(e.target.value)
                        onChangeRef.current?.(e.target.value)
                    }}
                    onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault() }}
                    placeholder={placeholder}
                    disabled={disabled || isLoading}
                    className={inputClasses}
                    autoComplete="off"
                />

                {inputValue && !disabled && (
                    <button
                        type="button"
                        onClick={() => { setInputValue(""); onChangeRef.current?.(""); initAutocomplete(); }}
                        className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-300 hover:text-black transition-colors"
                    >
                        <X className="h-3 w-3" />
                    </button>
                )}
            </div>
            {error && <p className="text-[10px] uppercase tracking-widest text-red-500 mt-2">{error}</p>}
        </div>
    )
}