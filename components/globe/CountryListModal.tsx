import { MapPin, X } from "lucide-react";

// Types des props
interface CountryListModalProps {
  countries: string[];
  countryLocations: Record<string, number>;
  onClose: () => void;
  onCountryHover: (country: string | null) => void;
  hoveredCountry: string | null;
}

const getSpotsText = (count: number) => {
    return count === 1 ? "spot" : "spots";
};

export function CountryListModal({ 
    countries, 
    countryLocations, 
    onClose, 
    onCountryHover,
    hoveredCountry 
}: CountryListModalProps) {

  return (
    // Conteneur de la modale (arrière-plan sombre avec effet blur)
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity duration-300">
      
      {/* Contenu de la fenêtre modale */}
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg mx-4 max-h-[90vh] flex flex-col transform transition-transform duration-300 scale-100">
        
        {/* En-tête de la modale */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <MapPin className="h-6 w-6 text-blue-600" />
            Vos Destinations ({countries.length})
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-900 transition-colors p-2 rounded-full hover:bg-gray-100"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Liste des Pays (corps défilant) */}
        <div className="p-6 flex-1 overflow-y-auto space-y-3">
          {countries
            .sort()
            .map((country, key) => (
              <div
                key={key}
                onMouseEnter={() => onCountryHover(country)}
                onMouseLeave={() => onCountryHover(null)}
                className={`flex items-center justify-between gap-2 p-4 rounded-xl transition-all duration-300 border cursor-pointer ${
                  // Style de survol maintenu pour l'interaction avec le globe
                  hoveredCountry === country
                    ? 'bg-blue-50 border-blue-200 shadow-md'
                    : 'bg-white border-gray-200 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-blue-600" />
                  <span className="font-semibold text-gray-900">{country}</span>
                </div>
                {/* Badge d'activité */}
                <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-bold">
                  {countryLocations[country]} {getSpotsText(countryLocations[country])}
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}