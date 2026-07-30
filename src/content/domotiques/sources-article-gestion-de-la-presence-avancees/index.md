---
title: "Sources Article : GESTION DE LA PRÉSENCE AVANCÉES"
date: 2018-04-24
tags:
  - Archives
  - LaDomoPratique
  - Tutoriels
description: Si l’article Gestion de la présence avancées vous à intéressez
  voila les sources pour une mise en place rapide dans Jeedom.
thumbnail: Scenario-Presence-2.png
---

# Sources Article : GESTION DE LA PRÉSENCE AVANCÉES

> **Si l’article** [Gestion de la présence avancées](/articles/jeedom-scenario-gestion-de-la-presence-avancees) **vous à intéressez voila les sources pour une mise en place rapide dans Jeedom.**

## Les scenarios de gestion de la présence dans Jeedom

_Certains scénarios sont spécifique à un membre et d’autres sont commun à toute la famille._

- **\[Présent Membre\]** : C’est le scénario qui détermine la **présence ou non d’un membre** de la famille.
- **\[Absent Membre\]** :  C’est le scénario qui **valide l’absence d’un membre** de la famille. Il va faire la **triple vérification d’absence** (Bluetooth, Wifi et Géolocalisation).
- **\[Géolocalisation Membre\]** : Ce scénario permet d’informer Jeedom qu’un **membre** est en **approche**, mais pas encore présent et donc d’automatiser des scènes.
- **\[Scène Membre\]** : C’est le scénario qui va permettre l’automatisation de **scènes spécifiques pour un membre**.
- **\[Scène Famille\]** : Ce scénario à la même fonction d’automatisation de scènes que le scénario précédent, mais il est **commun à tous les membres**.

Il faudra remplacer **« Membre »**, **« Membre1 »**, **« Membre2 »** par le nom des membres de votre famille, animaux y compris 🙂

_**Info** : Je vous conseille de faire d’abord un scénario pour vous et une fois qu’il sera bien en place, de le dupliquer pour un autre membre de la famille et ainsi de suite pour chacun des membres._
