import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    github: z.string().optional(),
    demo: z.string().optional(),
    tech: z.array(z.string()).optional(),
    date: z.date().optional(),
  }),
});

const voyages = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/voyages" }),
  schema: z.object({
    title: z.string(),
    country: z.string(),
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
  }),
});

export const collections = {
  projects,
  voyages,
  articles,
};
