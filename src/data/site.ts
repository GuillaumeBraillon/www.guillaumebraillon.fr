export const site = {
  name: "Guillaume Braillon",
  website: "www.guillaumebraillon.fr",
  tagline: "Bienvenue dans mon univers personnel",
  defaultTitle: "Guillaume Braillon - Développement, domotique, musique et découvertes",
  home: {
    badge: "Mes passions, mes projets, mes découvertes",
    description: [
      "Développeur **Full Stack JavaScript**, je construis des applications web et j’explore les technologies qui m’intéressent, de **l’IA et l’automatisation** à la domotique et aux objets connectés.",
      "Ce site présente mes **[Projets & créations](/projects)**, mais aussi ce qui existe en dehors du code : **[Tablatures](/tablatures)** de guitare, **[Articles domotiques](/articles)** et **[Voyages](/voyages)**.",
      "Un espace pour **montrer ce que je fais, documenter ce que j’apprends et expérimenter de nouvelles idées**.",
      "Pour découvrir mon parcours professionnel, retrouvez également **[Mon CV](/cv)**, accessible directement depuis le bouton dédié.",
      "Je lance également le **[World Jam Project](/world-jam-project)** : un projet musical collaboratif où des musiciens du monde entier peuvent contribuer à un même morceau.",
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
  { href: "/world-jam-project", label: "The World Jam Project" },
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
