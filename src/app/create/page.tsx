"use client";

import { ChangeEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { CommunityCategory, OrgType, ProjectType } from "@/lib/types";

const zones = ["Fuentes de las Lomas", "Interlomas", "Naucalpan"];
const categories = [
  { value: "official", label: "Oficial" },
  { value: "community", label: "Comunidad" },
  { value: "creator", label: "Creadores" }
] as const;

const communityCategories: CommunityCategory[] = ["Personal", "Mascotas", "Escuela", "Hogar", "Transporte", "Otro"];

export default function CreateProjectPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [goal, setGoal] = useState(50000);
  const [zone, setZone] = useState(zones[0]);
  const [projectType, setProjectType] = useState<ProjectType>("community");
  const [description, setDescription] = useState("");
  const [isLive, setIsLive] = useState(false);
  const [liveUrl, setLiveUrl] = useState("");
  const [coverImage, setCoverImage] = useState(
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80"
  );
  const [organizer, setOrganizer] = useState("");
  const [category, setCategory] = useState<CommunityCategory>("Personal");
  const [creatorPledgeType, setCreatorPledgeType] = useState<"fixed" | "percent">("fixed");
  const [creatorPledgeValue, setCreatorPledgeValue] = useState(0);

  const creatorPledgeAmount = useMemo(() => {
    if (creatorPledgeType === "percent") {
      const percent = Math.min(100, Math.max(0, creatorPledgeValue));
      return (goal * percent) / 100;
    }
    return Math.min(goal, Math.max(0, creatorPledgeValue));
  }, [creatorPledgeType, creatorPledgeValue, goal]);

  const remainingPublicAmount = Math.max(0, goal - creatorPledgeAmount);
  const canSubmit = useMemo(() => title.trim() && description.trim() && goal > 0, [title, description, goal]);

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setCoverImage(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    if (!canSubmit) return;

    const orgType: OrgType = projectType === "official" ? "Government" : projectType === "creator" ? "Business" : "Community";

    const payload = {
      title,
      goal,
      goalAmount: goal,
      zone,
      type: projectType,
      description,
      coverImage,
      organizer: organizer || (projectType === "creator" ? "Creator Team" : "Comunidad Fundra"),
      orgType,
      durationDays: 30,
      verificationDoc: projectType === "official" ? "Demo verification" : undefined,
      category: projectType === "community" ? category : undefined,
      bom: [],
      isLive,
      liveUrl: liveUrl || undefined,
      livePlatform: liveUrl.includes("twitch")
        ? "twitch"
        : liveUrl.includes("youtube")
          ? "youtube"
          : liveUrl.includes("tiktok")
            ? "tiktok"
            : "other",
      creatorPledgeType,
      creatorPledgeValue: creatorPledgeType === "percent" ? Math.min(100, Math.max(0, creatorPledgeValue)) : Math.min(goal, Math.max(0, creatorPledgeValue)),
      creatorPledgeAmount,
      fundedAmountPublic: 0,
      fundedAmountTotal: creatorPledgeAmount,
      remainingAmount: remainingPublicAmount,
      creatorName: projectType === "creator" ? organizer || "Creator" : undefined,
      creatorVerified: projectType === "creator",
      ownerHandle:
        projectType === "creator"
          ? (organizer || "creator").toLowerCase().replace(/\s+/g, "")
          : undefined
    };

    const response = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    const nextSlug = data?.project?.slug;
    if (nextSlug) {
      router.push(`/p/${nextSlug}`);
      return;
    }
    router.push(`/projects/${data?.project?.id}`);
  };

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <section className="rounded-3xl border border-white/10 bg-card p-8 shadow-card">
        <h1 className="text-2xl font-semibold text-white">Create</h1>
        <p className="mt-2 text-sm text-slate-400">Create Project demo con Creator Pledge.</p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="space-y-2 md:col-span-2">
            <label className="text-xs font-semibold uppercase text-slate-400">Title</label>
            <input value={title} onChange={(event) => setTitle(event.target.value)} className="w-full rounded-2xl border border-white/10 bg-transparent px-4 py-2 text-sm text-slate-100" />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase text-slate-400">Goal</label>
            <input type="number" min={1} value={goal} onChange={(event) => setGoal(Math.max(1, Number(event.target.value) || 1))} className="w-full rounded-2xl border border-white/10 bg-transparent px-4 py-2 text-sm text-slate-100" />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase text-slate-400">Zone</label>
            <select value={zone} onChange={(event) => setZone(event.target.value)} className="w-full rounded-2xl border border-white/10 bg-transparent px-4 py-2 text-sm text-slate-100">
              {zones.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase text-slate-400">Category</label>
            <select value={projectType} onChange={(event) => setProjectType(event.target.value as ProjectType)} className="w-full rounded-2xl border border-white/10 bg-transparent px-4 py-2 text-sm text-slate-100">
              {categories.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          {projectType === "community" && (
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase text-slate-400">Community type</label>
              <select value={category} onChange={(event) => setCategory(event.target.value as CommunityCategory)} className="w-full rounded-2xl border border-white/10 bg-transparent px-4 py-2 text-sm text-slate-100">
                {communityCategories.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
            </div>
          )}

          <div className="space-y-2 md:col-span-2">
            <label className="text-xs font-semibold uppercase text-slate-400">Description</label>
            <textarea value={description} onChange={(event) => setDescription(event.target.value)} rows={4} className="w-full rounded-2xl border border-white/10 bg-transparent px-4 py-2 text-sm text-slate-100" />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase text-slate-400">Organizer / Username</label>
            <input value={organizer} onChange={(event) => setOrganizer(event.target.value)} className="w-full rounded-2xl border border-white/10 bg-transparent px-4 py-2 text-sm text-slate-100" />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase text-slate-400">Image upload (local)</label>
            <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full rounded-2xl border border-white/10 bg-transparent px-4 py-2 text-sm text-slate-100 file:mr-3 file:rounded-full file:border-0 file:bg-money file:px-3 file:py-1 file:text-xs file:font-semibold file:text-slate-900" />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-xs font-semibold uppercase text-slate-400">Live URL (optional)</label>
            <input value={liveUrl} onChange={(event) => setLiveUrl(event.target.value)} placeholder="https://twitch.tv/..." className="w-full rounded-2xl border border-white/10 bg-transparent px-4 py-2 text-sm text-slate-100" />
          </div>

          <label className="inline-flex items-center gap-2 text-sm text-slate-200 md:col-span-2">
            <input type="checkbox" checked={isLive} onChange={(event) => setIsLive(event.target.checked)} className="h-4 w-4 rounded border-white/20 bg-slate-900" />
            isLive
          </label>

          <div className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4 md:col-span-2">
            <p className="text-sm font-semibold text-white">Aporte del creador (Creator Pledge)</p>
            <div className="flex flex-wrap gap-4 text-sm text-slate-200">
              <label className="inline-flex items-center gap-2">
                <input type="radio" checked={creatorPledgeType === "fixed"} onChange={() => setCreatorPledgeType("fixed")} />
                Monto fijo
              </label>
              <label className="inline-flex items-center gap-2">
                <input type="radio" checked={creatorPledgeType === "percent"} onChange={() => setCreatorPledgeType("percent")} />
                Porcentaje de la meta
              </label>
            </div>
            <input
              type="number"
              min={0}
              max={creatorPledgeType === "percent" ? 100 : goal}
              value={creatorPledgeValue}
              onChange={(event) => {
                const raw = Math.max(0, Number(event.target.value) || 0);
                setCreatorPledgeValue(creatorPledgeType === "percent" ? Math.min(100, raw) : Math.min(goal, raw));
              }}
              className="w-full rounded-2xl border border-white/10 bg-transparent px-4 py-2 text-sm text-slate-100"
              placeholder={creatorPledgeType === "percent" ? "50" : "50000"}
            />
            <div className="grid gap-2 text-xs text-slate-300 md:grid-cols-3">
              <p>Meta total: <span className="text-money">${goal.toLocaleString()}</span></p>
              <p>Aporte creador: <span className="text-money">${Math.round(creatorPledgeAmount).toLocaleString()}</span></p>
              <p>Falta público: <span className="text-money">${Math.round(remainingPublicAmount).toLocaleString()}</span></p>
            </div>
          </div>
        </div>

        <button onClick={handleSubmit} disabled={!canSubmit} className="mt-8 inline-flex h-10 items-center justify-center rounded-full bg-money px-5 text-sm font-semibold text-slate-900 transition hover:bg-accent disabled:cursor-not-allowed disabled:opacity-60">
          Create project
        </button>
      </section>
    </main>
  );
}
