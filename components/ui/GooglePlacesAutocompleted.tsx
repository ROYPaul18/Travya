"use client";

import Autocomplete from "react-google-autocomplete";
import { cn } from "@/lib/utils";

interface GooglePlacesAutocompleteProps {
  value?: string;
  onChange?: (value: string) => void;
  onPlaceSelected?: (place: google.maps.places.PlaceResult) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  types?: string[];
  fields?: string[];
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
    "name",
  ],
}: GooglePlacesAutocompleteProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  const handlePlaceSelected = (place: google.maps.places.PlaceResult) => {
    onPlaceSelected?.(place);
  };

  return (
    <Autocomplete
      apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
      value={value}
      onChange={handleChange}
      onPlaceSelected={handlePlaceSelected}
      options={{
        types,
        fields,
      }}
      placeholder={placeholder}
      disabled={disabled}
      className={cn(
        "w-full bg-white border border-gray-300 text-gray-900",
        "placeholder:text-gray-400 font-light",
        "rounded-sm px-4 h-11",
        "focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-500",
        "disabled:opacity-50 disabled:bg-gray-50 disabled:cursor-not-allowed",
        "transition-all",
        className
      )}
    />
  );
}
