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

import { visit } from "unist-util-visit";
import type { Plugin } from "unified";
import type { Node } from "unist";
import type { Element } from "hast";

const entry = "./app/server.ts";

const rehypeLazyLoadImages: Plugin = () => {
  return (tree: Node) => {
    // Use visit to find 'element' nodes
    visit(tree, "element", (node: Element) => {
      // Check if the element is an <img> tag
      if (node.tagName === "img") {
        // Ensure properties object exists
        if (!node.properties) {
          node.properties = {};
        }
        // Add or overwrite the loading attribute with 'lazy'
        // Type assertion needed here as properties can be undefined initially
        (node.properties as Record<string, any>).loading = "lazy";
      }
    });
  };
};

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
        rehypePlugins: [rehypeHighlight, rehypeLazyLoadImages],
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
