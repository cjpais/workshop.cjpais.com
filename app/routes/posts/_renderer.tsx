import { jsxRenderer } from "hono/jsx-renderer";
import Document from "../../components/Document";

export default jsxRenderer(({ children, title, date, frontmatter }) => {
  return (
    <Document title={title ?? frontmatter.title}>
      <>
        <div class={"mb-6"}>
          <h1 class={"-mb-3"}>{title ?? frontmatter.title}</h1>
          <i class={"text-dim"}>{date ?? frontmatter.date}</i>
        </div>
        <div class={"space-y-4"}>{children}</div>
      </>
    </Document>
  );
});
