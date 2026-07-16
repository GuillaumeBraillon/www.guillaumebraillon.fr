---
title: "Plan de Migration Domotique : HAOS (VM) vers Docker (DSM 7.1.1)"
date: 2026-07-16
tags: ["Tutoriels", "Docker", "Auto-hébergement", "NAS Synology", "Home Assistant"]
description: "Ce guide détaille la migration étape par étape de ta stack domotique (Mosquitto + Zigbee2MQTT + Home Assistant) pour passer d'une architecture lourde sous Virtual Machine Manager (VMM) à une architecture microservices ultra-légère sous Docker en SSH."
---

## Étape 0 : Extraction des sauvegardes (Depuis ton PC)

Avant de couper ou de désinstaller quoi que ce soit, tu dois récupérer les données de tes configurations actuelles depuis ton backup complet de Home Assistant (le fichier `.tar`).

### 1. Pour Home Assistant

1. Décompresse l'archive globale `.tar` de ton backup HA sur ton PC.
2. Repère l'archive nommée `homeassistant.tar.gz` et décompresse-la.
3. À l'intérieur, localise le répertoire `/data`. C'est lui qui contient ton fichier `configuration.yaml`, tes intégrations et ta base de données. Garde-le de côté.

### 2. Pour Zigbee2MQTT (Évite le réappairage)

1. Dans ton backup global décompressé, localise l'archive de l'add-on (généralement nommée `addon_core_zigbee2mqtt.tar.gz` ou similaire).
2. Décompresse-la et isole son dossier `/data` (il contient `configuration.yaml`, `database.db`, `state.json` et tes clés de sécurité). Garde-le de côté.

## Étape 1 : Préparation de l'arborescence sur le NAS

Connecte-toi en SSH sur ton Synology ou utilise l'application **File Station** pour créer la structure suivante dans ton dossier partagé `/volume1/docker/` :

```bash
/volume1/docker/
└── homeassistant-stack/
    ├── docker-compose.yml
    ├── homeassistant/
    ├── mosquitto/
    │   ├── config/
    │   │   └── mosquitto.conf
    │   └── data/
    └── zigbee2mqtt/
        └── data/

```

### Injection des configurations :

1. Copie le contenu du dossier `/data` de ton backup **Zigbee2MQTT** directement dans `/volume1/docker/homeassistant-stack/zigbee2mqtt/data/`.
2. Copie le contenu du dossier `/data` de ton backup **Home Assistant** directement dans `/volume1/docker/homeassistant-stack/homeassistant/`.
3. Crée le fichier de configuration de base pour Mosquitto dans `/volume1/docker/homeassistant-stack/mosquitto/config/mosquitto.conf` avec ce contenu minimal :

```ini
listener 1883
allow_anonymous true
persistence true
persistence_location /mosquitto/data/

```

## Étape 2 : Identification de la clé USB Zigbee

Pour que le conteneur Zigbee2MQTT puisse communiquer avec ta clé USB (Sonoff, Conbee, etc.), il faut identifier son adresse physique sur le NAS.

1. Connecte-toi en SSH à ton NAS.
2. Passe en `root` :

```bash
sudo -i

```

3. Liste les périphériques USB série connectés :

```bash
ls -la /dev/ttyUSB* /dev/ttyACM*

```

4. Note le chemin qui apparaît (généralement `/dev/ttyUSB0` ou `/dev/ttyACM0`). C'est ce chemin qu'on mappera dans le fichier compose.

## Étape 3 : Création du fichier `docker-compose.yml`

Crée le fichier `docker-compose.yml` à la racine de `/volume1/docker/homeassistant-stack/` avec la configuration suivante :

```yaml
version: "3.8"

services:
  # 1. Le Broker MQTT
  mosquitto:
    image: eclipse-mosquitto:latest
    container_name: mosquitto
    restart: unless-stopped
    ports:
      - "1883:1883"
    volumes:
      - ./mosquitto/config/mosquitto.conf:/mosquitto/config/mosquitto.conf
      - ./mosquitto/data:/mosquitto/data

  # 2. Zigbee2MQTT
  zigbee2mqtt:
    image: koenkk/zigbee2mqtt:latest
    container_name: zigbee2mqtt
    restart: unless-stopped
    depends_on:
      - mosquitto
    ports:
      - "8080:8080" # Interface Web de Z2M
    volumes:
      - ./zigbee2mqtt/data:/app/data
      - /run/udev:/run/udev:ro
    devices:
      # Remplacer /dev/ttyUSB0 par le chemin de ta clé identifié à l'étape 2
      - /dev/ttyUSB0:/dev/ttyUSB0
    environment:
      - TZ=Europe/Paris

  # 3. Home Assistant
  homeassistant:
    image: ghcr.io/home-assistant/home-assistant:stable
    container_name: homeassistant
    restart: unless-stopped
    network_mode: host # Indispensable pour la découverte réseau (Cast, Homekit, etc.)
    depends_on:
      - mosquitto
    volumes:
      - ./homeassistant:/config
      - /etc/localtime:/etc/localtime:ro
    environment:
      - TZ=Europe/Paris
```

## Étape 4 : Déploiement progressif

Afin de valider chaque brique une par une, nous n'allons pas tout lancer d'un coup.

### Phase A : Lancement et validation de Mosquitto

1. En SSH, positionne-toi dans le dossier :

```bash
cd /volume1/docker/homeassistant-stack/

```

2. Lance uniquement le broker MQTT :

```bash
sudo docker-compose up -d mosquitto

```

3. _Validation :_ Télécharge **MQTT Explorer** sur ton PC, connecte-toi à l'adresse IP de ton NAS sur le port `1883`. Si la connexion réussit, le broker est opérationnel.

### Phase B : Ajustement de la config de Zigbee2MQTT

Avant de lancer Zigbee2MQTT, ouvre son fichier de configuration que tu as extrait du backup (`/volume1/docker/homeassistant-stack/zigbee2mqtt/data/configuration.yaml`) et vérifie/modifie ces lignes :

```yaml
mqtt:
  server: mqtt://<IP_DE_TON_NAS>:1883 # Indique l'IP de ton NAS, pas localhost
serial:
  port: /dev/ttyUSB0 # Le port de ta clé USB identifié à l'étape 2
frontend:
  port: 8080 # Active l'interface graphique de Z2M
```

### Phase C : Lancement et validation de Zigbee2MQTT

1. Lance le conteneur Zigbee2MQTT :

```bash
sudo docker-compose up -d zigbee2mqtt

```

2. _Validation :_ Ouvre ton navigateur et va sur `http://<IP_DE_TON_NAS>:8080`. Tu devrais accéder à l'interface de Zigbee2MQTT avec l'ensemble de tes modules Zigbee déjà présents, connectés et opérationnels. Aucun réappairage n'est requis.

### Phase D : Lancement de Home Assistant

1. Lance le conteneur Home Assistant :

```bash
sudo docker-compose up -d homeassistant

```

2. _Validation :_ Connecte-toi sur `http://<IP_DE_TON_NAS>:8123`. Home Assistant va démarrer avec l'intégralité de tes configurations d'origine.
3. Va dans tes Intégrations, configure l'intégration **MQTT** en la faisant pointer vers l'IP de ton NAS (port `1883`). Tes appareils Zigbee vont remonter instantanément dans HA.

## Commandes utiles pour la maintenance (En SSH)

- **Tout arrêter :** `sudo docker-compose down`
- **Tout démarrer :** `sudo docker-compose up -d`
- **Voir les logs en temps réel :** `sudo docker-compose logs -f --tail=100` (ajoute le nom d'un service à la fin pour cibler, ex: `zigbee2mqtt`)
- **Mettre à jour la stack :**

```bash
sudo docker-compose pull
sudo docker-compose up -d

```
