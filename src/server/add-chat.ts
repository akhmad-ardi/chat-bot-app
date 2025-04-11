/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { users as usersTable, chats, NewChat } from "@/db/schema";
import { deleteToken, getToken } from "@/lib/utils-server";
import { AddChatSchema } from "@/validation/validation-schemas";

export async function AddChat(prevState: any, formData: FormData) {
  const { email } = await getToken();

  const users = await db
    .select({ id: usersTable.id })
    .from(usersTable)
    .where(eq(usersTable.email, email));

  if (users.length === 0) {
    await deleteToken();

    return redirect("/auth/sign-in");
  }

  const data: NewChat = {
    name: formData.get("name") as string,
  };

  const validatedData = AddChatSchema.safeParse(data);
  if (!validatedData.success) {
    return {
      success: false,
      error: validatedData.error.errors[0].message,
    };
  }

  await db
    .insert(chats)
    .values({ user_id: users[0].id, name: validatedData.data.name });

  return {
    success: true,
    message: `${validatedData.data.name} chat created`,
  };
}
