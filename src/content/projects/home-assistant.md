---
title: "Home Assistant – Domotique Familiale"
description: "Configuration Home Assistant complète d'un foyer à Lyon : automatisations, scripts, dashboards Lovelace et intégrations MQTT/n8n pour piloter éclairages, présence, confort, notifications et routines familiales."
tech: ["Home Assistant", "YAML", "Jinja2", "MQTT", "n8n"]
date: 2026-07-01
githubUrl: "https://github.com/GuillaumeBraillon/home-assistant"
featured: false
---

🏠 Home Assistant – Domotique Familiale

Configuration domotique complète d'un foyer avec enfants, pensée pour que la maison s'occupe des détails du quotidien sans que la famille ait à y penser.

⸻

🎯 Problématique

Une maison connectée bien pensée doit dépasser le simple pilotage manuel des appareils :

- coordonner de nombreux automatismes (lumières, climatisation, présence) sans créer de conflits ou de doublons
- adapter le comportement de la maison au contexte réel (qui est présent, l'heure, la météo, l'ouverture des fenêtres)
- diffuser de l'information utile à la famille (rappels, agenda, budget) sans multiplier les écrans ou les notifications intrusives
- rester maintenable dans le temps, malgré la complexité croissante du nombre d'automatisations

⸻

💡 Solution

Ce dépôt centralise l'ensemble des automatisations, scripts et dashboards Home Assistant du foyer, organisés autour de scripts réutilisables plutôt que de logique dupliquée, avec une documentation systématique pour chaque automatisation non triviale.

La diffusion vocale (TTS) et les notifications interactives permettent à la maison de communiquer avec la famille sans écran : rappels d'école, agenda du jour, questions oui/non sur mobile, fun facts pour les enfants.

⸻

⚙️ Fonctionnalités principales

💡 Éclairages intelligents

Luminosité et température de couleur ajustées automatiquement selon la pièce et le moment de la journée, avec boutons physiques dédiés par chambre.

👨‍👩‍👧 Présence & sécurité

Détection d'arrivée/départ, notification interactive avec réponse par bouton mobile, activation automatique de l'alarme selon le contexte familial.

🌡️ Confort thermique

Mémorisation de la température à l'ouverture des fenêtres, alerte en cas de remontée de chaleur, pilotage automatique de la climatisation.

🗣️ Routines vocales (TTS)

Rappels d'horaires d'école, agenda familial quotidien et vacances, histoire du soir, rappel de douche et de coucher — diffusés sur enceintes connectées.

📊 Intégration n8n

Réception de webhooks externes (résumé budgétaire hebdomadaire) déclenchant automatiquement une diffusion TTS et une notification.

🖥️ Dashboards dédiés

Lovelace personnalisé par membre de la famille et par usage : éclairages, confort, multimédia, sécurité, réglages, accueil invités.

⸻

🏗️ Architecture

- Cœur : Home Assistant (configuration 100% YAML)
- Logique conditionnelle : Jinja2 (triggers dynamiques, personnalisation des messages)
- Intégrations : MQTT (passerelle SMS, appareils), Google Assistant, n8n (webhooks)
- Diffusion vocale : Text-to-Speech sur enceintes connectées

Principes de conception :

- scripts réutilisables plutôt que logique dupliquée entre automatisations
- blocs `choose` plutôt que des automatisations multiples qui se chevauchent
- nommage kebab-case préfixé par fonction (`tts-`, `lights-`, `presence-`, `confort-`)
- documentation `.md` systématique pour toute automatisation ou script complexe

⸻

🔐 Sécurité & données

- Toutes les valeurs sensibles (emails, mots de passe, téléphones, IPs locales, URL d'accès distant, identifiants de webhook) passent par le mécanisme natif `secrets.yaml` de Home Assistant, non commité
- Fichiers contenant encore des données propres au foyer (configuration de base, certains dashboards, workflows n8n) volontairement exclus du dépôt public
- Le dépôt est une référence d'architecture et de patterns réutilisables, pas une configuration clé en main — pensé pour préserver la confidentialité du foyer tout en restant utile à la communauté

⸻

🚀 Objectif produit

Rendre une maison connectée réellement utile au quotidien pour une famille, en limitant les frictions (écrans, notifications intrusives) au profit d'automatismes contextuels et de diffusion vocale naturelle.

⸻

📈 Évolutions possibles

- fichiers `.example` pour les configurations de base actuellement exclues, afin de rendre le dépôt directement réutilisable
- extension de l'intégration n8n à d'autres flux (météo, agenda partagé, domotique énergétique)
- tableaux de bord analytiques sur la consommation énergétique et l'usage des automatisations
- tests automatisés de validation YAML en CI

⸻

🔗 Liens

- GitHub : https://github.com/GuillaumeBraillon/home-assistant
