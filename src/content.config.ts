import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const projects = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tech: z.array(z.string()).optional(),
    date: z.date().optional(),
    githubUrl: z.string().url(),
    featured: z.boolean().optional(),
  }),
});

const voyages = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/voyages" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(), // Optionnel si pas présent partout
    country: z.string(),
    period: z.string(), // Ajouté pour correspondre au MD
    duration: z.string().optional(), // Ajouté pour correspondre au MD
    date: z.date(),
    cover: z.string().optional(),
  }),
});

const articles = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/articles" }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    tags: z.array(z.string()).optional(),
    description: z.string().optional(),
    draft: z.boolean().optional(),
  }),
});

export const collections = {
  projects,
  voyages,
  articles,
};
