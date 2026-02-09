"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BomItem, BomType, CommunityCategory, OrgType, ProjectType } from "@/lib/types";

const zones = ["Fuentes de las Lomas", "Interlomas", "Naucalpan"];
const communityCategories: CommunityCategory[] = ["Personal", "Mascotas", "Escuela", "Hogar", "Transporte", "Otro"];

interface DraftItem {
  id: string;
  name: string;
  type: BomType;
  qty: number;
  unitPrice: number;
  totalPrice: number;
  neededByWeek: number;
}

export default function CreateProjectPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [zone, setZone] = useState(zones[0]);
  const [description, setDescription] = useState("");
  const [goal, setGoal] = useState(150000);
  const [durationDays, setDurationDays] = useState(30);
  const [coverImage, setCoverImage] = useState(
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80"
  );
  const [projectType, setProjectType] = useState<ProjectType>("community");
  const [category, setCategory] = useState<CommunityCategory>("Personal");
  const [organizer, setOrganizer] = useState("");
  const [orgType, setOrgType] = useState<OrgType>("Government");
  const [verificationDoc, setVerificationDoc] = useState("");
  const [items, setItems] = useState<DraftItem[]>([
    {
      id: "draft-1",
      name: "",
      type: "unit",
      qty: 1,
      unitPrice: 1000,
      totalPrice: 0,
      neededByWeek: 1
    }
  ]);

  const addItem = () => {
    setItems((prev) => [
      ...prev,
      {
        id: `draft-${prev.length + 1}`,
        name: "",
        type: "unit",
        qty: 1,
        unitPrice: 1000,
        totalPrice: 0,
        neededByWeek: 1
      }
    ]);
  };

  const updateItem = (index: number, update: Partial<DraftItem>) => {
    setItems((prev) => prev.map((item, idx) => (idx === index ? { ...item, ...update } : item)));
  };

  const handleSubmit = async () => {
    const bom: BomItem[] = items.map((item) => ({
      id: `bom-${item.id}`,
      name: item.name,
      type: item.type,
      qty: item.type === "unit" ? item.qty : undefined,
      unitPrice: item.type === "unit" ? item.unitPrice : undefined,
      totalPrice: item.type !== "unit" ? item.totalPrice : undefined,
      fundedAmount: 0,
      neededByWeek: item.neededByWeek
    }));

    await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        zone,
        description,
        goal,
        durationDays,
        coverImage,
        organizer,
        orgType: projectType === "official" ? orgType : "Community",
        type: projectType,
        verificationDoc: projectType === "official" ? verificationDoc : undefined,
        category: projectType === "community" ? category : undefined,
        bom
      })
    });

    router.push("/admin");
  };

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <section className="rounded-3xl bg-white p-8 shadow-card">
        <h1 className="text-2xl font-semibold text-ink">Proponer proyecto</h1>
        <p className="mt-2 text-sm text-steel">Los proyectos se publican después de aprobación admin.</p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase text-steel">Título</label>
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase text-steel">Zona</label>
            <select
              value={zone}
              onChange={(event) => setZone(event.target.value)}
              className="w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm"
            >
              {zones.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-xs font-semibold uppercase text-steel">Descripción</label>
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              className="w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm"
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase text-steel">Meta</label>
            <input
              type="number"
              value={goal}
              onChange={(event) => setGoal(Number(event.target.value))}
              className="w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase text-steel">Duración (días)</label>
            <input
              type="number"
              value={durationDays}
              onChange={(event) => setDurationDays(Number(event.target.value))}
              className="w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase text-steel">Cover image URL</label>
            <input
              value={coverImage}
              onChange={(event) => setCoverImage(event.target.value)}
              className="w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase text-steel">Tipo de proyecto</label>
            <select
              value={projectType}
              onChange={(event) => setProjectType(event.target.value as ProjectType)}
              className="w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm"
            >
              <option value="community">Comunidad</option>
              <option value="official">Oficial</option>
            </select>
            {projectType === "community" && (
              <p className="text-xs text-steel">
                Comunidad: campañas libres creadas por personas. Apoya lo que tú quieras. No son proyectos oficiales.
              </p>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase text-steel">Organizador</label>
            <input
              value={organizer}
              onChange={(event) => setOrganizer(event.target.value)}
              className="w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm"
            />
          </div>
          {projectType === "community" && (
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase text-steel">Categoría</label>
              <select
                value={category}
                onChange={(event) => setCategory(event.target.value as CommunityCategory)}
                className="w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm"
              >
                {communityCategories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          )}
          {projectType === "official" && (
            <>
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase text-steel">Tipo de entidad</label>
                <select
                  value={orgType}
                  onChange={(event) => setOrgType(event.target.value as OrgType)}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm"
                >
                  <option value="Business">Empresa</option>
                  <option value="Government">Gobierno</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase text-steel">Prueba de verificación</label>
                <input
                  value={verificationDoc}
                  onChange={(event) => setVerificationDoc(event.target.value)}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm"
                  placeholder="URL o folio de verificación"
                />
              </div>
            </>
          )}
        </div>

        <div className="mt-8 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-ink">BOM builder</h2>
            <button onClick={addItem} className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold">
              Agregar pieza
            </button>
          </div>

          <div className="space-y-4">
            {items.map((item, index) => (
              <div key={item.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase text-steel">Nombre</label>
                    <input
                      value={item.name}
                      onChange={(event) => updateItem(index, { name: event.target.value })}
                      className="w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase text-steel">Tipo</label>
                    <select
                      value={item.type}
                      onChange={(event) => updateItem(index, { type: event.target.value as BomType })}
                      className="w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm"
                    >
                      <option value="unit">Unitario</option>
                      <option value="total">Total</option>
                      <option value="flex">Monto libre</option>
                    </select>
                  </div>
                  {item.type === "unit" && (
                    <>
                      <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase text-steel">Cantidad</label>
                        <input
                          type="number"
                          value={item.qty}
                          onChange={(event) => updateItem(index, { qty: Number(event.target.value) })}
                          className="w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase text-steel">Precio unitario</label>
                        <input
                          type="number"
                          value={item.unitPrice}
                          onChange={(event) => updateItem(index, { unitPrice: Number(event.target.value) })}
                          className="w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm"
                        />
                      </div>
                    </>
                  )}
                  {item.type !== "unit" && (
                    <div className="space-y-2">
                      <label className="text-xs font-semibold uppercase text-steel">Precio total</label>
                      <input
                        type="number"
                        value={item.totalPrice}
                        onChange={(event) => updateItem(index, { totalPrice: Number(event.target.value) })}
                        className="w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm"
                      />
                    </div>
                  )}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase text-steel">Se necesita en semana</label>
                    <input
                      type="number"
                      value={item.neededByWeek}
                      onChange={(event) => updateItem(index, { neededByWeek: Number(event.target.value) })}
                      className="w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="mt-8 w-full rounded-full bg-ink px-4 py-3 text-sm font-semibold text-white"
        >
          Guardar propuesta (Pending)
        </button>
      </section>
    </main>
  );
}
