import { desc, eq } from "drizzle-orm";
import db from "../config/db";
import { posts, sentPosts } from "../db/schema";

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

export async function AddPosts(data: Feed, feedId: number) {
	console.log(data);
	const postsToAdd = data.items.map((item) => ({
		title: item.title,
		description: item.description,
		link: item.link,
		pubDate: item.pubDate,
		feedId: feedId,
		originalLink: `feed/${feedId}`,
	}));
	const addedPosts = await db.insert(posts).values(postsToAdd);
}

export async function GetPostById(id: number) {
	return await db
		.select()
		.from(posts)
		.where(eq(posts.id, id))
		.execute()
		.then((post) => post[0]);
}

export async function GetSentPosts() {
	return await db.select().from(sentPosts).execute();
}

export async function IsPostOnSentPosts(postId: number) {
	return await db
		.select()
		.from(sentPosts)
		.where(eq(sentPosts.postId, postId))
		.execute();
}

export async function MarkPostAsSent(postId: number) {
	// Add to sent_posts table
	return await db.insert(sentPosts).values({ postId });
}
