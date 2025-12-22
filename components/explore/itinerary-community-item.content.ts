import { t, type Dictionary } from 'intlayer';

const tripsCommunityItemContent = {
  key: 'trips-community-item',
  content: {
    // Texte "à venir" qui apparaît plusieurs fois
    comingSoon: t({
      en: 'coming soon...',
      fr: 'à venir...',
      es: 'próximamente...'
    }),

    // Pluriels pour les jours
    day: t({
      en: 'Day',
      fr: 'Jour',
      es: 'Día'
    }),

    days: t({
      en: 'Days',
      fr: 'Jours',
      es: 'Días'
    }),

    // Autres textes qui pourraient être utiles
    pricePlaceholder: t({
      en: 'Price to be determined',
      fr: 'Prix à déterminer',
      es: 'Precio por determinar'
    }),

    privacyLabel: t({
      en: 'Privacy',
      fr: 'Confidentialité',
      es: 'Privacidad'
    }),

    statusLabel: t({
      en: 'Status',
      fr: 'Statut',
      es: 'Estado'
    }),

    travelersLabel: t({
      en: 'Travelers',
      fr: 'Voyageurs',
      es: 'Viajeros'
    }),
  },
} satisfies Dictionary;

export default tripsCommunityItemContent;