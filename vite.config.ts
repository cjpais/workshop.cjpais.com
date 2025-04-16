import ssg from "@hono/vite-ssg";
import mdx from "@mdx-js/rollup";
import honox from "honox/vite";
import pages from "@hono/vite-cloudflare-pages";
import build from "@hono/vite-build/cloudflare-workers";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import remarkGfm from "remark-gfm";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import rehypeHighlight from "rehype-highlight";

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
      ssg({ entry }),
      mdx({
        jsxImportSource: "hono/jsx",
        remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter, remarkGfm],
        rehypePlugins: [rehypeHighlight],
      }),
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
