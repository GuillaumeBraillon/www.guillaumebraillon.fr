export const site = {
  name: "Guillaume Braillon",
  tagline: "Mes passions...",
  defaultTitle: "Guillaume Braillon",
  home: {
    badge: "Full Stack JS",
    description:
      "Passionné par le développement depuis 2001, j’ai exploré plusieurs langages, du PHP au JavaScript en passant par le Java. Développeur curieux, autodidacte et expérimenté, je me spécialise aujourd'hui dans l'écosystème JavaScript moderne et l'intégration de solutions d'IA agentique ou d'automatisation de processus.",
  },
} as const;

export const navItems = [
  { href: "/", label: "Accueil" },
  { href: "/projects", label: "Projets" },
  { href: "/tablatures", label: "Tablatures" },
  { href: "/voyages", label: "Voyages" },
  { href: "/articles", label: "Articles" },
  { href: "/cv", label: "CV" },
] as const;

export const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/GuillaumeBraillon",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/guillaumebraillon",
  },
] as const;
