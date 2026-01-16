import { t, type Dictionary } from "intlayer";

const activityFormContent = {
  key: "activity-form",
  content: {
    // Header
    newActivity: t({
      en: "New Activity",
      fr: "Nouvelle activité",
      es: "Nueva actividad",
    }),

    // Form Labels
    activityName: t({
      en: "Activity Name *",
      fr: "Nom de l'activité *",
      es: "Nombre de la actividad *",
    }),
    activityNamePlaceholder: t({
      en: "Ex: Eiffel Tower",
      fr: "Ex: Tour Eiffel",
      es: "Ej: Torre Eiffel",
    }),
    address: t({
      en: "Address *",
      fr: "Adresse *",
      es: "Dirección *",
    }),
    addressPlaceholder: t({
      en: "Ex: Champ de Mars, 75007 Paris",
      fr: "Ex: Champ de Mars, 75007 Paris",
      es: "Ej: Campo de Marte, 75007 París",
    }),
    category: t({
      en: "Category *",
      fr: "Catégorie *",
      es: "Categoría *",
    }),
    selectCategory: t({
      en: "Select a category",
      fr: "Sélectionnez une catégorie",
      es: "Selecciona una categoría",
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
    budget: t({
      en: "Budget (€)",
      fr: "Budget (€)",
      es: "Presupuesto (€)",
    }),
    budgetPlaceholder: t({
      en: "0.00",
      fr: "0.00",
      es: "0.00",
    }),
    description: t({
      en: "Description",
      fr: "Description",
      es: "Descripción",
    }),
    descriptionPlaceholder: t({
      en: "Activity details...",
      fr: "Détails de l'activité...",
      es: "Detalles de la actividad...",
    }),

    categories: {
      restaurant: t({
        en: "Restaurant",
        fr: "Restaurant",
        es: "Restaurante",
      }),
      monument: t({
        en: "Monument",
        fr: "Monument",
        es: "Monumento",
      }),
      museum: t({
        en: "Museum",
        fr: "Musée",
        es: "Museo",
      }),
      park: t({
        en: "Park",
        fr: "Parc",
        es: "Parque",
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
    },

    // Image Note
    imageNote: t({
      en: "Image upload will be available soon. For now, a default image will be used based on the category.",
      fr: "L'upload d'images sera disponible prochainement. Pour l'instant, une image par défaut sera utilisée selon la catégorie.",
      es: "La carga de imágenes estará disponible pronto. Por ahora, se usará una imagen predeterminada según la categoría.",
    }),

    // Buttons
    addActivity: t({
      en: "Add Activity",
      fr: "Ajouter l'activité",
      es: "Agregar actividad",
    }),
    cancel: t({
      en: "Cancel",
      fr: "Annuler",
      es: "Cancelar",
    }),
    editActivity: t({
      en: "Edit Activity",
      fr: "Modifier l'activité",
      es: "Editar actividad",
    }),

    saveChanges: t({
      en: "Save Changes",
      fr: "Enregistrer les modifications",
      es: "Guardar cambios",
    }),

    // Loading states
    adding: t({
      en: "Adding...",
      fr: "Ajout...",
      es: "Agregando...",
    }),

    saving: t({
      en: "Saving...",
      fr: "Enregistrement...",
      es: "Guardando...",
    }),

    // Error messages
    selectValidAddressError: t({
      en: "Please select a valid address from the list",
      fr: "Veuillez sélectionner une adresse valide dans la liste",
      es: "Por favor, selecciona una dirección válida de la lista",
    }),

    enterAddressError: t({
      en: "Please enter an address",
      fr: "Veuillez saisir une adresse",
      es: "Por favor, introduce una dirección",
    }),

    selectAddressFromListError: t({
      en: "Please select a valid address from the suggestions list",
      fr: "Veuillez sélectionner une adresse valide dans la liste de suggestions",
      es: "Por favor, selecciona una dirección válida de la lista de sugerencias",
    }),

    addActivityError: t({
      en: "An error occurred while adding the activity",
      fr: "Une erreur s'est produite lors de l'ajout de l'activité",
      es: "Ocurrió un error al agregar la actividad",
    }),

    addressValidated: t({
      en: "Address validated",
      fr: "Adresse validée",
      es: "Dirección validada",
    }),

    coordinatesLabel: t({
      en: "Coordinates",
      fr: "Coordonnées",
      es: "Coordenadas",
    }),
    
    testButton: t({
      en: "Manual Test",
      fr: "Test Manuel",
      es: "Prueba Manual",
    }),
  },
} satisfies Dictionary;

export default activityFormContent;