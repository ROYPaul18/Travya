import React from "react";
import {
  X,
  MapPin,
  Clock,
  Euro,
  FileText,
  Tag,
  Image as ImageIcon,
} from "lucide-react";
import { useIntlayer } from "next-intlayer";
import { ActivityEditFormProps } from "@/lib/utils/types/types";
import { formatTimeForInput } from "@/lib/utils/formatDate"

const ActivityEditForm: React.FC<ActivityEditFormProps> = ({
  activity,
  locationId,
  tripId,
  onCancel,
  onSuccess,
  updateActivity,
}) => {
  const content = useIntlayer("activity-form");
  const categories = [
    { value: "restaurant", label: content.categories.restaurant, emoji: "🍽️" },
    { value: "monument", label: content.categories.monument, emoji: "🏛️" },
    { value: "museum", label: content.categories.museum, emoji: "🖼️" },
    { value: "park", label: content.categories.park, emoji: "🌳" },
    { value: "activity", label: content.categories.activity, emoji: "🎯" },
    { value: "accommodation", label: content.categories.accommodation, emoji: "🏨" },
  ];

  return (
    <form
      action={async (formData) => {
        await updateActivity(activity.id, formData, tripId);
        onSuccess();
      }}
      className="bg-white/5 rounded-xl border border-white/10 p-4 sm:p-6 w-full max-w-full md:max-w-2xl mx-auto"
    >
      
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
        <h3 className="text-lg sm:text-xl font-semibold text-white">
          {content.editActivity || "Modifier l'activité"}
        </h3>
        <button
          type="button"
          onClick={onCancel}
          className="self-end md:self-auto text-blue-200/70 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-lg"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="space-y-4">
      
        <div>
          <label className="block text-sm font-medium text-blue-200/90 mb-1.5 sm:mb-2">
            {content.activityName}
          </label>
          <input
            type="text"
            name="name"
            required
            defaultValue={activity.name}
            placeholder={content.activityNamePlaceholder.value}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2.5 text-white placeholder-blue-200/40 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-blue-200/90 mb-1.5 sm:mb-2">
            <MapPin className="h-4 w-4 inline mr-1" />
            {content.address}
          </label>
          <input
            type="text"
            name="address"
            required
            defaultValue={activity.address}
            placeholder={content.addressPlaceholder.value}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2.5 text-white placeholder-blue-200/40 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
          />
        </div>

        {/* Catégorie */}
        <div>
          <label className="block text-sm font-medium text-blue-200/90 mb-1.5 sm:mb-2">
            <Tag className="h-4 w-4 inline mr-1" />
            {content.category}
          </label>
          <select
            name="category"
            required
            defaultValue={activity.category}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-400/50 cursor-pointer appearance-none"
          >
            <option value="" className="bg-slate-800">
              {content.selectCategory}
            </option>
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value} className="bg-slate-800">
                {cat.emoji} {cat.label}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-blue-200/90 mb-1.5 sm:mb-2">
              <Clock className="h-4 w-4 inline mr-1" />
              {content.startTime}
            </label>
            <input
              type="time"
              name="startTime"
              defaultValue={formatTimeForInput(activity.startTime)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2.5 text-white focus:ring-2 focus:ring-blue-400/50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-blue-200/90 mb-1.5 sm:mb-2">
              <Clock className="h-4 w-4 inline mr-1" />
              {content.endTime}
            </label>
            <input
              type="time"
              name="endTime"
              defaultValue={formatTimeForInput(activity.endTime)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2.5 text-white focus:ring-2 focus:ring-blue-400/50"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-blue-200/90 mb-1.5 sm:mb-2">
            <Euro className="h-4 w-4 inline mr-1" />
            {content.budget}
          </label>
          <input
            type="number"
            name="budget"
            min="0"
            step="0.01"
            defaultValue={activity.budget ?? ""}
            placeholder={content.budgetPlaceholder.value}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2.5 text-white placeholder-blue-200/40 focus:ring-2 focus:ring-blue-400/50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-blue-200/90 mb-1.5 sm:mb-2">
            <FileText className="h-4 w-4 inline mr-1" />
            {content.description}
          </label>
          <textarea
            name="description"
            rows={3}
            defaultValue={activity.description ?? ""}
            placeholder={content.descriptionPlaceholder.value}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2.5 text-white placeholder-blue-200/40 focus:ring-2 focus:ring-blue-400/50 resize-none"
          />
        </div>

        <input type="hidden" name="images" value={JSON.stringify(activity.images)} />

        <div className="bg-blue-500/10 border border-blue-400/20 rounded-lg p-3">
          <p className="text-xs text-blue-200/70 flex items-start gap-2">
            <ImageIcon className="h-4 w-4 flex-shrink-0" />
            {content.imageNote}
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-3 mt-6 pt-6 border-t border-white/10">
        <button
          type="submit"
          className="w-full md:flex-1 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2.5 rounded-lg transition-colors focus:ring-2 focus:ring-blue-400/50"
        >
          {content.saveChanges || "Enregistrer les modifications"}
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="w-full md:w-auto md:px-6 bg-white/10 hover:bg-white/20 text-white font-medium py-2.5 rounded-lg transition-colors focus:ring-2 focus:ring-white/20"
        >
          {content.cancel}
        </button>
      </div>
    </form>

  );
};

export default ActivityEditForm;