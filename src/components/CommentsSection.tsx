"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Comment } from "@/lib/types";
import { formatDate } from "@/lib/utils";

interface CommentsSectionProps {
  projectId: string;
  comments: Comment[];
}

export function CommentsSection({ projectId, comments }: CommentsSectionProps) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!name.trim() || !text.trim()) return;
    setIsSubmitting(true);
    await fetch(`/api/projects/${projectId}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, text })
    });
    setName("");
    setText("");
    setIsSubmitting(false);
    router.refresh();
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-card p-5 shadow-card">
      <h3 className="text-base font-semibold text-white">Comentarios</h3>
      <div className="mt-4 space-y-3 text-sm text-slate-400">
        {comments.map((comment) => (
          <div key={comment.id} className="rounded-2xl border border-white/10 bg-white/5 p-3">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold text-slate-100">{comment.name}</span>
              <span>{formatDate(comment.createdAt)}</span>
            </div>
            <p className="mt-2 text-sm text-slate-300">{comment.text}</p>
          </div>
        ))}
        {comments.length === 0 && <p>No hay comentarios todavía.</p>}
      </div>

      <div className="mt-5 space-y-3">
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Tu nombre"
          className="w-full rounded-2xl border border-white/10 bg-transparent px-4 py-2 text-sm text-slate-100 placeholder:text-slate-500"
        />
        <textarea
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="Escribe tu comentario"
          rows={3}
          className="w-full rounded-2xl border border-white/10 bg-transparent px-4 py-2 text-sm text-slate-100 placeholder:text-slate-500"
        />
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="rounded-full bg-money px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-accent disabled:opacity-50"
        >
          Publicar
        </button>
      </div>
    </div>
  );
}
