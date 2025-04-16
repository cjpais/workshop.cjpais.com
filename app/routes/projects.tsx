import PostList from "../components/PostList";
import { Meta } from "../types";

export default function Projects() {
  const projects = import.meta.glob<{ frontmatter: Meta }>(`./projects/*.mdx`, {
    eager: true,
  });

  return <PostList title="Projects" posts={projects} />;
}
