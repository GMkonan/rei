import { desc, eq } from "drizzle-orm";
import db from "../config/db";
import { posts } from "../db/schema";

export async function GetPosts() {
	return await db.select().from(posts).execute();
}

export async function GetLastPost(feedId: number) {
	return await db
		.select()
		.from(posts)
		.where(eq(posts.feedId, feedId))
		.orderBy(desc(posts.pubDate))
		.execute()
		.then((post) => post[0]);
}

export async function AddPosts(data: Feed) {
	console.log(data);
	const postsToAdd = data.items.map((item) => ({
		title: item.title,
		description: item.description,
		link: item.link,
		pubDate: item.pubDate,
		feedId: data.feed.id,
	}));
	const addedPosts = await db.insert(posts).values(postsToAdd);
}
