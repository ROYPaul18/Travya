import { t, type Dictionary } from 'intlayer';

const signInPageContent = {
  key: 'signin-page',
  content: {
    title: t({
      en: 'Sign In',
      fr: 'Connexion',
      es: 'Iniciar Sesión'
    }),
    description: t({
      en: 'Welcome back!',
      fr: 'Bon retour parmi nous !',
      es: '¡Bienvenido de nuevo!'
    }),
    footerText: t({
      en: 'No account yet?',
      fr: 'Pas encore de compte ?',
      es: '¿Aún no tienes cuenta?'
    }),
    signupLink: t({
      en: 'Sign up',
      fr: 'S\'inscrire',
      es: 'Registrarse'
    })
  },
} satisfies Dictionary;

export default signInPageContent;