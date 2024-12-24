type FeedDetails = {
	title: string;
	description: string;
	author: string;
	link: string;
};

type Post = {
	title: string;
	link: string;
	pubDate: string;
	content: string;
};

type Feed = {
	status: string;
	feed: FeedDetails;
	items: Post[];
};
