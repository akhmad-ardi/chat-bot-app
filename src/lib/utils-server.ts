"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import * as jwt from "jsonwebtoken";

export async function getToken() {
  const cookiesStore = await cookies();

  const token = cookiesStore.get("token");
  if (!cookiesStore.has("token") || !token) {
    return redirect("/auth/sign-in");
  }

  const decode = jwt.verify(
    token.value,
    process.env.SECRET_KEY as string
  ) as jwt.JwtPayload;

  return { token: token.value, email: decode.email };
}

export async function deleteToken() {
  const cookiesStore = await cookies();

  if (cookiesStore.has("token")) {
    cookiesStore.delete("token");
  }
}
