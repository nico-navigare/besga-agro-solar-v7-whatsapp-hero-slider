import Link from "next/link";
import { Section } from "@/components/section";

const services = [
  { title: "Bombeo solar", description: "Dimensionamiento, provisión y puesta en marcha de sistemas de bombeo para uso rural." },
  { title: "Kits solares", description: "Sistemas on-grid, híbridos y aislados con armado según consumo y necesidad." },
  { title: "Mantenimiento", description: "Revisión, diagnóstico, reemplazo de componentes y optimización del rendimiento." },
  { title: "Proyectos a medida", description: "Diseño técnico y comercial para establecimientos agropecuarios, industrias y comercios." },
];

export default function ServiciosPage() {
  return (
    <Section title="Servicios" subtitle="Soluciones llave en mano y acompañamiento técnico.">
      <div className="grid gap-4 lg:grid-cols-2">
        {services.map((s) => (
          <article key={s.title} className="rounded-3xl border p-5 sm:p-6">
            <h3 className="text-lg font-semibold">{s.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">{s.description}</p>
          </article>
        ))}
      </div>

      <div className="mt-8">
        <Link href="/contacto" className="touch-target inline-flex min-h-12 items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white no-underline hover:opacity-90">
          Pedir presupuesto
        </Link>
      </div>
    </Section>
  );
}
