import { t, type Dictionary } from 'intlayer';

const tripsFiltersContent = {
  key: 'trips-community-filters',
  content: {
    // Texte commun pour toutes les options
    comingSoon: t({
      en: 'Coming soon...',
      fr: 'À venir...',
      es: 'Próximamente...'
    }),

    // Titres des filtres
    peopleFilter: t({
      en: 'People',
      fr: 'Personnes',
      es: 'Personas'
    }),

    countriesFilter: t({
      en: 'Countries',
      fr: 'Pays',
      es: 'Países'
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

    // Bouton
    clearAll: t({
      en: 'Clear all',
      fr: 'Effacer tout',
      es: 'Limpiar todo'
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
  },
} satisfies Dictionary;

export default tripsFiltersContent;