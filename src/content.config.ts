import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

{
  /* La collection "projects" est définie avec un schéma qui inclut des champs tels que "title", "description", "tech", "date", "githubUrl" et "featured". */
}
const projects = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tech: z.array(z.string()).optional(),
    date: z.coerce.date().optional(),
    githubUrl: z.string().url(),
    featured: z.boolean().optional(),
  }),
});

{
  /* La collection "voyages" est définie de manière similaire à "projects", mais avec des champs spécifiques aux voyages. */
}
const voyages = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/voyages" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    country: z.string(),
    period: z.string(),
    description: z.string().optional(),
    duration: z.string().optional(),
    cover: z.string().optional(),
    categories: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
  }),
});

{
  /* La collection "articles" est définie de manière similaire, avec des champs adaptés aux articles de blog. */
}
const articles = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/articles" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
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
