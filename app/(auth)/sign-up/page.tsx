import Link from "next/link";
import { SignUpForm } from "./_components/sign-up-form";
import { Button } from "@/components/ui/button";

export default function SignUpPage() {
  return (
    <div className="w-full max-w-sm space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">
          Create account
        </h1>
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Button variant="link" size="sm" asChild>
            <Link href="/sign-in">Sign in</Link>
          </Button>
        </p>
      </div>
      <SignUpForm />
    </div>
  );
}
