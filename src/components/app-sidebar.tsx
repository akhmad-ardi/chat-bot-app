"use client";

import React from "react";
import { PowerIcon } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { 
  Dialog, 
  DialogTrigger, 
  DialogContent, 
  DialogClose, 
  DialogTitle, 
  DialogHeader, 
  DialogDescription,
  DialogFooter
} from "./ui/dialog";
import { Button } from "./ui/button";
import { SignOut } from "@/server/sign-out";

type Props = {
  chats: { id: number, name: string }[]
}

export function AppSidebar({ chats }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [state, formAction, loading] = React.useActionState(SignOut, {});

  return (
    <Sidebar variant="floating">
      <SidebarContent className="py-5 justify-between">
        <SidebarGroup className="gap-5">
          <SidebarGroupLabel className="text-3xl">Chatbot</SidebarGroupLabel>

          <SidebarGroupContent className="gap-10">
            <SidebarMenu>
              {chats.map((chat) => (
                <SidebarMenuItem key={chat.id}>
                  <SidebarMenuButton asChild>
                    <a href={`/chat/${chat.id}`}>
                      <span>{chat.name}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuButton asChild>
                <Dialog>
                  <DialogTrigger className="w-full flex gap-3 items-center cursor-pointer text-red-700 hover:text-red-500 hover:bg-gray-200 rounded-md p-2">
                    <PowerIcon />
                    <span className="text-lg">Logout</span>
                  </DialogTrigger>

                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Logout</DialogTitle>

                      <DialogDescription>Are you sure?</DialogDescription>
                    </DialogHeader>
                    <form action={formAction}>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button type="button" variant="outline" className="cursor-pointer" disabled={loading}>
                            No
                          </Button>
                        </DialogClose>

                        <Button type="submit" variant="destructive" disabled={loading}>
                          Yes
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </SidebarMenuButton>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
