import { copyTrip } from "@/lib/actions/Trip";

interface TripMetaInfoProps {
  tripId: string;
  author: {
    name: string | null;
    image: string | null;
  };
  price?: number;
  rhythm?: string;
  travelers?: number;
  startDate?: Date; // Ajout date début
  endDate?: Date;   // Ajout date fin
}

const TripMetaInfo = ({ 
  tripId, 
  author,
  price = 2450,
  rhythm = "Contemplatif",
  travelers = 2,
  startDate = new Date(2025, 9, 12), // Valeurs par défaut pour l'exemple
  endDate = new Date(2025, 9, 24)
}: TripMetaInfoProps) => {
  
  const getInitial = (name: string | null) => {
    if (!name) return "?";
    return name.charAt(0).toUpperCase();
  };

  // Formatage des dates : 12 Oct. 2025
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).replace('.', ''); // Nettoyage du point pour le style
  };

  return (
    <div className="sticky top-20 space-y-8 border-l border-[#EEE] pl-10">
      {/* Author Section */}
      <div>
        <h2 className="text-[9px] tracking-[0.2em] font-semibold text-[#999] uppercase mb-[10px]">
          Auteur
        </h2>
        <div className="flex items-center gap-4">
          {author.image ? (
            <img 
              src={author.image} 
              alt={author.name || "Auteur"}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
              <span className="text-white text-base font-bold">
                {getInitial(author.name)}
              </span>
            </div>
          )}
          <h3 className="text-xs font-bold tracking-wide uppercase">
            {author.name || "Utilisateur anonyme"}
          </h3>
        </div>
      </div>

      {/* Période Section - NOUVEAU */}
      <div>
        <h2 className="text-[9px] tracking-[0.2em] font-semibold text-[#999] uppercase mb-[10px]">
          Période
        </h2>
        <div className="flex  gap-1">
          <p className="text-[28px] font-light font-logo leading-tight">
            {formatDate(startDate)} - {formatDate(endDate)}
          </p>
        </div>
      </div>

      {/* Investment Section */}
      <div>
        <h2 className="text-[9px] tracking-[0.2em] font-semibold text-[#999] uppercase mb-[10px]">
          Prix
        </h2>
        <p className="text-[28px] font-light font-logo">
          {price.toLocaleString('fr-FR')} €
        </p>
      </div>

      {/* Rhythm Section */}
      <div>
        <h2 className="text-[9px] tracking-[0.2em] font-semibold text-[#999] uppercase mb-[10px]">
          Rythme
        </h2>
        <p className="text-[28px] font-light font-logo">
          {rhythm}
        </p>
      </div>

      {/* Travelers Section */}
      <div>
        <h2 className="text-[9px] tracking-[0.2em] font-semibold text-[#999] uppercase mb-[10px]">
          Voyageurs
        </h2>
        <p className="text-[28px] font-light font-logo">
          {travelers} {travelers > 1 ? 'personnes' : 'personne'}
        </p>
      </div>

      {/* Copy Button */}
      <div className="pt-4">
        <form action={copyTrip.bind(null, tripId)}>
          <button
            type="submit"
            className="p-5 border bg-[#1A1A1A] text-white w-full tracking-[0.3em] uppercase text-[10px]
                 hover:bg-[#B59E80] transition font-medium cursor-pointer"
          >
            Copier le voyage
          </button>
        </form>
        <p className="mt-4 text-[11px] leading-relaxed text-[#999] italic">
          En copiant cet itinéraire, il s'ajoutera automatiquement à votre collection personnelle.
        </p>
      </div>
    </div>
  );
};

export default TripMetaInfo;