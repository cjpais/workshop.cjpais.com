import { Meta } from "../types";

const Seeds = () => {
  const seeds = import.meta.glob<{ frontmatter: Meta }>(`./seeds/*.mdx`, {
    eager: true,
  });
  const seedList = Object.entries(seeds).map(([slug, seed]) => ({
    url: slug.replace(/\.mdx$/, "").replace("./", ""),
    title: seed.frontmatter.title,
  }));

  return (
    <div>
      <h1 class={"text-dim font-medium mb-4"}>Seeds</h1>
      <ul>
        {seedList.map((seed, index) => (
          <li key={seed.url}>
            <a href={`${seed.url}`}>{seed.title?.toLowerCase()}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Seeds;
