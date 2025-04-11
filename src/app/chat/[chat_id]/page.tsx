import { BotIcon } from 'lucide-react';
import { NewMessageForm } from "./_components/new-message-form";
import { GetMessages } from '@/server/get-messages';

type Props = {
  params: Promise<{ chat_id: string }>
}

export default async function page({ params }: Props) {
  const { chat_id } = await params;

  const { data } = await GetMessages(+chat_id);
  
  return (
    <div className="relative h-screen py-10 px-32">
      {data.map((message) => (
        <section key={message.id} className='mb-5'>
          <div className="flex justify-end mb-10">
            <div className="w-fit p-3 bg-accent rounded-xl rounded-tr-sm">{message.message}</div>
          </div>

          <div className="flex gap-3 justify-start">
              <BotIcon />
              <div className="w-fit p-3 bg-accent rounded-xl rounded-tl-sm">{message.response_message}</div>
          </div>
        </section>
      ))}

      <NewMessageForm chat_id={chat_id} />
    </div>
  );
}