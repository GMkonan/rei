import { Elysia } from "elysia";
import { cors } from '@elysiajs/cors'
import { GetFeeds, AddFeed } from "./handlers/feeds";



const app = new Elysia().use(cors()).get("/api", () => "Hello Elysia").post(
  "/new-feed",
  async (req) => {
    // console.log(req.body);
    const baseUrl = "https://api.rss2json.com/v1/api.json?rss_url="
    const url = `${baseUrl}${(req.body as { url: string }).url}`;
    const res = await fetch(url)
    const data = await res.json() as Feed
    AddFeed(data.feed)
    return {status: "success", feed: data.feed}
  }
)
.get("/feeds", async () => {
  console.log("Running")
  return await GetFeeds()
})
.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

export type App = typeof app