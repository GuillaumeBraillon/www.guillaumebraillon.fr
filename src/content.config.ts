import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const projects = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string({ message: "Le titre est obligatoire" }),
    description: z.string({ message: "La description est obligatoire" }),
    tech: z.array(z.string()).optional(),
    date: z.coerce.date().optional(),
    githubUrl: z.string().url({ message: "L'URL GitHub doit être valide" }),
    featured: z.boolean().optional(),
  }),
});

const voyages = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/voyages" }),
  schema: z.object({
    title: z.string({ message: "Le titre est obligatoire" }),
    date: z.coerce.date({ message: "La date doit être valide" }),
    country: z.string({ message: "Le pays est obligatoire" }),
    period: z.string({ message: "La période est obligatoire" }),
    description: z.string({ message: "La description est obligatoire" }),
    duration: z.string().optional(),
    cover: z.string().optional(),
    categories: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
    thumbnail: z.string().optional(),
  }),
});

const articles = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/articles" }),
  schema: z.object({
    title: z.string({ message: "Le titre est obligatoire" }),
    date: z.coerce.date({ message: "La date doit être valide" }),
    tags: z.array(z.string()).optional(),
    categories: z.array(z.string()).optional(),
    description: z.string().optional(),
    draft: z.boolean().optional(),
    thumbnail: z.string().optional(),
  }),
});

const tablatures = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/tablatures" }),
  schema: z.object({
    title: z.string({ message: "Le titre est obligatoire" }),
    date: z.coerce.date({ message: "La date doit être valide" }),
    tags: z.array(z.string()).optional(),
    description: z.string().optional(),
    draft: z.boolean().optional(),
  }),
});

export const collections = {
  projects,
  voyages,
  articles,
  tablatures,
};
