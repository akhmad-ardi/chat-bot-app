import { relations } from "drizzle-orm";
import { mysqlTable, varchar, text, int } from "drizzle-orm/mysql-core";

/* --- User --- */

export const users = mysqlTable("users", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
});

export const userRelations = relations(users, ({ many }) => ({
  chats: many(chats),
}));

export type NewUser = typeof users.$inferInsert;

/* --- Chat --- */

export const chats = mysqlTable("chats", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 255 }).notNull(),
  user_id: int("user_id").references(() => users.id),
});

export type NewChat = typeof chats.$inferInsert;

export const chatRelations = relations(chats, ({ one, many }) => ({
  user: one(users, {
    fields: [chats.user_id],
    references: [users.id],
  }),
  messages: many(messages),
}));

/* --- Message --- */

export const messages = mysqlTable("messages", {
  id: int("id").primaryKey().autoincrement(),
  message: text("message"),
  response_message: text("response_message"),
  chat_id: int("chat_id").references(() => chats.id),
});

export const messageRelations = relations(messages, ({ one }) => ({
  chat: one(chats, {
    fields: [messages.chat_id],
    references: [chats.id],
  }),
}));
