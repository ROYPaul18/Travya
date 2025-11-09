export const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    RESTAURANT: "bg-orange-500/20 text-orange-300 border-orange-500/30",
    CAFE: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    VISITE: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    HOTEL: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
    TRANSPORT: "bg-gray-500/20 text-gray-300 border-gray-500/30",
    SHOPPING: "bg-pink-500/20 text-pink-300 border-pink-500/30",
    NATURE: "bg-green-500/20 text-green-300 border-green-500/30",
    SPORT: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
    AUTRE: "bg-slate-500/20 text-slate-300 border-slate-500/30",
  };
  return colors[category] || "bg-gray-500/20 text-gray-300 border-gray-500/30";
};
