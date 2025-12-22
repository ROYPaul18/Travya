"use client"

import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import { MapPin, Loader2 } from "lucide-react"

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
    fields = [
        "address_components",
        "geometry",
        "place_id",
        "formatted_address",
        "name"
    ],
    showIcon = true,
    error,
    name
}: GooglePlacesAutocompleteProps) {

    const [isLoaded, setIsLoaded] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const inputRef = useRef<HTMLInputElement>(null)
    const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null)

    const onChangeRef = useRef(onChange)
    const onPlaceSelectedRef = useRef(onPlaceSelected)

    useEffect(() => {
        onChangeRef.current = onChange
        onPlaceSelectedRef.current = onPlaceSelected
    }, [onChange, onPlaceSelected])

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
        }, 3000)

        return () => {
            clearInterval(interval)
            clearTimeout(timeout)
        }
    }, [])

    useEffect(() => {
        if (!isLoaded || !inputRef.current || autocompleteRef.current) return

        console.log("🚀 Initialisation de l'autocomplete Google Places");

        try {
            const options: google.maps.places.AutocompleteOptions = {
                fields: fields
            }

            if (types && types.length > 0) {
                options.types = types
                console.log("📍 Types configurés:", types);
            }

            const autocomplete = new google.maps.places.Autocomplete(
                inputRef.current,
                options
            )

            let pacContainerInitialized = false
            const initializePacContainer = () => {
                const pacContainers = document.querySelectorAll('.pac-container')
                pacContainers.forEach(container => {
                    if (!pacContainerInitialized) {
                        (container as HTMLElement).style.zIndex = '99999';
                        container.setAttribute('data-pac-container', 'true')
                        pacContainerInitialized = true
                    }
                })
            }

            const observer = new MutationObserver(() => {
                if (!pacContainerInitialized) {
                    initializePacContainer()
                }
            })

            observer.observe(document.body, {
                childList: true,
                subtree: true
            })

            const listener = autocomplete.addListener('place_changed', () => {
                const place = autocomplete.getPlace()

                const placeName = place.formatted_address || place.name || ""

                if (!placeName) return

                // Mettre à jour l'input DOM
                if (inputRef.current) {
                    inputRef.current.value = placeName
                }

                // Notifier le parent
                onChangeRef.current?.(placeName)
                onPlaceSelectedRef.current?.(place)
            })

            autocompleteRef.current = autocomplete
            console.log("✅ Autocomplete initialisé avec succès");

            return () => {
                console.log("🧹 Nettoyage de l'autocomplete");
                observer.disconnect()
                if (listener) {
                    google.maps.event.removeListener(listener)
                }
            }
        } catch (error) {
            console.error("❌ Erreur lors de l'initialisation de l'autocomplete:", error)
        }
    }, [isLoaded, types, fields])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChangeRef.current?.(e.target.value)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const pacContainer = document.querySelector('.pac-container')
            const isVisible = pacContainer && window.getComputedStyle(pacContainer).display !== 'none'

            if (isVisible) {
                console.log("⏸️ Entrée bloquée car liste visible");
                e.preventDefault()
            }
        }
    }

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

                <input
                    ref={inputRef}
                    type="text"
                    name={name}
                    defaultValue={defaultValue || value}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={inputClasses}
                    autoComplete="off"
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