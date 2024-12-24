import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { GetFeeds, AddFeed, GetFeedsWithNotifOn } from "./handlers/feeds";
import cron from "@elysiajs/cron";
import swagger from "@elysiajs/swagger";
import findNewPosts from "./utils/findNewPosts";

const app = new Elysia()
	.use(cors())
	.use(swagger())
	.get("/api", () => "Hello Elysia")
	.post("/new-feed", async (req) => {
		// console.log(req.body);
		const baseUrl = "https://api.rss2json.com/v1/api.json?rss_url=";
		const url = `${baseUrl}${(req.body as { url: string }).url}`;
		const res = await fetch(url);
		const data = (await res.json()) as Feed;
		AddFeed(data.feed);
		// Initial fetch of posts to enter db
		return { status: "success", feed: data.feed };
	})
	.get("/feeds", async () => {
		console.log("Running");
		return await GetFeeds();
	})
	.use(
		cron({
			name: "fetcher",
			pattern: "0 */2 * * *", // every 2 hours
			async run() {
				console.log("Running");

				// check if there are new posts on all feeds and update accordinly
			},
		}),
	)
	.use(
		cron({
			name: "mailer",
			pattern: "0 0 * * *",
			async run() {
				console.log("Running");

				// get list of feeds
				const feeds = await GetFeedsWithNotifOn();
				// traverse it to see if there are new items to any of them
				const newPosts = findNewPosts(feeds);
				// if there are, send an email to the user defined (where can we define user? maybe env for now)
			},
		}),
	)
	.listen(3000);

console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);

export type App = typeof app;
