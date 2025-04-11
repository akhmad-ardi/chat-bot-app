/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { users as usersTable, chats as chatsTable } from "@/db/schema";
import { deleteToken, getToken } from "@/lib/utils-server";

export async function GetChats() {
  const { email } = await getToken();

  const users = await db
    .select({ id: usersTable.id })
    .from(usersTable)
    .where(eq(usersTable.email, email))
    .limit(1);

  if (users.length === 0) {
    await deleteToken();

    return redirect("/auth/sign-in");
  }

  const chats = await db
    .select({ id: chatsTable.id, name: chatsTable.name })
    .from(chatsTable)
    .where(eq(chatsTable.user_id, users[0].id));

  return { data: chats };
}
