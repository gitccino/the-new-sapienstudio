import Link from "next/link";
import { SignInForm } from "./_components/sign-in-form";

export default function SignInPage() {
  return (
    <div className="w-full max-w-sm space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Sign in</h1>
        <p className="text-sm text-gray-500">
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" className="text-black underline underline-offset-4">
            Sign up
          </Link>
        </p>
      </div>
      <SignInForm />
    </div>
  );
}
