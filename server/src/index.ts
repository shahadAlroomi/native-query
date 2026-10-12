import { serve } from "@hono/node-server";
import { Hono } from "hono";

const posts = [
  {
    id: 1,
    title: "Getting Started with React Query",
    body: "React Query handles fetching, caching, and syncing server state so you can stop juggling useEffect and loading flags by hand.",
    author: "Ada Lindqvist",
    publishedAt: new Date("2026-10-07T09:00:00Z"),
  },
  {
    id: 2,
    title: "Why Expo Router Makes Navigation Simple",
    body: "File-based routing means every file in src/app is a screen. Layouts define navigators, and deep linking comes for free.",
    author: "Marcus Berg",
    publishedAt: new Date("2026-10-08T12:30:00Z"),
  },
  {
    id: 3,
    title: "Optimistic Updates in React Native",
    body: "Update the UI immediately, then roll back if the mutation fails. It makes mobile apps feel instant even on slow connections.",
    author: "Sofia Nilsson",
    publishedAt: new Date("2026-10-09T08:15:00Z"),
  },
];

const app = new Hono();

app.get("/v1/posts", async (c) => c.json(posts));

app.get("/v1/posts/:id", async (c) => {
  const post = posts.find((p) => p.id === Number(c.req.param("id")));
  if (!post) return c.json(null, 404);
  return c.json(post, 200);
});

app.post("/v1/posts", async (c) => {
  const data = await c.req.json();
  // validera att data är det vi vill ha.
  const post = { id: Date.now(), ...data };
  posts.push(post);
  return c.json(post, 201);
});

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);
