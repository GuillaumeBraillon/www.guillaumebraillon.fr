---
title: "EV Cost & Charge Optimizer"
description: "Application d'analyse et d'optimisation des coûts de recharge pour véhicule électrique (MG S5 EV) en fonction des réseaux, abonnements et conditions réelles d'utilisation."
tech: ["React", "TypeScript", "TailwindCSS", "Supabase", "Chart.js"]
date: 2026-03-22
githubUrl: "https://github.com/GuillaumeBraillon/EV-Charge-Tracker"
---

## 💡 Contexte & Objectif

Après la transition vers une MG S5 EV, l'objectif du projet est de maîtriser et optimiser l'ensemble des coûts liés à la recharge électrique :

- comparaison des réseaux de recharge (Izivia, Ionity, bornes publiques)
- optimisation des abonnements (ex : Ionity Motion, cartes de recharge)
- analyse du coût réel au km vs ancien véhicule thermique
- anticipation des coûts selon conditions (autoroute, ville, hiver)

L'application sert de cockpit personnel d'analyse énergétique et financière.

---

## 🚀 Fonctionnalités principales

### 🔋 Suivi des sessions de recharge

- Historisation complète des charges AC et DC
- Calcul du coût réel par session (kWh, minutes, frais fixes)
- Suivi du SOC avant / après recharge

### 💰 Optimisation des coûts

- Comparaison automatique des réseaux de recharge
- Analyse des tarifs selon horaires et abonnements
- Calcul de rentabilité des cartes (Ionity Motion, etc.)
- Simulation de coût avant session

### 📊 Analyse et dashboards

- Graphiques de consommation et de coûts
- Suivi mensuel des dépenses énergétiques
- Comparaison thermique vs électrique
- Analyse du coût aux 100 km

### 🔌 Intégrations véhicule & données

- Import SOC via Home Assistant / N8N
- Synchronisation des données de recharge via webhooks
- Centralisation des données multi-sources

### 📱 Expérience utilisateur

- Application PWA installable
- Utilisation mobile en conditions terrain
- Interface optimisée pour consultation rapide en recharge

---

## 🏗️ Architecture technique

### Frontend

- React 19 + TypeScript
- TailwindCSS
- Chart.js
- Architecture modulaire orientée composants

### Backend

- Supabase (PostgreSQL + Auth + Storage)
- Row Level Security pour isolation des données
- API temps réel via requêtes directes

### Automatisation

- N8N pour workflows et enrichissement de données
- Home Assistant pour récupération SOC véhicule
- Webhooks pour synchronisation temps réel

### CI/CD & déploiement

- GitHub Actions
- Déploiement automatisé (PWA / web app)

---

## ⚡ Cas d’usage principaux

- recharge quotidienne à domicile via Izivia
- recharge rapide économique via Lidl / McDonald’s (Izivia Fast)
- recharge autoroute via Ionity avec abonnement Ionity Motion
- optimisation du coût total de possession du véhicule électrique

---

## 🎯 Objectif du projet

Transformer la recharge électrique en un système optimisé et prévisible, en réduisant les coûts grâce à :

- la sélection intelligente des réseaux
- l’usage optimal des abonnements
- la data réelle issue du véhicule
- une vision financière long terme

---
