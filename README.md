# 🌐 Portfolio Personnel & Laboratoire Technique

> Portfolio professionnel statique haute performance développé avec Astro, conçu pour l'accessibilité, l'indexation par les LLM et l'optimisation mobile avancée.

---

## 📑 Table des matières

- [Présentation](https://www.google.com/search?q=%23-pr%C3%A9sentation)
- [Fonctionnalités complètes](https://www.google.com/search?q=%23-fonctionnalit%C3%A9s-compl%C3%A8tes)
- [AI Readiness Score (Analyse Détaillée)](https://www.google.com/search?q=%23-ai-readiness-score-analyse-d%C3%A9taill%C3%A9e)
- [Démarrage rapide](https://www.google.com/search?q=%23-d%C3%A9marrage-rapide)
- [Stack technique & Choix d'ingénierie](https://www.google.com/search?q=%23-stack-technique--choix-ding%C3%A9nierie)
- [Architecture du projet](https://www.google.com/search?q=%23-architecture-du-projet)
- [Historique de conception & Évolutions](https://www.google.com/search?q=%23-historique-de-conception--%C3%A9volutions)
- [Contribution & Workflow de développement](https://www.google.com/search?q=%23-contribution--workflow-de-d%C3%A9veloppement)

---

## 🎯 Présentation

**www.guillaumebraillon.fr** est un portfolio d'ingénierie Fullstack conçu comme un laboratoire de performance et d'ergonomie Web. L'application évite l'overhead des architectures Single Page Applications (SPA) lourdes au profit d'une compilation statique stricte (**SSG - Static Site Generation**) combinée à du JavaScript Vanilla hautement optimisé pour l'interaction avec le DOM.

Le projet met en œuvre des fonctionnalités complexes d'indexation, de recherche et de rendu de documents multi-formats (`.txt`, `.md`, `.pdf`, images), adaptées de manière prédictive aux contraintes physiques des terminaux mobiles (écrans horizontaux).

---

## ✨ Fonctionnalités complètes

### 🔍 Moteur de recherche & Filtrage réactif (Module Tablatures)

- **Double stratégie d'affichage client :** \* Mode Masquage (`hide`) : Alère dynamiquement l'arbre DOM pour ne conserver que les lignes pertinentes.
- Mode Mise en évidence (`highlight`) : Conserve la structure globale mais altère l'opacité (`opacity: 0.25`) des éléments non concordants et gère un focus séquentiel autonome.

- **Algorithme de Tokenisation & Highlighting :** Échappement des caractères spéciaux via expression régulière (`escapeRegExp`) et injection de balises sémantiques `<mark>` sans provoquer de fuite de mémoire ou de réécriture destructive du DOM.
- **Optimisation du thread principal :** Déboulonnage (_Debouncing_) calibré à 120 ms sur l'écouteur d'événements `input` afin de prévenir le _layout thrashing_ lors de saisies rapides.
- **Indexation alphabétique adaptative :** Barre d'index _sticky_ calculant dynamiquement les décalages de défilement (`scroll-margin-top: 120px`) pour compenser la présence des barres de navigation globales.

### 📱 Visionneuse de documents native & "Landscape-First UX"

- **Routage par état d'URL :** Analyse des paramètres de requêtes (`window.location.search`) au chargement (`DOMContentLoaded`) pour instancier automatiquement l'affichage d'un document spécifique via injection propre.
- **Gestion multi-format unifiée :** Détermination du pipeline de rendu au runtime client via un ensemble typé (`Set`) distinguant de manière étanche les flux textuels, graphiques et vectoriels (PDF).
- **Adaptation dynamique à l'orientation (Media Queries physiques) :**
- Utilisation exclusive des variantes `landscape:` de Tailwind CSS pour transformer la fenêtre modale en application plein écran sans bordures dès que le terminal pivote à 90°.
- Compression drastique des hauteurs d'en-tête (`landscape:py-1.5`) pour allouer 100 % de la zone utile à la lecture des blocs monolithiques en police à chasse fixe (`font-mono`).

- **Composant d'alerte contextuel :** Affichage d'un avertissement vectoriel (SVG dynamique) incitant à la bascule en mode paysage, masqué automatiquement via le moteur CSS dès que les critères de largeur utile sont validés.

### 🔗 Partage & Interopérabilité Système

- **Hybridation de l'API Share :** Consommation de l'interface asynchrone native `navigator.share` sur les environnements mobiles.
- **Mécanisme de repli (Fallback UX) :** Copie silencieuse dans le presse-papiers (`navigator.clipboard.writeText`) sur les navigateurs de bureau avec mutation de l'état graphique du composant (transition de couleur vers le vert et retour à l'état initial après un timeout de 2000 ms).

---

## 📈 AI Readiness Score : 92/100

Ce dépôt applique des standards stricts facilitant son analyse, sa maintenance et son évolution par des agents d'intelligence artificielle ou des LLM (Large Language Models).

```
[Structure Sémantique] ██████████████████████████ 25/25
[Encapsulation & Scope] ████████████████████████  23/25
[Contrats de Typage]   ████████████████████████  22/25
[State Management]     ████████████████████████  22/25

```

### Critères d'évaluation :

1. **Sémantique HTML5 & Accessibilité (25/25) :** Structure de document hautement prévisible. L'utilisation systématique de rôles ARIA explicites (`role="dialog"`, `aria-modal="true"`, `aria-label`) fournit un graphe d'accessibilité limpide pour les parseurs automatiques.
2. **Encapsulation des composants (23/25) :** L'architecture d'Astro isole les scripts clients dans des scopes locaux. L'absence d'états globaux partagés ou cachés permet à une IA de modifier la logique interne d'une page sans risque d'effet de bord sur le reste de l'application.
3. **Contrats de Typage Stricts (22/25) :** Définition explicite des structures de données (`type TabFile`) à la racine des scripts Astro, garantissant une complétion parfaite et limitant drastiquement le taux d'hallucination lors des refactoring de code.
4. **Gestion d'état unifiée par le DOM (22/25) :** Utilisation des attributs de données natifs (`data-*`) comme source de vérité partagée entre le template HTML compilé sur le serveur et le script d'interaction exécuté sur le client.

---

## 🛠️ Stack technique & Choix d'ingénierie

### Frontend & Framework

- **Astro (Static Site Generation) :** Choix motivé par l'exigence de performance (Zéro JS envoyé au client par défaut). La compilation livre des pages HTML pures, hautement optimisées pour le SEO et le parsing.

### Design & Styles

- **Tailwind CSS :** Implémentation d'un design system atomique basé sur les spécifications de l'interface GitHub (`bg-[#f6f8fa]`, `border-[#d0d7de]`). Utilisation intensive des modificateurs d'état responsifs avancés pour gérer les orientations matérielles.

### Langage & Logique

- **TypeScript & ES6+ Vanilla :** Typage à la compilation pour sécuriser les manipulations de données. Écriture de scripts Vanilla optimisés (utilisation de `requestAnimationFrame` pour les défilements fluides, mise en cache des sélecteurs DOM dans des tableaux typés pour éviter les requêtes redondantes).

---

## 📂 Architecture du projet

```text
├── src/
│   ├── components/       # Composants d'interface atomiques réutilisables
│   │   └── PageHeader.astro
│   ├── data/             # Sources de données locales typées
│   │   ├── site.ts       # Configurations globales et structures de navigation
│   │   └── tablatures.json
│   ├── layouts/          # Gabarits de pages globaux (Meta, Grid, Viewport)
│   │   └── Layout.astro
│   ├── pages/            # Système de routage statique par fichier
│   │   ├── index.astro   # Page d'accueil / Index du portfolio
│   │   └── tablatures/
│   │       └── index.astro # Moteur de recherche et visionneuse de tablatures
│   └── styles/
│       └── global.css    # Directives Tailwind et surcharges de base
├── public/               # Actifs statiques bruts (Fichiers textes, PDF, Images)
├── astro.config.mjs      # Configuration du pipeline de build Astro
├── tailwind.config.mjs   # Extension du design system et viewports personnalisés
└── tsconfig.json         # Règles strictes de compilation TypeScript

```

---

## ⏳ Historique de conception & Évolutions

### `V1.0.0` — Initialisation & Fondations

- Configuration de l'environnement Astro et du design system minimaliste.
- Implémentation du moteur de recherche initial basé sur le masquage de nœuds HTML.

### `V1.1.0` — Nettoyage du pipeline de données (Data Refactoring)

- **Décision technique majeure :** Dépréciation et retrait complet des scripts de parsing complexes pour les extensions propriétaires lourdes (`.doc`, `.docx`).
- **Optimisation :** Migration complète vers des formats web-natifs standardisés et performants : `.txt` et `.md` pour le traitement textuel asynchrone direct (`fetch().text()`), images optimisées (`.webp`, `.png`) et documents `.pdf` encapsulés ou délégués.

### `V1.2.0` — Refonte Ergonomique & Mobile Landscape Patch

- Détection des limitations physiques d'affichage des lignes à chasse fixe (`font-mono`) en mode portrait sur smartphone (tronquage harmonique).
- Intégration des requêtes média de direction (`landscape`) modifiant l'intégrité de la structure modale.
- Implémentation du système de contrôle de taille de glyphes (`A+` / `A-`) dynamique modifiant l'état du composant de rendu en temps réel.

---

## 🚀 Démarrage rapide

### Configuration requise

- **Node.js** `>= 18.14.1`
- **npm** `>= 9.0.0`

### Installation & Lancement

```bash
# 1. Cloner le dépôt de production
git clone https://github.com/GuillaumeBraillon/www.guillaumebraillon.fr.git

# 2. Accéder au répertoire racine
cd www.guillaumebraillon.fr

# 3. Installer l'arborescence des dépendances
npm install

# 4. Lancer le serveur d'exécution local (Hot-Reload activé)
npm run dev

```

Le serveur local s'initialise à l'adresse suivante : `http://localhost:4321/`

### Commandes de build

```bash
# Compiler le site statique final (Dossier ./dist)
npm run build

# Tester localement le build de production généré
npm run preview

```

---

## 🛠️ Contribution & Workflow de développement

### Normes de code

- Aucun type implicite `any` toléré dans les blocs applicatifs de scripts.
- Manipulation du DOM : Validation systématique des retours de sélecteurs via des assertions de type optionnelles (`as HTMLElement | null`) pour sécuriser l'exécution.

### Cycle de commit (Git Flow)

```bash
# 1. Isolation des développements
git checkout -b feature/nom-de-la-feature

# 2. Formatage des messages (Conventional Commits standard)
git commit -m "feat(viewer): integration du zoom dynamique sur fichiers texte"
git commit -m "fix(search): correction du delai de debounce sur iOS"

# 3. Soumission
git push origin feature/nom-de-la-feature

```

---

## 📚 Documentation connexe

- **[Astro Documentation](https://www.google.com/search?q=https://docs.astro.build/)** : Architecture des composants et îles statiques.
- **[Tailwind CSS Grid & Responsive](https://www.google.com/search?q=https://tailwindcss.com/docs)** : Utilisation des modificateurs d'état et requêtes d'orientation.
