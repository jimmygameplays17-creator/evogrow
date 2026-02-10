export default function HowItWorksPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <section className="rounded-3xl border border-white/10 bg-card p-8 shadow-card">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-white">Cómo funciona</h1>
          <p className="text-sm text-slate-400">
            Fundra conecta a tu comunidad con proyectos transparentes, aportes claros y seguimiento continuo.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Publica tu proyecto",
              description: "Comparte tu meta, materiales y calendario. La comunidad podrá ver cada pieza."
            },
            {
              title: "Comunidad dona (fiat/crypto demo)",
              description: "Aporta con tarjeta, transferencia o Solana Pay en modo demo."
            },
            {
              title: "Transparencia y updates",
              description: "Actualiza avances, fotos y reportes. Cada aporte se refleja en el progreso."
            }
          ].map((step, index) => (
            <div
              key={step.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <p className="text-xs font-semibold uppercase text-slate-400">Paso {index + 1}</p>
              <h2 className="mt-2 text-lg font-semibold text-white">{step.title}</h2>
              <p className="mt-2 text-sm text-slate-400">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-semibold text-white">FAQ</h2>
          <div className="mt-4 space-y-4 text-sm text-slate-400">
            <div>
              <p className="font-semibold text-slate-100">¿Esto ya tiene pagos reales?</p>
              <p>Por ahora es una demo. Simulamos pagos para probar el flujo.</p>
            </div>
            <div>
              <p className="font-semibold text-slate-100">¿Cómo se muestra la transparencia?</p>
              <p>Las piezas del BOM y las actualizaciones quedan visibles para todos.</p>
            </div>
            <div>
              <p className="font-semibold text-slate-100">¿Quién puede publicar?</p>
              <p>Cualquier persona, además de entidades oficiales o creadores verificados.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
