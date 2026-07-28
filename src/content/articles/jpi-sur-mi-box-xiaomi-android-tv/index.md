---
title: JPI sur Mi-Box Xiaomi Android TV
date: 2017-10-28
tags:
  - Tutoriels
description: Aujourd’hui je vais vous parler de la box TV Mi-Box de Xiaomi qui
  est une Android TV 4K. C’est ni un test, ni une présentation technique que je
  souhaite vous proposer, mais...
thumbnail: IMG_20170923_164122.jpg
---

# JPI sur Mi-Box Xiaomi Android TV

> Aujourd’hui je vais vous parler de la **box TV Mi-Box de Xiaomi** qui est une **Android TV 4K.**
>
> C’est **ni un test, ni une présentation technique** que je souhaite vous proposer, mais plutôt, vous montrer comment **intégrer** cette Android TV box dans **Jeedom** avec **JPI** qui n’est pas seulement destiné aux smartphones.
>
> Si vous ne connaissez pas encore JPI je vous invite à **lire** l’article [Jeedom – Jeedom Paw Interface (JPI) APK et Plugin](/articles/jeedom-jeedom-paw-interface-jpi-apk-et-plugin).
>
> Je vous passe les **caractéristiques** pas très parlantes que vous aurez surement **déjà vues** sur beaucoup de blogs, ou même simplement sur la description de la Mi-Box, afin de se concentrer plutôt sur **l’intégration** dans Jeedom.
>
> Avant cela, on va quand même faire le **déballage**, histoire de savoir ce que vous allez recevoir, l**‘installation**, histoire de savoir ou vous mettez les pieds et la **configuration** de base histoire que tout fonctionne correctement avant de passer dans le vif du sujet, **Jeedom**.
>
> Cette Mi-Box est disponible chez Gearbest à moins de 60, sans compter les [promos quotidiennes](/articles), ou chez [Amazon au alentour des 100 €](http://amzn.to/2gkNWYP) en livraison gratuite.
>
> **_Attention ! il existe plusieurs modèles sous le nom de Mi-Box, je vous suggère fortement de passer par les liens de l’article pour ne pas avoir de mauvaises surprises._**

![](./IMG_20170923_164122-1024x768.jpg)

## Déballage

Xiaomi nous a habitué à des emballages **plus classe** et très **plus sobre**. Là, on est plus sur une boite que l’on pourrait trouver sur des marques **entrée de gamme**, mais bon, ce n’est pas le plus important.

![](./IMG_20170923_164019-768x1024.jpg) ![](./IMG_20170923_164122-1024x768.jpg)

La version testée est livrée avec une **prise Europe**, donc, pas besoin d’adaptateur secteur.

Pensez bien à passer par les **liens de l’article** pour commander la **version** Xiaomi Mi TV Box – Version International Officiel – Prise EU, car il y a **plusieurs modèles,** dont certains ne sont destinés qu’à la **chine**.  ![](./IMG_20170923_164230-1024x768.jpg)

Un câble HDMI est **fourni.** Il ne fait qu’**un mètre** de long, ce qui pourrait être court pour certaines installations.![](./IMG_20170923_164313-1024x768.jpg)

Les **piles** ne sont **pas fournies** il faudra donc penser à commander des [LR03-AAA](http://amzn.to/2glcvFb).![](./IMG_20170923_164406-768x1024.jpg)

Niveau connexion, rien de bien compliqué, on retrouve :

1.  La **prise secteur** pour brancher l’alimentation fournie.
2.  Le **port USB** que l’on n’utilisera pas pour le moment, mais qui permet de brancher une clé USB, ou un clavier et une souris.
3.  Le **port HDMI** pour le relier à votre TV, ou un ampli Home Cinéma.
4.  Une sortie audio **Jack 3,5**. ![](./IMG_20170923_164604-1024x768.jpg)

## Installation

Une fois branchée, vous allez être guidé **pas à pas** par l’interface d’installation, en **Français,** avec des dessins très simples à comprendre.

![](./IMG_20170923_164947-1024x639.jpg) ![](./IMG_20170923_165005-1024x574.jpg)

Une fois la télécommande associée, vous devez **choisir** la **langue** de l’interface.
![](./IMG_20170923_165215-1024x379.jpg)

Si vous avez un téléphone Android, **l’installation** sera grandement **facilitée.** Sinon, il faudra faire des réglages et saisir vos identifiants **manuellement**.

Voila les différentes étapes de configuration : ![](./IMG_20170923_165224-1024x530.jpg)

![](./IMG_20170923_165238-1024x731.jpg)

![](./IMG_20170923_165322-1024x720.jpg)

Là, on passe sur le **smartphone Android**.![](./Screenshot_20170923-165511-576x1024.png)

Sur l’écran de la **TV,** les étapes avancent en même temps.
![](./IMG_20170923_165751-1024x776.jpg)

![](./Screenshot_20170923-165404-576x1024.png)

![](./Screenshot_20170923-165355-576x1024.png)

![](./Screenshot_20170923-165506-576x1024.png)

![](./Screenshot_20170923-165613-576x1024.png) Configurez le **wifi** depuis votre smartphone, pour que la box se connecte au wifi.![](./Screenshot_20170923-165606.png)

![](./Screenshot_20170923-165554.png)

![](./Screenshot_20170923-165621-576x1024.png)

La configuration est **terminée**.

Dans la foulée, vous pouvez installer l’[application télécommande Android](https://play.google.com/store/apps/details?id=com.google.android.tv.remote&hl=fr) sur votre smartphone, pour contrôler la box. (facultatif)![](./Screenshot_20170923-165653-576x1024.png)

![](./Screenshot_20170923-165743-576x1024.png) Une fois l’installation terminée, il faut évidement **accepter les conditions d’utilisation Google,** en cliquant sur « ACCEPTER » avec la télécommande.![](./IMG_20170923_165911-1024x455.jpg)

Comme toujours, je vous conseille fortement de faire une **mise à jour de la box TV,** pour être certains d’avoir un fonctionnement optimum.

-   Paramètres > A propos > Mise à niveau du système.

![](./IMG_20170923_170257-1024x436.jpg)

## Accéder au disque dur de la Mi-Box TV Xiaomi depuis un ordinateur

La première application que l’on va installer n’est pas directement lié à JPI, mais elle va nous permettre **de copier des fichiers et d’accéder au disque dur** de la Mibox **depuis un ordinateur,** car il n’y a pas de navigateur internet sur les box Android TV.

Pour accéder au disque dur de la box Android, on va utiliser [ES Explorer](https://play.google.com/store/apps/details?id=com.estrongs.android.pop) qui est disponible sur le Google store Android TV, **directement depuis la Mi-Box.**

-   Ouvrir : **Google Store**.
-   Taper, ou dire, en appuyant sur le micro de la télécommande : **ES Explorer**.
-   Cliquer sur « **Installer**« .

Vous pouvez aussi installer l’application sur votre Mi-Box TV, en passant par **votre ordinateur** :

-   Cliquer sur ce lien pour accéder au google Store : [ES EXPLORER](https://play.google.com/store/apps/details?id=com.estrongs.android.pop).
-   Cliquer sur « **Installer**« .
-   Choisir « **Xiaomi MIBOX3 No carrier** » dans le liste.
-   Cliquer sur « **Installer**« .

![](./JPI-MiBox.png)

-   Quelques instant plus tard, l’application est **disponible sur votre Mi-Box TV**.

![](./MiBox-1.png)

-   Ouvrir l’application.
-   Aller sur « **Affichage sur le PC**« .![](./MiBox-2.png)
-   Cliquer sur « **Démarrer**« .![](./MiBox-3.png)
-   Votre Mi-Box TV est désormais un serveur FTP. Il ne vous reste plus qu’à vous connecter **depuis** votre **PC,** avec **l’adresse** et le **port** affichés à l’écran.
-   Attention le port FTP n’est pas « **21** » mais « **3721**« .![](./MiBox-4.png)
-   Vous pouvez utiliser n’importe quel logiciel FTP, comme **FileZila,** ou le logiciel **WinSCP** que nous avons déjà utilisé pour accéder au [Raspberry PI.](/articles/installation-de-jeedom-netinstall-sur-raspberry-3#Connexion_en_SSH_sous_Jeedom)  Pas besoin de **nom d’utilisateur** ni de **mot de passe**.![](./MiBox-5.png)

**Es Explorer** permet aussi d’accéder au **disque dur** de votre **PC** **depuis** la **Mi-Box TV,** mais il est beaucoup plus simple de faire l’inverse.

_Sachez que **Es Explorer** à été mis à jour et que maintenant, la navigation via la télécommande n’est pas des plus aisée. Mais ça reste toujours un bon moyen de gérer les fichiers sur une box Android. Rien ne vous empêche d’utiliser un autre gestionnaire de fichier._

## Installation de JPI sur Xiaomi Mi-Box TV

_Si ce n’est pas déjà fait, je vous invite à **lire** l[‘article dédié à JPI](/articles/jeedom-jeedom-paw-interface-jpi-apk-et-plugin)  qui vous explique comment l’installer et le configurer sur un smartphone, **avant** de vous lancer dans l’installation sur une Box Android TV._

L’utilisation de JPI sur une **box Android TV** est un peu différente, car il n’y a pas de navigateur internet. C’est pour cela que nous avons installé Es Explorer, afin de copier les fichiers nécessaires à son installation.

_Pour tout vous dire, il est possible d’installer Google Chrome, mais vous aurez besoin de brancher un clavier et une souris pour pouvoir en profiter pleinement, car la télécommande ne permet pas de cliquer sur les pages. Pour l’installer, cliquer sur le micro de la télécommande_ _et dites « Ouvrir Chrome », vous allez être redirigé vers le Google Store et l’installer._

JPI va nous permettre d’ajouter plusieurs fonctions liées à Jeedom, comme par exemple le :

-   **TTS (Text To Speech)**  : Diffuser des notifications vocales.
-   **Toast** : Afficher des messages à l’écran.
-   **Volumes** : Contrôler les volumes (niveau, mute…).
-   **Gestion de fichiers** : Lire des fichiers audios enregistrés dans la Mi-Box.
-   **Commande vocal** : Lancer des actions sur Jeedom avec la voix, le micro étant dans la télécommande.
-   Lancer, ou arrêter, une application, récupérer des informations système (puissance wifi, mémoire, CPU…), etc..

### Depuis votre PC

-   **Télécharger** l’APK disponible sur le site de dJuL : [http://rulistaff.free.fr/JPI/getJPI/](http://rulistaff.free.fr/JPI/getJPI/)
-   **Copier** le fichier sur la Mi-Box, via **WinSCP,** dans le répertoire Download, par exemple.![](./MiBox-6.png)

### Depuis la Mi Box TV

-   **Ouvrir** ES Explorer.
-   Chercher « **Téléchargement** » dans la partie de gauche et cliquer sur « **fr.djul.JPI…apk** » dans la partie de droite.![](./MiBox-7.png)
-   Cliquer sur « **Installer** » sur les 2 prochaines fenêtres.![](./MiBox-8.png)![](./MiBox-9.png)
-   A la fin de l’installation, cliquer sur « **Ouvrir**« .![](./MiBox-10.png)
-   L’installation de **PAW Server** vous sera demandée, cliquer sur OK.![](./MiBox-11.png)
-   Vous allez être redirigé vers le Google Store et cliquer sur « **Installer**« .![](./MiBox-12.png)
-   Si vous ne pouvez pas installer PAW il faudra le télécharger depuis votre ordinateur : [paw-server-for-android](https://apkpure.com/fr/paw-server-for-android/de.fun2code.android.pawserver)
-   Une fois PAW Server installé, il faut **relancer JPI.** Comme ce n’est pas une application officielle de Google, il n’est pas présent dans les applications de la page principale. Il faut donc aller dans :
    -   Paramètres > Applications > JPI > Ouvrir.![](./MiBox-13.png)
-   Il y a plusieurs autorisations à accepter, en cliquant sur « **Autoriser**« , pour pouvoir utiliser JPI.![](./MiBox-14.png)
-   Il faut ensuite **valider** les différents messages qui s’affichent à l’écran, mise à jour, lancement de Paw, etc…

Pour la **configuration,** je vous renvoie vers **l’article** [Jeedom Paw Interface (JPI) APK et Plugin](/articles/jeedom-jeedom-paw-interface-jpi-apk-et-plugin), car à partir de maintenant, vous pouvez utiliser JPI comme sur un smartphone sans carte SIM, donc plutôt comme une tablette.

## Reconnaissance vocale

Vous pouvez **configurer** la reconnaissance vocale sur la MiBox et utiliser le **micro** de la télécommande, pour donner des ordres à Jeedom.

### **Mode reconnaissance vocal avancé**

Le plus sympa c’est d’activer la **reconnaissance vocale avancée,** car il vous suffit de définir un mot clé, exemple JARVIS, et dès que JPI le détecte, il vous demande l’action à effectuer.

-   Exemple :
    -   **Vous** : Jarvis
    -   _**Mibox**_ : Que puis-je faire ?
    -   **Vous** : Allume la lumière du salon.
    -   _**MiBox**_ : La lumière du salon est allumée.

![](./mibox-JPI.png)

Le problème, c’est que cette option n’est **pas compatible avec la commande vocale Google** et donc, lorsque vous allez cliquer sur le micro de la télécommande, vous ne pourrez plus faire de recherche vocale.

Il est assez facile de se passer de cette option et d’utiliser le clavier virtuel pour faire des recherches, mais le second problème, c’est que la **télécommande bluetooth a tendance à se bloquer.** Même si on n’utilise pas la commande vocale, la télécommande ne répond plus…
Chose étrange, l’application télécommande n’est pas impactée par ce problème et il est toujours possible de l’utiliser.

_Personnellement, je ne vois pas le lien entre le bluetooth de la télécommande et la commande vocale ? je n’ai pas posé la question à dJuL, le développeur de JPI, car c’est un cas particulier qui est lié aux box Android._

Pour finir, cette option n’est pas vraiment compatible avec une utilisation multimédia, car la commande provoque des **variations du volume sonore**.

_Je pense pouvoir le faire fonctionner correctement, mais avec pas mal de réglages. Je mettrai à jour cet article dès que j’aurai solutionné le problème._

### **Mode reconnaissance vocal manuel**

Pour utiliser la commande vocale sans les problèmes vu précédemment, il est possible de lancer la **commande vocale manuellement,** depuis un interrupteur physique ou virtuel.

Depuis le plugin JPI, il y a une commande appelée « **Reconnaissance Vocale** » qui déclenche le processus comme le ferait un mot clé, par exemple « Jarvis ».

![](./JPI-Plugin-4.png)Vous pouvez l’essayer en cliquant sur le bouton « **Tester**« . La Mi-Box devrait vous demander : « **Que puis-je faire pour vous ?**« .

C’est vrai que c’est moins sympa que la détection automatique, mais c’est une alternative au problème de télécommande.

## Installation de KODI sur Xiaomi Mi-Box TV

Il existe une version de Kodi pour Android TV. Donc, pour l’installer, il suffit d’aller dans le Google Store de votre Mi-Box.

-   Ouvrir : Google Store.
-   Taper ou dire en appuyant sur le micro de la télécommande : KODI.
-   Cliquer sur installer.

Vous pouvez aussi installer Kodi sur votre Mi-Box TV en passant par votre ordinateur :

-   Cliquer sur ce lien pour accéder au google Store : [Kodi](https://play.google.com/store/apps/details?id=org.xbmc.kodi&hl=fr).
-   Cliquer sur « **Installer**« .
-   Choisir « **Xiaomi MIBOX3 No carrier** » dans le liste.
-   Cliquer sur « **Installer**« .

Si vous souhaitez installer KODI sur une box Android plus ancienne, je vous invite à lire cet article : [Multiroom Audio-Vidéo – Installations clients Vidéos (Kodi)](/articles/multiroom-audio-video-installations-clients-videos-kodi)

### Copie du fichier **advancedsettings.xml sur** Xiaomi Mi-Box TV

Si vous utilisez KODI avec une base de données partagée, il faudra copier le fichier **advancedsettings.xml** dans le répertoire **userdata** qui se trouve dans :

-   **Android/data/org.xbmc.kodi/files/.kodi/userdata/**.

Pour copier le fichier, vous pouvez utiliser la même technique que pour JPI avec [ES Explorer et WinSCP](#depuis-votre-pc).

### Contrôler Kodi depuis Jeedom

Pour démarrer KODI sur la Mi-Box TV, on va utiliser la commande « **LaunchApp** » depuis le plugin JPI, ou depuis le plugin Script.

**1) Plugin JPI :** 

-   Aller dans l’onglet « **Commandes**« .
-   Cliquer sur « **Assistant de commande JPI**« .
-   Nommer la commande exemple : »**KODI**« .
-   Dans « **Action** » choisir « **launchApp**« .
-   Dans « **packageName »** choisir « **Kodi**« .
-   **Sauvegarder**.

![](./JPI-Plugin-5.png)

**2) Plugin Script :**

-   Aller dans l’onglet « **Commandes**« .
-   Cliquer sur « **Ajouter une commande Script**« .
-   Nommer la commande, exemple : »**KODI**« .
-   Dans « **Type Script**« , choisir « **HTTP**« .
-   Dans « **Type**« , choisir « **Action**« .
-   Dans « **Requête »,** saisir « http://\[IP\_DE\_JPI\]:\[PORT\_DE\_JPI\]/?action=launchApp&packageName=org.xbmc.kodi ».
-   **Sauvegarder**.

Maintenant, vous pouvez **démarrer** **Kodi** depuis un Jeedom, comme n’importe quelle commande (Scénario, Virtuel…).

Le contrôle via JPI s’arrête là. Si vous voulez **contrôler totalement Kodi** depuis Jeedom, il vous faudra installer le **plugin** (4€) nommé **Kodi**, développé par ??? [Sarakha63 !](http://sarakha63-domotique.fr/)

La **doc officielle** est là : [https://jeedom.github.io/documentation/plugins/kodi/fr\_FR/index.html](https://jeedom.github.io/documentation/plugins/kodi/fr_FR/index.html).

Le **forum Jeedom** est là : [https://www.jeedom.com/forum/viewtopic.php?f=28&t=5988](https://www.jeedom.com/forum/viewtopic.php?f=28&t=5988).

Il y aura **bientôt** un article complet, détaillant l’installation et la configuration du plugin côté Jeedom et Kodi.

## Conclusion

Voila pour ce petit tour d’horizon de la  Xiaomi Mi TV Box.

Je reviendrais surement dans de prochains articles, sur les différentes possibilités qu’offre cette box Android TV qui **défie toute concurrence** niveau tarif et qui est **une des plus performantes,** aussi bien côté matériel que logiciel, car il n’y a **pas de restrictions** pour l’Europe, si vous **choisissez bien le modèle suivant** :  Xiaomi Mi TV Box – Version International Officiel – Prise EU.

\