import { getCollection, type CollectionEntry, type CollectionKey } from "astro:content";

const DATE_LOCALE = "fr-FR";
const DATE_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

type DatedEntry = {
  data: {
    date?: Date | string | number;
  };
};

export function getDateValue(date: Date | string | number): number {
  if (date instanceof Date) {
    return date.getTime();
  }

  return new Date(date).getTime();
}

export function sortByDateDesc<T extends DatedEntry>(entries: T[]): T[] {
  return [...entries].sort((a, b) => {
    const dateA = a.data.date ? getDateValue(a.data.date) : 0;
    const dateB = b.data.date ? getDateValue(b.data.date) : 0;
    return dateB - dateA;
  });
}

export function formatDateFr(date: Date | string | number): string {
  return new Date(date).toLocaleDateString(DATE_LOCALE, DATE_FORMAT_OPTIONS);
}

export async function getPublishedCollection<C extends CollectionKey>(
  collection: C
): Promise<CollectionEntry<C>[]> {
  const entries = await getCollection(collection);

  return entries.filter((entry) => !("draft" in entry.data && entry.data.draft));
}

// Définition des couleurs pour chaque tag
export const tagColors: Record<string, string> = {
  archives: "bg-[#41bdf5]",
  ladomopratique: "bg-[#f1c40f]",
  tests: "bg-[#ff8c00]",
  docker: "bg-[#2496ed]",
  tutoriels: "bg-[#f7df1e]",
  "auto-hébergement": "bg-[#ff5d01]",
  react: "bg-[#61dafb]",
  "node.js": "bg-[#339933]",
  astro: "bg-[#ff5d01]",
  yaml: "bg-[#cb171e]",
  "home assistant": "bg-[#41bdf5]",
  jinja2: "bg-[#b41717]",
  typescript: "bg-[#3178c6]",
  vite: "bg-[#646cff]",
  "tailwind css": "bg-[#06b6d4]",
  mqtt: "bg-[#660066]",
  n8n: "bg-[#ea4b71]",
  tailwindcss: "bg-[#06b6d4]",
  "vercel edge functions": "bg-[#000000]",
  gemini: "bg-[#4285f4]",
  supabase: "bg-[#3ecf8e]",
  "chart.js": "bg-[#ff6384]",
  "nas synology": "bg-[#0073e6]",
  musique: "bg-[#9b59b6]",
  guitare: "bg-[#d35400]",
  "montage vidéo": "bg-[#34495e]",
  "pinnacle studio": "bg-[#1abc9c]",
  divers: "bg-[#95a5a6]",
  photos: "bg-[#2ecc71]",
};

// Fonction pour obtenir la couleur d'un tag, avec une couleur par défaut si le tag n'est pas défini
export const getTagColor = (tag: string) => tagColors[tag.toLowerCase()] ?? "bg-[#eaeef2]";
