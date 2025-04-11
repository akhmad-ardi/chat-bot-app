/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { redirect } from "next/navigation";
import * as jwt from "jsonwebtoken";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { messages, users as usersTable } from "@/db/schema";
import { deleteToken, getToken } from "@/lib/utils-server";
import { askGemini } from "@/lib/gemini";
import { AddMessageSchema } from "@/validation/validation-schemas";

export async function AddMessage({
  chat_id,
  message,
}: {
  chat_id: number;
  message: string;
}) {
  const data = { chat_id, message };

  const { token } = await getToken();

  const decode = jwt.verify(
    token as string,
    process.env.SECRET_KEY as string
  ) as jwt.JwtPayload;

  const users = await db
    .selectDistinct({ id: usersTable.id })
    .from(usersTable)
    .where(eq(usersTable.email, decode.email))
    .limit(1);

  if (users.length === 0) {
    await deleteToken();

    return redirect("/auth/sign-in");
  }

  const validatedData = AddMessageSchema.safeParse(data);
  if (!validatedData.success) {
    return {
      success: false,
      error: validatedData.error.errors[0].message,
      data: validatedData.data,
    };
  }

  const response_message = await askGemini(validatedData.data.message);
  if (!response_message) {
    return {
      success: false,
      error: "Something error in model",
      data: validatedData.data,
    };
  }

  await db.insert(messages).values({
    chat_id: validatedData.data.chat_id,
    message: validatedData.data.message,
    response_message: response_message,
  });

  return {
    success: true,
    message: validatedData.data.message,
    response_message,
  };
}
