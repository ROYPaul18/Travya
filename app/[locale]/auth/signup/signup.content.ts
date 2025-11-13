import { t, type Dictionary } from 'intlayer';

const signUpFormContent = {
  key: 'signup-form',
  content: {
    labels: {
      name: t({
        en: 'Full name',
        fr: 'Nom complet',
        es: 'Nombre completo'
      }),
      email: t({
        en: 'Email',
        fr: 'Email',
        es: 'Correo electrónico'
      }),
      password: t({
        en: 'Password',
        fr: 'Mot de passe',
        es: 'Contraseña'
      })
    },
    placeholders: {
      name: t({
        en: 'John Doe',
        fr: 'Alex Dupont',
        es: 'Juan Pérez'
      }),
      email: t({
        en: 'example@email.com',
        fr: 'exemple@email.com',
        es: 'ejemplo@email.com'
      }),
      password: t({
        en: '••••••••',
        fr: '••••••••',
        es: '••••••••'
      })
    },
    buttons: {
      submit: t({
        en: 'Create my account',
        fr: 'Créer mon compte',
        es: 'Crear mi cuenta'
      }),
      submitting: t({
        en: 'Creating...',
        fr: 'Création en cours...',
        es: 'Creando...'
      })
    },
    divider: t({
      en: 'Or continue with',
      fr: 'Ou continuer avec',
      es: 'O continuar con'
    })
  },
} satisfies Dictionary;

export default signUpFormContent;