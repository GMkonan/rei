import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { GetFeeds, AddFeed, GetFeedsWithNotifOn } from "./handlers/feeds";
import cron from "@elysiajs/cron";
import swagger from "@elysiajs/swagger";
import fetchRss from "./utils/fetchRss";
import {
	AddPosts,
	GetLastPost,
	IsPostOnSentPosts,
	MarkPostAsSent,
} from "./handlers/posts";
import sendEmail from "./utils/send-email";

const app = new Elysia()
	.use(cors())
	.use(swagger())
	.get("/api", () => "Hello Elysia")
	.post("/new-feed", async (req) => {
		// should check first in db so we don't add the same feed twice

		const data = await fetchRss(req.body.url);
		AddFeed(data.feed);
		// Initial fetch of current posts to enter db
		AddPosts(data);
		return { status: "success", feed: data.feed };
	})
	.get("/feeds", async () => {
		console.log("Running");
		return await GetFeeds();
	})
	.listen(3000);

console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);

export type App = typeof app;
