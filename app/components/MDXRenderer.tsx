import { Child } from "hono/jsx";
import Document from "./Document";
import { Meta } from "../types";

const MDXRenderer = ({
  children,
  title,
  date,
  frontmatter,
}: {
  children?: Child;
  title: string;
  date: string;
  frontmatter: Meta;
}) => {
  return (
    <Document title={title ?? frontmatter?.title}>
      <>
        <div class={"mb-6"}>
          <h1 class={"-mb-2"}>{frontmatter?.title}</h1>
          <i class={"text-dim text-sm"}>{date ?? frontmatter?.date}</i>
        </div>
        <div class={"space-y-4"}>{children}</div>
      </>
    </Document>
  );
};

export default MDXRenderer;
