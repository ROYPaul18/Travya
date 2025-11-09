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
import { ActivityEditFormProps} from "@/lib/utils/types/types";
import {formatTimeForInput} from "@/lib/utils/formatDate"

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
      className="bg-white/5 rounded-xl border border-white/10 p-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white">
          {content.editActivity || "Modifier l'activité"}
        </h3>
        <button
          type="button"
          onClick={onCancel}
          className="text-blue-200/70 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-lg"
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
            defaultValue={activity.name}
            placeholder={content.activityNamePlaceholder.value}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white placeholder-blue-200/40 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent transition-all"
          />
        </div>

        {/* Adresse */}
        <div>
          <label className="block text-sm font-medium text-blue-200/90 mb-2">
            <MapPin className="h-4 w-4 inline mr-1" />
            {content.address}
          </label>
          <input
            type="text"
            name="address"
            required
            defaultValue={activity.address}
            placeholder={content.addressPlaceholder.value}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white placeholder-blue-200/40 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent transition-all"
          />
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
            defaultValue={activity.category}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent transition-all appearance-none cursor-pointer"
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
              defaultValue={formatTimeForInput(activity.startTime)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent transition-all"
            />
          </div>
          <div className="text-blue-200/90">
            <label className="block text-sm font-medium text-blue-200/90 mb-2">
              <Clock className="h-4 w-4 inline mr-1" />
              {content.endTime}
            </label>
            <input
              type="time"
              name="endTime"
              defaultValue={formatTimeForInput(activity.endTime)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent transition-all"
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
            defaultValue={activity.budget ?? ''}
            placeholder={content.budgetPlaceholder.value}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white placeholder-blue-200/40 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent transition-all"
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
            defaultValue={activity.description ?? ''}
            placeholder={content.descriptionPlaceholder.value}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white placeholder-blue-200/40 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent transition-all resize-none"
          />
        </div>

        {/* Images (hidden pour l'instant) */}
        <input 
          type="hidden" 
          name="images" 
          value={JSON.stringify(activity.images)} 
        />

        {/* Note sur les images */}
        <div className="bg-blue-500/10 border border-blue-400/20 rounded-lg p-3">
          <p className="text-xs text-blue-200/70 flex items-start gap-2">
            <ImageIcon className="h-4 w-4 flex-shrink-0 " />
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
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2.5 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400/50"
        >
          {content.saveChanges || "Enregistrer les modifications"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-6 bg-white/10 hover:bg-white/20 text-white font-medium py-2.5 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-white/20"
        >
          {content.cancel}
        </button>
      </div>
    </form>
  );
};

export default ActivityEditForm;