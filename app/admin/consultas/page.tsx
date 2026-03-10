import { prisma } from "@/lib/prisma";
import { AdminShell } from "@/components/admin-shell";

export const dynamic = "force-dynamic";

export default async function AdminInquiriesPage() {
  const inquiries = await prisma.inquiry.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <AdminShell title="Consultas recibidas">
      <div className="overflow-auto rounded-3xl border">
        <table className="w-full text-sm">
          <thead className="text-left text-slate-500"><tr><th className="p-4">Fecha</th><th className="p-4">Nombre</th><th className="p-4">Email</th><th className="p-4">Teléfono</th><th className="p-4">Estado</th><th className="p-4">Mensaje</th></tr></thead>
          <tbody>{inquiries.map((item) => <tr key={item.id} className="border-t align-top"><td className="p-4 whitespace-nowrap">{new Date(item.createdAt).toLocaleString("es-AR")}</td><td className="p-4">{item.name}</td><td className="p-4">{item.email}</td><td className="p-4">{item.phone ?? "-"}</td><td className="p-4">{item.status}</td><td className="max-w-lg whitespace-pre-wrap p-4">{item.message}</td></tr>)}</tbody>
        </table>
      </div>
    </AdminShell>
  );
}
