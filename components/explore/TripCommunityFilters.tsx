"use client";

import { useState } from "react";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useIntlayer } from "next-intlayer";

export function TripsFilters() {
  const content = useIntlayer("trips-community-filters");

  // States pour les filtres (prêts pour ta future logique)
  const [selectedPeople, setSelectedPeople] = useState<string[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedDurations, setSelectedDurations] = useState<string[]>([]);
  const [selectedBudgets, setSelectedBudgets] = useState<string[]>([]);

  const peopleOptions = [
    { id: "solo", label: content.soloTraveler, icon: "👤" },
    { id: "couple", label: content.couple, icon: "👫" },
    { id: "small", label: content.smallGroup, icon: "👥" },
    { id: "large", label: content.largeGroup, icon: "👨‍👩‍👧‍👦" },
  ];

  const countryOptions = [
    { id: "france", label: content.france, flag: "🇫🇷" },
    { id: "italy", label: content.italy, flag: "🇮🇹" },
    { id: "spain", label: content.spain, flag: "🇪🇸" },
    { id: "japan", label: content.japan, flag: "🇯🇵" },
    { id: "usa", label: content.usa, flag: "🇺🇸" },
    { id: "thailand", label: content.thailand, flag: "🇹🇭" },
  ];

  const durationOptions = [
    { id: "weekend", label: content.weekend },
    { id: "short", label: content.shortTrip },
    { id: "medium", label: content.mediumTrip },
    { id: "long", label: content.longTrip },
  ];

  const handleToggle = (
    value: string,
    selected: string[],
    setter: (val: string[]) => void
  ) => {
    setter(
      selected.includes(value)
        ? selected.filter(v => v !== value)
        : [...selected, value]
    );
  };

  const clearAllFilters = () => {
    setSelectedPeople([]);
    setSelectedCountries([]);
    setSelectedDurations([]);
    setSelectedBudgets([]);
  };

  /**
   * Sous-composant pour les boutons de filtres
   */
  const FilterButton = ({
    title,
    options,
    selected,
    onToggle,
    isComingSoon = false,
  }: any) => {
    const hasSelection = selected.length > 0;

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild disabled={isComingSoon}>
          <button
            className={`
              relative flex items-center gap-2 px-4 py-2.5 rounded-full border text-[13px] transition-all duration-200
              ${isComingSoon 
                ? "opacity-50 cursor-not-allowed bg-gray-50 border-gray-200 text-gray-400" 
                : "bg-white text-gray-700 border-gray-200 hover:border-green-950 hover:shadow-sm"}
              ${hasSelection && !isComingSoon
                ? "border-green-950 bg-green-50/30 font-semibold ring-1 ring-green-950 text-green-950"
                : ""}
            `}
          >
            <span>{title}</span>
            
            {isComingSoon ? (
              <span className="text-[9px] bg-gray-200 text-gray-500 px-1.5 py-0.5 rounded-md font-bold uppercase">
                Bientôt
              </span>
            ) : hasSelection ? (
              <span className="flex items-center justify-center bg-green-950 text-white text-[10px] rounded-full h-4 w-4 ml-1">
                {selected.length}
              </span>
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-400 transition-transform duration-200 group-data-[state=open]:rotate-180" />
            )}
          </button>
        </DropdownMenuTrigger>

        {!isComingSoon && (
          <DropdownMenuContent 
            align="start" 
            className="w-64 p-2 rounded-2xl shadow-xl border border-gray-100 bg-white z-50"
          >
            {options.map((option: any) => (
              <DropdownMenuCheckboxItem
                key={option.id}
                checked={selected.includes(option.id)}
                onCheckedChange={() => onToggle(option.id)}
                className="flex items-center gap-3 p-3 rounded-xl cursor-pointer focus:bg-gray-50 text-sm transition-colors"
              >
                <span className="flex items-center gap-2">
                  {option.flag || option.icon}
                  {option.label}
                </span>
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        )}
      </DropdownMenu>
    );
  };

  const hasAnyFilters = selectedPeople.length + selectedCountries.length + selectedDurations.length > 0;

  return (
    <div className="w-full">
      <div className="flex flex-wrap items-center gap-3">
        {/* Bouton Filtres Principal (désactivé pour l'instant) */}
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-gray-200 bg-white opacity-50 cursor-not-allowed font-medium text-[13px] text-gray-500">
          <SlidersHorizontal className="w-4 h-4 text-green-950" />
          {content.filters}
        </button>

        {/* Séparateur vertical */}
        <div className="h-6 w-1p] bg-gray-200 mx-1 hidden sm:block" />

        {/* Filtre Voyageurs - Activé pour l'exemple (tu peux mettre true pour Bientôt) */}
        <FilterButton
          title={content.peopleFilter}
          options={peopleOptions}
          selected={selectedPeople}
          onToggle={(id: string) => handleToggle(id, selectedPeople, setSelectedPeople)}
          isComingSoon={true} 
        />

        {/* Filtre Destinations - Bientôt */}
        <FilterButton
          title={content.countriesFilter}
          options={countryOptions}
          selected={selectedCountries}
          onToggle={(id: string) => handleToggle(id, selectedCountries, setSelectedCountries)}
          isComingSoon={true}
        />

        {/* Filtre Durée - Bientôt */}
        <FilterButton
          title={content.durationFilter}
          options={durationOptions}
          selected={selectedDurations}
          onToggle={(id: string) => handleToggle(id, selectedDurations, setSelectedDurations)}
          isComingSoon={true}
        />

        {/* Action Effacer tout */}
        {hasAnyFilters && (
          <button
            onClick={clearAllFilters}
            className="text-[13px] font-semibold text-green-950 underline underline-offset-4 hover:text-green-900 px-2 py-2 transition-colors"
          >
            {content.clearAll}
          </button>
        )}
      </div>
    </div>
  );
}