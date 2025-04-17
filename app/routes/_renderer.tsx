import { jsxRenderer } from "hono/jsx-renderer";
import Document from "../components/layout/Document";

export default jsxRenderer(({ children }) => {
  return <Document title={`CJ's Workshop`}>{children}</Document>;
});
