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

interface ActivityFormProps {
  locationId: string;
  tripId: string;
  onCancel: () => void;
  onSuccess:() =>void;
  addActivity: (
    formData: FormData,
    locationId: string,
    tripId: string,
  ) => Promise<void>;
}

const ActivityForm: React.FC<ActivityFormProps> = ({
  locationId,
  tripId,
  onCancel,
  onSuccess,
  addActivity,
}) => {
  const categories = [
    { value: "restaurant", label: "Restaurant", emoji: "🍽️" },
    { value: "monument", label: "Monument", emoji: "🏛️" },
    { value: "musée", label: "Musée", emoji: "🖼️" },
    { value: "parc", label: "Parc", emoji: "🌳" },
    { value: "activité", label: "Activité", emoji: "🎯" },
    { value: "hébergement", label: "Hébergement", emoji: "🏨" },
  ];

  return (
    <form
      action={async (formData) => {
        await addActivity(formData, locationId, tripId);
      }}
      className="bg-white/5 rounded-xl border border-white/10 p-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white">
          Nouvelle activité
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
            Nom de l'activité *
          </label>
          <input
            type="text"
            name="name"
            required
            placeholder="Ex: Tour Eiffel"
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white placeholder-blue-200/40 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent transition-all"
          />
        </div>

        {/* Adresse */}
        <div>
          <label className="block text-sm font-medium text-blue-200/90 mb-2">
            <MapPin className="h-4 w-4 inline mr-1" />
            Adresse *
          </label>
          <input
            type="text"
            name="address"
            required
            placeholder="Ex: Champ de Mars, 75007 Paris"
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white placeholder-blue-200/40 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent transition-all"
          />
        </div>

        {/* Catégorie */}
        <div>
          <label className="block text-sm font-medium text-blue-200/90 mb-2">
            <Tag className="h-4 w-4 inline mr-1" />
            Catégorie *
          </label>
          <select
            name="category"
            required
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent transition-all appearance-none cursor-pointer"
          >
            <option value="" className="bg-slate-800">
              Sélectionnez une catégorie
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
              Heure de début
            </label>
            <input
              type="time"
              name="startTime"
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-blue-200/90 mb-2">
              <Clock className="h-4 w-4 inline mr-1" />
              Heure de fin
            </label>
            <input
              type="time"
              name="endTime"
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Budget */}
        <div>
          <label className="block text-sm font-medium text-blue-200/90 mb-2">
            <Euro className="h-4 w-4 inline mr-1" />
            Budget (€)
          </label>
          <input
            type="number"
            name="budget"
            min="0"
            step="0.01"
            placeholder="0.00"
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white placeholder-blue-200/40 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent transition-all"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-blue-200/90 mb-2">
            <FileText className="h-4 w-4 inline mr-1" />
            Description
          </label>
          <textarea
            name="description"
            rows={3}
            placeholder="Détails de l'activité..."
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white placeholder-blue-200/40 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent transition-all resize-none"
          />
        </div>

        {/* Images (hidden pour l'instant) */}
        <input type="hidden" name="images" value="[]" />

        {/* Note sur les images */}
        <div className="bg-blue-500/10 border border-blue-400/20 rounded-lg p-3">
          <p className="text-xs text-blue-200/70 flex items-start gap-2">
            <ImageIcon className="h-4 w-4 flex-shrink-0 mt-0.5" />
            <span>
              L'upload d'images sera disponible prochainement. Pour l'instant,
              une image par défaut sera utilisée selon la catégorie.
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
          Ajouter l'activité
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-6 bg-white/10 hover:bg-white/20 text-white font-medium py-2.5 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-white/20"
        >
          Annuler
        </button>
      </div>
    </form>
  );
};

export default ActivityForm;