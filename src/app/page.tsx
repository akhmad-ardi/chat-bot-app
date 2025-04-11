import { redirect } from 'next/navigation';
import { 
  Dialog, 
  DialogTrigger, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NewChatForm } from '@/app/_components/new-chat-form';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Auth } from '@/server/auth';
import { GetChats } from '@/server/get-chats';

export default async function page() {
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
        <main className="p-3 grow">
          <div className="flex flex-col items-center justify-center h-full">
            <div className='flex flex-col items-center justify-center text-center'>
              <div className='w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4'>
                <MessageCircle />
              </div>

              <h1 className="text-4xl mb-3">How can I help you today?</h1>
              <h3 className="text-2xl text-gray-500">Ask me anything and I&apos;ll do my best to assist you.</h3>
            
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="secondary" className='flex gap-3 cursor-pointer mt-3'>
                    <MessageCircle />
                    New Chat
                  </Button>
                </DialogTrigger>

                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>New Chat</DialogTitle>
                    <DialogDescription>Create new chat</DialogDescription>
                  </DialogHeader>

                  <NewChatForm />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </main>
      </SidebarProvider>
    </>
  );
}
