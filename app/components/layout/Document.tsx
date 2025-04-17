import { Child } from "hono/jsx";
import Head from "./Head";
import Header from "./Header";
import Footer from "./Footer";

const Document = ({
  children,
  title = "CJ's Workshop",
  description = "A place to play around with technology and make it easy and fun",
}: {
  children: Child;
  title?: string;
  description?: string;
}) => {
  return (
    <html lang="en">
      <Head title={title} description={description} />
      <body>
        <div className="flex flex-col min-h-dvh max-w-[720px] mx-auto sm:px-8 px-6 pt-8 pb-4 sm:pb-8">
          <Header />
          <main className="flex-grow">
            <article>{children}</article>
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
};

export default Document;
