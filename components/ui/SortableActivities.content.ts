import { t, type Dictionary } from 'intlayer';

const activitiesContent = {
  key: 'activities',
  content: {
    // UI Text
    dragHint: t({
      en: '💡 Drag and drop to reorganize your activities',
      fr: '💡 Glissez-déposez pour réorganiser vos activités',
      es: '💡 Arrastra y suelta para reorganizar tus actividades'
    }),
    noActivities: t({
      en: 'No activities for this day',
      fr: 'Aucune activité pour ce jour',
      es: 'No hay actividades para este día'
    }),
    addActivity: t({
      en: 'Add an activity',
      fr: 'Ajouter une activité',
      es: 'Agregar una actividad'
    }),

    // Activity Categories
    categories: {
      RESTAURANT: t({
        en: 'Restaurant',
        fr: 'Restaurant',
        es: 'Restaurante'
      }),
      CAFE: t({
        en: 'Cafe',
        fr: 'Café',
        es: 'Cafetería'
      }),
      VISITE: t({
        en: 'Visit',
        fr: 'Visite',
        es: 'Visita'
      }),
      HOTEL: t({
        en: 'Hotel',
        fr: 'Hôtel',
        es: 'Hotel'
      }),
      TRANSPORT: t({
        en: 'Transport',
        fr: 'Transport',
        es: 'Transporte'
      }),
      SHOPPING: t({
        en: 'Shopping',
        fr: 'Shopping',
        es: 'Compras'
      }),
      NATURE: t({
        en: 'Nature',
        fr: 'Nature',
        es: 'Naturaleza'
      }),
      SPORT: t({
        en: 'Sport',
        fr: 'Sport',
        es: 'Deporte'
      }),
      AUTRE: t({
        en: 'Other',
        fr: 'Autre',
        es: 'Otro'
      })
    },

    // Tooltips
    editActivity: t({
      en: 'Edit activity',
      fr: 'Modifier l\'activité',
      es: 'Editar actividad'
    }),
    deleteActivity: t({
      en: 'Delete activity',
      fr: 'Supprimer l\'activité',
      es: 'Eliminar actividad'
    }),

    // Loading & Error States
    loadingActivities: t({
      en: 'Loading activities...',
      fr: 'Chargement des activités...',
      es: 'Cargando actividades...'
    }),
    errorLoading: t({
      en: 'Error loading activities',
      fr: 'Erreur lors du chargement des activités',
      es: 'Error al cargar actividades'
    })
  },
} satisfies Dictionary;

export default activitiesContent;