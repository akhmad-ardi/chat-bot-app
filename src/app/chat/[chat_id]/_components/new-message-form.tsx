"use client";

import React from "react";
import { SendIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { AddMessage } from "@/server/add-message";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Props = {
  chat_id: string;
};

export function NewMessageForm({ chat_id }: Props) {
  const router = useRouter();
  const [message, setMessage] = React.useState<string>('');

  async function handleSubmit() {
    toast.promise(() => AddMessage({ chat_id: +chat_id, message }), {
        loading: 'Process...',
        error: 'Something error'
    });

    setMessage('');

    router.refresh();
  }

  return (
    <div className="absolute bottom-10 left-[25px] md:left-2/12 w-11/12 md:w-8/12">
      <div className="flex gap-3 items-stretch">
        <Textarea onChange={(event) => setMessage(event.target.value)} value={message} className="w-full resize-none" placeholder="Input message" rows={1} />
      
        <Button type="submit" className="h-full" onClick={handleSubmit}>
          <SendIcon />
        </Button>
      </div>
    </div>
  );
}
