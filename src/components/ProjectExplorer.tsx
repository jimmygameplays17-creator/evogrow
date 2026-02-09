"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Project, ProjectType } from "@/lib/types";
import { ProjectCard } from "@/components/ProjectCard";
import { Leaderboard } from "@/components/Leaderboard";
import { computeProjectMetrics } from "@/lib/data";

const zones = ["Fuentes de las Lomas", "Interlomas", "Naucalpan"];

interface ProjectExplorerProps {
  title: string;
  subtitle: string;
  typeFilter?: ProjectType;
}

export function ProjectExplorer({ title, subtitle, typeFilter }: ProjectExplorerProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [topBuilders, setTopBuilders] = useState<
    { donorId: string; donorName: string; total: number }[]
  >([]);
  const [zone, setZone] = useState("Todas");
  const [orgType, setOrgType] = useState("Todos");
  const [sortBy, setSortBy] = useState("urgentes");

  useEffect(() => {
    const params = new URLSearchParams();
    params.set("status", "Approved");
    if (zone !== "Todas") params.set("zone", zone);
    if (orgType !== "Todos") params.set("orgType", orgType);
    if (typeFilter) params.set("type", typeFilter);

    fetch(`/api/projects?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => setProjects(data.projects));
  }, [zone, orgType, typeFilter]);

  useEffect(() => {
    fetch("/api/builders")
      .then((res) => res.json())
      .then((data) => setTopBuilders(data.leaderboard ?? []));
  }, []);

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
      <section className="rounded-3xl bg-white p-8 shadow-card">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-wide text-steel">{subtitle}</p>
            <h1 className="text-3xl font-semibold text-ink">{title}</h1>
            <p className="text-sm text-steel">
              Financia piezas específicas del proyecto y sigue el avance en tiempo real.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <div>
              <label className="text-xs font-semibold uppercase text-steel">Zona</label>
              <select
                value={zone}
                onChange={(event) => setZone(event.target.value)}
                className="mt-2 w-full rounded-full border border-slate-200 bg-white px-4 py-2 text-sm"
              >
                <option>Todas</option>
                {zones.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold uppercase text-steel">Tipo entidad</label>
              <select
                value={orgType}
                onChange={(event) => setOrgType(event.target.value)}
                className="mt-2 w-full rounded-full border border-slate-200 bg-white px-4 py-2 text-sm"
              >
                <option>Todos</option>
                <option value="Community">Comunidad</option>
                <option value="Business">Empresa</option>
                <option value="Government">Gobierno</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold uppercase text-steel">Ordenar</label>
              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
                className="mt-2 w-full rounded-full border border-slate-200 bg-white px-4 py-2 text-sm"
              >
                <option value="urgentes">Más urgentes</option>
                <option value="titulo">Alfabético</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sortedProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
        {sortedProjects.length === 0 && (
          <div className="rounded-3xl border border-dashed border-slate-300 p-10 text-center text-sm text-steel">
            No hay proyectos disponibles con estos filtros.
          </div>
        )}
      </section>

      <section className="mt-12 rounded-3xl bg-white p-6 shadow-card">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-ink">Top Builders</h2>
            <p className="text-sm text-steel">Ranking rápido de los builders más activos.</p>
          </div>
          <Link href="/builders" className="text-sm font-semibold text-ink">
            Ver todos
          </Link>
        </div>
        <div className="mt-4">
          <Leaderboard entries={topBuilders.slice(0, 3)} highlightTop={false} />
        </div>
      </section>
    </main>
  );
}
