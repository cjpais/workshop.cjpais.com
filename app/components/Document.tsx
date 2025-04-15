import { Child } from "hono/jsx";
import { Link } from "honox/server";
import Logo from "./Logo";
import { HeartIcon } from "./HeartIcon";
import { CJIcon } from "./CJIcon";

const Document = ({ children, title }: { children: Child; title: string }) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
        <Link href="/app/style.css" rel="stylesheet" />
      </head>
      <body>
        <div className="flex flex-col min-h-screen max-w-[720px] mx-auto px-4 pt-8 pb-8">
          <header className="mb-8 flex-shrink-0">
            <a href="/">
              <Logo className=" hover:fill-accent" />
            </a>
          </header>
          <main className="flex-grow">
            <article>{children}</article>
          </main>
          <footer className="flex w-full justify-center self-center items-center mt-12 pt-4 border-t text-sm text-center flex-shrink-0">
            <CJIcon />
            with <HeartIcon />
          </footer>
        </div>
      </body>
    </html>
  );
};

export default Document;
