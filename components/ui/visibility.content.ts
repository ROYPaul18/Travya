import { t, type Dictionary } from "intlayer";

const visibilityContent = {
  key: "visibility",
  content: {
    // Labels de visibilité
    community: t({
      en: "Community",
      fr: "Communauté",
      es: "Comunidad",
    }),
    
    friends: t({
      en: "Friends",
      fr: "Amis",
      es: "Amigos",
    }),
    
    private: t({
      en: "Private",
      fr: "Privé",
      es: "Privado",
    }),

    // Texte "à venir"
    comingSoon: t({
      en: "Coming soon...",
      fr: "À venir...",
      es: "Próximamente...",
    }),

    // Autres textes potentiels
    visibilityLabel: t({
      en: "Visibility",
      fr: "Visibilité",
      es: "Visibilidad",
    }),

    selectVisibility: t({
      en: "Select visibility",
      fr: "Sélectionner la visibilité",
      es: "Seleccionar visibilidad",
    }),

    // Tooltips ou descriptions
    communityDescription: t({
      en: "Visible to all users",
      fr: "Visible par tous les utilisateurs",
      es: "Visible para todos los usuarios",
    }),

    friendsDescription: t({
      en: "Visible only to your friends",
      fr: "Visible uniquement par vos amis",
      es: "Visible solo para tus amigos",
    }),

    privateDescription: t({
      en: "Visible only to you",
      fr: "Visible uniquement par vous",
      es: "Visible solo para ti",
    }),
  },
} satisfies Dictionary;

export default visibilityContent;