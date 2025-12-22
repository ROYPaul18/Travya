import { t, type Dictionary } from "intlayer";

const activityPageContent = {
  key: "activity-page",
  content: {
    // Titres et sous-titres
    editActivityTitle: t({
      en: "Edit Activity",
      fr: "Modifier l'activité",
      es: "Editar actividad",
    }),
    
    editActivitySubtitle: t({
      en: "Update your activity information",
      fr: "Mettez à jour les informations de votre activité",
      es: "Actualiza la información de tu actividad",
    }),
    
    addActivityTitle: t({
      en: "Add Activity",
      fr: "Ajouter une activité",
      es: "Agregar actividad",
    }),
    
    addActivitySubtitle: t({
      en: "Create a new activity for your trip",
      fr: "Créez une nouvelle activité pour votre voyage",
      es: "Crea una nueva actividad para tu viaje",
    }),

    // Boutons navigation
    backToTrip: t({
      en: "Back to trip",
      fr: "Retour au voyage",
      es: "Volver al viaje",
    }),

    // Sections
    generalInfo: t({
      en: "General Information",
      fr: "Informations générales",
      es: "Información general",
    }),

    location: t({
      en: "Location",
      fr: "Localisation",
      es: "Ubicación",
    }),

    schedule: t({
      en: "Schedule",
      fr: "Horaires",
      es: "Horario",
    }),

    image: t({
      en: "Image",
      fr: "Image",
      es: "Imagen",
    }),

    description: t({
      en: "Description",
      fr: "Description",
      es: "Descripción",
    }),

    // Labels
    category: t({
      en: "Category",
      fr: "Catégorie",
      es: "Categoría",
    }),

    selectedCategory: t({
      en: "Selected",
      fr: "Sélectionnée",
      es: "Seleccionada",
    }),

    activityName: t({
      en: "Activity Name",
      fr: "Nom de l'activité",
      es: "Nombre de la actividad",
    }),

    price: t({
      en: "Price (€)",
      fr: "Prix (€)",
      es: "Precio (€)",
    }),

    address: t({
      en: "Address",
      fr: "Adresse",
      es: "Dirección",
    }),

    startTime: t({
      en: "Start Time",
      fr: "Heure de début",
      es: "Hora de inicio",
    }),

    endTime: t({
      en: "End Time",
      fr: "Heure de fin",
      es: "Hora de fin",
    }),

    activityPhoto: t({
      en: "Activity Photo",
      fr: "Photo de l'activité",
      es: "Foto de la actividad",
    }),

    activityDetails: t({
      en: "Activity Details",
      fr: "Détails de l'activité",
      es: "Detalles de la actividad",
    }),

    // Placeholders
    namePlaceholder: t({
      en: "Ex: Visit Golden Gate Bridge",
      fr: "Ex: Visite du Golden Gate Bridge",
      es: "Ej: Visita al Puente Golden Gate",
    }),

    addressPlaceholder: t({
      en: "Ex: 123 Peace Street, Paris",
      fr: "Ex: 123 Rue de la Paix, Paris",
      es: "Ej: 123 Calle de la Paz, París",
    }),

    descriptionPlaceholder: t({
      en: "Describe your activity, what makes it special, what to know...",
      fr: "Décrivez votre activité, ce qui la rend spéciale, ce qu'il faut savoir...",
      es: "Describe tu actividad, qué la hace especial, qué hay que saber...",
    }),

    // Catégories
    categories: {
      restaurant: t({
        en: "Restaurant",
        fr: "Restaurant",
        es: "Restaurante",
      }),
      
      visit: t({
        en: "Visit",
        fr: "Visite",
        es: "Visita",
      }),
      
      activity: t({
        en: "Activity",
        fr: "Activité",
        es: "Actividad",
      }),
      
      accommodation: t({
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
      
      other: t({
        en: "Other",
        fr: "Autre",
        es: "Otro",
      }),
    },

    // Boutons d'action
    cancel: t({
      en: "Cancel",
      fr: "Annuler",
      es: "Cancelar",
    }),

    saveChanges: t({
      en: "Save Changes",
      fr: "Enregistrer les modifications",
      es: "Guardar cambios",
    }),

    createActivity: t({
      en: "Create Activity",
      fr: "Créer l'activité",
      es: "Crear actividad",
    }),

    // États de chargement
    saving: t({
      en: "Saving...",
      fr: "Enregistrement...",
      es: "Guardando...",
    }),

    creating: t({
      en: "Creating...",
      fr: "Création...",
      es: "Creando...",
    }),

    // Coordonnées
    latitude: t({
      en: "Latitude",
      fr: "Latitude",
      es: "Latitud",
    }),

    longitude: t({
      en: "Longitude",
      fr: "Longitude",
      es: "Longitud",
    }),

    // Messages d'erreur
    errorUpdate: t({
      en: "Error updating activity",
      fr: "Erreur lors de la mise à jour de l'activité",
      es: "Error al actualizar la actividad",
    }),

    errorCreate: t({
      en: "Error creating activity",
      fr: "Erreur lors de la création de l'activité",
      es: "Error al crear la activité",
    }),
  },
} satisfies Dictionary;

export default activityPageContent;