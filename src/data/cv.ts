import { site, contactLinks } from "./site";

export const profile = {
  name: site.name,
  status: "En formation",
  title: "Développeur Full Stack JavaScript • IA & Automatisation",
  subtitle: "React · Angular · Node.js · TypeScript · Ruby · Intégration IA",
  website: site.website,
  github: contactLinks.find((link) => link.label === "GitHub")?.href || "",
  linkedin: contactLinks.find((link) => link.label === "LinkedIn")?.href || "",
  lang: "Anglais (professionnel)",
  details: [
    "**Développeur Full Stack JavaScript** avec plusieurs années d’expérience dans la conception et l’évolution d’applications web. Je travaille principalement avec **TypeScript, React, Angular et Node.js**, du frontend aux API et bases de données. Mon parcours couvre aussi bien le développement de nouvelles fonctionnalités que l’évolution d’applications existantes, au sein d’équipes Agile/Scrum.",

    "J’ai également développé une expertise en **automatisation et intégration de services**, notamment avec **n8n, les API, les webhooks et les systèmes connectés**. Je conçois des workflows qui relient les outils et les services pour simplifier les processus métiers.",

    "Depuis un an, j’approfondis la **programmation assistée par l’IA** et l’intégration de fonctionnalités d’IA dans les applications. J’explore notamment **Ruby et Rails**, la gem **ruby_llm**, les API de LLM et les agents IA, en complément de mon expérience en développement web.",

    'Je partage mes réalisations personnelles sur **GitHub** et dans la rubrique <a href="/projects">Projets</a> de ce site, pour illustrer concrètement les technologies et les approches que j’expérimente.',
  ],
};

export const skills = {
  frontend: ["Angular", "React", "TypeScript", "JavaScript", "Vue.js", "HTML5/CSS3", "Sass"],
  backend: ["Node.js", "Express", "NestJS", "Ruby", "Rails", "REST API", "OpenAPI", "Webhooks"],
  database: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Supabase"],
  devops: ["Docker", "GitHub", "CI/CD", "AWS", "Google Cloud", "Datadog", "Kafka"],
  automation: ["n8n", "Home Assistant", "Jeedom", "MQTT", "Objets connectés"],
  iaAuto: ["LLM", "RAG", "Agents IA", "Prompt engineering", "Intégration d’API IA"],
  aiDevTools: ["Codex", "Zoo (VS Code)", "Ollama", "GitHub Copilot", "Cursor"],
};

export const experiences = [
  {
    role: "Développeur Full Stack JavaScript / Expert Automatisations & IA",
    company: "United Motion Idea, Lyon",
    period: "Mai 2022 - Février 2026",
    description:
      "Conception et développement d'applications web Full Stack (Angular, Node.js, TypeScript) en méthodologie Agile/Scrum, avec participation aux choix techniques et à l'évolution du système d'information. Conception de workflows d'automatisation avec n8n, intégration d'APIs et de solutions d'IA. Administration du système d'information, gestion du parc Apple (Apple Business Manager), support technique de niveau 1 à 3 et mise en place d'outils internes pour améliorer les processus métiers.",
  },
  {
    role: "Développeur Full Stack",
    company: "Sistema-Strategy - ESN, Lyon",
    period: "Janv. 2020 - Mars 2022",
    description:
      "Développement d'applications web et mobiles avec React, React Native, Node.js, Express et TypeScript pour des clients et des projets internes. Conception d'API REST, manipulation de bases de données MySQL et SQL Server, maintenance d'applications Progress OpenEdge et obtention des certifications PASOE, Corticon Studio et OpenEdge Developer.",
  },
  {
    role: "Rédacteur Technique & Administrateur Web",
    company: "La Domo Pratique, Lyon",
    period: "Avril 2018 - Mai 2022",
    description:
      "Création et administration d'un site spécialisé en domotique. Rédaction de tutoriels techniques, tests de matériels et accompagnement de la communauté sur Jeedom, MQTT, Raspberry Pi, Linux, NAS Synology, virtualisation et objets connectés. Mise en place d'environnements domotiques, intégrations matérielles et automatisations avancées.",
  },
];

export const educations = [
  {
    title: "AI Software : Développement web full-stack et intégration d’IA",
    institution: "Le Wagon Lyon",
    year: "2026",
    details:
      "Certification RNCP39261 de niveau 6 (équivalent Bac+3/4). Parcours AI Software : Ruby et POO, SQL et Active Record, front-end, applications full-stack avec Rails, intégration de LLM et d’agents IA, programmation assistée par Cursor, Git et déploiement cloud.",
  },
  {
    title: "Certifications Progress OpenEdge",
    institution: "Progress Software",
    year: "2021",
    details:
      "PASOE (Progress Application Server for OpenEdge), Corticon Studio, OpenEdge 11 Developer.",
  },
  {
    title: "POEC - Développeur Back-end Java J2EE",
    institution: "Human Booster, Lyon",
    year: "2019",
    details: "Stack Java J2EE, Spring Boot, Hibernate, modélisation UML et bases de données.",
  },
  {
    title: "BTS Informatique de Gestion (IG) - Option Développeur",
    institution: "Lycée B. de Laffemas, Valence",
    year: "2003",
    details: "Algorithmique, programmation, option Développeur d'applications / Programmeur.",
  },
];
