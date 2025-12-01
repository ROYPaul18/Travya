import { t, type Dictionary } from 'intlayer';

const globeContent = {
  key: 'globe',
  content: {
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
    footerMessage: t({
      en: 'Keep exploring! The world is waiting for you.',
      fr: 'Continuez à explorer ! Le monde vous attend.',
      es: '¡Sigue explorando! El mundo te espera.'
    }),
    // NOUVELLES CLÉS DE TRADUCTION
    myTravelSummary: t({
        en: 'My Travel Summary',
        fr: 'Mon Bilan Voyage',
        es: 'Mi Resumen de Viajes'
    }),
    countriesVisitedTitle: t({
        en: 'Countries Visited',
        fr: 'Pays Visités',
        es: 'Países Visitados'
    }),
    locationsCaptured: t({
        en: 'Locations Captured',
        fr: 'Lieux Capturés',
        es: 'Lugares Capturados'
    }),
    exploredCountries: t({
        en: 'Explored Countries',
        fr: 'Pays Explorés',
        es: 'Países Explorados'
    }),
    loading: t({
        en: 'Loading...',
        fr: 'Chargement...',
        es: 'Cargando...'
    }),
    noCountriesMessage: t({
        en: 'No countries recorded. Start your first trip!',
        fr: 'Aucun pays enregistré. Commencez votre premier voyage !',
        es: 'Ningún país registrado. ¡Comienza tu primer viaje!'
    }),
  },
} satisfies Dictionary;

export default globeContent;