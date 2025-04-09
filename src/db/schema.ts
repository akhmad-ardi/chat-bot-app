import { relations } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

// User

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
});

export const userRelations = relations(users, ({ many }) => ({
  chats: many(chats),
}));

// Chat

export const chats = sqliteTable("chats", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
});

export const chatRelations = relations(chats, ({ one, many }) => ({
  user: one(users),
  messages: many(messages),
}));

// Message

export const messages = sqliteTable("messages", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  message: text("message"),
  response_message: text("message"),
  chat_id: integer("id"),
});

export const messageRelations = relations(messages, ({ one }) => ({
  chat: one(chats),
}));
