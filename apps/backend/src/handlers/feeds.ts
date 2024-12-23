import db from "../config/db";
import { feeds } from "../db/schema";

export async function AddFeed(newFeed: Feed) {
    const user = await db
      .insert(feeds)
      .values({ title: newFeed.title, description: newFeed.description, author: newFeed.author, link: newFeed.link });
    return `You are signed Up ${user}`;
  }