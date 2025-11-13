import { t, type Dictionary } from 'intlayer';

const profilePageContent = {
  key: 'profile-page',
  content: {
    // Page Title
    pageTitle: t({
      en: 'User Profile',
      fr: 'Profil Utilisateur',
      es: 'Perfil de Usuario'
    }),

    // Actions
    editProfile: t({
      en: 'Edit',
      fr: 'Modifier',
      es: 'Editar'
    }),

    // User Information
    userInfo: {
      name: t({
        en: 'Name',
        fr: 'Nom',
        es: 'Nombre'
      }),
      email: t({
        en: 'Email',
        fr: 'Email',
        es: 'Correo'
      }),
      verified: t({
        en: 'Verified',
        fr: 'Vérifié',
        es: 'Verificado'
      }),
      notProvided: t({
        en: '-',
        fr: '-',
        es: '-'
      })
    },

    // Status Messages
    status: {
      emailVerified: t({
        en: 'Email verified',
        fr: 'Email vérifié',
        es: 'Correo verificado'
      }),
      emailNotVerified: t({
        en: 'Email not verified',
        fr: 'Email non vérifié',
        es: 'Correo no verificado'
      })
    }
  },
} satisfies Dictionary;

export default profilePageContent;