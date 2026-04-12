"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

export default function Home() {
  const tasks = useQuery(api.task.get);

  if (tasks === undefined) return <div>Loading...</div>;
  return (
    <div>
      <main>
        {tasks?.map((t) => (
          <div key={t._id}>{t.text}</div>
        ))}
      </main>
    </div>
  );
}
