import ssg from "@hono/vite-ssg";
import mdx from "@mdx-js/rollup";
import honox from "honox/vite";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

const entry = "./app/server.ts";

export default defineConfig(({ mode }) => {
  return {
    plugins: [
      tailwindcss(),
      honox({
        client: {
          input: ["./app/style.css"],
        },
      }),
      mdx({
        jsxImportSource: "hono/jsx",
        remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter, remarkGfm],
        rehypePlugins: [rehypeHighlight],
      }),
      ssg({ entry }),
    ],
    build: {
      rollupOptions: {
        input: ["./app/style.css"],
        output: {
          assetFileNames: "static/style.css",
        },
      },
    },
  };
});
