import { t, type Dictionary } from 'intlayer';

const editTripDialogContent = {
  key: 'edit-trip-dialog',
  content: {
    title: t({
      en: 'Edit trip',
      fr: 'Modifier le voyage',
      es: 'Editar viaje'
    }),
    labels: {
      title: t({
        en: 'Trip title',
        fr: 'Titre du voyage',
        es: 'Título del viaje'
      }),
      description: t({
        en: 'Description',
        fr: 'Description',
        es: 'Descripción'
      }),
      startDate: t({
        en: 'Start date',
        fr: 'Date de début',
        es: 'Fecha de inicio'
      }),
      endDate: t({
        en: 'End date',
        fr: 'Date de fin',
        es: 'Fecha de fin'
      }),
      image: t({
        en: 'Trip image',
        fr: 'Image du voyage',
        es: 'Imagen del viaje'
      })
    },
    placeholders: {
      title: t({
        en: 'Ex: Trip to Tokyo',
        fr: 'Ex: Voyage à Tokyo',
        es: 'Ej: Viaje a Tokio'
      }),
      description: t({
        en: 'Describe your trip...',
        fr: 'Décrivez votre voyage...',
        es: 'Describe tu viaje...'
      })
    },
    buttons: {
      cancel: t({
        en: 'Cancel',
        fr: 'Annuler',
        es: 'Cancelar'
      }),
      save: t({
        en: 'Save',
        fr: 'Enregistrer',
        es: 'Guardar'
      }),
      saving: t({
        en: 'Saving...',
        fr: 'Enregistrement...',
        es: 'Guardando...'
      })
    },
    messages: {
      imageUpload: t({
        en: 'Choose a new image to replace the current one',
        fr: 'Choisissez une nouvelle image pour remplacer l\'actuelle',
        es: 'Elige una nueva imagen para reemplazar la actual'
      })
    }
  },
} satisfies Dictionary;

export default editTripDialogContent;