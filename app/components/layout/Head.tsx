import { Link } from "honox/server";

const Head = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="author" content="CJ Pais" />
      {import.meta.env.PROD ? (
        <link href="/static/style.css" rel="stylesheet" />
      ) : (
        <Link href="/app/style.css" rel="stylesheet" />
      )}
    </head>
  );
};

export default Head;
