import { t, type Dictionary } from 'intlayer';

const itineraryComContent = {
  key: 'itinerary-community',
  content: {

    itinerary: t({
      en: 'Itinerary',
      fr: 'Itinéraire',
      es: 'Itinerario'
    }),

    addLocationButton: t({
      en: 'Add location',
      fr: 'Ajouter un lieu',
      es: 'Añadir ubicación'
    }),

    noStepsTitle: t({
      en: 'No steps added',
      fr: 'Aucune étape',
      es: 'Sin etapas'
    }),

    noStepsDescription: t({
      en: 'Start planning your trip.',
      fr: 'Commencez à planifier votre voyage.',
      es: 'Comienza a planificar tu viaje.'
    }),
  },
} satisfies Dictionary;

export default itineraryComContent;