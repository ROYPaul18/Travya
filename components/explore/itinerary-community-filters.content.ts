import { t, type Dictionary } from 'intlayer';

const tripsFiltersContent = {
  key: 'trips-community-filters',
  content: {
    // Titres des filtres
    peopleFilter: t({
      en: 'Travelers',
      fr: 'Voyageurs',
      es: 'Viajeros'
    }),

    countriesFilter: t({
      en: 'Destinations',
      fr: 'Destinations',
      es: 'Destinos'
    }),

    durationFilter: t({
      en: 'Duration',
      fr: 'Durée',
      es: 'Duración'
    }),

    budgetFilter: t({
      en: 'Budget',
      fr: 'Budget',
      es: 'Presupuesto'
    }),

    // Boutons et textes généraux
    clearAll: t({
      en: 'Clear all',
      fr: 'Effacer tout',
      es: 'Limpiar todo'
    }),

    filters: t({
      en: 'Filters',
      fr: 'Filtres',
      es: 'Filtros'
    }),

    // Préfixes pour les labels des filtres
    peoplePrefix: t({
      en: 'People',
      fr: 'Personnes',
      es: 'Personas'
    }),

    countriesPrefix: t({
      en: 'Country',
      fr: 'Pays',
      es: 'País'
    }),

    durationPrefix: t({
      en: 'Duration',
      fr: 'Durée',
      es: 'Duración'
    }),

    budgetPrefix: t({
      en: 'Budget',
      fr: 'Budget',
      es: 'Presupuesto'
    }),

    // Options pour le filtre "Voyageurs"
    soloTraveler: t({
      en: 'Solo',
      fr: 'Solo',
      es: 'Solo'
    }),

    couple: t({
      en: 'Couple',
      fr: 'Couple',
      es: 'Pareja'
    }),

    smallGroup: t({
      en: 'Small group (3-5)',
      fr: 'Petit groupe (3-5)',
      es: 'Grupo pequeño (3-5)'
    }),

    largeGroup: t({
      en: 'Large group (6+)',
      fr: 'Grand groupe (6+)',
      es: 'Grupo grande (6+)'
    }),

    // Options pour le filtre "Destinations"
    france: t({
      en: 'France',
      fr: 'France',
      es: 'Francia'
    }),

    italy: t({
      en: 'Italy',
      fr: 'Italie',
      es: 'Italia'
    }),

    spain: t({
      en: 'Spain',
      fr: 'Espagne',
      es: 'España'
    }),

    japan: t({
      en: 'Japan',
      fr: 'Japon',
      es: 'Japón'
    }),

    usa: t({
      en: 'United States',
      fr: 'États-Unis',
      es: 'Estados Unidos'
    }),

    thailand: t({
      en: 'Thailand',
      fr: 'Thaïlande',
      es: 'Tailandia'
    }),

    // Options pour le filtre "Durée"
    weekend: t({
      en: 'Weekend',
      fr: 'Week-end',
      es: 'Fin de semana'
    }),

    shortTrip: t({
      en: 'Short (3-7 days)',
      fr: 'Court (3-7 jours)',
      es: 'Corto (3-7 días)'
    }),

    mediumTrip: t({
      en: 'Medium (1-2 weeks)',
      fr: 'Moyen (1-2 semaines)',
      es: 'Medio (1-2 semanas)'
    }),

    longTrip: t({
      en: 'Long (3+ weeks)',
      fr: 'Long (3+ semaines)',
      es: 'Largo (3+ semanas)'
    }),

    // Options pour le filtre "Budget"
    budget: t({
      en: 'Economical',
      fr: 'Économique',
      es: 'Económico'
    }),

    moderate: t({
      en: 'Moderate',
      fr: 'Modéré',
      es: 'Moderado'
    }),

    comfortable: t({
      en: 'Comfortable',
      fr: 'Confortable',
      es: 'Cómodo'
    }),

    luxury: t({
      en: 'Luxury',
      fr: 'Luxe',
      es: 'Lujo'
    }),
  },
} satisfies Dictionary;

export default tripsFiltersContent;