import { t, type Dictionary } from 'intlayer';

const locationContent = {
  key: 'new-location',
  content: {
    title: t({
      en: 'Add New Location',
      fr: 'Ajouter un Nouveau Lieu',
      es: 'Agregar Nueva Ubicación'
    }),
    subtitle: t({
      en: 'Pin your next destination on the map',
      fr: 'Épinglez votre prochaine destination sur la carte',
      es: 'Marca tu próximo destino en el mapa'
    }),
    addressLabel: t({
      en: 'Address',
      fr: 'Adresse',
      es: 'Dirección'
    }),
    addressPlaceholder: t({
      en: 'Enter location address...',
      fr: 'Saisissez l\'adresse du lieu...',
      es: 'Ingresa la dirección del lugar...'
    }),
    addButton: t({
      en: 'Add Location',
      fr: 'Ajouter le Lieu',
      es: 'Agregar Ubicación'
    }),
    addingButton: t({
      en: 'Adding Location...',
      fr: 'Ajout du lieu...',
      es: 'Agregando ubicación...'
    }),
    helperText: t({
      en: '💡 Enter a full address for accurate mapping',
      fr: '💡 Saisissez une adresse complète pour un positionnement précis',
      es: '💡 Ingresa una dirección completa para un mapeo preciso'
    })
  },
} satisfies Dictionary;

export default locationContent;