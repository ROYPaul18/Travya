import { t, type Dictionary } from 'intlayer';

const globeContent = {
  key: 'globe',
  content: {
    // Header
    title: t({
      en: 'Your Travel Odyssey',
      fr: 'Votre Odyssée Voyageuse',
      es: 'Tu Odisea de Viajes'
    }),
    subtitle: t({
      en: 'Discover the world through your adventures, one destination at a time',
      fr: 'Découvrez le monde à travers vos aventures, une destination à la fois',
      es: 'Descubre el mundo a través de tus aventuras, un destino a la vez'
    }),

    // Globe Section
    globeTitle: t({
      en: 'Your Footprint on Earth',
      fr: 'Votre Empreinte sur la Terre',
      es: 'Tu Huella en la Tierra'
    }),
    loadingAdventures: t({
      en: 'Loading your adventures...',
      fr: 'Chargement de vos aventures...',
      es: 'Cargando tus aventuras...'
    }),
    loadingGlobe: t({
      en: 'Loading globe...',
      fr: 'Chargement du globe...',
      es: 'Cargando globo...'
    }),

    // Stats Cards
    countries: t({
      en: 'Countries',
      fr: 'Pays',
      es: 'Países'
    }),
    locations: t({
      en: 'Locations',
      fr: 'Lieux',
      es: 'Ubicaciones'
    }),

    // Countries List
    countriesVisited: t({
      en: 'Countries Visited',
      fr: 'Pays Visités',
      es: 'Países Visitados'
    }),
    spot: t({
      en: 'spot',
      fr: 'lieu',
      es: 'lugar'
    }),
    spots: t({
      en: 'spots',
      fr: 'lieux',
      es: 'lugares'
    }),

    // Footer
    footerMessage: t({
      en: 'Keep exploring! The world is waiting for you.',
      fr: 'Continuez à explorer ! Le monde vous attend.',
      es: '¡Sigue explorando! El mundo te espera.'
    })
  },
} satisfies Dictionary;

export default globeContent;