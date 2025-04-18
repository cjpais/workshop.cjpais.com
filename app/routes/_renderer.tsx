import { jsxRenderer, useRequestContext } from "hono/jsx-renderer";
import Document from "../components/layout/Document";

export default jsxRenderer(({ children }) => {
  const c = useRequestContext();
  const path = c.req.path;

  let title = "CJ's Workshop";
  if (path !== "/") {
    // Remove leading slash and convert to title case
    const slug = path
      .substring(1)
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    title = `${slug} - ${title}`;
  }

  return <Document title={title}>{children}</Document>;
});
