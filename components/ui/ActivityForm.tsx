"use client";

import React, { useState } from "react";
import {
  X,
  MapPin,
  Clock,
  Euro,
  FileText,
  Tag,
  Image as ImageIcon,
  Loader2,
} from "lucide-react";
import { useIntlayer } from "next-intlayer";
import { ActivityFormProps } from "@/lib/utils/types/types";
import GooglePlacesAutocomplete from "@/components/ui/GooglePlacesAutocompleted";

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
    setAddress(place.formatted_address || "");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    try {
      setIsSubmitting(true);
      const formData = new FormData(e.currentTarget);
      formData.set("address", address);
      
      if (selectedPlace) {
        formData.set("placeId", selectedPlace.place_id || "");
        formData.set("latitude", selectedPlace.geometry?.location?.lat()?.toString() || "");
        formData.set("longitude", selectedPlace.geometry?.location?.lng()?.toString() || "");
        formData.set("formattedAddress", selectedPlace.formatted_address || address);
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
      onSubmit={handleSubmit}
      className="bg-white/5 rounded-xl border border-white/10 p-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white">
          {content.newActivity}
        </h3>
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="text-blue-200/70 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-lg disabled:opacity-50"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="space-y-4">
        {/* Nom */}
        <div>
          <label className="block text-sm font-medium text-blue-200/90 mb-2">
            {content.activityName}
          </label>
          <input
            type="text"
            name="name"
            required
            disabled={isSubmitting}
            placeholder={content.activityNamePlaceholder.value}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white placeholder-blue-200/40 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent transition-all disabled:opacity-50"
          />
        </div>

        {/* Adresse avec GooglePlacesAutocomplete */}
        <div>
          <label className="block text-sm font-medium text-blue-200/90 mb-2">
            <MapPin className="h-4 w-4 inline mr-1" />
            {content.address}
          </label>
          <GooglePlacesAutocomplete
            value={address}
            onChange={setAddress}
            onPlaceSelected={handlePlaceSelected}
            placeholder={content.addressPlaceholder.value}
            disabled={isSubmitting}
          />
          {/* Hidden input pour s'assurer que l'adresse est envoyée */}
          <input type="hidden" name="address" value={address} />
        </div>

        {/* Catégorie */}
        <div>
          <label className="block text-sm font-medium text-blue-200/90 mb-2">
            <Tag className="h-4 w-4 inline mr-1" />
            {content.category}
          </label>
          <select
            name="category"
            required
            disabled={isSubmitting}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent transition-all appearance-none cursor-pointer disabled:opacity-50"
          >
            <option value="" className="bg-slate-800">
              {content.selectCategory}
            </option>
            {categories.map((cat) => (
              <option
                key={cat.value}
                value={cat.value}
                className="bg-slate-800"
              >
                {cat.emoji} {cat.label}
              </option>
            ))}
          </select>
        </div>

        {/* Horaires */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-blue-200/90 mb-2">
              <Clock className="h-4 w-4 inline mr-1" />
              {content.startTime}
            </label>
            <input
              type="time"
              name="startTime"
              disabled={isSubmitting}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent transition-all disabled:opacity-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-blue-200/90 mb-2">
              <Clock className="h-4 w-4 inline mr-1" />
              {content.endTime}
            </label>
            <input
              type="time"
              name="endTime"
              disabled={isSubmitting}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent transition-all disabled:opacity-50"
            />
          </div>
        </div>

        {/* Budget */}
        <div>
          <label className="block text-sm font-medium text-blue-200/90 mb-2">
            <Euro className="h-4 w-4 inline mr-1" />
            {content.budget}
          </label>
          <input
            type="number"
            name="budget"
            min="0"
            step="0.01"
            disabled={isSubmitting} 
            placeholder={content.budgetPlaceholder.value}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white placeholder-blue-200/40 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent transition-all disabled:opacity-50"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-blue-200/90 mb-2">
            <FileText className="h-4 w-4 inline mr-1" />
            {content.description}
          </label>
          <textarea
            name="description"
            rows={3}
            disabled={isSubmitting}
            placeholder={content.descriptionPlaceholder.value}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white placeholder-blue-200/40 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent transition-all resize-none disabled:opacity-50"
          />
        </div>

        {/* Images (hidden pour l'instant) */}
        <input type="hidden" name="images" value="[]" />

        {/* Indicateur de lieu sélectionné */}
        {selectedPlace && (
          <div className="bg-green-500/10 border border-green-400/20 rounded-lg p-3">
            <p className="text-xs text-green-200/90 flex items-start gap-2">
              <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" />
              <span>
                📍 Lieu sélectionné : {selectedPlace.name || selectedPlace.formatted_address}
              </span>
            </p>
          </div>
        )}

        {/* Note sur les images */}
        <div className="bg-blue-500/10 border border-blue-400/20 rounded-lg p-3">
          <p className="text-xs text-blue-200/70 flex items-start gap-2">
            <ImageIcon className="h-4 w-4 flex-shrink-0 mt-0.5" />
            <span>
              {content.imageNote}
            </span>
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 mt-6 pt-6 border-t border-white/10">
        <button
          type="submit"
          disabled={isSubmitting || !address.trim()}
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2.5 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
          className="px-6 bg-white/10 hover:bg-white/20 text-white font-medium py-2.5 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-white/20 disabled:opacity-50"
        >
          {content.cancel}
        </button>
      </div>
    </form>
  );
};

export default ActivityForm;