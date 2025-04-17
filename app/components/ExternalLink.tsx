import { Child } from "hono/jsx";

const ExternalLink = ({
  href,
  children,
}: {
  href: string;
  children: Child;
}) => {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
};

export default ExternalLink;
