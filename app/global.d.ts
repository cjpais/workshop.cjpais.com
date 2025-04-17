import {} from "hono";
import type { Meta } from "@lib/types";

declare module "hono" {
  interface ContextRenderer {
    (content: string | Promise<string>, meta?: Meta & { frontmatter: Meta }):
      | Response
      | Promise<Response>;
  }
}
