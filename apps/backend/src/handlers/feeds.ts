import { eq } from "drizzle-orm";
import db from "../config/db";
import { feeds } from "../db/schema";

export async function AddFeed(newFeed: FeedDetails) {
	console.log(newFeed);
	const addedFeed = await db
		.insert(feeds)
		.values({
			title: newFeed.title,
			description: newFeed.description,
			author: newFeed.author,
			link: newFeed.link,
			rss: newFeed.url,
		})
		.returning();
	return addedFeed[0];
}

export async function GetFeeds() {
	const feed = await db.select().from(feeds).execute();
	console.log(feed);
	return feed;
}

export async function GetFeedsWithNotifOn() {
	const feed = await db
		.select()
		.from(feeds)
		.where(eq(feeds.notifications, true))
		.execute();
	return feed;
}
