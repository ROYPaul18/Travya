// auth-button.content.ts
import { t, type DeclarationContent } from "intlayer";

const authButtonContent = {
  key: "auth-button",
  content: {
    signUp: t({
      fr: "S'inscrire",
      en: "Sign Up",
      es: "Registrarse",
    }),
    signIn: t({
      fr: "Se connecter",
      en: "Sign In",
      es: "Iniciar sesión",
    }),
    profile: t({
      fr: "Profil",
      en: "Profile",
      es: "Perfil",
    }),
    languageAndCurrency: t({
      fr: "Langues et devise",
      en: "Language and Currency",
      es: "Idioma y moneda",
    }),
    favorites: t({
      fr: "Favoris",
      en: "Favorites",
      es: "Favoritos",
    }),
    logout: t({
      fr: "Déconnexion",
      en: "Logout",
      es: "Cerrar sesión",
    }),
  },
} satisfies DeclarationContent;

export default authButtonContent;