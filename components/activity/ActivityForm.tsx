"use client";

import React, { useState } from "react";
import {  Image as ImageIcon,Loader2,} from "lucide-react";
import { useIntlayer } from "next-intlayer";
import { ActivityFormProps } from "@/lib/utils/types/types";
import GooglePlacesAutocomplete from "@/components/ui/GooglePlacesAutocompleted";
import { Input } from "../ui/input";

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
      className="bg-white rounded-sm w-full max-w-full md:max-w-2xl mx-auto"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
        <h3 className="text-lg sm:text-xl font-light text-gray-900">
          {content.newActivity}
        </h3>
      </div>

      <div className="space-y-4">
        {/* Nom */}
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
            className="w-full bg-white border border-gray-300 rounded-sm px-4 h-11 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-500 disabled:opacity-50 disabled:bg-gray-50 font-light"
          />
        </div>

        {/* Adresse */}
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
            className="border-gray-300 text-gray-900 placeholder:text-gray-400 focus:ring-gray-200 focus:border-gray-500 rounded-sm h-11 font-light"
          />
          <input type="hidden" name="address" value={address} />
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
            className="w-full bg-white border border-gray-300 rounded-sm px-4 h-11 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-500 disabled:opacity-50 disabled:bg-gray-50 appearance-none cursor-pointer font-light"
          >
            <option value="" className="bg-white">
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
              className="w-full bg-white border border-gray-300 rounded-sm px-4 h-11 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-500 disabled:opacity-50 disabled:bg-gray-50 font-light"
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
              className="w-full bg-white border border-gray-300 rounded-sm px-4 h-11 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-500 disabled:opacity-50 disabled:bg-gray-50 font-light"
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
            className="w-full bg-white border border-gray-300 rounded-sm px-4 h-11 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-500 disabled:opacity-50 disabled:bg-gray-50 font-light"
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
            className="w-full bg-white border border-gray-300 rounded-sm px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-500 resize-none disabled:opacity-50 disabled:bg-gray-50 font-light"
          />
        </div>

        {selectedPlace && (
          <div className="bg-green-50 border border-green-300 rounded-sm p-3 text-xs font-light">
            <p className="text-green-700 flex items-start gap-2">
              📍 Lieu sélectionné : {selectedPlace.name || selectedPlace.formatted_address}
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
          className="w-full md:flex-1 bg-neutral-900 hover:bg-neutral-800 text-white font-medium h-11 rounded-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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