---
title: "Domotique & Monitoring Résidentiel"
description: "Centralisation et optimisation d'un écosystème connecté sous Home Assistant avec gestion des protocoles Zigbee et RF."
tech: ["Home Assistant", "Zigbee", "Node-RED", "MQTT", "InfluxDB"]
date: 2026-05-10
githubUrl: "https://github.com/GuillaumeBraillon/home-assistant"
---

## 💡 Contexte & Objectif

Centraliser la gestion de dizaines de périphériques connectés hétérogènes (capteurs environnementaux, commutateurs, actionneurs) au sein d'une interface unique, locale et respectueuse de la vie privée, tout en automatisant les tâches répétitives du foyer.

## 🚀 Fonctionnalités Clés

- **Réseau Maillé (Mesh) :** Déploiement d'une infrastructure Zigbee robuste couvrant l'ensemble de l'habitation et de la terrasse pour la remontée d'informations en basse consommation.
- **Automations Avancées :** Logique métier configurée pour réguler l'éclairage, optimiser les cycles de chauffage selon la présence et surveiller les seuils critiques (température, humidité).
- **Dashboards Personnalisés :** Conception d'interfaces denses et épurées adaptées aux différents écrans de la maison (tablettes murales, smartphones).

## 🏗️ Gestion des Données

Les données des capteurs sont sérialisées et transmises via le protocole MQTT, puis historisées dans une base de données temporelle. Cela permet de générer des graphiques de performance à long terme, notamment pour analyser l'efficacité énergétique du logement.
