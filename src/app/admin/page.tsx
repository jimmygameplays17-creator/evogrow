import Image from "next/image";
import { AdminActions } from "@/components/AdminActions";
import { listProjects } from "@/lib/data";

export default function AdminPage() {
  const pendingProjects = listProjects("Pending");

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <section className="rounded-3xl bg-white p-8 shadow-card">
        <h1 className="text-2xl font-semibold text-ink">Panel admin</h1>
        <p className="mt-2 text-sm text-steel">Aprueba propuestas para que aparezcan en el Home.</p>

        <div className="mt-6 space-y-4">
          {pendingProjects.map((project) => (
            <div key={project.id} className="flex flex-col gap-4 rounded-2xl border border-slate-200 p-4 md:flex-row">
              <div className="relative h-24 w-full overflow-hidden rounded-2xl md:w-40">
                <Image src={project.coverImage} alt={project.title} fill className="object-cover" />
              </div>
              <div className="flex flex-1 flex-col justify-between gap-2">
                <div>
                  <p className="text-xs font-semibold uppercase text-steel">{project.zone}</p>
                  <h3 className="text-lg font-semibold text-ink">{project.title}</h3>
                  <p className="text-sm text-steel">{project.description}</p>
                </div>
                <AdminActions projectId={project.id} />
              </div>
            </div>
          ))}
          {pendingProjects.length === 0 && (
            <div className="rounded-2xl border border-dashed border-slate-200 p-6 text-sm text-steel">
              No hay proyectos pendientes.
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
