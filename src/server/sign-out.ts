"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function SignOut() {
  const cookiesStore = await cookies();

  if (cookiesStore.has("token")) {
    cookiesStore.delete("token");
  }

  return redirect("/auth/sign-in");
}
