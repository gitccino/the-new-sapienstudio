"use client";

import { validateSignIn } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export function SignInForm() {
  const router = useRouter();
  const [errors, setErrors] = useState<Record<string, string[] | undefined>>(
    {},
  );
  const [authError, setAuthError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      setAuthError(null);

      const fieldErrors = await validateSignIn(formData);
      if (fieldErrors) {
        setErrors(fieldErrors);
        return;
      }

      setErrors({});

      const { error } = await authClient.signIn.email({
        email: formData.get("email") as string,
        password: formData.get("password") as string,
      });

      if (error) {
        setAuthError(error.message ?? "Invalid email or password");
        return;
      }

      // router.push("/collections");
      router.refresh();
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3" noValidate>
      <div className="space-y-1">
        <Label htmlFor="email" className="mb-1 sr-only">
          Email Address
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="off"
          placeholder="you@sapienstudio.com"
          defaultValue="s@sapienstudio.com"
          required
        />
        {errors.email && (
          <p className="text-xs text-destructive">{errors.email[0]}</p>
        )}
      </div>

      <div className="space-y-1">
        <Label htmlFor="password" className="mb-1 sr-only">
          Password
        </Label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="off"
          placeholder="Password"
          defaultValue="@f36SKSK"
          required
        />
        {errors.password && (
          <p className="text-xs text-destructive">{errors.password[0]}</p>
        )}
      </div>

      <div className="space-y-1">
        <Button
          type="submit"
          variant="secondaryCard"
          disabled={isPending}
          className="w-full"
          size="2xl"
        >
          {isPending ? "Signing in…" : "Sign in"}
        </Button>
        {authError && <p className="text-xs text-destructive">{authError}</p>}
      </div>
    </form>
  );
}
