import { Elysia } from "elysia";
import { cors } from '@elysiajs/cors'



const app = new Elysia().use(cors()).get("/api", () => "Hello Elysia").post(
  "/new-feed",
  async (req) => {
    console.log(req.body);
    const baseUrl = "https://api.rss2json.com/v1/api.json?rss_url="
    const url = `${baseUrl}${(req.body as { url: string }).url}`;
    const feed = await fetch(url) // as Feed on fetch
    // AddFeed call
    return feed
  }
).listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
