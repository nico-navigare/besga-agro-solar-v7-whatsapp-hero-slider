import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";
import { AdminShell } from "@/components/admin-shell";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = await getAdminSession();
  const [products, inquiries] = await Promise.all([
    prisma.product.findMany({ orderBy: { updatedAt: "desc" }, take: 10 }),
    prisma.inquiry.findMany({ orderBy: { createdAt: "desc" }, take: 10 }),
  ]);

  return (
    <AdminShell title="Inicio del panel">
      <div className="mb-6 rounded-3xl border bg-slate-50 p-5 text-sm text-slate-600">Sesión activa: <span className="font-medium text-slate-800">{session?.email}</span></div>
      <div className="grid gap-8 lg:grid-cols-2">
        <section className="rounded-3xl border p-6">
          <div className="flex items-center justify-between"><h2 className="font-semibold">Productos</h2><Link href="/admin/productos/nuevo" className="rounded-2xl bg-slate-900 px-4 py-2 text-sm text-white no-underline hover:opacity-90">+ Nuevo producto</Link></div>
          <div className="mt-4 overflow-auto"><table className="w-full text-sm"><thead className="text-left text-slate-500"><tr><th className="py-2">Nombre</th><th className="py-2">Categoría</th><th className="py-2">Activo</th><th className="py-2"></th></tr></thead><tbody>{products.map((item) => <tr key={item.id} className="border-t"><td className="py-2">{item.name}</td><td className="py-2">{item.category}</td><td className="py-2">{item.active ? "Sí" : "No"}</td><td className="py-2 text-right"><Link href={`/admin/productos/${item.id}`} className="no-underline hover:underline">Editar</Link></td></tr>)}</tbody></table></div>
        </section>
        <section className="rounded-3xl border p-6">
          <div className="flex items-center justify-between"><h2 className="font-semibold">Consultas</h2><Link href="/admin/consultas" className="text-sm no-underline hover:underline">Ver todas</Link></div>
          <div className="mt-4 overflow-auto"><table className="w-full text-sm"><thead className="text-left text-slate-500"><tr><th className="py-2">Fecha</th><th className="py-2">Nombre</th><th className="py-2">Estado</th></tr></thead><tbody>{inquiries.map((item) => <tr key={item.id} className="border-t"><td className="py-2 whitespace-nowrap">{new Date(item.createdAt).toLocaleString("es-AR")}</td><td className="py-2">{item.name}</td><td className="py-2">{item.status}</td></tr>)}</tbody></table></div>
        </section>
      </div>
    </AdminShell>
  );
}
