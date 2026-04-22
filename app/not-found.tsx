import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="main-container min-h-dvh flex-col-center">
      <h2 className="text-2xl font-medium">Not found</h2>
      <Button variant="link" asChild>
        <Link href="/collections">Return home</Link>
      </Button>
    </div>
  );
}
