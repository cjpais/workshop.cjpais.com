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
  if (
    Object.values(posts).filter((p) => !p.frontmatter || !p.frontmatter.draft)
      .length === 0
  ) {
    return null;
  }

  return (
    <div>
      <h1 class={"text-dim font-medium mb-4"}>{title}</h1>
      <div class="space-y-3">
        {Object.entries(posts).map(([id, post]) => {
          if (post.frontmatter && !post.frontmatter.draft) {
            return (
              <div class={"flex items-baseline"}>
                <p class={"w-20 min-w-20 font-light text-dim"}>
                  {post.frontmatter.date
                    ? formatDate(post.frontmatter.date)
                    : "unknown"}
                </p>
                <div class={"flex flex-col"}>
                  <a href={`${id.replace(/\.mdx$/, "")}`} class={"text-lg"}>
                    {post.frontmatter.title}
                  </a>
                  {post.frontmatter.description && (
                    <p class={"text-xs text-dim italic"}>
                      {post.frontmatter.description?.toLowerCase()}
                    </p>
                  )}
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default PostList;
