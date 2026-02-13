import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Money } from "@/components/Money";
import { ProgressBar } from "@/components/ProgressBar";
import { ShareActions } from "@/components/ShareActions";
import { computeProjectMetrics, getProjectsByHandle, getUserByHandle } from "@/lib/data";

interface PublicUserPageProps {
  params: { handle: string };
}

export default function PublicUserPage({ params }: PublicUserPageProps) {
  const user = getUserByHandle(params.handle);
  if (!user) return notFound();

  const projects = getProjectsByHandle(user.handle).filter((project) => project.status === "active");
  const featured = projects[0];

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <section className="rounded-3xl border border-white/10 bg-card p-6 shadow-card">
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative h-16 w-16 overflow-hidden rounded-full border border-white/20">
            <Image src={user.avatarUrl ?? "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=320&q=80"} alt={user.displayName} fill className="object-cover" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-white">{user.displayName}</h1>
            <p className="text-sm text-crypto">@{user.handle}</p>
            <p className="mt-1 text-sm text-slate-400">{user.bio ?? "Perfil público de Fundra"}</p>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-white/10 bg-slate-900/40 p-4">
          <h2 className="text-sm font-semibold text-white">Comparte tu Fundra</h2>
          <p className="mt-1 text-xs text-slate-400">Comparte tu link de Fundra en tu chat o stream para que te aporten en segundos.</p>
          <div className="mt-3">
            <ShareActions title={`${user.displayName} en Fundra`} sharePath={`/u/${user.handle}`} />
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {featured ? (
            <Link href={`/p/${featured.slug ?? featured.id}`} className="rounded-full bg-money px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-accent">
              Donar
            </Link>
          ) : (
            <button className="rounded-full bg-money px-4 py-2 text-sm font-semibold text-slate-900">Donación general (demo)</button>
          )}
        </div>
      </section>

      <section className="mt-8 space-y-4">
        <h2 className="text-lg font-semibold text-white">Proyectos activos</h2>
        {projects.map((project) => {
          const metrics = computeProjectMetrics(project);
          return (
            <Link key={project.id} href={`/p/${project.slug}`} className="block rounded-2xl border border-white/10 bg-white/5 p-4 hover:bg-white/10">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h3 className="font-semibold text-white">{project.title}</h3>
                </div>
                <span className="text-sm text-money">Recaudado <Money amount={metrics.totalRaised} /></span>
              </div>
              <div className="mt-3">
                <ProgressBar value={metrics.progress} />
              </div>
            </Link>
          );
        })}
        {projects.length === 0 && <p className="text-sm text-slate-400">No tiene proyectos activos todavía.</p>}
      </section>
    </main>
  );
}
