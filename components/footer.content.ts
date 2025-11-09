import { t, type Dictionary } from 'intlayer';

const footerContent = {
  key: 'footer',
  content: {
    copyright: t({
      en: '© 2025 Travya. Start your journey today.',
      fr: '© 2025 Travya. Commencez votre voyage aujourd\'hui.',
      es: '© 2025 Travya. Comienza tu viaje hoy.'
    }),
    tagline: t({
      en: 'Start your journey today',
      fr: 'Commencez votre voyage aujourd\'hui',
      es: 'Comienza tu viaje hoy'
    })
  },
} satisfies Dictionary;

export default footerContent;