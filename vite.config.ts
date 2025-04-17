import ssg from "@hono/vite-ssg";
import mdx from "@mdx-js/rollup";
import honox from "honox/vite";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";

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
    resolve: {
      alias: {
        "@components": resolve(__dirname, "./app/components"),
        "@lib": resolve(__dirname, "./lib"),
        "@routes": resolve(__dirname, "./app/routes"),
      },
    },
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
