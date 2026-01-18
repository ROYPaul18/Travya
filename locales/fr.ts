export default {
  navbar: {
    brand: "Sillages",
    links: {
      myTrips: "Mes voyages",
      globe: "Globe",
      myGroups: "Mes groupes",
    },
    auth: {
      signIn: "Se connecter",
      logOut: "Se deconnecter",
    },
  },
  footer: {
    brand: "Sillages",
    cc: "© 2025 Sillages. Commencez votre voyage dès aujourd'hui.",
  },
  home: {
    hero: {
      tagline: "Planifiez votre prochaine aventure",
      title: "Votre voyage commence ici",
      description:
        "Planifiez, organisez et visualisez vos voyages en un seul endroit. Des destinations de rêve aux itinéraires détaillés.",
      cta: {
        getStarted: "Commencer",
        exploreGlobe: "Explorer le globe",
      },
      features: {
        title: "Tout ce dont vous avez besoin pour planifier votre voyage",
        items: {
          itineraries: {
            title: "Itinéraires intelligents",
            description:
              "Créez des itinéraires détaillés avec plusieurs étapes. Organisez vos arrêts et visualisez votre parcours.",
          },
        },
        globe: {
          title: "Globe interactif",
          description:
            "Visualisez toutes vos destinations sur un magnifique globe 3D. Suivez vos aventures en un coup d’œil.",
        },
        management: {
          title: "Gestion des voyages",
          description:
            "Gérez tous vos voyages depuis un tableau de bord unique. Suivez vos dates, lieux et souvenirs.",
        },
      },
    },
    steps: {
      title: "Commencez à planifier en 3 étapes simples",
      items: {
        step1: {
          title: "Créez votre voyage",
          description:
            "Définissez votre destination, vos dates et les détails du voyage. Ajoutez une description pour garder un souvenir spécial.",
        },
        step2: {
          title: "Ajoutez des lieux",
          description:
            "Épinglez tous les endroits que vous souhaitez visiter. Construisez votre itinéraire parfait avec plusieurs étapes.",
        },
        step3: {
          title: "Visualisez et explorez",
          description:
            "Découvrez votre voyage sur des cartes interactives et suivez vos aventures sur le globe 3D. Partagez votre expérience !",
        },
      },
    },
    cta: {
      title: "Prêt à commencer votre aventure ?",
      description:
        "Rejoignez des voyageurs du monde entier qui font confiance à Travel Planner pour organiser leurs vacances de rêve.",
      button: "Créez votre premier voyage",
    },
  },
  globe: {
    loadGlobe: "Chargement du globe...",
    loadAdventure: "Chargement de vos aventures...",
    yourTravelOdyssey: "Votre Odyssée Voyageuse",
    discoverWorld:
      "Découvrez le monde à travers vos aventures, une destination à la fois",
    yourFootprint: "Votre Empreinte sur la Terre",
    countries: "Pays",
    locations: "Lieux",
    countriesVisited: "Pays Visités",
    spot: "lieu",
    spots: "lieux",
    keepExploring: "Continuez d'explorer ! Le monde vous attend.",
  },
  newLocations: {
    title: "Ajouter un nouveau lieu",
    subtitle: "Épinglez votre prochaine destination sur la carte",
    form: {
      addressLabel: "Adresse",
      addressPlaceholder: "Entrez l'adresse du lieu...",
      submitButton: "Ajouter le lieu",
      submittingButton: "Ajout en cours...",
    },
    helper: "💡 Entrez une adresse complète pour un positionnement précis",
  },
  newTrip: {
    title: "Créer un nouveau voyage",
    subtitle: "Planifiez votre prochaine aventure",
    cardTitle: "Détails du voyage",
    form: {
      titleLabel: "Titre",
      titlePlaceholder: "Voyage au Japon...",
      descriptionLabel: "Description",
      descriptionPlaceholder: "Description du voyage....",
      startDateLabel: "Date de début",
      endDateLabel: "Date de fin",
      imageLabel: "Image du voyage",
      imageAlt: "Photo du voyage",
      submitButton: "Enregistrer le voyage",
      submittingButton: "Création en cours...",
    },
    helper: "💡 Ajoutez une image pour rendre votre voyage plus mémorable",
  },
  trip: {
    pleaseSignIn: "Veuillez vous connecter pour voir vos voyages.",
    welcomeBack: "Bon retour, {name} !",
    startPlanning:
      "Commencez à planifier votre premier voyage et démarrez votre aventure ! ✈️",
    tripsCount:
      "Vous avez {count} {trips, plural, =0 {voyage} =1 {voyage} other {voyages}} prévus.",
    upcomingAdventures:
      "🎉 {count} {adventures, plural, =1 {aventure} other {aventures}} à venir !",
    dashboard: "Tableau de bord",
    manageAdventures: "Gérez et explorez vos aventures voyageuses",
    newTrip: "Nouveau voyage",
    yourRecentTrips: "Vos voyages récents",
    noTripsYet: "Aucun voyage pour le moment",
    startPlanningAdventure:
      "Commencez à planifier votre aventure en créant votre premier voyage. Le monde vous attend ! 🌍",
    createFirstTrip: "Créer votre premier voyage",
    edit: "Modifier",
    upcoming: "À venir",
  },
  intinerary: {
    latitude: "Latitude",
    longitude: "Longitude",
    day: "Jour {order}",
    dragToReorder: "Glissez pour réorganiser l'itinéraire",
  },
} as const;
