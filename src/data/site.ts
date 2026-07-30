export const site = {
  name: "Guillaume Braillon",
  website: "www.guillaumebraillon.fr",
  tagline: "Bienvenue dans mon univers personnel",
  defaultTitle: "Guillaume Braillon - Développement, domotique, musique et découvertes",
  home: {
    badge: "Mes passions, mes projets, mes découvertes",
    description:
      "Depuis de nombreuses années, je partage ici ce qui nourrit ma curiosité : mes créations numériques, mes découvertes technologiques, mes projets web, mais aussi mes passions comme la musique avec mes tablatures de guitare, mes voyages, et mes articles autour de la domotique, des objets connectés et des nouvelles technologies. Retrouvez également des sujets plus personnels liés à la vidéo, la photo, le multimédia, le daltonisme et les expériences qui ont marqué mon parcours. Ce site rassemble mes réalisations, mes apprentissages et les différents univers que j'ai envie de partager.",
  },
} as const;

export const navItems = [
  { href: "/", label: "Accueil" },
  { href: "/projects", label: "Projets" },
  { href: "/tablatures", label: "Tablatures" },
  { href: "/voyages", label: "Voyages" },
  { href: "/domotique", label: "Domotique" },
  { href: "/articles", label: "Articles" },
  { href: "/cv", label: "CV" },
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
    href: "github.com/GuillaumeBraillon",
    icon: "github",
  },
  {
    label: "LinkedIn",
    value: "Guillaume Braillon",
    href: "linkedin.com/in/guillaume-braillon",
    icon: "linkedin",
  },
] as const;
