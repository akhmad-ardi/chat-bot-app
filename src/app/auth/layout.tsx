import React from "react";
import { redirect } from 'next/navigation';
import { Auth } from '@/server/auth';

export default async function layout({ children }: { children: React.ReactNode }) {
  const { isAuth } = await Auth();
  if (isAuth) {
    return redirect('/');
  }

  return (
    <main className="flex flex-col items-center justify-center h-screen">
      {children}
    </main>
  );
}