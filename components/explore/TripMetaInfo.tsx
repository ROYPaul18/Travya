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
}

const TripMetaInfo = ({ 
  tripId, 
  author,
  price = 2450,
  rhythm = "Contemplatif",
  travelers = 2
}: TripMetaInfoProps) => {
  const getInitial = (name: string | null) => {
    if (!name) return "?";
    return name.charAt(0).toUpperCase();
  };

  return (
    <div className="sticky top-3 space-y-8 border-l border-[#EEE] pl-10">
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
      <form action={copyTrip.bind(null, tripId)}>
        <button
          type="submit"
          className="p-5 border bg-[#1A1A1A] text-white w-full tracking-[0.3em] uppercase text-[10px]
               hover:bg-[#B59E80] transition text-sm font-medium cursor-pointer"
        >
          Copier le voyage
        </button>
      </form>

      {/* Info Text */}
      <p className="text-sm text-gray-400 italic">
        En copiant cet itinéraire, il s'ajoutera automatiquement à votre collection personnelle.
      </p>
    </div>
  );
};

export default TripMetaInfo;