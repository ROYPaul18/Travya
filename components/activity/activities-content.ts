import { t, type Dictionary } from "intlayer";

const activitiesContent = {
  key: "activities",
  content: {
    
    edit: t({
      en: "Edit",
      fr: "Modifier",
      es: "Editar",
    }),
    
    delete: t({
      en: "Delete",
      fr: "Supprimer",
      es: "Eliminar",
    }),
    
    deleting: t({
      en: "Deleting…",
      fr: "Suppression…",
      es: "Eliminando…",
    }),

    // Catégories
    categories: {
      RESTAURANT: t({
        en: "Restaurant",
        fr: "Restaurant",
        es: "Restaurante",
      }),
      
      VISITE: t({
        en: "Visit",
        fr: "Visite",
        es: "Visita",
      }),
      
      ACTIVITE: t({
        en: "Activity",
        fr: "Activité",
        es: "Actividad",
      }),
      
      HEBERGEMENT: t({
        en: "Accommodation",
        fr: "Hébergement",
        es: "Alojamiento",
      }),
      
      TRANSPORT: t({
        en: "Transport",
        fr: "Transport",
        es: "Transporte",
      }),
      
      SHOPPING: t({
        en: "Shopping",
        fr: "Shopping",
        es: "Compras",
      }),
      
      AUTRE: t({
        en: "Other",
        fr: "Autre",
        es: "Otro",
      }),
      
      // Pour compatibilité avec les minuscules
      restaurant: t({
        en: "Restaurant",
        fr: "Restaurant",
        es: "Restaurante",
      }),
      
      visite: t({
        en: "Visit",
        fr: "Visite",
        es: "Visita",
      }),
      
      activite: t({
        en: "Activity",
        fr: "Activité",
        es: "Actividad",
      }),
      
      hebergement: t({
        en: "Accommodation",
        fr: "Hébergement",
        es: "Alojamiento",
      }),
      
      transport: t({
        en: "Transport",
        fr: "Transport",
        es: "Transporte",
      }),
      
      shopping: t({
        en: "Shopping",
        fr: "Shopping",
        es: "Compras",
      }),
      
      autre: t({
        en: "Other",
        fr: "Autre",
        es: "Otro",
      }),
    },

    // Labels des tags (optionnel)
    timeLabel: t({
      en: "Time",
      fr: "Horaire",
      es: "Horario",
    }),

    budgetLabel: t({
      en: "Budget",
      fr: "Budget",
      es: "Presupuesto",
    }),

    addressLabel: t({
      en: "Address",
      fr: "Adresse",
      es: "Dirección",
    }),

    // États de chargement
    loading: t({
      en: "Loading activities…",
      fr: "Chargement des activités…",
      es: "Cargando actividades…",
    }),

    noActivities: t({
      en: "No activities yet",
      fr: "Aucune activité pour le moment",
      es: "Aún no hay actividades",
    }),

    addFirstActivity: t({
      en: "Add your first activity",
      fr: "Ajoutez votre première activité",
      es: "Añade tu primera actividad",
    }),
  },
} satisfies Dictionary;

export default activitiesContent;