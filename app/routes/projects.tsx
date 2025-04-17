import PostList from "../components/PostList";
import { getProjects } from "../lib/helpers";

export default function Projects() {
  const projects = getProjects();

  return <PostList title="Projects" posts={projects} />;
}
