---
title: "Road Stories"
description: "PWA mobile qui enrichit les trajets en voiture en diffusant automatiquement des anecdotes et informations culturelles sur les lieux traversés, grâce à un agent IA propulsé par Gemini orchestrant plusieurs sources externes (OpenStreetMap, Wikipedia, Google Places)."
tech: ["React", "TypeScript", "Vite", "TailwindCSS", "Vercel Edge Functions", "Gemini"]
date: 2026-07-01
githubUrl: "https://github.com/GuillaumeBraillon/road-stories"
featured: false
---

🚗 Road Stories

PWA mobile qui transforme chaque trajet en voiture en une expérience culturelle audio, sans aucune interaction requise pendant la conduite.

⸻

🎯 Problématique

Un road trip traverse souvent des lieux riches en histoire, en patrimoine ou en anecdotes — châteaux, sites naturels, personnages célèbres — mais cette richesse reste invisible pour le conducteur :

- impossible de consulter un écran ou de faire des recherches en conduisant
- les guides touristiques classiques nécessitent une préparation en amont
- l'information culturelle disponible en ligne (Wikipedia, avis, patrimoine local) n'est jamais contextualisée au trajet réel

⸻

💡 Solution

Road Stories détecte automatiquement les points d'intérêt à proximité via le GPS, puis délègue à un agent IA (Gemini) le soin de décider quelles sources interroger — Wikipedia pour le contexte historique, Google Places pour les informations pratiques — avant de générer un message audio naturel, diffusé sans aucune action du conducteur.

Comme un GPS, mais pour la culture.

⸻

⚙️ Fonctionnalités principales

📍 Détection automatique des POI

Surveillance GPS en continu, détection des lieux à proximité via OpenStreetMap/Overpass, avec cache intelligent pour éviter les requêtes redondantes.

🤖 Agent IA à tool use

Gemini décide lui-même, selon le contexte du lieu, s'il doit interroger Wikipedia et/ou Google Places avant de générer l'anecdote — orchestration dynamique plutôt que logique figée.

🔊 Diffusion mains libres

Synthèse vocale automatique (~30 secondes), pause/reprise intelligente de la musique en cours, aucune manipulation nécessaire pendant la conduite.

🗂️ Thèmes personnalisables

Patrimoine, culture & arts, nature, gastronomie locale, personnages célèbres, anecdotes insolites — chaque thème correspond à des filtres OpenStreetMap précis.

📜 Historique consultable

Tous les lieux détectés sont conservés avec possibilité de réécoute ou de suppression.

⸻

🏗️ Architecture

- Frontend : React + TypeScript + TailwindCSS + Vite
- Agent IA : Gemini (tool use natif, orchestration multi-sources)
- Sources externes : OpenStreetMap / Overpass API, Wikipedia REST API, Google Places API
- Backend : Vercel Edge Functions (proxy sécurisé, aucune dépendance Node native)
- APIs navigateur : Geolocation, Web Speech, Wake Lock

Architecture découplée :

- composants UI purs, sans logique métier
- hooks réactifs isolant les effets de bord (GPS, cache, historique)
- services métier centralisant les appels externes
- fonctions Edge dédiées à l'orchestration IA et au proxy des APIs tierces

⸻

🔐 Sécurité & données

- Clés API (Gemini, Google Places) conservées exclusivement côté serveur via les fonctions Edge
- Aucune clé exposée dans le bundle client en production
- Réglages et historique conservés localement sur l'appareil (pas de cloud sync, pas de compte utilisateur)

⸻

🚀 Objectif produit

Rendre la culture et le patrimoine accessibles pendant la conduite, sans jamais détourner l'attention du conducteur de la route.

⸻

📈 Évolutions possibles

- recherche sémantique sur les POI et thèmes (embeddings)
- mémoire persistante inter-trajets (reconnaissance des lieux déjà visités)
- contexte multi-tours pour l'agent IA (raisonnement sur plusieurs POI successifs)
- base de connaissances mise en cache pour réduire la latence
- nouvelles sources d'enrichissement (météo, événements locaux, Wikidata)

⸻

🔗 Liens

- GitHub : https://github.com/GuillaumeBraillon/road-stories
