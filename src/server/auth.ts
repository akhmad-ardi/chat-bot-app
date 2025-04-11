/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
"use server";

import { cookies } from "next/headers";
import * as jwt from "jsonwebtoken";

export async function Auth() {
  const cookiesStore = await cookies();

  const token = cookiesStore.get("token");

  if (!cookiesStore.has("token") || !token) {
    return { isAuth: false };
  }

  const decode = jwt.verify(
    token.value,
    process.env.SECRET_KEY as string
  ) as jwt.JwtPayload;

  return { isAuth: true, email: decode.email };
}
