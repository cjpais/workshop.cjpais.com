import { jsxRenderer } from "hono/jsx-renderer";
import MDXRenderer from "../../components/MDXRenderer";

export default jsxRenderer((props) => {
  return (
    <MDXRenderer
      {...props}
      title={`seed - ${props.frontmatter?.title}`}
      capitalization="lower"
    />
  );
});
