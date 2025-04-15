import { Meta } from "../types";
import { parse, format } from "date-fns";

const formatDate = (date: string) => {
  const parsedDate = parse(date, "EEEE MMMM do, yyyy", new Date());
  return format(parsedDate, "MMM yyyy");
};

const PostList = ({
  title,
  posts,
}: {
  title: string;
  posts: Record<string, { frontmatter: Meta }>;
}) => {
  // if posts is empty return nothing
  if (Object.keys(posts).length === 0) {
    return null;
  }

  return (
    <div>
      <h1 class={"text-dim font-medium mb-4"}>{title}</h1>
      <ul class="article-list space-y-3">
        {Object.entries(posts).map(([id, module]) => {
          if (module.frontmatter && !module.frontmatter.draft) {
            return (
              <li class={"flex items-baseline"}>
                <p class={"w-20 font-light text-dim"}>
                  {formatDate(module.frontmatter.date)}
                </p>
                <div class={"flex flex-col"}>
                  <a href={`${id.replace(/\.mdx$/, "")}`} class={"text-lg"}>
                    {module.frontmatter.title}
                  </a>
                  <p class={"text-xs text-dim italic"}>
                    {module.frontmatter.description.toLowerCase()}
                  </p>
                </div>
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
};

export default PostList;
