"use client";

import { useEffect, useMemo, useState } from "react";
import type { KeyboardEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Project } from "@/lib/types";

const RECENT_STORAGE_KEY = "fundra_recently_viewed";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [recentIds, setRecentIds] = useState<string[]>([]);

  useEffect(() => {
    if (!isOpen) return;
    fetch("/api/projects?fundingStatus=Approved")
      .then((res) => res.json())
      .then((data) => setProjects(data.projects ?? []));
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(RECENT_STORAGE_KEY);
    if (stored) {
      try {
        setRecentIds(JSON.parse(stored));
      } catch (error) {
        console.error("Failed to parse recent projects", error);
      }
    }
  }, [isOpen]);

  const trending = useMemo(() => {
    return [...projects].sort((a, b) => b.trendScore - a.trendScore).slice(0, 6);
  }, [projects]);

  const filtered = useMemo(() => {
    if (!query.trim()) return [];
    const term = query.toLowerCase();
    return projects.filter((project) => project.title.toLowerCase().includes(term)).slice(0, 8);
  }, [projects, query]);

  const recentProjects = useMemo(() => {
    if (!recentIds.length) return [];
    const map = new Map(projects.map((project) => [project.id, project]));
    return recentIds.map((id) => map.get(id)).filter(Boolean) as Project[];
  }, [projects, recentIds]);

  const handleSelect = (project: Project) => {
    if (typeof window !== "undefined") {
      const next = [project.id, ...recentIds.filter((id) => id !== project.id)].slice(0, 6);
      window.localStorage.setItem(RECENT_STORAGE_KEY, JSON.stringify(next));
      setRecentIds(next);
    }
    onClose();
    router.push(`/projects/${project.id}`);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && filtered[0]) {
      handleSelect(filtered[0]);
    }
  };

  const clearRecent = () => {
    setRecentIds([]);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(RECENT_STORAGE_KEY);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/70 p-6 backdrop-blur"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl rounded-3xl border border-white/10 bg-card p-6 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="relative flex-1">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              🔍
            </span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search for projects…"
              className="w-full rounded-2xl border border-white/10 bg-slate-950/70 py-3 pl-12 pr-4 text-base text-slate-100 placeholder:text-slate-500 focus:border-accent focus:outline-none"
              autoFocus
            />
          </div>
          <button
            onClick={onClose}
            className="rounded-full border border-white/10 px-3 py-2 text-sm text-slate-300 transition hover:border-accent hover:text-accent"
          >
            ✕
          </button>
        </div>

        {filtered.length > 0 && (
          <div className="mt-6 space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Results</p>
            <div className="space-y-2">
              {filtered.map((project) => (
                <button
                  key={project.id}
                  onClick={() => handleSelect(project)}
                  className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm text-slate-200 transition hover:border-accent hover:text-white"
                >
                  <span>{project.title}</span>
                  <span className="text-xs text-money">score {project.trendScore}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6 space-y-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Trending</p>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {trending.map((project) => (
              <button
                key={project.id}
                onClick={() => handleSelect(project)}
                className="min-w-[160px] rounded-2xl border border-white/10 bg-white/5 p-3 text-left text-xs text-slate-300 transition hover:border-accent hover:text-white"
              >
                <div className="flex items-center gap-2">
                  <div className="relative h-8 w-8 overflow-hidden rounded-full border border-white/10">
                    <Image src={project.coverImage} alt={project.title} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-slate-100">{project.title}</p>
                    <p className="text-[10px] text-slate-500">score {project.trendScore}</p>
                  </div>
                </div>
                <div className="mt-3 flex items-end gap-1">
                  {[4, 7, 3, 8, 6].map((height, index) => (
                    <span
                      key={`${project.id}-spark-${index}`}
                      className="w-2 rounded-sm bg-accent/70"
                      style={{ height: `${height * 4}px` }}
                    />
                  ))}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Recently viewed</p>
            <button onClick={clearRecent} className="text-xs font-semibold text-slate-400 hover:text-accent">
              Clear
            </button>
          </div>
          <div className="mt-3 space-y-2">
            {recentProjects.length === 0 && (
              <p className="text-xs text-slate-500">Aún no hay proyectos recientes.</p>
            )}
            {recentProjects.map((project) => (
              <button
                key={project.id}
                onClick={() => handleSelect(project)}
                className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-left text-xs text-slate-200 transition hover:border-accent hover:text-white"
              >
                <div className="flex items-center gap-2">
                  <div className="relative h-8 w-8 overflow-hidden rounded-full border border-white/10">
                    <Image src={project.coverImage} alt={project.title} fill className="object-cover" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-100">{project.title}</p>
                    <p className="text-[10px] text-slate-500">about 5h ago</p>
                  </div>
                </div>
                <span className="text-[10px] text-money">score {project.trendScore}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between text-xs text-slate-500">
          <span>↵ to search</span>
          <span>esc to close</span>
        </div>
      </div>
    </div>
  );
}
