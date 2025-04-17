import PostList from "../components/PostList";
import { Meta } from "../lib/types";

export default function Projects() {
  const relections = import.meta.glob<{ frontmatter: Meta }>(
    `./reflections/*.mdx`,
    {
      eager: true,
    }
  );

  return <PostList title="Reflections" posts={relections} />;
}
