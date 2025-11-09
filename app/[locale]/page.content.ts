import { t, type Dictionary } from 'intlayer';

const homeContent = {
  key: 'home',
  content: {
    // Hero Section
    badgeText: t({
      en: 'Plan Your Next Adventure',
      fr: 'Planifiez Votre Prochaine Aventure',
      es: 'Planifica Tu Próxima Aventura'
    }),
    title: t({
      en: 'Your Journey Starts Here',
      fr: 'Votre Voyage Commence Ici',
      es: 'Tu Viaje Comienza Aquí'
    }),
    subtitle: t({
      en: 'Plan, organize, and visualize your travels all in one place. From dream destinations to detailed itineraries.',
      fr: 'Planifiez, organisez et visualisez vos voyages en un seul endroit. Des destinations de rêve aux itinéraires détaillés.',
      es: 'Planifica, organiza y visualiza tus viajes en un solo lugar. Desde destinos soñados hasta itinerarios detallados.'
    }),
    getStarted: t({
      en: 'Get Started',
      fr: 'Commencer',
      es: 'Comenzar'
    }),
    exploreGlobe: t({
      en: 'Explore Globe',
      fr: 'Explorer le Globe',
      es: 'Explorar Globo'
    }),

    // Features Section
    featuresTitle: t({
      en: 'Everything You Need to Plan Your Trip',
      fr: 'Tout Ce Dont Vous Avez Besoin pour Planifier Votre Voyage',
      es: 'Todo Lo Que Necesitas para Planificar Tu Viaje'
    }),
    
    feature1: {
      title: t({
        en: 'Smart Itineraries',
        fr: 'Itinéraires Intelligents',
        es: 'Itinerarios Inteligentes'
      }),
      description: t({
        en: 'Create detailed itineraries with multiple locations. Organize your stops and visualize your route.',
        fr: 'Créez des itinéraires détaillés avec plusieurs lieux. Organisez vos étapes et visualisez votre parcours.',
        es: 'Crea itinerarios detallados con múltiples ubicaciones. Organiza tus paradas y visualiza tu ruta.'
      })
    },
    
    feature2: {
      title: t({
        en: 'Interactive Globe',
        fr: 'Globe Interactif',
        es: 'Globo Interactivo'
      }),
      description: t({
        en: 'See all your visited destinations on a beautiful 3D globe. Track your travel journey visually.',
        fr: 'Voyez toutes vos destinations visitées sur un magnifique globe 3D. Suivez visuellement votre parcours de voyage.',
        es: 'Ve todos tus destinos visitados en un hermoso globo 3D. Haz un seguimiento visual de tu viaje.'
      })
    },
    
    feature3: {
      title: t({
        en: 'Trip Management',
        fr: 'Gestion des Voyages',
        es: 'Gestión de Viajes'
      }),
      description: t({
        en: 'Manage all your trips in one dashboard. Track dates, locations, and create memories.',
        fr: 'Gérez tous vos voyages dans un seul tableau de bord. Suivez les dates, les lieux et créez des souvenirs.',
        es: 'Gestiona todos tus viajes en un solo panel. Realiza un seguimiento de fechas, ubicaciones y crea recuerdos.'
      })
    },

    // How It Works Section
    howItWorksTitle: t({
      en: 'Start Planning in 3 Simple Steps',
      fr: 'Commencez à Planifier en 3 Étapes Simples',
      es: 'Comienza a Planificar en 3 Sencillos Pasos'
    }),
    
    step1: {
      title: t({
        en: 'Create Your Trip',
        fr: 'Créez Votre Voyage',
        es: 'Crea Tu Viaje'
      }),
      description: t({
        en: 'Set your destination, dates, and trip details. Add a description to remember what makes this journey special.',
        fr: 'Définissez votre destination, dates et détails du voyage. Ajoutez une description pour vous souvenir de ce qui rend ce voyage spécial.',
        es: 'Establece tu destino, fechas y detalles del viaje. Agrega una descripción para recordar qué hace especial este viaje.'
      })
    },
    
    step2: {
      title: t({
        en: 'Add Locations',
        fr: 'Ajoutez des Lieux',
        es: 'Agrega Ubicaciones'
      }),
      description: t({
        en: 'Pin all the places you want to visit. Build your perfect itinerary with multiple stops along the way.',
        fr: 'Épinglez tous les lieux que vous souhaitez visiter. Construisez votre itinéraire parfait avec plusieurs étapes.',
        es: 'Marca todos los lugares que quieres visitar. Construye tu itinerario perfecto con múltiples paradas en el camino.'
      })
    },
    
    step3: {
      title: t({
        en: 'Visualize & Explore',
        fr: 'Visualisez & Explorez',
        es: 'Visualiza y Explora'
      }),
      description: t({
        en: 'View your trip on interactive maps and track all your adventures on the 3D globe. Share your journey!',
        fr: 'Visualisez votre voyage sur des cartes interactives et suivez toutes vos aventures sur le globe 3D. Partagez votre parcours !',
        es: 'Ve tu viaje en mapas interactivos y rastrea todas tus aventuras en el globo 3D. ¡Comparte tu viaje!'
      })
    },

    // CTA Section
    ctaTitle: t({
      en: 'Ready to Start Your Adventure?',
      fr: 'Prêt à Commencer Votre Aventure ?',
      es: '¿Listo para Comenzar Tu Aventura?'
    }),
    ctaSubtitle: t({
      en: 'Join travelers worldwide who trust Travel Planner to organize their dream vacations.',
      fr: 'Rejoignez les voyageurs du monde entier qui font confiance à Travel Planner pour organiser leurs vacances de rêve.',
      es: 'Únete a viajeros de todo el mundo que confían en Travel Planner para organizar sus vacaciones soñadas.'
    }),
    createFirstTrip: t({
      en: 'Create Your First Trip',
      fr: 'Créez Votre Premier Voyage',
      es: 'Crea Tu Primer Viaje'
    })
  },
} satisfies Dictionary;

export default homeContent;