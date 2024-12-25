import type { SelectFeed } from "../db/schema";

const findNewPosts = (feeds: SelectFeed[]) => {
	// traverse it to see if there are new items to any of them
	// check for table with posts that have been sent before (and timestamp)
	// timestamp is required to check so we dont send emails of posts older
	// than the time this feed was added to the db
	// from each feed, get posts
};

export default findNewPosts;
