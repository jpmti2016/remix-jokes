import { Joke } from "@prisma/client";
import { json, LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { db } from "~/utils/db.server";

type LoaderData = { randomJoke: Joke };
export const loader: LoaderFunction = async () => {
  const count = await db.joke.count();
  const ramdomRowNumber = Math.floor(Math.random() * count);
  const [randomJoke] = await db.joke.findMany({
    take: 1,
    skip: ramdomRowNumber,
  });

  const data: LoaderData = { randomJoke };
  return json(data);
};
export default function JokesIndexRoute() {
  const data = useLoaderData<LoaderData>();
  return (
    <div>
      <p>Here is a random joke:</p>
      <p>{data.randomJoke.content}</p>
      <Link to={data.randomJoke.id}>'{data.randomJoke.name}' Permalink</Link>
    </div>
  );
}
