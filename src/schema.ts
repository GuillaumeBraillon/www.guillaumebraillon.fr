import { z } from "astro:content";

export const VoyageStrictSchema = z.object({
  title: z.string({ message: "Le titre est obligatoire" }),
  description: z.string({ message: "La description est obligatoire" }),
  country: z.string({ message: "Le pays est obligatoire" }),
  period: z.string({ message: "La période est obligatoire" }),
  date: z.coerce.date({ message: "La date doit être valide" }),
  duration: z.string().optional(),
  cover: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

export const ArticleStrictSchema = z.object({
  title: z.string({ message: "Le titre est obligatoire" }),
  date: z.coerce.date({ message: "La date doit être valide" }),
  description: z.string().optional(),
  tags: z.array(z.string()).optional(),
  draft: z.boolean().optional(),
});

export const TablatureStrictSchema = z.object({
  title: z.string({ message: "Le titre est obligatoire" }),
  date: z.coerce.date({ message: "La date doit être valide" }),
  description: z.string().optional(),
  tags: z.array(z.string()).optional(),
  draft: z.boolean().optional(),
});
