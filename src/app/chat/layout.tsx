import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Auth } from "@/server/auth";
import { redirect } from "next/navigation";
import { GetChats } from "@/server/get-chats";

export default async function layout({children}: {children: React.ReactNode}) {
  const { isAuth } = await Auth();
  if (!isAuth) {
    return redirect('/auth/sign-in');
  }
    
  const { data } = await GetChats();

  return (
    <>
      <SidebarProvider>
        <AppSidebar chats={data} />
        <section className="p-3 fixed top-3 md:static">
          <SidebarTrigger className="[&_svg:not([class*='size-'])]:size-7" />
        </section>
        <main className="grow">
          {children}
        </main>
      </SidebarProvider>
    </>
  );
}