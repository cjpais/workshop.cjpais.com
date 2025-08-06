import { z } from "zod";
import {
  FullPost,
  FullPostFrontmatterSchema,
  Seed,
  SeedFrontmatterSchema,
  SortDirection,
} from "./types";
import { parse } from "date-fns";
import { Meta } from "../global";

export const parseFrontmatterDate = (date: string): Date => {
  // Try multiple date formats
  const formats = [
    "EEEE MMMM do, yyyy", // Monday July 1st, 2025
    "MMMM do, yyyy", // July 1st, 2025
    "yyyy-MM-dd", // 2025-07-01
    "MM/dd/yyyy", // 07/01/2025
    "MMMM yyyy", // July 2025
  ];

  for (const format of formats) {
    try {
      const parsed = parse(date, format, new Date());
      // Check if the parsed date is valid
      if (!isNaN(parsed.getTime())) {
        return parsed;
      }
    } catch (error) {
      // Continue to next format
    }
  }

  // If all formats fail, try native Date parsing as last resort
  const nativeDate = new Date(date);
  if (!isNaN(nativeDate.getTime())) {
    return nativeDate;
  }

  // Return a very old date for invalid dates so they sort to the end
  console.warn(`Could not parse date: ${date}, using fallback date`);
  return new Date(1900, 0, 1);
};

export const getCanonicalDate = (post: FullPost): Date => {
  if (post.startDate) {
    return parseFrontmatterDate(post.startDate);
  }
  if (post.date) {
    return parseFrontmatterDate(post.date);
  }
  // Fallback to current date if neither is available
  return new Date();
};

export const getDuration = (post: FullPost): number => {
  if (post.startDate && post.endDate) {
    const startDate = parseFrontmatterDate(post.startDate);
    const endDate = parseFrontmatterDate(post.endDate);
    return endDate.getTime() - startDate.getTime();
  }
  if (post.startDate && !post.endDate) {
    // Ongoing project - calculate duration from start to now
    const startDate = parseFrontmatterDate(post.startDate);
    const now = new Date();
    return now.getTime() - startDate.getTime();
  }
  return 0; // No duration if no start date
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
  schema: z.ZodTypeAny,
): T[] => {
  const content = Object.entries(rawContent)
    .map(([filePath, item]) => {
      const parse = schema.safeParse(item.frontmatter);
      if (!parse.success) {
        console.error(
          `${filePath} has invalid frontmatter.\nfrontmatter: ${item.frontmatter}\nerror:`,
          parse.error.message,
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
  limit: number = 7,
) => {
  const rawProjects = fetchProjectContent();
  const projects = parseContent<FullPost>(
    rawProjects,
    FullPostFrontmatterSchema,
  )
    .filter((p) => p != null)
    .filter((p) => !p.draft)
    .sort((a, b) => {
      const aIsOngoing = a.startDate && !a.endDate;
      const bIsOngoing = b.startDate && !b.endDate;

      // First priority: ongoing projects
      if (aIsOngoing && !bIsOngoing) {
        return sortDirection === "desc" ? -1 : 1;
      }
      if (bIsOngoing && !aIsOngoing) {
        return sortDirection === "desc" ? 1 : -1;
      }

      // Second priority: sort by date
      const aDate = getCanonicalDate(a);
      const bDate = getCanonicalDate(b);

      let dateComparison: number;
      if (sortDirection === "asc") {
        // Ascending: older dates first (smaller timestamps first)
        dateComparison = aDate.getTime() - bDate.getTime();
      } else {
        // Descending: newer dates first (larger timestamps first)
        dateComparison = bDate.getTime() - aDate.getTime();
      }

      // Third priority: if dates are the same (or very close - within 1 day), use duration as tiebreaker
      if (Math.abs(dateComparison) < 24 * 60 * 60 * 1000) {
        const aDuration = getDuration(a);
        const bDuration = getDuration(b);

        if (sortDirection === "asc") {
          // For ascending, shorter durations first
          return aDuration - bDuration;
        } else {
          // For descending, longer durations first
          return bDuration - aDuration;
        }
      }

      return dateComparison;
    })
    .slice(0, limit);

  return projects;
};

export const getSeeds = () => {
  const rawSeeds = fetchSeedContent();
  const seeds = parseContent<Seed>(rawSeeds, SeedFrontmatterSchema);
  return seeds;
};
