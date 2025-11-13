import { t, type Dictionary } from 'intlayer';

const signUpPageContent = {
  key: 'signup-page',
  content: {
    title: t({
      en: 'Create an account',
      fr: 'Créer un compte',
      es: 'Crear una cuenta'
    }),
    description: t({
      en: 'Join the adventure, discover the world differently 🌍',
      fr: 'Rejoins l\'aventure, découvre le monde autrement 🌍',
      es: 'Únete a la aventura, descubre el mundo de otra manera 🌍'
    }),
    footerText: t({
      en: 'Already have an account?',
      fr: 'Déjà un compte ?',
      es: '¿Ya tienes una cuenta?'
    }),
    loginLink: t({
      en: 'Sign in',
      fr: 'Se connecter',
      es: 'Iniciar sesión'
    })
  },
} satisfies Dictionary;

export default signUpPageContent;