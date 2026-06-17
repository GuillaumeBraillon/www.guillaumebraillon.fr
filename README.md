# guillaumebraillon.fr

Site personnel réalisé avec Astro.

## Démarrage

```sh
npm install
npm run dev
```

## Commandes utiles

```sh
npm run build
npm run preview
npm run check
npm run fix
```

## Structure

- `src/pages/` contient les routes du site
- `src/content/` contient les collections de contenu
- `src/components/` contient les composants réutilisables
- `src/lib/` contient les utilitaires partagés
- `src/data/` contient les données de navigation, CV et itinéraires

## Notes

- Les images de contenu sont résolues via `src/lib/images.ts`
- Les pages markdown utilisent `MarkdownImages.astro` pour le zoom des images
