"use client";

import React, { useState, useRef, useEffect } from "react";
import { Loader2, MapPin } from "lucide-react";
import { useIntlayer } from "next-intlayer";
import { ActivityFormProps } from "@/lib/utils/types/types";
import GooglePlacesAutocomplete from "@/components/ui/GooglePlacesAutocompleted";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";


const ActivityForm: React.FC<ActivityFormProps> = ({
  locationId,
  tripId,
  onCancel,
  onSuccess,
  addActivity,
}) => {
  const content = useIntlayer("activity-form");
  const [address, setAddress] = useState("");
  const [selectedPlace, setSelectedPlace] = useState<google.maps.places.PlaceResult | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [addressError, setAddressError] = useState<string | undefined>(undefined);
  
  
  const formRef = useRef<HTMLFormElement>(null);


  useEffect(() => {
    if (address.trim() && addressError) {
      setAddressError(undefined);
    }
  }, [address]);

  const categories = [
    { value: "restaurant", label: content.categories.restaurant, emoji: "🍽️" },
    { value: "monument", label: content.categories.monument, emoji: "🏛️" },
    { value: "museum", label: content.categories.museum, emoji: "🖼️" },
    { value: "park", label: content.categories.park, emoji: "🌳" },
    { value: "activity", label: content.categories.activity, emoji: "🎯" },
    { value: "accommodation", label: content.categories.accommodation, emoji: "🏨" },
  ];

  const handlePlaceSelected = (place: google.maps.places.PlaceResult) => {
    console.log("Place sélectionné dans ActivityForm:", place);
    setSelectedPlace(place);
    if (place.formatted_address) {
        setAddress(place.formatted_address);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmitting) return;
    if (!address.trim()) {
        setAddressError(content.validation.addressRequired || "Veuillez sélectionner une adresse ou la saisir manuellement.");
        return;
    }
    setAddressError(undefined);
    try {
      setIsSubmitting(true);
      const formData = new FormData(e.currentTarget);
      formData.set("address", address); 

      if (selectedPlace) {
        formData.set("placeId", selectedPlace.place_id || "");
        const lat = selectedPlace.geometry?.location?.lat();
        const lng = selectedPlace.geometry?.location?.lng();
        
        if (lat !== undefined && lng !== undefined) {
            formData.set("latitude", lat.toString());
            formData.set("longitude", lng.toString());
        }
        formData.set("formattedAddress", selectedPlace.formatted_address || address);
      } else {
        formData.set("placeId", "");
        formData.set("latitude", "");
        formData.set("longitude", "");
        formData.set("formattedAddress", address);
      }

      await addActivity(formData, locationId, tripId);
      onSuccess();
    } catch (error) {
      console.error("Erreur lors de la soumission:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="bg-white rounded-sm w-full max-w-full md:max-w-2xl mx-auto"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
        <h3 className="text-lg sm:text-xl font-light text-gray-900">
          {content.newActivity}
        </h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-light text-gray-900 mb-1.5 sm:mb-2">
            {content.activityName}
          </label>
          <input
            type="text"
            name="name"
            required
            disabled={isSubmitting}
            placeholder={content.activityNamePlaceholder.value}
            className={cn(
                "w-full bg-white border border-gray-300 rounded-sm px-4 h-11 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 disabled:opacity-50 disabled:bg-gray-50 font-light",
            )}
          />
        </div>
        <div>
          <label className="block text-sm font-light text-gray-900 mb-1.5 sm:mb-2">
            {content.address}
          </label>
          <GooglePlacesAutocomplete
            value={address}
            onChange={setAddress}
            onPlaceSelected={handlePlaceSelected}
            placeholder={content.addressPlaceholder.value}
            disabled={isSubmitting}
            // Ajout de la prop 'error' pour le style
            error={addressError} 
            className="border-gray-300 text-gray-900 placeholder:text-gray-400 focus:ring-blue-200 focus:border-blue-500 rounded-sm h-11 font-light"
          />
          {/* L'input caché est retiré car 'address' est injecté dans FormData */}
          
          {addressError && (
            <p className="text-xs text-red-500 mt-1 ml-1 flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {addressError}
            </p>
          )}

        </div>

        {/* Catégorie */}
        <div>
          <label className="block text-sm font-light text-gray-900 mb-1.5 sm:mb-2">
            {content.category}
          </label>
          <select
            name="category"
            required
            disabled={isSubmitting}
            className="w-full bg-white border border-gray-300 rounded-sm px-4 h-11 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 disabled:opacity-50 disabled:bg-gray-50 appearance-none cursor-pointer font-light"
            // Important: la première option sélectionnable est celle par défaut
            defaultValue="" 
          >
            <option value="" disabled className="bg-white">
              {content.selectCategory}
            </option>
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value} className="bg-white">
                {cat.emoji} {cat.label}
              </option>
            ))}
          </select>
        </div>

        {/* Horaires → mobile column / desktop row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-light text-gray-900 mb-1.5 sm:mb-2">
              {content.startTime}
            </label>
            <Input
              type="time"
              name="startTime"
              disabled={isSubmitting}
              className="w-full bg-white border border-gray-300 rounded-sm px-4 h-11 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 disabled:opacity-50 disabled:bg-gray-50 font-light"
            />
          </div>

          <div>
            <label className="block text-sm font-light text-gray-900 mb-1.5 sm:mb-2">
              {content.endTime}
            </label>
            <Input
              type="time"
              name="endTime"
              disabled={isSubmitting}
              className="w-full bg-white border border-gray-300 rounded-sm px-4 h-11 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 disabled:opacity-50 disabled:bg-gray-50 font-light"
            />
          </div>
        </div>

        {/* Budget */}
        <div>
          <label className="block text-sm font-light text-gray-900 mb-1.5 sm:mb-2">
            {content.budget}
          </label>
          <input
            type="number"
            name="budget"
            min="0"
            step="0.01"
            disabled={isSubmitting}
            placeholder={content.budgetPlaceholder.value}
            className="w-full bg-white border border-gray-300 rounded-sm px-4 h-11 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 disabled:opacity-50 disabled:bg-gray-50 font-light"
          />
        </div>

        <div>
          <label className="block text-sm font-light text-gray-900 mb-1.5 sm:mb-2">
            {content.description}
          </label>
          <textarea
            name="description"
            rows={3}
            disabled={isSubmitting}
            placeholder={content.descriptionPlaceholder.value}
            className="w-full bg-white border border-gray-300 rounded-sm px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 resize-none disabled:opacity-50 disabled:bg-gray-50 font-light"
          />
        </div>

        {/* Affichage des données sélectionnées */}
        {selectedPlace && (
          <div className="bg-green-50 border border-green-300 rounded-sm p-3 text-xs font-light">
            <p className="text-green-700 flex items-start gap-2">
              <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" /> 
              Lieu sélectionné : **{selectedPlace.name || selectedPlace.formatted_address}**
            </p>
          </div>
        )}

        <div className="bg-blue-50 border border-blue-300 rounded-sm p-3 text-xs font-light">
          <p className="text-blue-700 flex items-start gap-2">
             
            {content.imageNote}
          </p>
        </div>
      </div>

      {/* Actions → stack on mobile, row on desktop */}
      <div className="flex flex-col md:flex-row gap-3 mt-6 pt-6 border-t border-gray-300">
        <button
          type="submit"
          disabled={isSubmitting || !address.trim()}
          className="w-full md:flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium h-11 rounded-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              {content.adding || "Ajout..."}
            </>
          ) : (
            content.addActivity
          )}
        </button>

        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="w-full md:w-auto md:px-6 bg-white border border-gray-300 hover:bg-gray-50 text-gray-600 font-light h-11 rounded-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {content.cancel}
        </button>
      </div>
    </form>
  );
};

export default ActivityForm;