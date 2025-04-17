import { z } from "zod";

export type Meta = {
  title?: string;
  date?: string;
  description?: string;
  draft?: boolean;
};

export const FullPostFrontmatterSchema = z.object({
  title: z.string(),
  date: z.string(),
  description: z.string(),
  draft: z.boolean().default(false),
});

export const FullPostSchema = FullPostFrontmatterSchema.extend({
  slug: z.string(),
});

export type FullPost = z.infer<typeof FullPostSchema>;

export const SeedFrontmatterSchema = z.object({
  title: z.string(),
});

export const SeedSchema = SeedFrontmatterSchema.extend({
  slug: z.string(),
});

export type Seed = z.infer<typeof SeedSchema>;

export type SortDirection = "asc" | "desc";
