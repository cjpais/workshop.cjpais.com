import { FullPost } from "../lib/types";
import { formatPostDate } from "../lib/dateUtils";

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
            <div class={"flex flex-col lg:flex-row lg:items-baseline relative"}>
              <p
                class={
                  "hidden lg:block w-40 min-w-40 text-sm font-light text-dim lg:absolute lg:-left-44 pt-[6px] lg:w-24 lg:text-right"
                }
              >
                {formatPostDate(post.date, post.startDate, post.endDate)}
              </p>
              <div class={"flex flex-col lg:ml-0"}>
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
