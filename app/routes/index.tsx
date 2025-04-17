import PostList from "../components/PostList";
import { Meta } from "../types";

export default function Top() {
  const projects = import.meta.glob<{ frontmatter: Meta }>(`./projects/*.mdx`, {
    eager: true,
  });
  const reflections = import.meta.glob<{ frontmatter: Meta }>(
    `./reflections/*.mdx`,
    {
      eager: true,
    }
  );
  const seeds = import.meta.glob<{ frontmatter: Meta }>(`./seeds/*.mdx`, {
    eager: true,
  });

  const seedList = Object.entries(seeds).map(([slug, seed]) => ({
    url: slug.replace(/\.mdx$/, "").replace("./", ""),
    title: seed.frontmatter.title,
  }));

  return (
    <div class={"space-y-4"}>
      <PostList title="Projects" posts={projects} />
      <PostList title="Reflections" posts={reflections} />

      <hr class={"mt-8"} />

      <div class="flex mt-6 items-start">
        <h3 class={"text-dim font-medium w-20 min-w-20"}>Seeds</h3>
        <div>
          {seedList.map((seed, index) => (
            <span key={seed.url}>
              <a href={`${seed.url}`}>{seed.title?.toLowerCase()}</a>
              {index < seedList.length - 1 ? ", " : ""}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
