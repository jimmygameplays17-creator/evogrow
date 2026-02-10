"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function AdminActions({ projectId }: { projectId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const updateStatus = async (status: "approve" | "reject") => {
    setLoading(true);
    await fetch(`/api/projects/${projectId}/${status}`, { method: "POST" });
    router.refresh();
    setLoading(false);
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={() => updateStatus("approve")}
        disabled={loading}
        className="rounded-full bg-money px-4 py-2 text-xs font-semibold text-slate-900 transition hover:bg-accent"
      >
        Approve
      </button>
      <button
        onClick={() => updateStatus("reject")}
        disabled={loading}
        className="rounded-full border border-white/10 px-4 py-2 text-xs font-semibold text-slate-200 transition hover:border-ember hover:text-ember"
      >
        Reject
      </button>
    </div>
  );
}
