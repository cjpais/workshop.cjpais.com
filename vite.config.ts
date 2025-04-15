import ssg from '@hono/vite-ssg'
import mdx from '@mdx-js/rollup'
import honox from 'honox/vite'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import remarkGfm from 'remark-gfm'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import rehypeHighlight from 'rehype-highlight'

const entry = './app/server.ts'

export default defineConfig(() => {
  return {
    plugins: [
      honox(),
      ssg({ entry }),
      mdx({
        jsxImportSource: 'hono/jsx',
        remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter, remarkGfm],
        rehypePlugins: [rehypeHighlight]
      }),
      tailwindcss()
    ]
  }
})