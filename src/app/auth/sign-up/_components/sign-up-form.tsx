"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { EyeClosed, EyeIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SignUp } from "@/server/sign-up";
import { toast } from "sonner";

export function SingUpForm() {
  const router = useRouter();
  const [state, formAction, loading] = React.useActionState(SignUp, { success: false, message: '' });
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  
  React.useEffect(() => {
    if (state.success) {
      router.push('/');
    }

    if (!state.success && state.error) {
      toast.error(state.error);
    }
  }, [state]);

  return (
    <>
      <form action={formAction} className="w-1/4 border shadow p-5 flex flex-col items-center rounded-md">
        <h3 className="text-center text-2xl mb-5">Sign Up</h3>
        
        <div className="w-11/12 mb-5">
          <Label htmlFor="name" className="mb-3 ml-1">Name</Label>
          <Input type="text" id="name" name="name" placeholder="Name" disabled={loading} defaultValue={state?.data ? state.data.name: ''} required />
        </div>
        
        <div className="w-11/12 mb-5">
          <Label htmlFor="email" className="mb-3 ml-1">Email</Label>
          <Input type="email" id="email" name="email" placeholder="Email" disabled={loading} defaultValue={state?.data ? state.data.email: ''} required />
        </div>

        <div className="w-11/12 mb-5">
          <Label htmlFor="password" className="mb-3 ml-1">Password</Label>
          <div className="flex gap-3">
            <Input type={showPassword ? "text" : "password"} id="password" name="password" placeholder="Password" disabled={loading} defaultValue={state?.data ? state.data.password: ''} required />
            <Button type="button" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeClosed /> : <EyeIcon />}
            </Button>
          </div>
        </div>

        <div className="w-11/12">
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Loading' : 'Sign Up'}
          </Button>

          <p className="mt-7 text-center">If you have account, please {' '} 
            <Link href="/auth/sign-in" className="text-blue-700 underline hover:text-blue-500">Sign In</Link>
          </p>
        </div>
      </form>
    </>
  );
}