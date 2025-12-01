import { t, type Dictionary } from 'intlayer';

const tripDetailContent = {
  key: 'trip-detail',
  content: {
    edit: t({
      en: 'Edit',
      fr: 'Modifier',
      es: 'Editar'
    }),
    add: t({
      en: 'Add',
      fr: 'Ajouter',
      es: 'Agregar'
    }),
    backToTrips: t({
      en: 'Back to Trips',
      fr: 'Retour aux voyages',
      es: 'Volver a viajes'
    }),

    // Description
    description: t({
      en: 'Description',
      fr: 'Description',
      es: 'Descripción'
    }),

    // Tabs
    overview: t({
      en: 'Overview',
      fr: 'Aperçu',
      es: 'Resumen'
    }),
    itinerary: t({
      en: 'Itinerary',
      fr: 'Itinéraire',
      es: 'Itinerario'
    }),
    map: t({
      en: 'Map',
      fr: 'Carte',
      es: 'Mapa'
    }),

    // Overview Tab
    tripSummary: t({
      en: 'Trip Summary',
      fr: 'Résumé du voyage',
      es: 'Resumen del viaje'
    }),
    dates: t({
      en: 'Dates',
      fr: 'Dates',
      es: 'Fechas'
    }),
    destinations: t({
      en: 'Destinations',
      fr: 'Destinations',
      es: 'Destinos'
    }),
    location: t({
      en: 'location',
      fr: 'lieu',
      es: 'ubicación'
    }),
    locations: t({
      en: 'locations',
      fr: 'lieux',
      es: 'ubicaciones'
    }),

    // Empty States
    addLocationsMap: t({
      en: 'Add locations to see them on the map',
      fr: 'Ajoutez des lieux pour les voir sur la carte',
      es: 'Agrega ubicaciones para verlas en el mapa'
    }),
    addLocationsItinerary: t({
      en: 'Add locations to build your itinerary',
      fr: 'Ajoutez des lieux pour construire votre itinéraire',
      es: 'Agrega ubicaciones para construir tu itinerario'
    }),
    addLocationButton: t({
      en: 'Add Location',
      fr: 'Ajouter un lieu',
      es: 'Agregar ubicación'
    }),

    // Days text
    day: t({
      en: 'day',
      fr: 'jour',
      es: 'día'
    }),
    days: t({
      en: 'days',
      fr: 'jours',
      es: 'días'
    })
  },
} satisfies Dictionary;

export default tripDetailContent;