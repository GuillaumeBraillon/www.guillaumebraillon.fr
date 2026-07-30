---
title: "Plan de Migration Domotique : de HAOS (VM) vers Docker (Synology DSM 7.1.1)"
date: 2026-07-16
tags: ["Tutoriels", "Docker", "Auto-hébergement", "NAS Synology", "Home Assistant"]
description: "Guide complet pour migrer une stack domotique (Mosquitto, Zigbee2MQTT et Home Assistant) d'une architecture lourde sous Virtual Machine Manager (VMM) vers une architecture microservices sous Docker, sur un NAS Synology en DSM 7.1.1."
---

## Introduction

Ce guide présente une démarche structurée de migration d'une infrastructure domotique basée sur Home Assistant OS (HAOS) exécutée en machine virtuelle (VM) vers une architecture Docker sur un NAS Synology, ici sous DSM 7.1.1. L'objectif principal est de moderniser l'infrastructure en adoptant une approche microservices, d'améliorer la flexibilité opérationnelle et de réduire la consommation de ressources système.

### Objectifs

- Remplacer une VM HAOS par des conteneurs Docker dédiés à chaque composant domotique.
- Préserver l'intégrité de la configuration, du réseau Zigbee, des historiques et des intégrations.
- Faciliter la maintenance, la montée en version et l'extension de la stack.

### Prérequis

- Accès administrateur au NAS Synology (référence : DS218, ARMv8 RTD1296, DSM 7.1.1).
- Accès SSH activé, droits root.
- Périphériques domotiques connectés : RFXCOM RFXtrx433XL FTDI (USB), Sonoff Zigbee 3.0 Dongle Plus V2 (WCH CH9102 / driver ch341-uart) (USB).
- Installation Docker (via Synology ou paquets tiers).
- Copie accessible du dossier `/config` de HAOS ou d'une sauvegarde récente (voir section Préparation).

### Architecture cible

La stack cible se compose des services suivants :

- **Home Assistant** : Plateforme centrale de supervision et d'automatisation domotique.
- **Mosquitto** : Broker MQTT assurant la communication entre services et objets connectés.
- **Zigbee2MQTT** : Passerelle Zigbee-MQTT, permettant l'intégration d'un réseau Zigbee existant.
- **Matter Server** (optionnel) : Support du protocole Matter pour objets compatibles.
- **Services additionnels** : Add-ons ou intégrations spécifiques (RFXCOM, Linky, Broadlink, etc.), traités ultérieurement.

Chaque composant est isolé dans un conteneur Docker dédié, orchestré via `docker-compose`, avec des volumes persistants pour la configuration et les données.

## Préparation des données et des configurations

La préservation des données de configuration et des historiques est une étape critique de la migration. Lorsque HAOS est encore en fonctionnement, il est recommandé de copier directement le contenu du répertoire `/config` depuis la VM source vers le NAS cible. Cette méthode garantit l'intégrité des fichiers et évite les complications liées à l'extraction de sauvegardes compressées.

**Procédure recommandée** :

1. Accéder à la VM HAOS via Samba, SSH ou File Editor.
2. Copier l'intégralité du dossier `/config` (y compris `configuration.yaml`, `database.db`, les dossiers d'intégrations, SSL, etc.) vers un emplacement temporaire sur le NAS ou sur une machine intermédiaire.
3. Procéder de même pour les dossiers de données spécifiques aux add-ons critiques, notamment Zigbee2MQTT (`/data` de l'add-on) et Mosquitto (si des utilisateurs ou ACL personnalisés sont configurés).

**Procédure alternative (fallback)** :

Si la VM HAOS n'est plus accessible, il est possible d'extraire les données à partir d'une sauvegarde Home Assistant complète (archive `.tar`). Attention, les sauvegardes chiffrées au format SecureTar nécessitent le mot de passe de chiffrement et ne sont pas lisibles sans celui-ci.

> **Note sur les sauvegardes chiffrées (SecureTar)** : Les archives de sauvegarde protégées par mot de passe ne peuvent être extraites qu'avec l'outil officiel Home Assistant ou un outil compatible. En l'absence du mot de passe, la restauration des données n'est pas possible.

L'extraction manuelle des dossiers `/data` de chaque add-on (notamment Zigbee2MQTT, Mosquitto, Matter Server) reste possible via des outils d'archivage, à condition de disposer des droits et du mot de passe si nécessaire.

La migration des add-ons complémentaires (Broadlink, Linky, etc.) est abordée dans une section dédiée après la mise en place du socle principal.

## Architecture de la stack domotique

La solution cible repose sur une architecture microservices, chaque brique applicative étant isolée dans un conteneur Docker distinct. Cette approche facilite la maintenance, la montée en version et le dépannage.

### Composants principaux

- **Home Assistant** : Plateforme d'automatisation et d'orchestration domotique. Accès à l'ensemble des intégrations, gestion des historiques et des tableaux de bord.
- **Mosquitto** : Broker MQTT, point central de communication entre les objets Zigbee, Matter, et Home Assistant.
- **Zigbee2MQTT** : Passerelle entre le réseau Zigbee local et le broker MQTT, permettant la gestion avancée des appareils Zigbee via un coordinateur compatible EmberZNet. Dans cette migration, le Sonoff Zigbee 3.0 Dongle Plus V2 utilise le protocole Ember côté Zigbee2MQTT et le pilote USB CH341 côté système Linux.
- **Matter Server** (optionnel) : Service d'intégration du protocole Matter pour la gestion d'objets compatibles.
- **Services additionnels** : Intégrations spécifiques (RFXCOM, Linky, Broadlink, etc.), déployées en conteneurs séparés en fonction des besoins.

### Réseau et volumes

Chaque service dispose d'un volume Docker dédié pour la configuration et les données. La communication inter-containers s'appuie sur le réseau Docker par défaut (bridge), avec des ports exposés pour l'accès externe (MQTT, interfaces web, Home Assistant).

L'accès aux périphériques USB (dongles Zigbee, RFXCOM) est assuré via le mapping explicite des devices dans la configuration Docker Compose.

### Plateforme de référence

Ce guide s'appuie sur un environnement de référence : Synology DS218 (ARMv8 RTD1296) sous DSM 7.1.1, équipé d'un RFXCOM RFXtrx433XL FTDI et d'un Sonoff Zigbee 3.0 Dongle Plus V2 (WCH CH9102 / driver ch341-uart), chacun connecté sur un port USB distinct. L'adaptation à d'autres modèles de NAS Synology ou à d'autres architectures ARM/x86 peut nécessiter l'ajustement des chemins ou des pilotes USB.

## Justification des choix d'architecture et de configuration Docker

### Utilisation de `network_mode: host`

L'activation du mode réseau `host` pour le conteneur Home Assistant est essentielle pour garantir la compatibilité avec les protocoles de découverte réseau (mDNS, SSDP, Google Cast, HomeKit, etc.). Le mode bridge de Docker ne relaie pas correctement les paquets de broadcast nécessaires à ces intégrations. Le mode `host` permet à Home Assistant de s'intégrer nativement au réseau local et d'assurer la découverte automatique des appareils.

### Mode privilégié (`privileged: true`)

L'utilisation du mode `privileged` pour Home Assistant et Zigbee2MQTT est requise dans l'environnement DSM 7 en raison des restrictions sur l'accès aux périphériques USB et à certains sous-systèmes système. Ce mode octroie au conteneur les droits nécessaires pour accéder aux dongles USB, aux événements udev, et pour garantir la stabilité des intégrations matérielles.

### Adapter Zigbee : `adapter: ember`

Le paramètre `adapter: ember` doit être spécifié dans la configuration Zigbee2MQTT lors de l'utilisation d'un coordinateur utilisant la pile Silicon Labs EmberZNet.

**Attention :** Le paramètre `adapter: ember` concerne uniquement la couche protocole Zigbee dans Zigbee2MQTT. Le module kernel Linux `ch341-uart` concerne uniquement la couche USB et permet au système d'exposer le dongle sous forme de port série `/dev/ttyUSBx`. Ces deux couches sont indépendantes mais nécessaires au fonctionnement complet du coordinateur.

### Mapping USB et gestion des devices

Les périphériques USB sont exposés dans les conteneurs via le paramètre `devices` de Docker Compose. Docker reçoit ainsi un accès explicite au périphérique série présent côté DSM :

```yaml
devices:
  - /dev/ttyUSB1:/dev/ttyUSB1
```

Les chemins `/dev/ttyUSBx` ne sont pas garantis dans le temps. L'attribution des identifiants (`ttyUSB0`, `ttyUSB1`, etc.) peut changer après un redémarrage, un changement de port USB ou une modification de l'ordre de détection matériel.

Sur ce DS218, le RFXCOM RFXtrx433XL et le Sonoff Zigbee Dongle Plus V2 peuvent apparaître sur plusieurs ports série. L'identification physique de chaque périphérique doit donc être réalisée avant de renseigner la configuration Docker Compose.

> **Note :** L'utilisation de chemins persistants de type `/dev/serial/by-id/` serait préférable pour éviter la dépendance aux identifiants `/dev/ttyUSBx`. Dans cet environnement DSM 7.1.1, ces chemins ne sont toutefois pas disponibles par défaut.

### Réseau Docker et résolution de noms

Les services communiquent par défaut via le réseau interne Docker. L'utilisation des noms de conteneurs (par exemple `mosquitto` comme hostname MQTT dans Zigbee2MQTT) garantit la portabilité et la résilience de la configuration, indépendamment de l'adresse IP du NAS.

## Préparation de l'arborescence sur le NAS

Créer l'arborescence suivante dans le dossier partagé `/volume1/docker/` :

```
/volume1/docker/
└── homeassistant-stack/
    ├── docker-compose.yml
    ├── homeassistant/
    │   └── ssl/
    ├── mosquitto/
    │   ├── config/
    │   │   └── mosquitto.conf
    │   └── data/
    └── zigbee2mqtt/
        └── data/
```

Commande unique pour la création des dossiers :

```bash
mkdir -p /volume1/docker/homeassistant-stack/{homeassistant/ssl,mosquitto/config,mosquitto/data,zigbee2mqtt/data}
```

Copier ensuite les données de configuration extraites à l'étape précédente dans les dossiers correspondants.

## Gestion des périphériques USB série sous DSM 7.1.1

La gestion des périphériques USB série sous Synology DSM 7 nécessite une attention particulière. Un périphérique peut être correctement détecté par le système USB tout en n'étant pas automatiquement associé au pilote série adapté.

La plateforme de référence utilisée pour cette migration est un Synology DS218 (architecture ARMv8 RTD1296) sous DSM 7.1.1 avec deux périphériques USB :

- RFXCOM RFXtrx433XL : chipset FTDI, utilisant le module `ftdi_sio`.
- Sonoff Zigbee 3.0 Dongle Plus V2 : chipset WCH CH9102, utilisant le module `ch341-uart`.

Dans cet environnement, les modules kernel étaient déjà disponibles. Le problème rencontré concernait l'association automatique du VID/PID du dongle Sonoff avec le pilote CH341.

### Vérification des modules disponibles

Les modules USB série chargés peuvent être vérifiés avec :

```bash
lsmod | grep -E "usbserial|ftdi|ch341|cp210"
```

Les modules nécessaires peuvent être chargés manuellement si besoin :

```bash
sudo -i

insmod /lib/modules/usbserial.ko
insmod /lib/modules/ftdi_sio.ko
insmod /volume1/docker/drivers/ch341.ko
```

### Association du dongle Sonoff au driver CH341

Sur DSM 7.1.1, le module `ch341-uart` peut être présent mais ne pas reconnaître automatiquement certains identifiants USB.

L'identification du matériel s'effectue avec :

```bash
lsusb
```

Dans cet environnement, le dongle Sonoff est identifié par :

```text
1a86:55d4 ITEAD SONOFF Zigbee 3.0 USB Dongle Plus V2
```

L'association manuelle au pilote s'effectue avec :

```bash
echo "1a86 55d4" > /sys/bus/usb-serial/drivers/ch341-uart/new_id
```

Après association, les interfaces série apparaissent :

```bash
ls -la /dev/ttyUSB*
```

Exemple de résultat :

```text
/dev/ttyUSB0
/dev/ttyUSB1
/dev/ttyUSB2
```

Le mapping exact dépend de l'ordre de détection USB. Il est donc nécessaire d'identifier les périphériques avant de configurer Docker Compose.

### Automatisation au démarrage

L'association du VID/PID du Sonoff Zigbee Dongle Plus V2 au driver `ch341-uart` doit être rejouée après chaque redémarrage du NAS. Sans cette association, le dongle peut être visible au niveau USB mais ne pas être exposé sous forme de port série utilisable par Docker.

Cette opération peut être automatisée via le Planificateur de tâches DSM. La tâche doit exécuter un script en tant que `root`, car l'écriture dans `/sys/bus/usb-serial/drivers/ch341-uart/new_id` nécessite des privilèges système.

Le script doit également attendre quelques secondes afin de laisser DSM charger les modules USB série avant de tenter l'association du périphérique :

```bash
#!/bin/sh
sleep 10
if [ -e /sys/bus/usb-serial/drivers/ch341-uart/new_id ]; then
  echo "1a86 55d4" > /sys/bus/usb-serial/drivers/ch341-uart/new_id
fi
ls -la /dev/ttyUSB*
```

La validation finale de cette automatisation doit être réalisée après un redémarrage réel du NAS, en contrôlant que les ports `/dev/ttyUSBx` sont bien recréés et que le coordinateur Zigbee est de nouveau utilisable.

Ce script pourra ensuite être amélioré avec une identification USB persistante afin de réduire la dépendance à l'ordre de détection des ports série.

# Validation avant bascule en production

Avant l'arrêt définitif de HAOS dans Virtual Machine Manager, il est recommandé de réaliser une migration progressive :

1. Redémarrer complètement le Synology afin de valider le comportement des périphériques USB après démarrage.
2. Vérifier que les périphériques matériels nécessaires, notamment le RFXCOM et le coordinateur Zigbee, sont correctement exposés par DSM.
3. Démarrer uniquement Mosquitto puis Zigbee2MQTT.
4. Vérifier la restauration du réseau Zigbee et la communication MQTT.
5. Déployer ensuite Home Assistant et contrôler les intégrations existantes.

Cette approche permet d'isoler les problèmes potentiels liés :

- aux périphériques USB ;
- aux pilotes DSM ;
- à Docker ;
- à la restauration des configurations Home Assistant.

## Déploiement de la stack Docker (`docker-compose.yml`)

Créer le fichier `docker-compose.yml` à la racine de `/volume1/docker/homeassistant-stack/` avec la configuration suivante :

```yaml
version: "3.8"

services:
  # 1. Le broker MQTT
  mqtt:
    image: eclipse-mosquitto:latest
    container_name: mosquitto
    restart: always
    volumes:
      - ./mosquitto/config:/mosquitto/config
      - ./mosquitto/data:/mosquitto/data
    ports:
      - "1883:1883"

  # 2. Zigbee2MQTT
  zigbee2mqtt:
    image: koenkk/zigbee2mqtt:latest
    container_name: zigbee2mqtt
    restart: always
    privileged: true
    depends_on:
      - mqtt
    volumes:
      - ./zigbee2mqtt/data:/app/data
      - /run/udev:/run/udev:ro
    environment:
      - TZ=Europe/Paris
    ports:
      - "8080:8080"
    devices:
      # Adapter le chemin du device après identification physique du dongle USB
      - /dev/ttyUSBX:/dev/ttyUSBX

  # 3. Home Assistant
  homeassistant:
    image: ghcr.io/home-assistant/home-assistant:stable
    container_name: homeassistant
    restart: always
    privileged: true
    network_mode: host
    volumes:
      - ./homeassistant:/config
    environment:
      - TZ=Europe/Paris
    devices:
      # Adapter le chemin du device après identification physique du périphérique USB
      - /dev/ttyUSBY:/dev/ttyUSBY
```

**Remarques importantes** :

- La correspondance entre les dongles USB et les identifiants `/dev/ttyUSBx` doit être vérifiée systématiquement après chaque redémarrage ou modification matérielle.  
  **Ne pas supposer que `/dev/ttyUSB0` est toujours le dongle Zigbee et `/dev/ttyUSB1` le RFXCOM : identifier explicitement chaque périphérique avant de remplir les mappings Docker Compose.**
- Le mapping des ports et des volumes doit être adapté aux besoins spécifiques et à la politique de sécurité de l'environnement.
- Les paramètres réseau et d'accès privilégié sont justifiés dans la section précédente.

## Déploiement et validation progressive de la stack

Le déploiement s'effectue par étapes afin de faciliter l'identification des anomalies et d'assurer la stabilité de chaque composant.

### 1. Démarrage du broker MQTT (Mosquitto)

Se positionner dans le dossier de la stack :

```bash
cd /volume1/docker/homeassistant-stack/
sudo docker-compose up -d mqtt
```

Valider l'accès au broker via un outil MQTT (ex : [MQTT Explorer](https://mqtt-explorer.com/#download)) en se connectant à l'adresse IP du NAS, port 1883.

### 2. Démarrage de Zigbee2MQTT

Vérifier la configuration du fichier `configuration.yaml` de Zigbee2MQTT :

```yaml
mqtt:
  server: mqtt://mosquitto:1883
serial:
  adapter: ember
  port: /dev/ttyUSB1 # Exemple uniquement : utiliser le port réellement attribué au coordinateur Zigbee après vérification
frontend:
  port: 8080
```

Démarrer le service :

```bash
sudo docker-compose up -d zigbee2mqtt
```

Accéder à l'interface web Zigbee2MQTT sur `http://<IP_NAS>:8080` et vérifier la présence du maillage Zigbee restauré.

### 3. Démarrage de Home Assistant

```bash
sudo docker-compose up -d homeassistant
```

Accéder à l'interface Home Assistant sur `http://<IP_NAS>:8123`. Contrôler la restauration des tableaux de bord, historiques et intégrations. Vérifier la configuration MQTT (nom d'hôte `mosquitto`, port 1883) et la détection du port RFXCOM.

## Migration des add-ons complémentaires

Une fois la stack principale stabilisée, la migration des add-ons (Broadlink, Linky, Matter Server, etc.) peut être abordée. Pour chaque add-on, il convient de :

- Identifier le dossier `/data` extrait précédemment.
- Déployer un conteneur Docker dédié (image officielle ou communautaire).
- Monter le volume de données correspondant.
- Adapter la configuration réseau et les mappings USB si nécessaire.

La migration de chaque add-on doit être documentée et testée indépendamment avant intégration dans la stack globale.

## Pièges fréquents et points de vigilance

- **Sauvegardes chiffrées SecureTar** : Les backups HAOS protégés par mot de passe sont inexploitables sans le mot de passe d'origine. Toujours vérifier la possibilité d'accéder au contenu avant tout arrêt définitif de la VM source.
- **Drivers USB sous DSM 7** : Un périphérique USB peut être détecté sans être utilisable par Docker. Il faut vérifier à la fois la présence du module kernel, l'association du périphérique au bon pilote série et la présence du port `/dev/ttyUSBx` avant de configurer les conteneurs.
- **Changement d'identifiants ttyUSB** : L'ordre d'apparition des périphériques peut varier après chaque redémarrage. Toujours contrôler la correspondance entre dongle physique et `/dev/ttyUSBx` avant de démarrer les conteneurs.
- **Adapter Ember/EZSP** : Un mauvais paramétrage (`adapter: ember`) dans Zigbee2MQTT empêche la restauration du réseau Zigbee. Se référer à la documentation matérielle du dongle.
- **Persistance des volumes Docker** : Les volumes Docker doivent être correctement montés pour garantir la conservation des historiques, des configurations et des appairages. Toute erreur de chemin ou de permission peut entraîner une perte de données.

## Maintenance et exploitation de la stack

Les opérations courantes sont synthétisées dans le tableau ci-dessous :

| Action                                                    | Commande                                                |
| --------------------------------------------------------- | ------------------------------------------------------- |
| Arrêt complet de l'infrastructure                         | `sudo docker-compose down`                              |
| Démarrage global de la stack                              | `sudo docker-compose up -d`                             |
| Lecture des journaux d'un service (exemple : Zigbee2MQTT) | `sudo docker-compose logs -f --tail=100 zigbee2mqtt`    |
| Mise à jour des images et redéploiement                   | `sudo docker-compose pull && sudo docker-compose up -d` |

## Conclusion

La migration d'une infrastructure domotique HAOS en VM vers une architecture Docker sur Synology DSM 7.1.1 offre une solution moderne, modulaire et maintenable, tout en assurant la continuité du service et la préservation des données critiques. La démarche structurée, l'isolation des services et la maîtrise des spécificités Synology constituent les fondements d'une stack domotique robuste et évolutive.
