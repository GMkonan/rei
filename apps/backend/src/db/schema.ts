import { relations } from "drizzle-orm";
import {
	date,
	integer,
	pgTable,
	serial,
	text,
	varchar,
	boolean,
} from "drizzle-orm/pg-core";

export const user = pgTable("user", {
	id: serial("id").primaryKey(),
	email: varchar("email", { length: 255 }),
	username: varchar("username", { length: 255 }),
});

export const feeds = pgTable("feeds", {
	id: serial("id").primaryKey(),
	title: varchar("title", { length: 255 }),
	description: varchar("description", { length: 255 }),
	author: varchar("author", { length: 255 }),
	link: varchar("link", { length: 255 }),
	rss: varchar("rss", { length: 255 }).notNull(),
	notifications: boolean("notifications"),
	createdAt: date("createdAt").notNull().default("now()"),
});

export const feedsRelations = relations(feeds, ({ many }) => ({
	posts: many(posts),
}));

export const posts = pgTable("posts", {
	id: serial("id").primaryKey(),
	feedId: integer("feedId"),
	title: varchar("title", { length: 255 }),
	description: text("description"),
	author: varchar("author", { length: 255 }),
	pubDate: date("pubDate").notNull(),
	createdAt: date("createdAt").notNull().default("now()"),
	content: text("content"),
});

export const sentPosts = pgTable("sent_posts", {
	id: serial("id").primaryKey(),
	postId: integer("postId"),
	// userId: integer("userId"),
});

export const postsRelations = relations(posts, ({ one }) => ({
	author: one(feeds, {
		fields: [posts.feedId],
		references: [feeds.id],
	}),
	sent: one(sentPosts, {
		fields: [posts.id],
		references: [sentPosts.postId],
	}),
}));

export type SelectFeed = typeof feeds.$inferSelect;

export type SelectPost = typeof posts.$inferSelect;
