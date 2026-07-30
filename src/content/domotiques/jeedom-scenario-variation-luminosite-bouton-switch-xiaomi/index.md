---
title: Variation de la luminosité via un bouton switch Xiaomi
date: 2017-11-26
tags:
  - Archives
  - LaDomoPratique
  - Tutoriels
description: Aujourd’hui, nous allons voir le scénario « Variation de la
  luminosité via un bouton switch Xiaomi » permettant de faire varier la
  luminosité, par exemple, d’une ampoule Yeelight...
thumbnail: Scenario-Luminosité-1.png
---

# Variation de la luminosité via un bouton switch Xiaomi

> Aujourd’hui, nous allons voir le scénario « Variation de la luminosité via un bouton switch Xiaomi » permettant de faire **varier la luminosité,** par exemple, d’une ampoule Yeelight E27 avec un bouton switch Xiaomi.
>
> Une seule commande du bouton sera utilisée, le « **long_click_press**« . Vous pouvez donc utiliser les autres commandes pour d’autres actions.
> Le scénario est utilisable pour d’autres types de lampes ayant **un retour d’état du niveau de luminosité,** comme la lampe de bureau Xiaomi, par exemple.
>
> Le **pas de l’augmentation**, 10%, 20%, etc … est réglable via une variable.
>
> Une fois la luminosité **égale à 100 %,** l’ampoule **clignote** pour qu’on sache qu’on est au maximum et pour avoir le temps de **lâcher le bouton,** si on veut s’arrêter à 100%.
>
> Si on ne lâche pas le bouton, on passe à **1 %** et il y a une pause de **2 secondes**, pour avoir le temps de lâcher le bouton avant que l’augmentation continue **progressivement** en fonction du pas saisi dans la variable.

![Variation de la luminosité via un bouton switch Xiaomi](./Scenario-Luminosit%C3%A9-2.png)

## MODE DU SCENARIO = PROVOQUÉ.

On aura simplement besoin d’un déclenchement sur le changement de statut du bouton. **#\[Salon\]\[Bouton clic Lumières\]\[Clic\]#**

## SI #\[Salon\]\[Bouton clic Lumières\]\[Clic\]# == « long_click_press » ALORS

Là, on vérifie que la commande du bouton soit bien un **long clic**.

### SI #\[Salon\]\[Yeelight RGB\]\[Statut\]# == 0 Alors

Pour commencer, on vérifie l’**état de la lumières**. 0 = éteinte, 1 = allumée.

#### ACTION 1 : #\[Appartement\]\[Virtuel Bibliothèque\]\[On\]#

Si elle est éteinte, on **allume la lumière** via le virtuel. J’utilise les commandes du virtuel pour que les widget du Design soient bien mis à jour.

Le bloc n’a **pas de sinon,** car si on est déjà allumé, alors on continue le scénario.

### ACTION : #\[Salon\]\[Yeelight RGB\]\[Rafraichir\]#.

On **rafraîchit** l’ampoule Yeelight pour avoir les bonnes valeurs d’infos.

### Variable : LumiPas Valeur : 20

On affecte la **variable** avec le **pas** pour l’augmentation de la luminosité, 20 dans mon exemple.

### Variable : LumiBibli Valeur : #\[Salon\]\[Yeelight RGB\]\[Luminosité Info\]#

On affecte la **variable** avec la valeur de la **luminosité**. (Bibli = c’est parce que la lampe est dans ma bibliothèque).

### Variable : LumiLimit Valeur : 100 – variable(LumiPas,20)

Cette **variable** permet de définir une **limite maximum** pour finir la boucle et ne pas dépasser les 100 % de luminosité. 100 % moins la valeur de la variable LumiPas saisie précédemment.

### SI variable(LumiBibli,1) > variable(LumiLimit,80) ALORS

Dans l’hypothèse ou la **lumière** est déjà au **maximum**, alors on réinitialise la variable.

#### Variable : LumiBibli Valeur : – variable(LumiPas,20)

Pour réinitialiser la variable, on va affecter **le pas** de luminosité en **négatif**, pour qu’elle soit à **0%** lorsque le pas sera ajouté dans la boucle. Comme on ne veut pas éteindre la lumière avec la luminosité à 0%, on remplacera 0% par 1% dans la boucle.

Le bloc n’a **pas de sinon**, car si on n’est pas au maximum de la luminosité, on continue avec la même valeur.

### DE 1 A (100 / variable(LumiPas,20)) \* 2 FAIRE

On rentre dans boucle.

La formule permet de faire **2 boucles de 100 %** en fonction du pas choisi. Par exemple, avec un pas de 20 % : (100 / 20 ) x 2  = 10.

Cela permet de faire **2 tours**, au cas ou on aurait **loupé** la luminosité **désirée** au premier tour. Si vous loupez 2 fois la bonne luminosité, il faudra alors lâcher le bouton et recommencer, ou encore, changer le 2 dans la formule pour faire plusieurs tour.

#### SI variable(LumiBibli,1) > variable(LumiLimit,80) ALORS

Ici, c’est le même test que précédemment, mais dans la boucle on vérifie si la prochaine valeur de **luminosité** sera **supérieure à 100 %**, alors on réinitialise la variable.

##### Variable : LumiBibli Valeur : – variable(LumiPas,20)

Pour réinitialiser la variable, on va affecter **le pas** de luminosité en **négatif**, pour qu’elle soit à **0%** lorsque le pas sera ajouté dans la boucle. Comme on ne veut pas éteindre la lumière avec la luminosité à 0%, on remplacera 0% par 1%, plus tard dans la boucle.

Le bloc n’a **pas de sinon** car si on n’est pas au maximum de la luminosité, alors on continu avec la même valeur.

##### DE 1 A 2 FAIRE

Cette boucle va permettre de faire **clignoter** la lumière lorsqu’on est à **100 %** de luminosité, pour avoir le temps de **lâcher** le **bouton** avant de repartir à 1%.

###### ACTION 1 : #\[Salon\]\[Yeelight RGB\]\[Luminosité\]# **Valeur :** 1

###### ACTION 2 : #\[Salon\]\[Yeelight RGB\]\[Luminosité\]# **Valeur :** 100

###### ACTION 3 : Sleep **Valeur :** 1

Deux fois de suite, on passe la luminosité de **1 % à 100 %**, avec une **pause de 1 secondes** sur le 100%.

#### SI #\[Salon\]\[Bouton clic Lumières\]\[Clic\]# == « long_click_press » ALORS

Grâce à ce bloc, la boucle devient un **While**. Tant que le bouton est sur « **long clic**« , alors on **continue** la boucle.

##### Variable : LumiBibli Valeur : round(variable(LumiBibli,1),-1) + variable(LumiPas,20)

C’est là qu’on **augmente** la **luminosité** du pas qu’on a défini dans la variable « **LumiPas**« . Le **round(XXX,-1)** permet d’arrondir les nombres à la **dizaine** la plus proche.

Le but est que le **1 + 20** = 21, soit considéré comme un 0 + 20 = **20.** Idem si la valeur à été changée manuellement, un 26 + 20 sera donc désormais égal à 50.

Par contre, dans le cas ou vous paramétriez un pas qui ne serait pas une **dizaine**, il sera **arrondi.** Donc un pas de **5** sera égal à **10**.

##### SI variable(LumiBibli,1) <= 0 ALORS

Comme on ne veut pas que la **luminosité** soit inférieure ou égale à **0**, alors on la passe à **1**.

###### ACTION 1 : #\[Appartement\]\[Virtuel Bibliothèque\]\[Luminosité\]# Valeur : 1

On allume la **lumière à 1 %**.

###### Variable : LumiBibli Valeur : 0

On met la variable « **LumiBibli** » à 0 au cas ou elle soit négative. On pourrait la mettre à 1, mais comme le round la transformera en 0 autant le faire directement. Ca évite aussi de se retrouver avec des 21, 41, etc …

###### ACTION 2 : Sleep **Valeur : 2**

Le **sleep** de **2 secondes** permet d’avoir le temps de **lâcher** le **bouton** sur **1 %**, avant que la boucle recommence.

##### SINON

###### ACTION 1 : #\[Appartement\]\[Virtuel Bibliothèque\]\[Luminosité\]# Valeur : variable(LumiBibli,1)

###### ACTION 2 : Sleep **Valeur : 1**

Si la luminosité est **supérieure** à **0 %**, alors on **allume** simplement la lumière avec la valeur de « **LumiBibli** » et on fait une **pause** de **1 seconde** pour avoir le temps de **lâcher** le bouton.

#### SINON

##### ACTION 1 : Stop

Pour finir, si on a **lâché** le **bouton** on **arrête** le **scénario**. Pour info le bouton sera égal à « **long_click_release**« .

## Exemple de LOG 

Si vous regardez la **copie d’écran**, au début de l’article, vous voyez que j’ajoute des **action Log** à chaque bloc. Il suffit ensuite de taper « **Log** » dans le champ « **recherche** » des Log du scénario, pour avoir une **vue d’ensemble**, voila ce que ça donne avec une luminosité à 100 % au départ et un pas de 20% :

```js
Gestion du Long ClicOn rafraîchit les valeurs et on affecte les variables avant la boucle.Déjà à 100% alors Luminosité passe à -20.Le bouton n'est pas lâché alors on fait varier de +20 la luminosité.Luminosité à : 0Luminosité est <= à 0 alors on allume à 1 et on reste 2 secondes.Le bouton n'est pas lâché alors on fait varier de +20 la luminositéLuminosité à : 20Luminosité est diff de 0 alors on utilise la variableLe bouton n'est pas lâché alors on fait varier de +20 la luminositéLuminosité à : 40Luminosité est diff de 0 alors on utilise la variableLe bouton n'est pas lâché alors on fait varier de +20 la luminositéLuminosité à : 60Luminosité est diff de 0 alors on utilise la variableLe bouton n'est pas lâché alors on fait varier de +20 la luminositéLuminosité à : 80Luminosité est diff de 0 alors on utilise la variableLe bouton n'est pas lâché alors on fait varier de +20 la luminositéLuminosité à : 100Luminosité est diff de 0 alors on utilise la variableLumiBibli > 80 alors on recommence à 1Boucle de 2 x 1 = 2 secondes de variation pour avoir le temps de lâcher le bouton à 100Le bouton n'est pas lâché alors on fait varier de +20 la luminositéLuminosité à : 0Luminosité est <= à 0 alors on allume à 1 et on reste 2 secondes.Le bouton n'est pas lâché alors on fait varier de +20 la luminositéLuminosité à : 20Luminosité est diff de 0 alors on utilise la variableLe bouton n'est pas lâché alors on fait varier de +20 la luminositéLuminosité à : 40Luminosité est diff de 0 alors on utilise la variableBouton lâché on arrête à 40
```

## Conclusion

Voilà un scénario qui permet une **bonne utilisation** de la commande **« Long click »** des **boutons switch Xiaomi**. Personnellement, j’utilise le **« Simple click »** pour allumer une prise Xiaomi et le **« Double click »** pour allumer l’ampoule Yeelight. Mais, je pourrais très bien m’en passer, car il y a un **test** sur **l’état** de l’ampoule au **début** du scénario.

Pour les utilisateurs des **nouveaux** boutons Aqara carrés qui n’ont **plus** la commande **« Long click »**, vous pouvez toujours utiliser le scénario en remplaçant la commande **« Long click »** par **« Simple click »** et en utilisant le **« Double click »** pour arrêter la variation. Il faudra aussi modifier le scénario pour **autoriser** la luminosité à **0%** afin de pouvoir **éteindre** totalement la lampe.
