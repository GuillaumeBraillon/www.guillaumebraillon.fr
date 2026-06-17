export const site = {
  name: "Guillaume Braillon",
  tagline: "Mes passions...",
  defaultTitle: "Guillaume Braillon",
  home: {
    badge: "Full Stack JS",
    description:
      "React, Node.js, Astro et Supabase. J’aime créer des outils simples, rapides et utiles.",
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
