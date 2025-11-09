import { type Dictionary } from "intlayer";

const tripsPageContent = {
  key: "trips-page",
  content: {
    metadata: {
      title: {
        en: "Please Sign In to view your trips.",
        fr: "Veuillez vous connecter pour voir vos voyages.",
        es: "Por favor inicia sesión para ver tus viajes.",
      },
    },

    // Welcome section
    wel: {
      en: "Welcome back,",
      fr: "Bon retour,",
      es: "Bienvenido de nuevo,",
    },

    // Dashboard
    dashboard: {
      en: "Dashboard",
      fr: "Tableau de bord",
      es: "Panel de control",
    },

    dashboardSubtitle: {
      en: "Manage and explore your travel adventures",
      fr: "Gérez et explorez vos aventures de voyage",
      es: "Gestiona y explora tus aventuras de viaje",
    },

    newTrip: {
      en: "New Trip",
      fr: "Nouveau voyage",
      es: "Nuevo viaje",
    },

    // Trips section
    yourRecentTrips: {
      en: "Your Recent Trips",
      fr: "Vos voyages récents",
      es: "Tus viajes recientes",
    },

    // Empty state
    noTripsYet: {
      en: "No trips yet",
      fr: "Aucun voyage pour l'instant",
      es: "Aún no hay viajes",
    },

    emptyStateMessage: {
      en: "Start planning your adventure by creating your first trip. The world is waiting for you! 🌍",
      fr: "Commencez à planifier votre aventure en créant votre premier voyage. Le monde vous attend ! 🌍",
      es: "Comienza a planificar tu aventura creando tu primer viaje. ¡El mundo te espera! 🌍",
    },

    createFirstTrip: {
      en: "Create Your First Trip",
      fr: "Créer votre premier voyage",
      es: "Crear tu primer viaje",
    },

    upcoming: {
      en: "Upcoming",
      fr: "À venir",
      es: "Próximo",
    },
    deleteTrip: {
      en: "Delete Trip",
      fr: "Supprimer le voyage",
      es: "Eliminar viaje",
    },
    confirmDeleteTitle: {
      en: "Delete Trip",
      fr: "Supprimer le voyage",
      es: "Eliminar viaje",
    },

    confirmDeleteDescription: {
      en: "Are you sure you want to delete this trip? This action cannot be undone and will delete all locations and activities.",
      fr: "Êtes-vous sûr de vouloir supprimer ce voyage ? Cette action est irréversible et supprimera tous les lieux et activités.",
      es: "¿Estás seguro de que quieres eliminar este viaje? Esta acción no se puede deshacer y eliminará todas las ubicaciones y actividades.",
    },

    confirmDelete: {
      en: "Delete",
      fr: "Supprimer",
      es: "Eliminar",
    },

    cancel: {
      en: "Cancel",
      fr: "Annuler",
      es: "Cancelar",
    },
  },
} satisfies Dictionary;

export default tripsPageContent;
