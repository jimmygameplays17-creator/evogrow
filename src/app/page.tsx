"use client";

import { useEffect, useMemo, useState } from "react";
import { Project } from "@/lib/types";
import { ProjectCard } from "@/components/ProjectCard";
import { computeProjectMetrics } from "@/lib/data";

const zones = ["Fuentes de las Lomas", "Interlomas", "Naucalpan"];

export default function HomePage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [zone, setZone] = useState("Todas");
  const [orgType, setOrgType] = useState("Todos");
  const [sortBy, setSortBy] = useState("urgentes");

  useEffect(() => {
    const params = new URLSearchParams();
    params.set("status", "Approved");
    if (zone !== "Todas") params.set("zone", zone);
    if (orgType !== "Todos") params.set("orgType", orgType);

    fetch(`/api/projects?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => setProjects(data.projects));
  }, [zone, orgType]);

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
            <p className="text-sm font-semibold uppercase tracking-wide text-steel">Explora proyectos cercanos</p>
            <h1 className="text-3xl font-semibold text-ink">Crowdfunding local con transparencia total</h1>
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
              <label className="text-xs font-semibold uppercase text-steel">Tipo</label>
              <select
                value={orgType}
                onChange={(event) => setOrgType(event.target.value)}
                className="mt-2 w-full rounded-full border border-slate-200 bg-white px-4 py-2 text-sm"
              >
                <option>Todos</option>
                <option value="Community">Community</option>
                <option value="Business">Verified</option>
                <option value="Government">Verified</option>
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
    </main>
  );
}
