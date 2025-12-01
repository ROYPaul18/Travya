import { t, type Dictionary } from 'intlayer';

const tripsClientContent = {
  key: 'trips-client',
  content: {
    // Tabs
    allTrips: t({
      en: 'All Trips',
      fr: 'Tous les voyages',
      es: 'Todos los viajes'
    }),
    upcoming: t({
      en: 'Upcoming',
      fr: 'À venir',
      es: 'Próximos'
    }),
    previous: t({
      en: 'Previous',
      fr: 'Passés',
      es: 'Anteriores'
    }),

    // Search
    searchPlaceholder: t({
      en: 'Search a trip...',
      fr: 'Rechercher un voyage...',
      es: 'Buscar un viaje...'
    }),

    // Status badges and text
    daysUntil: t({
      en: 'In {days} days',
      fr: 'Dans {days} jours',
      es: 'En {days} días'
    }),
    upcomingStatus: t({
      en: 'Upcoming',
      fr: 'À venir',
      es: 'Próximo'
    }),
    completedStatus: t({
      en: 'Completed',
      fr: 'Terminé',
      es: 'Completado'
    }),
    viewMore: t({
      en: 'View more',
      fr: 'Voir plus',
      es: 'Ver más'
    }),

    // Duration
    days: t({
      en: 'days',
      fr: 'jours',
      es: 'días'
    }),
    day: t({
      en: 'day',
      fr: 'jour',
      es: 'día'
    }),

    // Empty states
    noResults: t({
      en: 'No trips found.',
      fr: 'Aucun voyage trouvé.',
      es: 'No se encontraron viajes.'
    }),
    noResultsHint: t({
      en: 'Try adjusting your search criteria',
      fr: 'Essayez de modifier vos critères de recherche',
      es: 'Intenta ajustar tus criterios de búsqueda'
    }),

    // Trip information labels
    destination: t({
      en: 'Destination',
      fr: 'Destination',
      es: 'Destino'
    }),
    dates: t({
      en: 'Dates',
      fr: 'Dates',
      es: 'Fechas'
    }),
    duration: t({
      en: 'Duration',
      fr: 'Durée',
      es: 'Duración'
    }),

    // Accessibility labels
    searchLabel: t({
      en: 'Search trips',
      fr: 'Rechercher des voyages',
      es: 'Buscar viajes'
    }),
    gridViewLabel: t({
      en: 'Grid view',
      fr: 'Vue grille',
      es: 'Vista en cuadrícula'
    }),
    listViewLabel: t({
      en: 'List view',
      fr: 'Vue liste',
      es: 'Vista en lista'
    }),
    viewTripLabel: t({
      en: 'View trip details',
      fr: 'Voir les détails du voyage',
      es: 'Ver detalles del viaje'
    }),

    // Time indicators
    daysShort: t({
      en: 'D-{days}',
      fr: 'J-{days}',
      es: 'D-{days}'
    })
  },
} satisfies Dictionary;

export default tripsClientContent;