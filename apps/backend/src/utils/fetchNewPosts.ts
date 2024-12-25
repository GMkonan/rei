import type { SelectFeed } from "../db/schema";
import { GetLastPost } from "../handlers/posts";
import fetchRss from "./fetchRss";

const fetchNewPosts = async (feeds: SelectFeed[]) => {
	// compare items[0] publication date with the last one on the db
	// if it's the same or items[0] is older than there are no new posts
	// if there are new posts, add to db

	for (const feed of feeds) {
		// fetch rss post
		const lastRssPost = (await fetchRss(feed.rss)).items[0];

		const lastDbPost = await GetLastPost(feed.id);
		console.log("Last DB post: ", lastDbPost.pubDate);
		console.log("Last RSS post: ", lastRssPost.pubDate);
		if (
			new Date(lastRssPost.pubDate).getTime() >
			new Date(lastDbPost.pubDate).getTime()
		) {
			// add to db
		}
	}
};

export default fetchNewPosts;
