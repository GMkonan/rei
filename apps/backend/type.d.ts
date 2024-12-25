type FeedDetails = {
	id: number;
	title: string;
	description: string;
	author: string;
	link: string;
	url: string;
};

type Post = {
	title: string;
	description: string;
	link: string;
	pubDate: string;
	content: string;
};

type Feed = {
	status: string;
	feed: FeedDetails;
	items: Post[];
};
