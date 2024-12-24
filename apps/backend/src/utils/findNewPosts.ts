import type { SelectFeed } from "../db/schema";

const findNewPosts = (feeds: SelectFeed[]) => {
	// should I always have the posts table updated and just query it?
	// Or should this function also check for new posts on direct RSS fetch?
};

export default findNewPosts;
