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

  return (
    <div class={"space-y-4"}>
      <PostList title="Projects" posts={projects} />
      <PostList title="Reflections" posts={reflections} />
    </div>
  );
}
