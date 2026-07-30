---
title: Planification d’événements dans Jeedom le Template
date: 2018-06-23
tags:
  - Archives
  - LaDomoPratique
  - Tutoriels
description: Pour vous évitez de créer le scénario Template à importer pour les
  articles de planification d’événements.
thumbnail: Scenario-programmation-20.png
---

# Planification d’événements dans Jeedom le Template

> Bonjour, ~en tant que contributeurs vous avez accès à des bonus et~ pour vous évitez de créer le scénario je vous partage le Template à importer pour les articles de planification d’événements:
>
> - [Planification d’événements dans Jeedom \[virtuel et widget\]](/articles/planification-devenements-jeedom-virtuel-widgets)
> - [Planification d’événements dans Jeedom \[Scénarios\]](/articles/planification-devenements-dans-jeedom-scenarios)

[Télécharger](<../../../../public/partages/Scenarios_importer/PLANIFICATION D’ÉVÉNEMENTS DANS JEEDOM LE TEMPLATE.rar>)
**Rappel des événements :** 

- **Mode matin** : *Ce scénario à la structure la plus simple.* Le changement du mode nuit au mode matin est effectué automatiquement en fonction de l’heure configuré.
  - Cela me permet par exemple de régler la luminosité des lumières ou le volume des TTS en fonction des moments de la journée. J’ai un mode nuit, soir, matin, journée, invités…

- **L’événement Réveil** : *Ce scénario ajoute la fonction minuteur au scénario précédent.* C’est un réveil matin qui lance un scénario d’allumage progressif des lumières dans la chambre définie par la commande minuterie du virtuel et enfin qui lance la musique à l’heure choisie.
  - Le fait de lancer le scénario d’allumage progressif me permet de limiter le nombre de modifications, car j’ai seulement le scénario d’allumage progressif à modifier pour tous les jours et non un par jour.
- **L’événement Ecole** : *Ce scénario est plus complexe, car il ajoute des rappels au scénario précédent.* C’est un rappel pour aller chercher mon fils à l’école, avec un premier rappel défini par la commande minuterie du virtuel, puis un second rappel 5 minutes avant l’heure choisie.

_Info : Je ne vous propose que des exemples pour vous donner une base, afin de mieux comprendre le principe à mettre en place pour vos propres planification d’événements. A vous de les adapter._

**Pour importer le Template :** 

- Allez dans **Outils**.
- Puis **Scénarios**.
- Cliquer sur **Ajouter**.
- Donnez un **nom à votre scénario**, exemple : **« Programmation Lundi »** si on est lundi. 🙂
- Cocher **Actif**  **Visible** .
- Cliquer sur Template en haut à droite.
- Sélectionner le Template à gauche.
- Cliquer sur Appliquer.
- Cliquer sur D’accord lorsque vous aurez le message « Etes-vous sûr de vouloir appliquer le template ? Cela écrasera votre scénario ».
- Fermer la fenêtre « Template de scénario ».
- Sauvegarder.

_**Info : Si vous travaillez tard sur votre scénario et qu’il est plus que l’heure d’exécution programmée, 00:25 et 00:30 dans l’exemple, pensez à exécuter le scénario manuellement en cliquant sur le bouton « Exécuter » pour programmer les événements de la journée.**_

Merci encore pour votre contribution.

Cordialement,

Guillaume Braillon.
