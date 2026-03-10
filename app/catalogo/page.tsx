import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/product-card";
import { Section } from "@/components/section";

export const dynamic = "force-dynamic";

export default async function CatalogoPage({
  searchParams,
}: {
  searchParams: { categoria?: string; q?: string };
}) {
  const categoria = (searchParams.categoria ?? "").trim();
  const q = (searchParams.q ?? "").trim();

  const products = await prisma.product.findMany({
    where: {
      active: true,
      ...(categoria ? { category: categoria } : {}),
      ...(q
        ? {
            OR: [{ name: { contains: q } }, { shortDesc: { contains: q } }, { description: { contains: q } }],
          }
        : {}),
    },
    orderBy: { updatedAt: "desc" },
  });

  const rows = await prisma.product.findMany({
    where: { active: true },
    select: { category: true },
    distinct: ["category"],
    orderBy: { category: "asc" },
  });

  return (
    <Section title="Catálogo" subtitle="Buscá por categoría o por palabra clave.">
      <form method="get" action="/catalogo" className="grid gap-3 md:grid-cols-[1fr_220px_auto]">
        <input name="q" defaultValue={q} placeholder="Buscar producto" className="min-h-12 rounded-2xl border px-4 py-3 text-sm" />
        <select name="categoria" defaultValue={categoria} className="min-h-12 rounded-2xl border px-4 py-3 text-sm">
          <option value="">Todas las categorías</option>
          {rows.map((r) => (
            <option key={r.category} value={r.category}>
              {r.category}
            </option>
          ))}
        </select>
        <button className="touch-target inline-flex min-h-12 items-center justify-center rounded-2xl bg-slate-900 px-4 py-3 text-sm font-medium text-white hover:opacity-90">
          Filtrar
        </button>
      </form>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </Section>
  );
}
