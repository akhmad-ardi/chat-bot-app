/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { users } from "@/db/schema";
import { SignInSchema } from "@/validation/validation-schemas";

export async function SignIn(prevState: any, formData: FormData) {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const validatedData = SignInSchema.safeParse(data);
  if (!validatedData.success) {
    return {
      success: false,
      error: validatedData.error.errors[0].message,
      data: validatedData.data,
    };
  }

  const user = await db
    .select()
    .from(users)
    .where(eq(users.email, validatedData.data.email))
    .limit(1);

  if (user.length === 0) {
    return {
      success: false,
      error: "User not found",
      data: validatedData.data,
    };
  }

  const comparePassword = await bcrypt.compare(
    validatedData.data.password,
    user[0].password
  );

  if (!comparePassword) {
    return {
      success: false,
      error: "Email or password is invalid",
      data: validatedData.data,
    };
  }

  const token = jwt.sign(
    { email: user[0].email },
    process.env.SECRET_KEY as string,
    { expiresIn: "7d" }
  );

  const cookiesStore = await cookies();
  cookiesStore.set("token", token, { maxAge: 604800 });

  return {
    success: true,
    message: "Sign in is successful",
  };
}
