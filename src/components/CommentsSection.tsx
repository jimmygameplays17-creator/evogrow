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
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-base font-semibold text-ink">Comentarios</h3>
      <div className="mt-4 space-y-3 text-sm text-steel">
        {comments.map((comment) => (
          <div key={comment.id} className="rounded-2xl border border-slate-200 p-3">
            <div className="flex items-center justify-between text-xs text-steel">
              <span className="font-semibold text-ink">{comment.name}</span>
              <span>{formatDate(comment.createdAt)}</span>
            </div>
            <p className="mt-2 text-sm text-steel">{comment.text}</p>
          </div>
        ))}
        {comments.length === 0 && <p>No hay comentarios todavía.</p>}
      </div>

      <div className="mt-5 space-y-3">
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Tu nombre"
          className="w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm"
        />
        <textarea
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="Escribe tu comentario"
          rows={3}
          className="w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm"
        />
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
        >
          Publicar
        </button>
      </div>
    </div>
  );
}
