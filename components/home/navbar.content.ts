import { t, type Dictionary } from "intlayer";

const navbarContent = {
  key: "navbar",
  fill: true,
  content: {
    myTrips: t({
      en: "My Trips",
      fr: "Mes voyages",
      es: "Mis viajes",
    }),
    globe: t({
      en: "Globe",
      fr: "Globe",
      es: "Globo",
    }),
    family: t({
      en: "Family",
      fr: "Famille",
      es: "Familia",
    }),
    loginGoogle: t({
      en: "Sign in with Google",
      fr: "Se connecter avec Google",
      es: "Iniciar sesión con Google",
    }),
    loginGithub: t({
      en: "Sign in with GitHub",
      fr: "Se connecter avec GitHub",
      es: "Iniciar sesión con GitHub",
    }),
    signInGoogle: t({
      en: "Sign in (Google)",
      fr: "Connexion (Google)",
      es: "Iniciar sesión (Google)",
    }),
    signInGithub: t({
      en: "Sign in (GitHub)",
      fr: "Connexion (GitHub)",
      es: "Iniciar sesión (GitHub)",
    }),
    logoutText: t({
      en: "Logout",
      fr: "Déconnexion",
      es: "Cerrar sesión",
    }),
    language: t({
      en: "Language",
      fr: "Langue",
      es: "Idioma",
    }),
  },
} satisfies Dictionary;

export default navbarContent;
