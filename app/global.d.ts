import {} from "hono";

type Meta = {
  title?: string;
  date?: string;
  description?: string;
  draft?: boolean;
};

declare module "hono" {
  interface ContextRenderer {
    (content: string | Promise<string>, meta?: Meta & { frontmatter: Meta }):
      | Response
      | Promise<Response>;
  }
}
