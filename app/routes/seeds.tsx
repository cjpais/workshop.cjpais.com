import { getSeeds } from "../lib/helpers";

const Seeds = () => {
  const seeds = getSeeds();

  return (
    <div>
      <h1 class={"text-dim font-medium mb-4"}>Seeds</h1>
      <ul>
        {seeds.map((seed) => (
          <li key={seed.slug}>
            <a href={`/seeds/${seed.slug}`}>{seed.title?.toLowerCase()}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Seeds;
