"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { CompletionStatus, Project, ProjectType } from "@/lib/types";
import { ProjectCard } from "@/components/ProjectCard";
import { Leaderboard } from "@/components/Leaderboard";
import { computeProjectMetrics } from "@/lib/data";

const zones = ["Fuentes de las Lomas", "Interlomas", "Naucalpan"];

interface ProjectExplorerProps {
  title: string;
  subtitle: string;
  typeFilter?: ProjectType;
  completionFilter?: CompletionStatus;
  infoText?: string;
  showTopBuildersPreview?: boolean;
}

export function ProjectExplorer({
  title,
  subtitle,
  typeFilter,
  completionFilter,
  infoText,
  showTopBuildersPreview = true
}: ProjectExplorerProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [topBuilders, setTopBuilders] = useState<
    { donorId: string; donorName: string; total: number }[]
  >([]);
  const [zone, setZone] = useState("Todas");
  const [projectType, setProjectType] = useState("Todos");
  const [completionStatus, setCompletionStatus] = useState("Todos");
  const [sortBy, setSortBy] = useState("urgentes");

  useEffect(() => {
    const params = new URLSearchParams();
    params.set("fundingStatus", "Approved");
    if (zone !== "Todas") params.set("zone", zone);
    if (projectType !== "Todos") params.set("type", projectType);
    if (typeFilter) params.set("type", typeFilter);
    if (completionStatus !== "Todos") params.set("completionStatus", completionStatus);
    if (completionFilter) params.set("completionStatus", completionFilter);

    fetch(`/api/projects?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => setProjects(data.projects));
  }, [zone, projectType, typeFilter, completionStatus, completionFilter]);

  useEffect(() => {
    if (!showTopBuildersPreview) return;
    fetch("/api/builders")
      .then((res) => res.json())
      .then((data) => setTopBuilders(data.leaderboard ?? []));
  }, [showTopBuildersPreview]);

  const sortedProjects = useMemo(() => {
    const copy = [...projects];
    if (sortBy === "urgentes") {
      return copy.sort(
        (a, b) => computeProjectMetrics(a).daysRemaining - computeProjectMetrics(b).daysRemaining
      );
    }
    return copy.sort((a, b) => a.title.localeCompare(b.title));
  }, [projects, sortBy]);

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <section className="rounded-3xl border border-white/10 bg-card p-8 shadow-card">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-400">{subtitle}</p>
            <h1 className="text-3xl font-semibold text-white">{title}</h1>
            <p className="text-sm text-slate-400">
              {infoText ?? "Financia piezas específicas del proyecto y sigue el avance en tiempo real."}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <div>
              <label className="text-xs font-semibold uppercase text-slate-400">Zona</label>
              <select
                value={zone}
                onChange={(event) => setZone(event.target.value)}
                className="mt-2 w-full rounded-full border border-white/10 bg-transparent px-4 py-2 text-sm text-slate-100"
              >
                <option>Todas</option>
                {zones.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </div>
            {!typeFilter && (
              <div>
                <label className="text-xs font-semibold uppercase text-slate-400">Tipo</label>
                <select
                  value={projectType}
                  onChange={(event) => setProjectType(event.target.value)}
                  className="mt-2 w-full rounded-full border border-white/10 bg-transparent px-4 py-2 text-sm text-slate-100"
                >
                  <option>Todos</option>
                  <option value="official">Oficial</option>
                  <option value="community">Comunidad</option>
                  <option value="creator">Creadores</option>
                </select>
              </div>
            )}
            <div>
              <label className="text-xs font-semibold uppercase text-slate-400">Ordenar</label>
              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
                className="mt-2 w-full rounded-full border border-white/10 bg-transparent px-4 py-2 text-sm text-slate-100"
              >
                <option value="urgentes">Más urgentes</option>
                <option value="titulo">Alfabético</option>
              </select>
            </div>
            {!completionFilter && (
              <div>
                <label className="text-xs font-semibold uppercase text-slate-400">Estado</label>
                <select
                  value={completionStatus}
                  onChange={(event) => setCompletionStatus(event.target.value)}
                  className="mt-2 w-full rounded-full border border-white/10 bg-transparent px-4 py-2 text-sm text-slate-100"
                >
                  <option>Todos</option>
                  <option value="active">Activo</option>
                  <option value="completed">Finalizado</option>
                </select>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sortedProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
        {sortedProjects.length === 0 && (
          <div className="rounded-3xl border border-dashed border-white/10 p-10 text-center text-sm text-slate-400">
            No hay proyectos disponibles con estos filtros.
          </div>
        )}
      </section>

      {showTopBuildersPreview && (
        <section className="mt-12 rounded-3xl border border-white/10 bg-card p-6 shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">Top Builders</h2>
              <p className="text-sm text-slate-400">Ranking rápido de los builders más activos.</p>
            </div>
            <Link href="/builders" className="text-sm font-semibold text-money hover:text-accent transition">
              Ver todos
            </Link>
          </div>
          <div className="mt-4">
            <Leaderboard entries={topBuilders.slice(0, 3)} highlightTop={false} />
          </div>
        </section>
      )}
    </main>
  );
}
