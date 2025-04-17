import { Child } from "hono/jsx";
import Document from "./layout/Document";
import { Meta } from "../global";

const MDXRenderer = ({
  children,
  title,
  date,
  frontmatter,
  capitalization = "default",
}: {
  children?: Child;
  title?: string;
  date?: string;
  frontmatter: Meta;
  capitalization?: "default" | "lower";
}) => {
  return (
    <Document
      title={
        capitalization === "lower"
          ? (title ?? frontmatter?.title)?.toLowerCase()
          : title ?? frontmatter?.title
      }
    >
      <>
        <div class={"mb-6"}>
          <h1 class={"-mb-2"}>
            {capitalization === "lower"
              ? frontmatter?.title?.toLowerCase()
              : frontmatter?.title}
          </h1>
          <i class={"text-dim text-sm"}>{date ?? frontmatter?.date}</i>
        </div>
        <div class={"space-y-4"}>{children}</div>
      </>
    </Document>
  );
};

export default MDXRenderer;
