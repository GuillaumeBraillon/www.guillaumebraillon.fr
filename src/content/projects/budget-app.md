---
title: "Budget App Familial"
description: "Application full-stack de gestion de budget basée sur la méthode des enveloppes, avec suivi en temps réel et automatisation des charges récurrentes."
tech: ["React", "Node.js", "Astro", "Supabase", "TailwindCSS"]
date: 2026-01-15
githubUrl: "https://github.com/GuillaumeBraillon/family-budget"
featured: true
---

## 💡 Contexte & Objectif

Le suivi des finances du foyer via des feuilles de calcul classiques s'avère souvent rigide et contraignant au quotidien. L'objectif de cette application est de numériser la **méthode des enveloppes** pour offrir une segmentation stricte des dépenses et une synchronisation instantanée entre conjoints.

## 🚀 Fonctionnalités Clés

- **Enveloppes Virtuelles :** Répartition du budget mensuel par catégories (Alimentation, Sorties, Énergie, Épargne) avec calcul automatique du reste à vivre.
- **Gestion des Récurrences :** Prise en compte automatisée des abonnements et charges fixes prélevés chaque mois pour anticiper le solde disponible à 30 et 90 jours.
- **Indicateurs & Graphiques :** Tableaux de bord de répartition des dépenses et suivi de l'évolution du taux d'épargne du foyer.

## 🏗️ Architecture & Sécurité

L'application utilise une architecture découplée où Astro sert les routes d'API et le contenu, tandis que React gère l'état de l'interface utilisateur. La sécurité des données financières est assurée au niveau de la base de données PostgreSQL (Supabase) via des politiques d'isolation strictes (RLS), garantissant que chaque foyer accède exclusivement à ses propres lignes de transactions.
