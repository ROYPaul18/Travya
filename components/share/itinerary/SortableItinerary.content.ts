import { t, type Dictionary } from 'intlayer';

const itineraryContent = {
  key: 'itinerary',
  content: {
    // SortableItem
    day: t({
      en: 'Day',
      fr: 'Jour',
      es: 'Día'
    }),
    activity: t({
      en: 'activity',
      fr: 'activité',
      es: 'actividad'
    }),
    activities: t({
      en: 'activities',
      fr: 'activités',
      es: 'actividades'
    })
  },
} satisfies Dictionary;

export default itineraryContent;