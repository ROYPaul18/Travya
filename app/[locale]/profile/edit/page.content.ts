import { t, type Dictionary } from 'intlayer';

const editProfileContent = {
  key: 'edit-profile-page',
  content: {
    pageTitle: t({
      en: 'Edit Account',
      fr: 'Modifier le Compte', 
      es: 'Editar Cuenta'
    }),
  },
} satisfies Dictionary;

export default editProfileContent;