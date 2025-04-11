"use server";

import { db } from "@/db";
import { messages as messagesTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GetMessages(chat_id: number) {
  const messages = await db
    .select()
    .from(messagesTable)
    .where(eq(messagesTable.chat_id, chat_id));

  return { data: messages };
}
