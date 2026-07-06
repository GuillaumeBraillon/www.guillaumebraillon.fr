---
title: "guillaumebraillon.fr"
description: "Développement d'un portfolio statique ultra-rapide sous Astro, optimisé pour les performances mobiles et la manipulation de données textuelles brutes."
pubDate: 2026-07-02
heroImage: "/images/projects/portfolio.png"
stack: ["Astro", "Tailwind CSS", "TypeScript", "HTML5 Semantics"]
githubUrl: "https://github.com/GuillaumeBraillon/www.guillaumebraillon.fr"
---

### Présentation du projet

L'objectif de ce projet était de concevoir une plateforme personnelle performante servant à la fois de vitrine professionnelle et de laboratoire pour tester des cinématiques d'interface utilisateur complexes sans l'overhead d'un framework SPA lourd (React/Vue).

Le site intègre notamment un module complet de gestion et de consultation de tablatures musicales, conçu spécifiquement pour répondre aux contraintes physiques de lecture sur smartphone.

### Objectifs techniques & Architecture

- **Performance brute :** Choix d'Astro pour générer un site 100% statique (SSG), garantissant un Time to First Byte (TTFB) minimal et un score Lighthouse optimal.
- **Zéro Dépendance Client :** Écriture de scripts Vanilla en TypeScript strict pour la manipulation directe du DOM, limitant le poids de la page et maximisant la vitesse d'exécution.
- **Approche Data-Driven :** Centralisation des métadonnées dans des structures JSON locales couplées à un filtrage algorithmique côté client.

### Défis techniques & Solutions

#### 1. Le problème du débordement textuel (Layout Break)

Les tablatures textuelles (`font-mono`) possèdent des structures de lignes horizontales incompressibles. Sur écran mobile en mode portrait, cela provoquait l'éclatement de la largeur de la page et détruisait la mise en page CSS Flexbox.

- **Solution :** Injection systématique de la propriété CSS `min-w-0` sur les conteneurs parents intermédiaires pour casser le calcul par défaut de la largeur minimale basée sur le contenu (`min-content`). Implémentation d'une stratégie d'affichage basée sur les requêtes médias de l'orientation de l'appareil (`landscape`).

#### 2. Maximisation de la hauteur utile (UX Mobile)

En mode paysage sur smartphone, la hauteur de l'écran devient la ressource la plus critique. Un en-tête de modale standard consomme jusqu'à 40 % de l'espace de lecture disponible.

- **Solution :** Utilisation des classes utilitaires de Tailwind CSS pour modifier dynamiquement la géométrie de la modale en mode horizontal : suppression des arrondis, réduction des paddings à l'essentiel (`landscape:py-1.5 landscape:px-3`) et injection d'un composant d'alerte SVG incitant à la rotation de l'appareil uniquement lorsque l'utilisateur est en mode portrait.
