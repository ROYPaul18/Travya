import { t, type Dictionary } from 'intlayer';

const signInFormContent = {
  key: 'signin-form',
  content: {
    labels: {
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
        en: 'Sign in',
        fr: 'Se connecter',
        es: 'Iniciar sesión'
      }),
      submitting: t({
        en: 'Signing in...',
        fr: 'Connexion...',
        es: 'Iniciando sesión...'
      })
    },
    links: {
      forgotPassword: t({
        en: 'Forgot password?',
        fr: 'Mot de passe oublié ?',
        es: '¿Olvidaste tu contraseña?'
      })
    },
    divider: t({
      en: 'Or continue with',
      fr: 'Ou continuer avec',
      es: 'O continuar con'
    })
  },
} satisfies Dictionary;

export default signInFormContent;