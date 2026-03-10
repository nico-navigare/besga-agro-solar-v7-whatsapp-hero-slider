import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/product-card";
import { Section } from "@/components/section";
import { HeroSlider } from "@/components/hero-slider";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const featured = await prisma.product.findMany({
    where: { active: true, featured: true },
    orderBy: { updatedAt: "desc" },
    take: 6,
  });

  return (
    <div>
      <HeroSlider />

      <Section title="Productos destacados" subtitle="Desde el panel podés marcar productos para mostrarlos acá.">
        {featured.length ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border p-6 text-sm text-slate-600">Todavía no hay productos destacados.</div>
        )}
      </Section>
    </div>
  );
}
