import { z } from "zod";
import {
  FullPost,
  FullPostFrontmatterSchema,
  Meta,
  Seed,
  SeedFrontmatterSchema,
  SortDirection,
} from "./types";
import { parse } from "date-fns";

export const parseFrontmatterDate = (date: string) => {
  return parse(date, "EEEE MMMM do, yyyy", new Date());
};

export const fetchProjectContent = () => {
  return import.meta.glob<{ frontmatter: Meta }>("@routes/projects/*.mdx", {
    eager: true,
  });
};

export const fetchSeedContent = () => {
  return import.meta.glob<{ frontmatter: Meta }>("@routes/seeds/*.mdx", {
    eager: true,
  });
};

export const parseContent = <T>(
  rawContent: Record<string, { frontmatter: Meta }>,
  schema: z.ZodTypeAny
): T[] => {
  const content = Object.entries(rawContent)
    .map(([filePath, item]) => {
      const parse = schema.safeParse(item.frontmatter);
      if (!parse.success) {
        console.log(
          `${filePath} has invalid frontmatter.\nfrontmatter: ${item.frontmatter}\nerror:`,
          parse.error.message
        );
        return null;
      }

      const slug = filePath.split("/").pop()?.replace(".mdx", "");

      return {
        ...parse.data,
        slug,
      };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  return content;
};

export const getProjects = (
  sortDirection: SortDirection = "desc",
  limit: number = 7
) => {
  const rawProjects = fetchProjectContent();
  console.log(rawProjects);
  const projects = parseContent<FullPost>(
    rawProjects,
    FullPostFrontmatterSchema
  )
    .filter((p) => p != null)
    .filter((p) => !p.draft)
    .sort((a, b) => {
      const aDate = parseFrontmatterDate(a.date);
      const bDate = parseFrontmatterDate(b.date);

      if (sortDirection === "asc") {
        return aDate.getTime() - bDate.getTime();
      } else {
        return bDate.getTime() - aDate.getTime();
      }
    })
    .slice(0, limit);

  return projects;
};

export const getSeeds = () => {
  const rawSeeds = fetchSeedContent();
  const seeds = parseContent<Seed>(rawSeeds, SeedFrontmatterSchema);
  return seeds;
};
