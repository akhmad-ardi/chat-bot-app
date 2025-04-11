"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { EyeClosed, EyeIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { SignIn } from "@/server/sign-in";
import { toast } from "sonner";

export function SignInForm() {
  const router = useRouter();
  const [state, formAction, loading] = React.useActionState(SignIn, { success: false, message: '' });
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
    <form action={formAction} className="w-1/4 border shadow p-5 flex flex-col items-center rounded-md">
      <h3 className="text-center text-2xl mb-5">Sign In</h3>

      <div className="w-11/12 mb-5">
        <Label htmlFor="email" className="mb-3 ml-1">Email</Label>
        <Input type="email" id="email" name="email" placeholder="Email" defaultValue={state?.data ? state?.data.email: ''} disabled={loading} required />
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
        <Button type="submit" className="w-full" disabled={loading}>Sign In</Button>

        <p className="mt-7 text-center">If you don&apos;t have account, please {' '} 
          <Link href="/auth/sign-up" className="text-blue-700 underline hover:text-blue-500">Sign Up</Link>
        </p>
      </div>
    </form>
  );
}
