import type { CollectionEntry } from "astro:content";

type ThumbnailCollection = "articles" | "voyages" | "projects";

const allImages: Record<string, ImageMetadata> = {
  ...import.meta.glob("/src/content/articles/**/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}", {
    eager: true,
    import: "default",
  }),
  ...import.meta.glob("/src/content/voyages/**/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}", {
    eager: true,
    import: "default",
  }),
  ...import.meta.glob("/src/content/projects/**/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}", {
    eager: true,
    import: "default",
  }),
};

const defaultThumbnails: Record<ThumbnailCollection, string> = {
  articles: "/src/content/articles/default-thumbnail.png",
  voyages: "/src/content/voyages/default-thumbnail.png",
  projects: "/src/content/projects/default-thumbnail.png",
};

function resolveImage(collection: ThumbnailCollection, path: string): ImageMetadata | undefined {
  return allImages[path] ?? allImages[defaultThumbnails[collection]];
}

export function getThumbnail(
  collection: "articles",
  entry: CollectionEntry<"articles">
): ImageMetadata | undefined;
export function getThumbnail(
  collection: "voyages",
  entry: CollectionEntry<"voyages">
): ImageMetadata | undefined;
export function getThumbnail(
  collection: "projects",
  entry: CollectionEntry<"projects">
): ImageMetadata | undefined;
export function getThumbnail(
  collection: ThumbnailCollection,
  entry: CollectionEntry<ThumbnailCollection>
): ImageMetadata | undefined {
  if (collection === "projects") {
    return resolveImage(collection, `/src/content/projects/${entry.id}.png`);
  }

  const thumbnail = entry.data.thumbnail;
  return resolveImage(collection, `/src/content/${collection}/${entry.id}/${thumbnail}`);
}
