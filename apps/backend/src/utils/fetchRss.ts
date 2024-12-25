const fetchRss = async (url: string) => {
	const baseUrl = "https://api.rss2json.com/v1/api.json?rss_url=";
	const res = await fetch(`${baseUrl}${url}`);
	const data = (await res.json()) as Feed;
	return data;
};

export default fetchRss;
