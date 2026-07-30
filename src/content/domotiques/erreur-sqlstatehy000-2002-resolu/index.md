---
title: Erreur SQLSTATE[HY000] [2002] [Résolu]
date: 2017-02-13
tags:
  - Archives
  - LaDomoPratique
  - Tutoriels
description: "[alert-announce]Cette erreur n’est plus présente depuis la mise à
  jour du plugin.[/alert-announce] Aujourd’hui je vous présente un article
  évolutif que je n’avais pas prévu de..."
thumbnail: xiaomihome_SQLSTATE.png
---

# Erreur SQLSTATE[HY000] [2002] [Résolu]

\[alert-announce\]Cette erreur n’est plus présente depuis la mise à jour du plugin.\[/alert-announce\]
Aujourd’hui je vous présente un article évolutif que je n’avais pas prévu de faire, mais ce matin au réveil je me retrouve avec toute ma domotique bloquée, et un beau message d’erreur sur Jeedom.
_**SQLSTATE\[HY000\] \[2002\] Can’t connect to local MySQL server through socket ‘/var/run/mysqld/mysqld.sock’ (2)**_
Obligé de débrancher mon Rpi pour que tout reparte, aïe la carte SD !

## Les premiers soins.

Comme toujours, dès que j’ai un message d’erreur, je vais sur le net pour voir si je trouve des informations utiles. Par chance je trouve un sujet sur le [GitHub de Jeedom](https://github.com/jeedom/issues/wiki/depannage) qui parle exactement de ce sujet.

```
J’ai l’erreur suivante : SQLSTATE[HY000] [2002] Can’t connect to local MySQL server through socket '/var/run/mysqld/mysqld.sock'
Cela est dû à MySQL qui s’est arrêté, ce n’est pas normal, les cas courants sont :
souci de place sur le système de fichier (peut être vérifié en faisant la commande "df -h", en ssh)
problème de corruption de fichier, arrive souvent suite à un arrêt non propre de jeedom (coupure de courant)
Malheureusement, il n’y a pas beaucoup de solution si c’est le deuxième cas,
 le mieux étant de récupérer un backup (disponible dans /usr/share/nginx/www/jeedom/backup par défaut),
 de réinstaller jeedom et de restaurer le backup.
 Vous pouvez aussi en ssh regarder pourquoi mysql ne veut pas démarrer :
sudo su -
service mysql stop
mysqld --verbose
Ou consulter le log : /var/log/mysql/error.log
```

### Souci de place

Je me connecte en SSH et je fais « df -h », voila le résultat :

```
Filesystem     Size  UsedAvail  Use%  Mounted on
/dev/root      15G   2.0G    12G  14%   /
devtmpfs       483M     0   483M   0%   /dev
tmpfs          487M     0   487M   0%   /dev/shm
tmpfs          487M   19M   468M   4%   /run
tmpfs          5.0M  4.0K   5.0M   1%   /run/lock
tmpfs          487M     0   487M   0%   /sys/fs/cgroup
tmpfs          128M  488K   128M   1%   /tmp
/dev/mmcblk0p1 63M    21M    43M  34%   /boot
```

Je vois que sur les 15 Go j’ai 2 Go d’utilisés et 12 Go de disponibles donc ce n’est pas un problème de place.

### Corruption de fichier

D’après ce que je lis ça peut être des fichiers corrompus « *suite à un arrêt non propre de jeedom (coupure de courant)*« . Il est vrai que j’ai fait pas mal de tests qui se sont finis par des arrêts non propres de Jeedom.

- Du coup au lieu de réinstaller un backup je decide de repartir de Zéro, je réinstalle donc Jeedom et pour être sûr que le défaut ne soit pas dans le backup je reconfigure manuellement le plugin Xiaomi et je crée 2 scenarii d’allumage de lumière, rien d’autre.

Le lendemain matin j’ai le même message d’erreur !!!

- Je regarde en SSH pourquoi Mysql c’est arrêté.

```
root@jeedom:~# sudo su -
root@jeedom:~# service mysql stop
root@jeedom:~# mysqld --verbose
170211 12:49:05 [Warning] Using unique option prefix key_buffer instead of key_buffer_size is deprecated
and will be removed in a future release. Please use the full name instead.
170211 12:49:05 [Note] mysqld (mysqld 5.5.54-0+deb8u1) starting as process 747 ...
```

La ça parle chinois, je ne comprends pas ce que ca veut dire et je ne trouve rien sur le net…

- Je consulte le fichier Log à « /var/log/mysql/error.log ».

```
170211 9:33:30 [Warning] Using unique option prefix myisam-recover instead of myisam-recover-options is deprecated and will be removed in a future release. Please use the full name instead.
170211 9:33:30 [Note] Plugin 'FEDERATED' is disabled.
170211 9:33:31 InnoDB: The InnoDB memory heap is disabled
170211 9:33:31 InnoDB: Mutexes and rw_locks use GCC atomic builtins
170211 9:33:31 InnoDB: Compressed tables use zlib 1.2.8
170211 9:33:31 InnoDB: Using Linux native AIO
170211 9:33:31 InnoDB: Initializing buffer pool, size = 128.0M
InnoDB: mmap(135987200 bytes) failed; errno 12
170211 9:33:31 InnoDB: Completed initialization of buffer pool
170211 9:33:31 InnoDB: Fatal error: cannot allocate memory for the buffer pool
170211 9:33:31 [ERROR] Plugin 'InnoDB' init function returned error.
170211 9:33:31 [ERROR] Plugin 'InnoDB' registration as a STORAGE ENGINE failed.
170211 9:33:31 [ERROR] Unknown/unsupported storage engine: InnoDB
170211 9:33:31 [ERROR] Aborting
170211 9:33:31 [Note] /usr/sbin/mysqld: Shutdown complete
```

Ce n’est pas du chinois mais pas loin, je pense que la partie importante est celle que j’ai mis en gras qui parle d’un manque de place alloué pour Mysql.
Après un petite recherche sur le net j’ai trouvé cette page : [http://www.webtrafficexchange.com/solved-mysql-crash-fatal-error-cannot-allocate-memory-buffer-pool](http://www.webtrafficexchange.com/solved-mysql-crash-fatal-error-cannot-allocate-memory-buffer-pool) qui m’a l’air d’être la solution à mon problème mais en cherchant un peu plus loin j’ai vu qu’utiliser le Swap sur un Raspberry n’était pas conseillé.

## Demander de l’aide

Malgré la réinstallation complète de Jeedom, en version minimale (plugin Xiaomi et 2 scenarii d’allumage de lumière), les conseils trouvés sur le net, je n’ai pas réussi à régler mon problème de plantage de Jeedom.
Je vais devoir me tourner vers d’autres moyens pour trouver de l’aide.

### Le forum de Jeedom

Ma première démarche est d’aller sur le [forum de Jeedom](https://www.jeedom.com/forum/index.php) et de taper quelques mots clés pour voir si ce sujet a déjà été abordé. Effectivement en tapant « [SQLSTATE](https://www.jeedom.com/forum/search.php?keywords=SQLSTATE) »  je trouve plusieurs messages abordant ce sujet, mais comme toujours sur les forums il y a 16 pages de messages comportant ce mot clé et pire il y a les « moi mieux ! » qui trouvent très constructif de te dire : « Si tu avais fait une recherche tu aurais trouvé ta response ! » au lieu de copier simplement un lien qui renvoie vers le message qui permet de résoudre le problème vu, qu’il est soit disant si facile à trouver…
Afin d’affiner ma recherche j’ai tapé « SQLSTATE + Xiaomi » et j’ai trouvé un message qui correspond à 100% a mon problème, mais il [date du 17 janvier](https://www.jeedom.com/forum/viewtopic.php?f=28&t=23382&p=427067&hilit=SQLSTATE+Xiaomi#p427067) et il n’y a pas de suite. Il se termine avec :

```
lunarok a écrit : Cette erreur là est oiseau de mauvais augure -> un des signes de la corruption de SD.
Benoit74 a écrit : je suis sur ssd.... je suis en train de re installer, on verra.
```

Ce n’est pas très rassurant pour deux raisons :
Premièrement car ça confirme l’hypothèse que ma ma carte SD est peut être corrompue et deuxièmement ça infirme cette hypothèse car « Benoit74 » est sur ssd et non sur carte SD. Que penser ?…

## Recherche de la solution.

Hier quand j’ai dû réinstaller Jeedom j’ai commandé une carte SD car j’avais le pressentiment que ça ne sentait pas bon cette histoire de message d’erreur.
Merci [Amazon premium](https://www.amazon.fr/essayerpremium?tag=guilbraimespa-21) je viens de la recevoir, je vais donc pouvoir installer un Jeedom tout beau tout propre sur cette nouvelle carte et pour savoir d’ou vient le problème, je ne vais installer que le plugin Xiaomi, le configurer, créer mes 2 scenarii d’allumage et attendre de voir ce qui se passe.
Et bien dans la nuit plantage !! même message d’erreur sur jeedom ou dans les log de SQL. Je décide donc de relancer Jeedom mais aussi de désactiver le plugin Xiaomi et là plus de plantage.
Là je pense vraiment que le problème vient du plugin Xiaomi bien que des centaines de personnes l’ont installé et n’ont apparemment pas de problème.
J’ai donc décidé d’envoyer un message sur le forum en réponse à Benoit74 pour savoir si il avait trouvé le solution.

```
par blusy38 »
Bonjour, avez vous trouvez la source du problème sqlstate ?
J'ai le même problème lié au plugin xiaomi.
J'ai réinstallé jeedom et le plug-in sur une nouvelle carte SD et j'ai la même erreur au bout de quelques heures?
Si je désactive le plug-in pas d'erreur.
```

[https://www.jeedom.com/forum/viewtopic.php?f=28&t=23382&start=1380#p439274](https://www.jeedom.com/forum/viewtopic.php?f=28&t=23382&start=1380#p439274)
J’ai eu plusieurs réponses qui me confirmaient les problèmes de carte SD corrompues, de problème avec l’alimentation du RPi, d’autres me disaient d’aller voir ailleurs que ce n’est pas un problème avec le plugin et j’ai eu une réponse du créateur du plugin Lunarok :

```
par lunarok »
Il n'y a pas de problème sql avec le plugin.
Donc non il n'y a pas de solution car j'en cherche pas.
C'est un constat les erreurs SQL qui se produisent chez 1 ou 2 personnes sur un plugin qui a un usage intensif,
et bien c'est du cote de l'install que se pose le soucis.
Des utilisateurs en Pi1 y arrivent jusqu'à au NUC.
Donc c'est pas l'architecture, le plugin ou jeedom.
par blusy38 »
Loin de moi l'idée de mettre en cause le plugin je cherche juste une cause logique à ces erreurs sql.
C'est pour cela que j'ai installé Jeedom et seulement le plugin xiaomi sur un carte neuve avec un scénario
d'allumage d'une minute sur mouvement.
Il se trouve que j'ai toujours l'erreur sql d'où le lien entre le plugin et l'erreur.
Mon installation est exclusivement composée d'éléments xiaomi d'où l'importance de faire fonctionner le plugin.
Si quelqu'un peu me dire où chercher je lui en serai très reconnaissant.
Merci.
Guillaume.
```

J’ai aussi eu une réponse de Benoit74 qui m’a mis sur une piste intéressante :

```
par benoit74 »
salut as tu un scenario qui allume la gateway?
par blusy38 »
Salut,
Oui effectivement j'ai un scenario qui allume la LED du gateway pendant 1 minutes sur detection de mouvement.
Est ce que c’était la cause de ton problème ?
Merci pour ta piste.
Guillaume.
par dixneuff »
J'avais le même scénario (On déclenché au premier mouvement et Off déclenché par non présence > 60.)
J'ai aussi eu des plantage SQL.
par blusy38 »
Super merci ca me "rassure" je vais creuser dans cette direction.
par Bigmaison »
Idem pour moi, même scenario allumage de led puis off après 1min
Des plantages SQL mais toujours possibilité de rebooter et de retrouver mon Jeedom pleinement fonctionnel.
Je reprends une vieille image SD pour checker
par benoit74 »
j'ai remarqué ca, des que j'active mon scenario d'allumage sur presence ( oeil fibaro) de la gateway :
erreur sql apres quelques heures.... depuis quelques jours apres desactivation du scenario plus de plantage.
par rockman18 »
À tout ceux qui ont un scénario qui déclenche une action sur la led de la gateway.
Pourriez-vous vérifier dans le menu "Analyse" > "Informations système" puis "Etat des processus" pour voir
si vous avez de nombreux process "nodejs /var/www/.../aquara.js ..." Qui tournent.
J'ai mis un message il y a quelques temps pour prévenir lunarok.
J'ai l'impression que le process qui envoie des commandes à la gateway ne se termine jamais et donc
pompe de le ressource système même une fois l'action effectuée, ce qui pourrait peut être provoquer
une instabilité jeedom et SQL...
par blusy38 »
Je me sens moins seul ca fait plaisir :)
Je suis allé voir :
 nodejs /var/www/html/plugins/xiaomihome/resources/aquara.js ******192.168.1.38 NZM2yVd2xvVWcQSR gateway 286c0785915c rgb 33023 0 5040 1
2.1%
nodejs /var/www/html/plugins/xiaomihome/resources/aquara.js *******192.168.1.38 NZM2yVd2xvVWcQSR gateway 286c0785915c rgb 33023 0 5041 1
2.1%
nodejs /var/www/html/plugins/xiaomihome/resources/aquara.js *******192.168.1.38 NZM2yVd2xvVWcQSR gateway 286c0785915c rgb 1677754623 0 5068 1
2.1%
nodejs /var/www/html/plugins/xiaomihome/resources/aquara.js *******192.168.1.38 NZM2yVd2xvVWcQSR gateway 286c0785915c rgb 1677754623 0 5075 1
2.1%
nodejs /var/www/html/plugins/xiaomihome/resources/aquara.js *******192.168.1.38 MtxJmxuAPVL26XRj gateway 286c0785915c rgb 33023 0 5097 1
2.1%
nodejs /var/www/html/plugins/xiaomihome/resources/aquara.js *******192.168.1.38 MtxJmxuAPVL26XRj gateway 286c0785915c rgb 33023 0 5106 1
2.1%
Est ce que c'est le même qui pose problème chez toi ?
Je pense que l'on peu dire que c'est bien un problème lié au plugin Xiaomi ?
```

Je crois que j’ai bien fait d’insister sur le forum car plusieurs personnes se sont manifestées pour dire qu’elles avaient le même problème avec le plugin Xiaomi lorsqu’un scenario d’allumage du Gateway était présent.

```
Pas lunarok »
Pour info, les commandes actions une fois partient (comme le log sans erreur donné plus haut) n'utilisent pas la base MySQL
Donc arrêtez d'incriminer quelquechose quand vous savez pas. C'est franchement pénible et ça donne pas envie de regarder.
Un cannot connect to MySQL n'a rien a voir avec le plugin.
Après je l'ai dis aquara est très verbeux (c'est ce qui fait qu'on a des retours d'État immédiat) donc vérifier votre matériel
et il y a une option qui allégé le plugin sur la page de conf (mais la aussi, personne n'a vérifier la charge de son pi,
ca serait pourtant bien plus constructif que d'accuser le voisin si le gazon est pas vert chez soit)
par blusy38 »
Ne le prends pas mal on cherche juste à trouver une solution pour ne plus avoir de plantage.
Je sais que tout le monde trouve que tu as fait un super boulot avec ce plugin.
C'est d'ailleurs pour cela qu'on cherche a le faire fonctionner sinon on l'aurait simplement désinstallé.
Je vais regarder cette histoire de charge du Pi.
Est ce que la fonction pour alleger le plugin c'est : "N'utiliser que les reports pour les capteurs Aquara" ?
par rockman18 »
Pour l'instant tu remarqueras qu'on essaye d'éviter d'incriminer directement le plugin,
mais qu'on cherche des pistes qui pourraient être liée.
Clairement le script nodejs ne peut pas être directement lié au problème SQL,
on sait qu'il ne fait aucune action SQL. Mais le fait que les process s'accumulent sans fin
peut surcharger les petites config comme certains Pi ou autre. Et quand la surcharge arrive au niveau du systeme
on ne peut plus determiner clairement ce qui déclenche des comportement anormaux.
Dans tous les cas, même si ce n'est pas là le soucis, un process qui se lance et ne se termine jamais n'est pas normal.
```

Je m’arrête là pour le moment avec le fil du forum, je pense que l’on peut dire que le problème est bien lié au plugin Xiaomi même si je ne remet pas en cause l’utilité du plugin.

## Pour résoudre le problème

A l’heure ou je vous parle (12/02/2017) pour ne pas avoir cette erreur SQLSTATE il ne faut pas créer de scenario pour allumer la Led du gateway.
Je vais faire confiance aux experts de Jeedom et au créateur du plugin pour identifier la cause exacte du problème et j’espère qu’une mise a jour viendra régler ce problème. Pour le moment on peut dire que la Led du Gateway n’est pas supporté par le plugin Xiaomi.
\[alert-success\]Mise à jour du 13/02/2017 à 13:50
Suite aux différents message sur le forum de Jeedom, Rockman18 à fourni un code à ajouter dans le script aquara.js.

```
par rockman18 »
Bon effectivement le send de la socket est asynchrone. Je ne suis pas chez moi pour tester mais je pense qu'en modifiant la derniere ligne du script aquara.js comme ceci ca peut peut-etre marcher.
de
CODE : TOUT SÉLECTIONNER
serverSocket.send(command, 0, command.length, 9898, gateway);
par
CODE : TOUT SÉLECTIONNER
serverSocket.send(command, 0, command.length, 9898, gateway, (err) => {
 serverSocket.close();
});
ou, si ca ne suffit pas.
CODE : TOUT SÉLECTIONNER
serverSocket.send(command, 0, command.length, 9898, gateway, (err) => {
 serverSocket.close();
 process.exit();
});
```

Après avoir fait une copie de sauvegarde j’ai modifié , mon « **aquara.js**« , en passant par WinSCP en remplaçant la dernier ligne par  :

```
serverSocket.send(command, 0, command.length, 9898, gateway, (err) => {
serverSocket.close();
});
```

Ensuite j’ai activé et désactivé la Led du Gateway et dans « **Analyse / Informations system / Etat des processus** » je n’ai pas de ligne supplémentaire :

```
nodejs /var/www/html/plugins/xiaomihome/resources/aquara.js j95z3edfy15yimke 192.168.1.38 8npY7dJWfivHDPIs plug 158d0001570328 status on 63965
```

**\[/alert-success\]**
\[alert-announce\] Mise à jour du 13/02/2017 à 14:10.
Voila ! C’est ca que j’aime avec Jeedom !!
Grace aux membres de la communauté et à leur réactivité, une mise à jour sera apparemment bientôt disponible.

```
lunarok a écrit :
Merci, c'est intégré à la beta, j'ai ajouté un kill des existants aussi dans le stop service
Demain en stable[/alert-announce]
```

Je vais réactiver mon scenario sur la led du Gateway pour voir si ça fonctionne.
Je vous tiens au courant.
\[alert-warning\]Mise a jour du 14/02/2017 à 9:25.
Le problème est résolu en beta grace à l’ajout d’une ligne de code fourni par rockman18 sur le forum de Jeedom.
Une mise a jour stable devrait être distribuée aujourd’hui pour régler le problème.
Merci à la communauté Jeedom qui à travaillé en équipe pour résoudre ce problème.\[/alert-warning\]
