/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NewUser, users } from "@/db/schema";
import { SignUpSchema } from "@/validation/validation-schemas";
import { db } from "@/db";
import { eq } from "drizzle-orm";

export async function SignUp(prevState: any, formData: FormData) {
  const data: NewUser = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const validatedData = SignUpSchema.safeParse(data);
  if (!validatedData.success) {
    return {
      success: false,
      error: validatedData.error.errors[0].message,
      data: validatedData.data,
    };
  }

  const userAlreadyExist = await db
    .select()
    .from(users)
    .where(eq(users.email, validatedData.data.email));
  if (userAlreadyExist.length !== 0) {
    return {
      success: false,
      error: "Email already exist",
      data: validatedData.data,
    };
  }

  const hashedPassword = await bcrypt.hash(validatedData.data.password, 10);

  await db.insert(users).values({
    name: validatedData.data.name,
    email: validatedData.data.email,
    password: hashedPassword,
  });

  const token = jwt.sign(
    { email: validatedData.data.name },
    process.env.SECRET_KEY as string,
    { expiresIn: "7d" }
  );

  const cookieStore = await cookies();
  cookieStore.set("token", token);

  return {
    success: true,
    message: "User created",
  };
}
