import type { CollectionEntry } from "astro:content";

type ThumbnailCollection = "articles" | "voyages" | "projects";
type ThumbnailEntry =
  | CollectionEntry<"articles">
  | CollectionEntry<"voyages">
  | CollectionEntry<"projects">;

const allImages = {
  ...import.meta.glob("/src/content/articles/**/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}", {
    import: "default",
  }),
  ...import.meta.glob("/src/content/voyages/**/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}", {
    import: "default",
  }),
  ...import.meta.glob("/src/content/projects/**/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}", {
    import: "default",
  }),
} as Record<string, () => Promise<unknown>>;

const defaultThumbnails: Record<ThumbnailCollection, string> = {
  articles: "/src/content/articles/default-thumbnail.png",
  voyages: "/src/content/voyages/default-thumbnail.png",
  projects: "/src/content/projects/default-thumbnail.png",
};

async function resolveImage(
  collection: ThumbnailCollection,
  path: string
): Promise<ImageMetadata | undefined> {
  const loader = allImages[path] ?? allImages[defaultThumbnails[collection]];

  if (!loader) {
    return undefined;
  }

  const image = await loader();

  if (typeof image === "function") {
    return (await image()) as ImageMetadata;
  }

  return image as ImageMetadata;
}

export function getThumbnail(
  collection: "articles",
  entry: CollectionEntry<"articles">
): Promise<ImageMetadata | undefined>;
export function getThumbnail(
  collection: "voyages",
  entry: CollectionEntry<"voyages">
): Promise<ImageMetadata | undefined>;
export function getThumbnail(
  collection: "projects",
  entry: CollectionEntry<"projects">
): Promise<ImageMetadata | undefined>;
export function getThumbnail(
  collection: ThumbnailCollection,
  entry: ThumbnailEntry
): Promise<ImageMetadata | undefined> {
  if (collection === "projects") {
    return resolveImage(collection, `/src/content/projects/${entry.id}.png`);
  }

  const thumbnail = (entry as CollectionEntry<"articles"> | CollectionEntry<"voyages">).data
    .thumbnail;
  return resolveImage(collection, `/src/content/${collection}/${entry.id}/${thumbnail}`);
}
