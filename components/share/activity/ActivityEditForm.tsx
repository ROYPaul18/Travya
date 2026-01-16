"use client";

import React, { useState } from "react";
import { Image as ImageIcon, Loader2 } from "lucide-react";
import { useIntlayer } from "next-intlayer";
import { ActivityEditFormProps } from "@/lib/utils/types/types";
import { formatTimeForInput } from "@/lib/utils/formatDate";
import GooglePlacesAutocomplete from "@/components/ui/GooglePlacesAutocompleted";
import { Input } from "../../ui/input";

const ActivityEditForm: React.FC<ActivityEditFormProps> = ({
  activity,
  locationId,
  tripId,
  onCancel,
  onSuccess,
  updateActivity,
}) => {
  const content = useIntlayer("activity-form");

  const [address, setAddress] = useState(activity.address || "");
  const [selectedPlace, setSelectedPlace] =
    useState<google.maps.places.PlaceResult | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    { value: "restaurant", label: content.categories.restaurant, emoji: "🍽️" },
    { value: "monument", label: content.categories.monument, emoji: "🏛️" },
    { value: "museum", label: content.categories.museum, emoji: "🖼️" },
    { value: "park", label: content.categories.park, emoji: "🌳" },
    { value: "activity", label: content.categories.activity, emoji: "🎯" },
    {
      value: "accommodation",
      label: content.categories.accommodation,
      emoji: "🏨",
    },
  ];

  const handlePlaceSelected = (place: google.maps.places.PlaceResult) => {
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
        formData.set(
          "latitude",
          selectedPlace.geometry?.location?.lat()?.toString() || "",
        );
        formData.set(
          "longitude",
          selectedPlace.geometry?.location?.lng()?.toString() || "",
        );
        formData.set(
          "formattedAddress",
          selectedPlace.formatted_address || address,
        );
      }

      await updateActivity(activity.id, formData, tripId);
      onSuccess();
    } catch (error) {
      console.error("Erreur update:", error);
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
          {content.editActivity.value}
        </h3>
      </div>

      <div className="space-y-4">
        {/* Nom */}
        <div>
          <label className="block text-sm font-light text-gray-900 mb-1.5">
            {content.activityName.value}
          </label>
          <input
            type="text"
            name="name"
            required
            disabled={isSubmitting}
            defaultValue={activity.name}
            placeholder={content.activityNamePlaceholder.value}
            className="w-full bg-white border border-gray-300 rounded-sm px-4 h-11 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
        </div>

        {/* Adresse */}
        <div>
          <label className="block text-sm font-light text-gray-900 mb-1.5">
            {content.address.value}
          </label>
          <GooglePlacesAutocomplete
            value={address}
            onChange={setAddress}
            onPlaceSelected={handlePlaceSelected}
            placeholder={content.addressPlaceholder.value}
            disabled={isSubmitting}
            className="border-gray-300 text-gray-900 placeholder:text-gray-400 focus:ring-gray-200 rounded-sm h-11 font-light"
            types={['geocode', 'establishment']}          
          />

          <input type="hidden" name="address" value={address} />
        </div>

        <div>
          <label className="block text-sm font-light text-gray-900 mb-1.5">
            {content.category.value}
          </label>

          <select
            name="category"
            required
            disabled={isSubmitting}
            defaultValue={activity.category}
            className="w-full bg-white border border-gray-300 rounded-sm px-4 h-11 text-gray-900 focus:ring-2 focus:ring-gray-200 appearance-none font-light"
          >
            <option value="">{content.selectCategory.value}</option>
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.emoji} {cat.label.value}
              </option>
            ))}
          </select>
        </div>

        {/* Horaires */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-light text-gray-900 mb-1.5">
              {content.startTime.value}
            </label>
            <Input
              type="time"
              name="startTime"
              defaultValue={activity.startTime ?? ""}
              disabled={isSubmitting}
              className="bg-white border border-gray-300 rounded-sm px-4 h-11 text-gray-900"
            />
          </div>

          <div>
            <label className="block text-sm font-light text-gray-900 mb-1.5">
              {content.endTime.value}
            </label>
            <Input
              type="time"
              name="endTime"
              defaultValue={activity.endTime ?? ""}
              disabled={isSubmitting}
              className="bg-white border border-gray-300 rounded-sm px-4 h-11 text-gray-900"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-light text-gray-900 mb-1.5">
            {content.budget.value}
          </label>
          <input
            type="number"
            name="budget"
            min="0"
            step="0.01"
            defaultValue={activity.budget ?? ""}
            disabled={isSubmitting}
            placeholder={content.budgetPlaceholder.value}
            className="w-full bg-white border border-gray-300 rounded-sm px-4 h-11 text-gray-900"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-light text-gray-900 mb-1.5">
            {content.description.value}
          </label>
          <textarea
            name="description"
            rows={3}
            disabled={isSubmitting}
            defaultValue={activity.description ?? ""}
            placeholder={content.descriptionPlaceholder.value}
            className="w-full bg-white border border-gray-300 rounded-sm px-4 py-3 text-gray-900 resize-none"
          />
        </div>

        <input
          type="hidden"
          name="images"
          value={JSON.stringify(activity.images)}
        />

        {selectedPlace && (
          <div className="bg-green-50 border border-green-300 rounded-sm p-3 text-xs font-light">
            📍 {selectedPlace.name || selectedPlace.formatted_address}
          </div>
        )}

        <div className="bg-blue-50 border border-blue-300 rounded-sm p-3 text-xs font-light">
          <p className="text-blue-700 flex items-start gap-2">
            {content.imageNote.value}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col md:flex-row gap-3 mt-6 pt-6 border-t border-gray-300">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full md:flex-1 bg-neutral-900 hover:bg-neutral-800 text-white font-medium h-11 rounded-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              {content.saving.value}
            </>
          ) : (
            content.saveChanges.value
          )}
        </button>

        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="w-full md:w-auto bg-white border border-gray-300 text-gray-600 font-light h-11 rounded-sm hover:bg-gray-50 transition-all"
        >
          {content.cancel.value}
        </button>
      </div>
    </form>
  );
};

export default ActivityEditForm;