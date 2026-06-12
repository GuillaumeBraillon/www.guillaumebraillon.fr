---
title: "Budget App Familial"
description: "Application full-stack de gestion de budget familial basée sur la méthode des enveloppes. Elle permet de suivre en temps réel les dépenses, automatiser les charges récurrentes et visualiser l’évolution du budget du foyer via des tableaux de bord analytiques."
tech: ["React", "Node.js", "Astro", "Supabase", "TailwindCSS"]
date: 2026-01-15
githubUrl: "https://github.com/GuillaumeBraillon/family-budget"
featured: true
---

💰 Budget App Familial

Application full-stack de gestion de budget familial basée sur la méthode des enveloppes, conçue pour offrir une vision claire, temps réel et collaborative des finances du foyer.

⸻

🎯 Problématique

La gestion financière d’un foyer est souvent dispersée entre feuilles Excel, applications bancaires et notes personnelles, rendant difficile :

- la visibilité globale des dépenses
- le suivi des charges récurrentes
- la planification à moyen terme
- la coordination entre membres du foyer

⸻

💡 Solution

Cette application centralise la gestion du budget familial dans un système structuré basé sur des enveloppes budgétaires, permettant de répartir les revenus par catégories et de suivre leur consommation en temps réel.

Chaque foyer dispose d’un espace sécurisé et isolé pour gérer ses finances de manière collaborative.

⸻

⚙️ Fonctionnalités principales

🧺 Enveloppes budgétaires

Répartition du budget mensuel par catégories (alimentation, énergie, loisirs, épargne…) avec suivi du solde restant en temps réel.

🔁 Charges récurrentes automatisées

Prise en compte des abonnements et dépenses fixes pour anticiper les budgets futurs (30 / 90 jours).

📊 Tableaux de bord analytiques

Visualisation de la répartition des dépenses, évolution des catégories et taux d’épargne.

👨‍👩‍👧 Gestion familiale

Espace partagé entre membres du foyer avec cohérence des données et synchronisation en temps réel.

⸻

🏗️ Architecture

- Frontend : React + TailwindCSS
- Backend : Node.js
- Base de données : Supabase (PostgreSQL)
- Framework hybride : Astro (orchestration / UI)
- Sécurité : Row Level Security (RLS) sur Supabase

Architecture découplée :

- UI réactive côté client
- logique métier et API séparées
- données isolées par foyer

⸻

🔐 Sécurité & données

- Isolation des données par foyer via RLS (Supabase)
- Accès strictement contrôlé au niveau base de données
- Aucun partage inter-utilisateurs non autorisé
- Transactions protégées et segmentées par utilisateur

⸻

🚀 Objectif produit

Transformer une gestion financière complexe en une expérience simple, lisible et automatisée, accessible à tous les membres du foyer.

⸻

📈 Évolutions possibles

- import automatique des transactions bancaires
- notifications de dépassement de budget
- mode mobile optimisé
- objectifs d’épargne
- analyses prédictives des dépenses

⸻

🔗 Liens

- GitHub : https://github.com/GuillaumeBraillon/family-budget
