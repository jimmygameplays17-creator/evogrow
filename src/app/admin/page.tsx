import Image from "next/image";
import { AdminActions } from "@/components/AdminActions";
import { listProjects } from "@/lib/data";

export default function AdminPage() {
  const pendingProjects = listProjects("Pending");

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <section className="rounded-3xl border border-white/10 bg-card p-8 shadow-card">
        <h1 className="text-2xl font-semibold text-white">Panel admin</h1>
        <p className="mt-2 text-sm text-slate-400">Aprueba propuestas para que aparezcan en el Home.</p>

        <div className="mt-6 space-y-4">
          {pendingProjects.map((project) => (
            <div key={project.id} className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 md:flex-row">
              <div className="relative h-24 w-full overflow-hidden rounded-2xl md:w-40">
                <Image src={project.coverImage} alt={project.title} fill className="object-cover" />
              </div>
              <div className="flex flex-1 flex-col justify-between gap-2">
                <div>
                  <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                  <p className="text-sm text-slate-400">{project.description}</p>
                </div>
                <AdminActions projectId={project.id} />
              </div>
            </div>
          ))}
          {pendingProjects.length === 0 && (
            <div className="rounded-2xl border border-dashed border-white/10 p-6 text-sm text-slate-400">
              No hay proyectos pendientes.
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
