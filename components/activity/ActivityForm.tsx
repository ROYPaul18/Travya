"use client";

import React, { useState, useRef, useEffect } from "react";
import { Loader2, MapPin, CheckCircle2 } from "lucide-react";
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
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [addressError, setAddressError] = useState<string | undefined>(undefined);

  const formRef = useRef<HTMLFormElement>(null);

  const categories = [
    { value: "restaurant", label: content.categories.restaurant, emoji: "🍽️" },
    { value: "monument", label: content.categories.monument, emoji: "🏛️" },
    { value: "museum", label: content.categories.museum, emoji: "🖼️" },
    { value: "park", label: content.categories.park, emoji: "🌳" },
    { value: "activity", label: content.categories.activity, emoji: "🎯" },
    { value: "accommodation", label: content.categories.accommodation, emoji: "🏨" },
  ];

  const handlePlaceSelected = (place: google.maps.places.PlaceResult) => {
    console.log("Place sélectionné:", place);
    if (!place.geometry?.location) {
      setAddressError(content.selectValidAddressError.value);
      setCoordinates(null);
      return;
    }
    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();
    setCoordinates({ lat, lng });
    setAddress(place.formatted_address || place.name || "");
    setAddressError(undefined);
  };

  const handleAddressChange = (value: string) => {
    setAddress(value);
    if (coordinates) {
      setCoordinates(null);
      setAddressError(content.selectAddressFromListError.value);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmitting) return;
    if (!address.trim()) {
      setAddressError(content.enterAddressError.value);
      return;
    }

    if (!coordinates) {
      setAddressError(content.selectAddressFromListError.value);
      return;
    }

    setAddressError(undefined);

    try {
      setIsSubmitting(true);
      const formData = new FormData(e.currentTarget);
      formData.set("address", address);
      formData.set("lat", coordinates.lat.toString());
      formData.set("lng", coordinates.lng.toString());

      await addActivity(formData, locationId, tripId);
      onSuccess();
    } catch (error) {
      console.error("Erreur lors de la soumission:", error);
      setAddressError(content.addActivityError.value);
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
          {content.newActivity.value}
        </h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-light text-gray-900 mb-1.5 sm:mb-2">
            {content.activityName.value}
          </label>
          <input
            type="text"
            name="name"
            required
            disabled={isSubmitting}
            placeholder={content.activityNamePlaceholder.value}
            className={cn(
              "w-full bg-white border border-gray-300 rounded-sm px-4 h-11 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 disabled:opacity-50 disabled:bg-gray-50 font-light"
            )}
          />
        </div>

        <div>
          <label className="block text-sm font-light text-gray-900 mb-1.5 sm:mb-2">
            {content.address.value}
          </label>
          <GooglePlacesAutocomplete
            value={address}
            onChange={handleAddressChange}
            onPlaceSelected={handlePlaceSelected}
            placeholder={content.addressPlaceholder.value}
            disabled={isSubmitting}
            error={addressError}
            className="border-gray-300 text-gray-900 placeholder:text-gray-400 focus:ring-blue-200 focus:border-blue-500 rounded-sm h-11 font-light"
            types={['geocode', 'establishment']}
          />

          <button
            type="button"
            onClick={() => {
              console.log("TEST MANUEL");
              setAddress("123 Test Street");
              setCoordinates({ lat: 48.8566, lng: 2.3522 });
              setAddressError(undefined);
            }}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            {content.testButton.value}
          </button>

          {/* ✅ Indicateur visuel de validation */}
          {coordinates && address && !addressError && (
            <div className="flex items-center gap-1.5 mt-2 text-xs text-green-600">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>{content.addressValidated.value}</span>
            </div>
          )}
        </div>

        {/* Catégorie */}
        <div>
          <label className="block text-sm font-light text-gray-900 mb-1.5 sm:mb-2">
            {content.category.value}
          </label>
          <select
            name="category"
            required
            disabled={isSubmitting}
            className="w-full bg-white border border-gray-300 rounded-sm px-4 h-11 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 disabled:opacity-50 disabled:bg-gray-50 appearance-none cursor-pointer font-light"
            defaultValue=""
          >
            <option value="" disabled className="bg-white">
              {content.selectCategory.value}
            </option>
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value} className="bg-white">
                {cat.emoji} {cat.label.value}
              </option>
            ))}
          </select>
        </div>

        {/* Horaires */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-light text-gray-900 mb-1.5 sm:mb-2">
              {content.startTime.value}
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
              {content.endTime.value}
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
            {content.budget.value}
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
            {content.description.value}
          </label>
          <textarea
            name="description"
            rows={3}
            disabled={isSubmitting}
            placeholder={content.descriptionPlaceholder.value}
            className="w-full bg-white border border-gray-300 rounded-sm px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 resize-none disabled:opacity-50 disabled:bg-gray-50 font-light"
          />
        </div>
        {coordinates && (
          <div className="bg-green-50 border border-green-300 rounded-sm p-3 text-xs font-light">
            <p className="text-green-700 flex items-start gap-2">
              <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
              {content.coordinatesLabel.value} : {coordinates.lat.toFixed(6)}, {coordinates.lng.toFixed(6)}
            </p>
          </div>
        )}

        <div className="bg-blue-50 border border-blue-300 rounded-sm p-3 text-xs font-light">
          <p className="text-blue-700 flex items-start gap-2">
            {content.imageNote.value}
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-3 mt-6 pt-6 border-t border-gray-300">
        <button
          type="submit"
          disabled={isSubmitting || !address.trim() || !coordinates}
          className="w-full md:flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium h-11 rounded-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              {content.adding.value}
            </>
          ) : (
            content.addActivity.value
          )}
        </button>

        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="w-full md:w-auto md:px-6 bg-white border border-gray-300 hover:bg-gray-50 text-gray-600 font-light h-11 rounded-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {content.cancel.value}
        </button>
      </div>
    </form>
  );
};

export default ActivityForm;