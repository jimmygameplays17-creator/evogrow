"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CompletionStatus, Project, ProjectType } from "@/lib/types";
import { ProjectCard } from "@/components/ProjectCard";
import { computeProjectMetrics } from "@/lib/data";

const zones = ["Fuentes de las Lomas", "Interlomas", "Naucalpan"];

interface ProjectExplorerProps {
  title: string;
  subtitle: string;
  typeFilter?: ProjectType;
  creatorVerifiedOnly?: boolean;
  completionFilter?: CompletionStatus;
  tagFilter?: string;
  infoText?: string;
  showTrending?: boolean;
}

export function ProjectExplorer({
  title,
  subtitle,
  typeFilter,
  creatorVerifiedOnly = false,
  completionFilter,
  tagFilter,
  infoText,
  showTrending = false
}: ProjectExplorerProps) {
  const [projects, setProjects] = useState<Project[]>([]);
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

  const sortedProjects = useMemo(() => {
    const byTag = tagFilter ? projects.filter((project) => project.tags.includes(tagFilter)) : projects;
    const filtered = creatorVerifiedOnly
      ? byTag.filter((project) => project.creatorVerified || project.type === "creator")
      : byTag;
    const copy = [...filtered];
    if (sortBy === "urgentes") {
      return copy.sort(
        (a, b) => computeProjectMetrics(a).daysRemaining - computeProjectMetrics(b).daysRemaining
      );
    }
    return copy.sort((a, b) => a.title.localeCompare(b.title));
  }, [projects, sortBy, tagFilter, creatorVerifiedOnly]);

  const trendingProjects = useMemo(() => {
    return [...projects].sort((a, b) => b.trendScore - a.trendScore).slice(0, 6);
  }, [projects]);

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

      {showTrending && (
        <section className="mt-10 rounded-3xl border border-white/10 bg-card p-6 shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">Trending hoy</h2>
              <p className="text-sm text-slate-400">Los proyectos con mayor impulso en las últimas horas.</p>
            </div>
          </div>
          <div className="mt-5 flex gap-4 overflow-x-auto pb-2">
            {trendingProjects.map((project) => (
              <Link
                key={project.id}
                href={`/p/${project.slug ?? project.id}`}
                className="min-w-[240px] flex-1 rounded-3xl border border-white/10 bg-white/5 transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative h-32 w-full overflow-hidden rounded-t-3xl">
                  <Image src={project.coverImage} alt={project.title} fill className="object-cover" />
                </div>
                <div className="space-y-2 px-4 py-4">
                  <h3 className="text-base font-semibold text-white">{project.title}</h3>
                  <p className="text-xs text-money">
                    {project.donationsLast24h} aportes · score {project.trendScore}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="mt-8 grid auto-rows-fr grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
        {sortedProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
        {sortedProjects.length === 0 && (
          <div className="rounded-3xl border border-dashed border-white/10 p-10 text-center text-sm text-slate-400">
            No hay proyectos disponibles con estos filtros.
          </div>
        )}
      </section>
    </main>
  );
}
