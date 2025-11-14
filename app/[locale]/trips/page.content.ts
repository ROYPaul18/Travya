import { t, type Dictionary } from "intlayer";

const tripsPageContent = {
  key: "trips-page",
  content: {
    metadata: {
      title: t({
        en: "Please Sign In to view your trips.",
        fr: "Veuillez vous connecter pour voir vos voyages.",
        es: "Por favor inicia sesión para ver tus viajes.",
      }),
    },

    // Welcome section
    wel: t({
      en: "Welcome back,",
      fr: "Bon retour,",
      es: "Bienvenido de nuevo,",
    }),

    // Dashboard
    dashboard: t({
      en: "Dashboard",
      fr: "Tableau de bord",
      es: "Panel de control",
    }),

    dashboardSubtitle: t({
      en: "Manage and explore your travel adventures",
      fr: "Gérez et explorez vos aventures de voyage",
      es: "Gestiona y explora tus aventuras de viaje",
    }),

    newTrip: t({
      en: "New Trip",
      fr: "Nouveau voyage",
      es: "Nuevo viaje",
    }),

    // Trips section
    yourRecentTrips: t({
      en: "Your Recent Trips",
      fr: "Vos voyages récents",
      es: "Tus viajes recientes",
    }),

    // Stats cards
    totalTrips: t({
      en: "Total Trips",
      fr: "Total voyages", 
      es: "Total viajes"
    }),

    totalTrip: t({
      en: "Total Trip",
      fr: "Total voyage",
      es: "Total viaje"
    }),

    memories: t({
      en: "Memories",
      fr: "Souvenirs",
      es: "Recuerdos",
    }),

    // Empty state
    noTripsYet: t({
      en: "No trips yet",
      fr: "Aucun voyage pour l'instant",
      es: "Aún no hay viajes",
    }),

    emptyStateMessage: t({
      en: "Start planning your adventure by creating your first trip. The world is waiting for you! 🌍",
      fr: "Commencez à planifier votre aventure en créant votre premier voyage. Le monde vous attend ! 🌍",
      es: "Comienza a planificar tu aventura creando tu primer viaje. ¡El mundo te espera! 🌍",
    }),

    createFirstTrip: t({
      en: "Create Your First Trip",
      fr: "Créer votre premier voyage",
      es: "Crear tu primer viaje",
    }),

    upcoming: t({
      en: "Upcoming",
      fr: "À venir",
      es: "Próximo",
    }),

    previus: t({
      en: "Previous Trips",
      fr: "Voyages précédents",
      es: "Viajes anteriores",
    }),

    pastAdventures: t({
      en: "Past Adventures",
      fr: "Aventures passées",
      es: "Aventuras pasadas",
    }),

    // Days count
    daysUntilToday: t({
      en: "Today!",
      fr: "Aujourd'hui !",
      es: "¡Hoy!",
    }),

    dayAway: t({
      en: "day away", 
      fr: "jour",
      es: "día"
    }),

    daysAway: t({
      en: "days away",
      fr: "jours",
      es: "días"
    }),

    deleteTrip: t({
      en: "Delete Trip",
      fr: "Supprimer le voyage",
      es: "Eliminar viaje",
    }),
    
    confirmDeleteTitle: t({
      en: "Delete Trip",
      fr: "Supprimer le voyage",
      es: "Eliminar viaje",
    }),

    confirmDeleteDescription: t({
      en: "Are you sure you want to delete this trip? This action cannot be undone and will delete all locations and activities.",
      fr: "Êtes-vous sûr de vouloir supprimer ce voyage ? Cette action est irréversible et supprimera tous les lieux et activités.",
      es: "¿Estás seguro de que quieres eliminar este viaje? Esta acción no se puede deshacer y eliminará todas las ubicaciones y actividades.",
    }),

    confirmDelete: t({
      en: "Delete",
      fr: "Supprimer",
      es: "Eliminar",
    }),

    cancel: t({
      en: "Cancel",
      fr: "Annuler",
      es: "Cancelar",
    }),

    // Additional missing translations from the component
    upcomingTrips: t({
      en: "Upcoming Trips",
      fr: "Voyages à venir",
      es: "Próximos viajes",
    }),

    pastTrips: t({
      en: "Past Trips",
      fr: "Voyages passés",
      es: "Viajes pasados",
    }),

    trip: t({
      en: "Trip",
      fr: "Voyage",
      es: "Viaje",
    }),

    trips: t({
      en: "Trips",
      fr: "Voyages",
      es: "Viajes",
    }),

    viewTrip: t({
      en: "View Trip",
      fr: "Voir le voyage",
      es: "Ver viaje",
    }),

    editTrip: t({
      en: "Edit Trip",
      fr: "Modifier le voyage",
      es: "Editar viaje",
    }),

    tripDetails: t({
      en: "Trip Details",
      fr: "Détails du voyage",
      es: "Detalles del viaje",
    }),

    startDate: t({
      en: "Start Date",
      fr: "Date de début",
      es: "Fecha de inicio",
    }),

    endDate: t({
      en: "End Date",
      fr: "Date de fin",
      es: "Fecha de fin",
    }),

    description: t({
      en: "Description",
      fr: "Description",
      es: "Descripción",
    }),

    noDescription: t({
      en: "No description provided",
      fr: "Aucune description fournie",
      es: "No hay descripción proporcionada",
    }),

    loading: t({
      en: "Loading...",
      fr: "Chargement...",
      es: "Cargando...",
    }),

    errorLoadingTrips: t({
      en: "Error loading trips",
      fr: "Erreur lors du chargement des voyages",
      es: "Error al cargar los viajes",
    }),

    tryAgain: t({
      en: "Try Again",
      fr: "Réessayer",
      es: "Intentar de nuevo",
    }),

    createTrip: t({
      en: "Create Trip",
      fr: "Créer un voyage",
      es: "Crear viaje",
    }),

    searchTrips: t({
      en: "Search trips...",
      fr: "Rechercher des voyages...",
      es: "Buscar viajes...",
    }),

    filterBy: t({
      en: "Filter by",
      fr: "Filtrer par",
      es: "Filtrar por",
    }),

    sortBy: t({
      en: "Sort by",
      fr: "Trier par",
      es: "Ordenar por",
    }),

    allTrips: t({
      en: "All Trips",
      fr: "Tous les voyages",
      es: "Todos los viajes",
    }),
  },
} satisfies Dictionary;

export default tripsPageContent;