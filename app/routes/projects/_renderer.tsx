import { jsxRenderer } from "hono/jsx-renderer";
import MDXRenderer from "../../components/MDXRenderer";

export default jsxRenderer((props) => {
  return (
    <MDXRenderer {...props} title={`Project - ${props.frontmatter?.title}`} />
  );
});
