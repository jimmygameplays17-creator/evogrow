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
        className="rounded-full bg-emerald-600 px-4 py-2 text-xs font-semibold text-white"
      >
        Approve
      </button>
      <button
        onClick={() => updateStatus("reject")}
        disabled={loading}
        className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-ink"
      >
        Reject
      </button>
    </div>
  );
}
