import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { AdminShell } from "@/components/admin-shell";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({ orderBy: { updatedAt: "desc" } });

  return (
    <AdminShell title="Productos">
      <div className="mb-6"><Link href="/admin/productos/nuevo" className="rounded-2xl bg-slate-900 px-4 py-2 text-sm text-white no-underline hover:opacity-90">+ Nuevo producto</Link></div>
      <div className="overflow-auto rounded-3xl border"><table className="w-full text-sm"><thead className="text-left text-slate-500"><tr><th className="p-4">Nombre</th><th className="p-4">Slug</th><th className="p-4">Categoría</th><th className="p-4">Activo</th><th className="p-4">Destacado</th><th className="p-4"></th></tr></thead><tbody>{products.map((item) => <tr key={item.id} className="border-t"><td className="p-4">{item.name}</td><td className="p-4 text-slate-500">{item.slug}</td><td className="p-4">{item.category}</td><td className="p-4">{item.active ? "Sí" : "No"}</td><td className="p-4">{item.featured ? "Sí" : "No"}</td><td className="p-4 text-right"><Link href={`/admin/productos/${item.id}`} className="no-underline hover:underline">Editar</Link></td></tr>)}</tbody></table></div>
    </AdminShell>
  );
}
