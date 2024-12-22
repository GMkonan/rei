import { relations } from 'drizzle-orm';
import { date, integer, pgTable, serial, text, varchar } from 'drizzle-orm/pg-core';

export const user = pgTable('user', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }),
  username: varchar('username', { length: 255 }),
});

export const feeds = pgTable('feeds', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }),
  description: varchar('description', { length: 255 }),
  author: varchar('author', { length: 255 }),
  link: varchar('link', { length: 255 }),
});

export const feedsRelations = relations(feeds, ({ many }) => ({
	posts: many(posts),
}));

export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  feedId: integer('feedId'),
  title: varchar('title', { length: 255 }),
  description: varchar('description', { length: 255 }),
  author: varchar('author', { length: 255 }),
  // put as postgres date type (or timestamp)
  pubDate: date('pubDate'),
  content: text('content'),
});

export const postsRelations = relations(posts, ({ one }) => ({
	author: one(feeds, {
		fields: [posts.feedId],
		references: [feeds.id],
	}),
}));