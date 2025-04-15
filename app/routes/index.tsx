import type { Meta } from "../types";
import { parse, format } from "date-fns";

const formatDate = (date: string) => {
  const parsedDate = parse(date, "EEEE MMMM do, yyyy", new Date());
  return format(parsedDate, "MMM yyyy");
};

export default function Top() {
  const posts = import.meta.glob<{ frontmatter: Meta }>("./posts/*.mdx", {
    eager: true,
  });
  return (
    <div class={""}>
      <h2 class={"text-dim font-medium mb-4"}>Projects</h2>
      <ul class="article-list">
        {Object.entries(posts).map(([id, module]) => {
          if (module.frontmatter) {
            return (
              <li class={"flex items-baseline"}>
                <p class={"w-20 font-light text-dim"}>
                  {formatDate(module.frontmatter.date)}
                </p>
                <div class={"flex flex-col"}>
                  <a
                    href={`${id.replace(/\.mdx$/, "")}`}
                    class={"text-lg -mb-1"}
                  >
                    {module.frontmatter.title}
                  </a>
                  <p class={"text-xs text-dim italic"}>
                    {module.frontmatter.description}
                  </p>
                </div>
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
}
