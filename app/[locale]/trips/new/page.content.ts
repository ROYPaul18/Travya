import { t, type Dictionary } from 'intlayer';

const newTripPageContent = {
  key: 'new-trip-page',
  content: {
    // Header section
    pageTitle: t({
      en: "Create New Trip",
      fr: "Créer un nouveau voyage", 
      es: "Crear nuevo viaje"
    }),

    pageSubtitle: t({
      en: "Plan your next adventure",
      fr: "Planifiez votre prochaine aventure",
      es: "Planifica tu próxima aventura"
    }),

    // Card title
    tripDetails: t({
      en: "Trip Details",
      fr: "Détails du voyage",
      es: "Detalles del viaje"
    }),

    // Form fields - CORRECTION ICI
    titleLabel: t({
      en: "Title",
      fr: "Titre",
      es: "Título"
    }),
    
    titlePlaceholder: t({
      en: "Trip to Japan...",
      fr: "Voyage au Japon...",
      es: "Viaje a Japón..."
    }),

    descriptionLabel: t({
      en: "Description",
      fr: "Description", 
      es: "Descripción"
    }),
    
    descriptionPlaceholder: t({
      en: "Describe your trip...",
      fr: "Décrivez votre voyage...",
      es: "Describe tu viaje..."
    }),

    startDateLabel: t({
      en: "Start Date",
      fr: "Date de début",
      es: "Fecha de inicio"
    }),

    endDateLabel: t({
      en: "End Date", 
      fr: "Date de fin",
      es: "Fecha de fin"
    }),

    imageLabel: t({
      en: "Trip Image",
      fr: "Image du voyage",
      es: "Imagen del viaje"
    }),
    
    imageAltText: t({
      en: "Trip photo",
      fr: "Photo du voyage", 
      es: "Foto del viaje"
    }),

    // Submit button
    submitButtonCreating: t({
      en: "Creating Trip...",
      fr: "Création du voyage...",
      es: "Creando viaje..."
    }),
    
    submitButtonSave: t({
      en: "Save Trip",
      fr: "Sauvegarder le voyage", 
      es: "Guardar viaje"
    }),

    // Helper info
    imageHelper: t({
      en: "💡 Add an image to make your trip more memorable",
      fr: "💡 Ajoutez une image pour rendre votre voyage plus mémorable",
      es: "💡 Añade una imagen para hacer tu viaje más memorable"
    }),
  },
} satisfies Dictionary;

export default newTripPageContent;