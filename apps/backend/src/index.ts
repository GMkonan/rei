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
	.use(
		cron({
			name: "update_posts",
			pattern: "* */2 * * *", // every 2 hours
			async run() {
				console.log("Running fetcher cron");
				// check if there are new posts on all feeds and update accordinly

				const feeds = await GetFeeds();

				for (const feed of feeds) {
					// fetch rss post
					const lastRssPost = await fetchRss(feed.rss);

					const lastDbPost = await GetLastPost(feed.id);
					console.log("Last DB post: ", lastDbPost.pubDate);
					console.log("Last RSS post: ", lastRssPost.items[0].pubDate);
					if (
						new Date(lastRssPost.items[0].pubDate).getTime() >
						new Date(lastDbPost.pubDate).getTime()
					) {
						// add to db
						AddPosts(lastRssPost);
					}
				}
			},
		}),
	)
	.use(
		cron({
			name: "new_posts_mailer",
			pattern: "0 0 * * *", // every day
			async run() {
				console.log("Running");

				// get list of feeds
				const feeds = await GetFeedsWithNotifOn();

				const postsToSend = [];
				for (const feed of feeds) {
					// fetch rss post

					// support more than one post in the future
					const lastDbPost = await GetLastPost(feed.id);

					// check if post was published after the feed was added to the db
					if (lastDbPost.pubDate > feed.createdAt) {
						// check if it's on the list of sent before
						if (await IsPostOnSentPosts(lastDbPost.id)) {
							return;
						}

						// if not, add to list of sent before
						await MarkPostAsSent(lastDbPost.id);
						// add to list of send emails

						// maybe add info of author as well
						postsToSend.push(lastDbPost);
						console.log(lastDbPost.pubDate);
						console.log(feed.createdAt);
					}
				}

				//send emails
				await sendEmail(postsToSend);
			},
		}),
	)
	.listen(3000);

console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);

export type App = typeof app;
