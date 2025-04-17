import { FullPost, Meta } from "../lib/types";
import { parse, format } from "date-fns";

const formatDate = (date: string) => {
  const parsedDate = parse(date, "EEEE MMMM do, yyyy", new Date());
  return format(parsedDate, "MMM yyyy");
};

const PostList = ({ title, posts }: { title: string; posts: FullPost[] }) => {
  // if posts is empty return nothing
  if (posts.length === 0) {
    return null;
  }

  return (
    <div>
      <h1 class={"text-dim font-medium mb-4"}>{title}</h1>
      <div class="space-y-3">
        {Object.entries(posts).map(([id, post]) => {
          return (
            <div class={"flex items-baseline"}>
              <p class={"w-20 min-w-20 font-light text-dim"}>
                {formatDate(post.date)}
              </p>
              <div class={"flex flex-col"}>
                <a
                  href={`${title.toLowerCase()}/${post.slug}`}
                  class={"text-lg"}
                >
                  {post.title}
                </a>
                <p class={"text-xs text-dim italic"}>
                  {post.description.toLowerCase()}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PostList;
