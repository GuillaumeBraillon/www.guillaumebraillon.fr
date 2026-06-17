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
