import { isAuthenticated } from "@/lib/auth-server";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authed = await isAuthenticated();
  if (authed) redirect("/");

  return (
    <div className="min-h-dvh bt w-full max-md:px-[5%] mx-auto flex items-center justify-center">
      {children}
    </div>
  );
}
