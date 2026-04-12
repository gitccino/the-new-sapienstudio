import Link from "next/link";
import { SignUpForm } from "./_components/sign-up-form";

export default function SignUpPage() {
  return (
    <div className="w-full max-w-sm space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Create account</h1>
        <p className="text-sm text-gray-500">
          Already have an account?{" "}
          <Link href="/sign-in" className="text-black underline underline-offset-4">
            Sign in
          </Link>
        </p>
      </div>
      <SignUpForm />
    </div>
  );
}
