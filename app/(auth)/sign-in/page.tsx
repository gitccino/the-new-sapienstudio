import Link from "next/link";
import { SignInForm } from "./_components/sign-in-form";
import { Button } from "@/components/ui/button";

export default function SignInPage() {
  return (
    <div className="w-full max-w-sm space-y-6">
      <div className="space-y-1">
        <h1 className="text-xl font-medium tracking-tight">
          Welcome to Sapienstudio
        </h1>
        <p className="text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Button variant="link" size="sm" asChild>
            <Link href="/sign-up">Sign up</Link>
          </Button>
        </p>
      </div>
      <SignInForm />
    </div>
  );
}
