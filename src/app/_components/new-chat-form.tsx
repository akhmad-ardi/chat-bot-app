"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "../../components/ui/button";
import { Input } from '../../components/ui/input';
import { 
  DialogFooter, 
  DialogClose 
} from '../../components/ui/dialog';
import { AddChat } from "@/server/add-chat";
import { toast } from "sonner";

export function NewChatForm() {
  const router = useRouter();
  const [state, formAction, loading] = React.useActionState(AddChat, { success: false, message: '' });

  React.useEffect(() => {
    if (state.success) {
      toast.success(state.message);

      router.refresh();
    }

    if (!state.success && state.error) {
      toast.error(state.error);
    }
  }, [state]);

  return (
    <form action={formAction}>
      <div className='mb-5'>
        <Input placeholder='Name of chat' name="name" disabled={loading} required />
      </div>

      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline" className='cursor-pointer' disabled={loading}>Close</Button>
        </DialogClose>

        <Button type='submit' variant="secondary" className='cursor-pointer' disabled={loading}>
          {loading ? 'Loading' : 'Create'}
        </Button>
      </DialogFooter>
    </form>
  );
}
