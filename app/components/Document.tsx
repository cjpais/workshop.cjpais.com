import { Child } from "hono/jsx";
import { Link } from "honox/server";
import Logo from "./Logo";
import { HeartIcon } from "./HeartIcon";
import { CJIcon } from "./CJIcon";
import { useRequestContext } from "hono/jsx-renderer";

const HeaderLink = ({ title }: { title: string }) => {
  const c = useRequestContext();

  const href = `/${title.toLowerCase()}`;

  return (
    <>
      {c.req.path === href ? (
        <p className="text-accent under">{title}</p>
      ) : (
        <a href={href}>{title}</a>
      )}
    </>
  );
};

const Document = ({ children, title }: { children: Child; title?: string }) => {
  const c = useRequestContext();

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
        {import.meta.env.PROD ? (
          <link href="/static/style.css" rel="stylesheet" />
        ) : (
          <Link href="/app/style.css" rel="stylesheet" />
        )}
      </head>
      <body>
        <div className="flex flex-col min-h-dvh max-w-[720px] mx-auto sm:px-8 px-6 pt-8 pb-4 sm:pb-8">
          <header className="flex mb-8 flex-shrink-0 justify-between items-center">
            <a href="/">
              <Logo className="hover:fill-accent" />
            </a>
            <div className="flex gap-2">
              <HeaderLink title="about" />
              <HeaderLink title="projects" />
              <HeaderLink title="seeds" />
              {/* <HeaderLink title="reflections" /> */}
            </div>
          </header>
          <main className="flex-grow">
            <article>{children}</article>
          </main>
          <footer className="flex w-full justify-center self-center items-center mt-6 sm:mt-12 pt-4 border-t border-very-dim text-sm text-center flex-shrink-0">
            <CJIcon />
            with <HeartIcon />
          </footer>
        </div>
      </body>
    </html>
  );
};

export default Document;
