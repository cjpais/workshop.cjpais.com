import { Child } from "hono/jsx";
import Document from "./layout/Document";
import { Meta } from "../global";
import { formatPostDate } from "../lib/dateUtils";

const MDXRenderer = ({
  children,
  title,
  date,
  startDate,
  endDate,
  frontmatter,
  capitalization = "default",
}: {
  children?: Child;
  title?: string;
  date?: string;
  startDate?: string;
  endDate?: string;
  frontmatter: Meta;
  capitalization?: "default" | "lower";
}) => {
  return (
    <Document
      title={
        capitalization === "lower"
          ? (title ?? frontmatter?.title)?.toLowerCase()
          : (title ?? frontmatter?.title)
      }
    >
      <>
        <div class={"mb-6"}>
          <h1 class={""}>
            {capitalization === "lower"
              ? frontmatter?.title?.toLowerCase()
              : frontmatter?.title}
          </h1>
          <i class={"text-dim text-sm"}>
            {formatPostDate(
              date ?? frontmatter?.date,
              startDate ?? frontmatter?.startDate,
              endDate ?? frontmatter?.endDate,
            )}
          </i>
        </div>
        <div class={"space-y-4"}>{children}</div>
      </>
    </Document>
  );
};

export default MDXRenderer;
