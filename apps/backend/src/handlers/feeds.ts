import db from "../config/db";
import { feeds } from "../db/schema";

export async function AddFeed(newFeed: FeedDetails) {
  console.log(newFeed)
    const newa = await db
      .insert(feeds)
      .values({ title: newFeed.title, description: newFeed.description, author: newFeed.author, link: newFeed.link });
  }

export async function GetFeeds() {
    const feed = await db.select().from(feeds).execute()
    console.log(feed)
    return feed;
  }