---
title: Le choix de mon système domotique.
date: 2016-03-18
tags:
  - Archives
  - LaDomoPratique
  - Tutoriels
description: "[toggle title= »Mise à jour du 25 janvier 2017″]Avant de commencer
  à lire l’article sachez que j’ai fait mon choix. C’est Jeedom qui a remporté
  mes faveurs mais c’est surtout..."
thumbnail: blurb07-1.jpg
---

# Le choix de mon système domotique.

\[toggle title= »Mise à jour du 25 janvier 2017″\]Avant de commencer à lire l’article sachez que j’ai fait mon choix. C’est Jeedom qui a remporté mes faveurs mais c’est surtout grâce à la compatibilité avec l’ensemble Xiaomi Home Gateway.
Je vous en parle dans [plusieurs articles](/tag/xiaomi/) mais cette solution n’était pas présente dans le comparatif de cet article car à l’époque la compatibilité avec Jeedom n’était pas possible.\[/toggle\]

## La centrale domotique :

Je veux un système domotique ouvert c’est a dire qui ne soit pas limité à un protocole et donc me permettant d’utiliser les périphériques de mon choix. Donc exit les [box Thomson](http://amzn.to/2hIfSnO) et [Myfox](http://amzn.to/2iwm7Nl). Problème le systeme [Myfox](http://amzn.to/2iwm7Nl) est à mes yeux le meilleur système d’alarme, nous y reviendrons plus tard.
Je ne vais pas vous détailler toutes les réflexions que j’ai eu pour choisir ma centrale domotique mais en gros, j’ai éliminé toutes celles qui n’était pas ouvertes et multi-protocoles, qui coûtaient plus de 300€, et qui ne permettaient pas de faire des réglages et des scenarii un peu poussés.
En résumé en haut du podium on trouve  :

1.  Jeedom
2.  [Eedomus](http://amzn.to/2iwfJpq)
3.  domoticz.

Je precise que je n’ai jamais eu ces box en main, mes choix on vraiment étaient faits suite à mes recherches sur le net.
[[**Voir le produit sur Amazon**](https://www.amazon.fr/dp/B00WN5E49S?tag=guilbraimespa-21)

### Jeedom.

[Jeedom](https://www.jeedom.com/site/fr/) est un logiciel open source Français qui peu être installé sur une raspberry PI, un NAS Synology ou un PC sous Linux. Il existe aussi des [Jeedom](https://www.jeedom.com/site/fr/) box mais pour le moment seule la mini est disponible et apparemment elle manque un peu de puissance.
Pour pouvoir utiliser un protocole il suffit d’installer une clé USB compatible.
J’aime cette solution car elle permet à moindre coût de commencer à faire de la domotique et permet aussi de faire des scenarii complexes. J’ai un vieux PC que je vais surement utiliser dans un premier temps pour installer jeedom sous linux ou Synology (XPenology). J’aurais juste à acheter les clés USB permettant d’utiliser les différents protocoles compatibles (Z-Wave, RFXcom, RTS SOMFY, EnOcean, etc…). L’avantage c’est que ces clés USB sont compatibles avec d’autre box domotiques donc si Jeedom ne me convient pas je ne perd pas mon investissement.
Dernier avantage de cette box c’est qu’elle n’utilise pas le « Cloud » donc tous fonctionne avec ou sans internet et surtout mes informations ne sont pas sur un serveur distant contrôlé par une entreprise commerciale. Je vous rappelle que la box à pour but de contrôler toute ma maison…
Apparemment le problème avec cette solution c’est le SAV qui ne serait pas très réactif et pour couronner le tout il faut de plus en plus mettre la main à la poche pour acheter des plugins, indispensables pour utiliser certaines fonctions.

### Eedomus.

[Eedomus](http://www.eedomus.com/fr/) est presque à ex aequo avec la Jeedom. Là on est sur une box clé en main donc on ne parle plus de Linux ou Synology, on achète la box, on la branche et ça marche.
[[**Voir le produit sur Amazon**](https://www.amazon.fr/dp/B00WN5E49S?tag=guilbraimespa-21)
Au niveau du choix des protocoles compatibles on est équivalent et le principe est le même, on achète des clés USB (ou on récupère celles utilisées pour le Jeedom;-) ).
Les pour et contres :

- Le prix de la box à l’achat qui est d’environ 300€ mais elle consomme moins qu’un PC ou un NAS. 1,5 Watt pour l’[Eedomus](http://amzn.to/2iwfJpq) contre 150 Watts pour un PC.
- La [Eedomus](http://amzn.to/2iwfJpq) repose sur le Cloud de la société. Pour être honnête je ne sais pas encore si ce point est un vrai problème ou non car des clouds on en utilise tous les jours avec Gmail, Google Drive photos, Facebook ou Instagram. Cela dit c’est vrai que se faire pirater ses photos de vacances est moins grave que sa maison.
- Si un voleur entre chez toi et qu’il te vole ton PC, il te vole les photos et videos du cambriolage! Si elles sont sur le cloud tu ne les perds pas.

### Domoticz.

[Domoticz](https://domoticz.com/) n’est pas vraiment dans la mËme catégorie que les deux autres, c’est un logiciel libre qui n’a pas de box associée. Il faut obligatoirement l’installer sur un PC ou une Raspberry PI. L’avantage c’est qu’on peut l’installer sur un PC sous Windows. Apparemment le système est stable et facile d’utilisation et il a les mêmes avantages que Jeedom vu plus haut. C’est un logiciel un peu récent qui est encore en train d’évoluer et il y a beaucoup moins d’informations disponibles sur le net à son sujet se qui rend la comparaison plus difficile.
