"use client";

import * as React from "react";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const tasks = useQuery(api.task.get);

  React.useEffect(() => {
    router.push("/components");
  }, [router]);

  if (tasks === undefined)
    return <div className="main-container flex-row-center">Loading...</div>;

  return (
    <div className="main-container">
      <main>
        {tasks?.map((t) => (
          <div key={t._id}>{t.text}</div>
        ))}
      </main>
    </div>
  );
}
