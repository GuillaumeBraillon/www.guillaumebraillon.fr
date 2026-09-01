export const site = {
  name: "Guillaume Braillon",
  website: "www.guillaumebraillon.fr",
  tagline: "Bienvenue dans mon univers personnel",
  defaultTitle: "Guillaume Braillon - Développement, domotique, musique et découvertes",
  home: {
    badge: "Mes passions, mes projets, mes découvertes",
    description: [
      "Développeur **Full Stack JavaScript**, je construis des applications web et j’explore les technologies qui m’intéressent, de **l’IA et l’automatisation** à la domotique et aux objets connectés.",

      "Ce site présente mes **Projets & créations**, mais aussi ce qui existe en dehors du code : **Tablatures** de guitare, **Articles domotiques** et **Voyages**.",

      "Un espace pour **montrer ce que je fais, documenter ce que j’apprends et expérimenter de nouvelles idées**.",

      "Pour découvrir mon parcours professionnel, retrouvez également **Mon CV**, accessible directement depuis le bouton dédié.",
    ],
  },
} as const;

export const navItems = [
  { href: "/", label: "Accueil" },
  { href: "/projects", label: "Projets" },
  { href: "/domotique", label: "Domotique" },
  { href: "/articles", label: "Articles" },
  { href: "/tablatures", label: "Tablatures" },
  { href: "/voyages", label: "Voyages" },
] as const;

export const contactLinks = [
  {
    label: "Site perso",
    value: site.website,
    href: `https://${site.website}`,
    icon: "website",
  },
  {
    label: "GitHub",
    value: "GuillaumeBraillon",
    href: "https://github.com/GuillaumeBraillon",
    icon: "github",
  },
  {
    label: "LinkedIn",
    value: "Guillaume Braillon",
    href: "https://www.linkedin.com/in/guillaumebraillon/",
    icon: "linkedin",
  },
] as const;
