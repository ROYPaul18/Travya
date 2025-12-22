import { t, type Dictionary } from 'intlayer';

const tripsClientContent = {
  key: 'favoris',
  content: {
    // Titre principal
    mainTitle: t({
      en: 'My favorites',
      fr: 'Mes favoris',
      es: 'Mis favoritos'
    }),

    // Barre de recherche
    searchPlaceholder: t({
      en: 'Search trips...',
      fr: 'Rechercher des voyages...',
      es: 'Buscar viajes...'
    }),
    
    searchLabel: t({
      en: 'Search trips by title or description',
      fr: 'Rechercher des voyages par titre ou description',
      es: 'Buscar viajes por título o descripción'
    }),

    // Messages d'absence de résultats
    noResults: t({
      en: 'No trips found',
      fr: 'Aucun voyage trouvé',
      es: 'No se encontraron viajes'
    }),
    
    noResultsHint: t({
      en: 'Try adjusting your search or filters',
      fr: 'Essayez d\'ajuster votre recherche ou vos filtres',
      es: 'Intenta ajustar tu búsqueda o filtros'
    }),

    // Bouton filtre (pour mobile)
    filterButton: t({
      en: 'Filters',
      fr: 'Filtres',
      es: 'Filtros'
    }),

    // Autres textes qui pourraient être utiles dans ce composant
    tripsCount: t({
      en: '{count} trips',
      fr: '{count} voyages',
      es: '{count} viajes'
    }),

    loadingText: t({
      en: 'Loading trips...',
      fr: 'Chargement des voyages...',
      es: 'Cargando viajes...'
    }),
  },
} satisfies Dictionary;

export default tripsClientContent;