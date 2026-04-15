"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Login01Icon } from "@hugeicons/core-free-icons";
import { Button } from "../ui/button";
import { SignInForm } from "@/app/(auth)/sign-in/_components/sign-in-form";
import { useState } from "react";
import { SignUpForm } from "@/app/(auth)/sign-up/_components/sign-up-form";

export function RegisterDialog() {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" size="xl">
          <HugeiconsIcon icon={Login01Icon} strokeWidth={1.5} />
          <span>Sign in</span>
        </Button>
      </DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className="ring-0 p-6 max-md:w-[85%]"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="-mb-2 font-medium text-lg">
            {isRegister
              ? "Your journey started here"
              : "Welcome to Sapienstudio"}
          </DialogTitle>
          <div className="text-sm text-muted-foreground">
            {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
            <Button
              variant="link"
              size="sm"
              onClick={() => setIsRegister((prev) => !prev)}
            >
              {isRegister ? "Sign In" : "Sign Up"}
            </Button>
          </div>
        </DialogHeader>
        {isRegister ? <SignUpForm /> : <SignInForm />}
      </DialogContent>
    </Dialog>
  );
}
