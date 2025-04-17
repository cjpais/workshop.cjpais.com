import PostList from "@components/PostList";
import { Meta } from "../lib/types";
import { getProjects, getSeeds } from "../lib/helpers";

export default function Top() {
  const projects = getProjects();
  const seeds = getSeeds();

  return (
    <div class={"space-y-4"}>
      <PostList title="Projects" posts={projects} />

      <hr class={"mt-8"} />

      <div class="flex mt-6 items-start">
        <h3 class={"text-dim font-medium w-20 min-w-20"}>Seeds</h3>
        <div>
          {seeds.map((seed, index) => (
            <span key={seed.slug}>
              <a href={`/seeds/${seed.slug}`}>{seed.title?.toLowerCase()}</a>
              {index < seeds.length - 1 ? ", " : ""}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
