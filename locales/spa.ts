export default {
  navbar: {
    brand: "Sillages",
    links: {
      myTrips: "Mis Viajes",
      globe: "Globo",
      myGroups: "Mis Grupos",
    },
    auth: {
      signIn: "Iniciar Sesión",
      logOut: "Cerrar Sesión",
    },
  },
  footer: {
    brand: "Sillages",
    cc: "© 2025 Sillages. Comienza tu viaje hoy.",
  },
  home: {
    hero: {
      tagline: "Planifica tu próxima aventura",
      title: "Tu viaje comienza aquí",
      description: "Planifica, organiza y visualiza tus viajes en un solo lugar. Desde destinos soñados hasta itinerarios detallados.",
      cta: {
        getStarted: "Comenzar",
        exploreGlobe: "Explorar el Globo",
      },
      features: {
        title: "Todo lo que necesitas para planificar tu viaje",
        items: {
          itineraries: {
            title: "Itinerarios Inteligentes",
            description: "Crea itinerarios detallados con múltiples paradas. Organiza tus visitas y visualiza tu ruta.",
          },
          globe: {
            title: "Globo Interactivo",
            description: "Visualiza todos tus destinos en un hermoso globo 3D. Sigue tus aventuras de un vistazo.",
          },
          management: {
            title: "Gestión de Viajes",
            description: "Gestiona todos tus viajes desde un solo panel. Controla tus fechas, ubicaciones y recuerdos.",
          },
        },
      },
    },
    steps: {
      title: "Comienza a planificar en 3 simples pasos",
      items: {
        step1: {
          title: "Crea tu viaje",
          description: "Define tu destino, fechas y detalles del viaje. Añade una descripción para guardar un recuerdo especial.",
        },
        step2: {
          title: "Añade ubicaciones",
          description: "Marca todos los lugares que quieres visitar. Construye tu itinerario perfecto con múltiples paradas.",
        },
        step3: {
          title: "Visualiza y explora",
          description: "Descubre tu viaje en mapas interactivos y sigue tus aventuras en el globo 3D. ¡Comparte tu experiencia!",
        },
      },
    },
    cta: {
      title: "¿Listo para comenzar tu aventura?",
      description: "Únete a viajeros de todo el mundo que confían en Travel Planner para organizar sus vacaciones soñadas.",
      button: "Crea tu primer viaje",
    },
  },
  globe: {
    loadGlobe: "Cargando globo...",
    loadAdventure: "Cargando tus aventuras...",
    yourTravelOdyssey: "Tu Odisea Viajera",
    discoverWorld: "Descubre el mundo a través de tus aventuras, un destino a la vez",
    yourFootprint: "Tu Huella en la Tierra",
    countries: "Países",
    locations: "Ubicaciones",
    countriesVisited: "Países Visitados",
    spot: "lugar",
    spots: "lugares",
    keepExploring: "¡Sigue explorando! El mundo te espera.",
  },
  newLocations: {
    title: "Añadir nueva ubicación",
    subtitle: "Marca tu próximo destino en el mapa",
    form: {
      addressLabel: "Dirección",
      addressPlaceholder: "Ingresa la dirección del lugar...",
      submitButton: "Añadir Ubicación",
      submittingButton: "Añadiendo...",
    },
    helper: "💡 Ingresa una dirección completa para un posicionamiento preciso",
  },
  newTrip: {
    title: "Crear nuevo viaje",
    subtitle: "Planifica tu próxima aventura",
    cardTitle: "Detalles del Viaje",
    form: {
      titleLabel: "Título",
      titlePlaceholder: "Viaje a Japón...",
      descriptionLabel: "Descripción",
      descriptionPlaceholder: "Descripción del viaje...",
      startDateLabel: "Fecha de Inicio",
      endDateLabel: "Fecha de Fin",
      imageLabel: "Imagen del Viaje",
      imageAlt: "Foto del viaje",
      submitButton: "Guardar Viaje",
      submittingButton: "Creando...",
    },
    helper: "💡 Añade una imagen para hacer tu viaje más memorable",
  },
  trip: {
    pleaseSignIn: "Por favor inicia sesión para ver tus viajes.",
    welcomeBack: "¡Bienvenido de nuevo, {name}!",
    startPlanning: "¡Comienza a planificar tu primer viaje y empieza tu aventura! ✈️",
    tripsCount: "Tienes {count} {trips, plural, =0 {viaje} =1 {viaje} other {viajes}} planeados.",
    upcomingAdventures: "🎉 ¡{count} {adventures, plural, =1 {aventura} other {aventuras}} próximas!",
    dashboard: "Panel de Control",
    manageAdventures: "Gestiona y explora tus aventuras viajeras",
    newTrip: "Nuevo Viaje",
    yourRecentTrips: "Tus Viajes Recientes",
    noTripsYet: "Aún no hay viajes",
    startPlanningAdventure: "Comienza a planificar tu aventura creando tu primer viaje. ¡El mundo te espera! 🌍",
    createFirstTrip: "Crea tu Primer Viaje",
    edit: "Editar",
    upcoming: "Próximo",
  },
  intinerary: {
    latitude: "Latitud",
    longitude: "Longitud",
    day: "Día {order}",
    dragToReorder: "Arrastra para reordenar el itinerario",
  },
} as const;