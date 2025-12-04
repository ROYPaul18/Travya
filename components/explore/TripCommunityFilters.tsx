"use client";

import { useState } from "react";
import { ChevronDown, Users, Globe, Calendar, Euro } from "lucide-react";

interface TripsFiltersProps {
  sidebarOpen?: boolean;
}

export function TripsFilters({ 
  sidebarOpen = true 
}: TripsFiltersProps) {
  const [selectedPeople, setSelectedPeople] = useState<string[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedDurations, setSelectedDurations] = useState<string[]>([]);
  const [selectedBudgets, setSelectedBudgets] = useState<string[]>([]);

  const [expandedSections, setExpandedSections] = useState({
    people: true,
    country: true,
    duration: true,
    budget: true,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const peopleOptions = [
    { id: "solo", label: "Solo (1 personne)", icon: "👤" },
    { id: "couple", label: "En couple (2)", icon: "👫" },
    { id: "small", label: "Petit groupe (3-5)", icon: "👥" },
    { id: "large", label: "Grand groupe (6+)", icon: "👨‍👩‍👧‍👦" },
  ];

  const countryOptions = [
    { id: "france", label: "France", flag: "🇫🇷" },
    { id: "italy", label: "Italie", flag: "🇮🇹" },
    { id: "spain", label: "Espagne", flag: "🇪🇸" },
    { id: "japan", label: "Japon", flag: "🇯🇵" },
    { id: "usa", label: "États-Unis", flag: "🇺🇸" },
    { id: "thailand", label: "Thaïlande", flag: "🇹🇭" },
  ];

  const durationOptions = [
    { id: "weekend", label: "Week-end (1-3 jours)" },
    { id: "short", label: "Court séjour (4-7 jours)" },
    { id: "medium", label: "Moyenne durée (8-14 jours)" },
    { id: "long", label: "Long séjour (15+ jours)" },
  ];

  const budgetOptions = [
    { id: "budget", label: "Économique (< 500€)" },
    { id: "moderate", label: "Modéré (500-1500€)" },
    { id: "comfortable", label: "Confortable (1500-3000€)" },
    { id: "luxury", label: "Luxe (3000€+)" },
  ];

  const handleToggle = (
    value: string,
    selected: string[],
    setter: (val: string[]) => void
  ) => {
    if (selected.includes(value)) {
      setter(selected.filter(v => v !== value));
    } else {
      setter([...selected, value]);
    }
  };

  const FilterSection = ({
    title,
    icon: Icon,
    sectionKey,
    options,
    selected,
    onToggle,
    showFlags = false,
    showIcons = false,
  }: {
    title: string;
    icon: any;
    sectionKey: keyof typeof expandedSections;
    options: Array<{ id: string; label: string; flag?: string; icon?: string }>;
    selected: string[];
    onToggle: (id: string) => void;
    showFlags?: boolean;
    showIcons?: boolean;
  }) => (
    <div className="border-b border-gray-200 pb-4 last:border-0">
      <button
        onClick={() => toggleSection(sectionKey)}
        className="w-full flex items-center justify-between mb-3 group"
      >
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4 text-gray-600" />
          <h3 className="text-sm font-medium text-gray-900">{title}</h3>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-gray-400 transition-transform ${
            expandedSections[sectionKey] ? "rotate-180" : ""
          }`}
        />
      </button>

      {expandedSections[sectionKey] && (
        <div className="space-y-2 pl-6">
          {options.map((option) => (
            <label
              key={option.id}
              className="flex items-center gap-2.5 cursor-pointer group/item"
            >
              <input
                type="checkbox"
                checked={selected.includes(option.id)}
                onChange={() => onToggle(option.id)}
                className="w-4 h-4 lg:w-4.5 lg:h-4.5 rounded accent-green-950 border-gray-300 text-green-950 focus:ring-green-900 cursor-pointer peer-checked/draft:block"
              />
              <span className="text-gray-700 font-light text-sm group-hover/item:text-green-900 transition-colors flex items-center gap-1.5">
                {showFlags && option.flag && (
                  <span className="text-base">{option.flag}</span>
                )}
                {showIcons && option.icon && (
                  <span className="text-base">{option.icon}</span>
                )}
                {option.label}
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <aside
      className={`
      w-full lg:w-64 lg:border-r lg:border-gray-100 lg:pr-6
      ${sidebarOpen ? "block" : "hidden lg:block"}
    `}
    >
      <div className="bg-white lg:bg-transparent p-4 lg:p-0 rounded-lg lg:rounded-none border lg:border-0 border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-base font-medium text-gray-900">Filtres</h2>
          <button
            onClick={() => {
              setSelectedPeople([]);
              setSelectedCountries([]);
              setSelectedDurations([]);
              setSelectedBudgets([]);
            }}
            className="text-xs text-gray-500 hover:text-green-900 font-light transition-colors"
          >
            Réinitialiser
          </button>
        </div>

        <div className="space-y-4">
          <FilterSection
            title="Nombre de personnes"
            icon={Users}
            sectionKey="people"
            options={peopleOptions}
            selected={selectedPeople}
            onToggle={(id) => handleToggle(id, selectedPeople, setSelectedPeople)}
            showIcons
          />

          <FilterSection
            title="Pays"
            icon={Globe}
            sectionKey="country"
            options={countryOptions}
            selected={selectedCountries}
            onToggle={(id) => handleToggle(id, selectedCountries, setSelectedCountries)}
            showFlags
          />

          <FilterSection
            title="Durée"
            icon={Calendar}
            sectionKey="duration"
            options={durationOptions}
            selected={selectedDurations}
            onToggle={(id) => handleToggle(id, selectedDurations, setSelectedDurations)}
          />

          <FilterSection
            title="Budget"
            icon={Euro}
            sectionKey="budget"
            options={budgetOptions}
            selected={selectedBudgets}
            onToggle={(id) => handleToggle(id, selectedBudgets, setSelectedBudgets)}
          />
        </div>

        {(selectedPeople.length > 0 ||
          selectedCountries.length > 0 ||
          selectedDurations.length > 0 ||
          selectedBudgets.length > 0) && (
          <div className="mt-6 pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500 font-light mb-2">
              {selectedPeople.length +
                selectedCountries.length +
                selectedDurations.length +
                selectedBudgets.length}{" "}
              filtre(s) actif(s)
            </p>
          </div>
        )}
      </div>
    </aside>
  );
}