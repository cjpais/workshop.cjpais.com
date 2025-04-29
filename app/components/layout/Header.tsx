import { useRequestContext } from "hono/jsx-renderer";
import Logo from "../icons/Logo";

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

const Header = () => {
  return (
    <header className="flex sm:flex-row flex-col gap-2 mb-8 flex-shrink-0 justify-between sm:items-center">
      <a href="/" className="active:fill-accent">
        <Logo className="hover:fill-accent" />
      </a>
      <div className="flex gap-2">
        <HeaderLink title="projects" />
        <HeaderLink title="seeds" />
        <HeaderLink title="about" />
        {/* <HeaderLink title="reflections" /> */}
      </div>
    </header>
  );
};

export default Header;
