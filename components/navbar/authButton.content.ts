import { t, type Dictionary } from 'intlayer';

const authButtonContent = {
  key: 'auth-button',
  content: {
    signUp: t({
      en: 'Sign up',
      fr: 'S’inscrire',
      es: 'Registrarse'
    }),
    signIn: t({
      en: 'Sign in',
      fr: 'Se connecter',
      es: 'Iniciar sesión'
    }),
    profile: t({
      en: 'Profile',
      fr: 'Profil',
      es: 'Perfil'
    }),
    logout: t({
      en: 'Logout',
      fr: 'Déconnexion',
      es: 'Cerrar sesión'
    })
  },
} satisfies Dictionary;

export default authButtonContent;