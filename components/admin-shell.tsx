import Link from "next/link";

export function AdminShell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="container-page section-space">
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="text-sm text-slate-500">Panel administrador</div>
          <h1 className="text-2xl font-semibold sm:text-3xl">{title}</h1>
        </div>

        <div className="flex flex-wrap gap-2 text-sm">
          <Link href="/admin" className="touch-target inline-flex items-center rounded-2xl border px-4 py-2 no-underline hover:bg-slate-50">Inicio panel</Link>
          <Link href="/admin/productos" className="touch-target inline-flex items-center rounded-2xl border px-4 py-2 no-underline hover:bg-slate-50">Productos</Link>
          <Link href="/admin/consultas" className="touch-target inline-flex items-center rounded-2xl border px-4 py-2 no-underline hover:bg-slate-50">Consultas</Link>
          <form action="/api/admin/logout" method="post">
            <button className="touch-target inline-flex items-center rounded-2xl border px-4 py-2 hover:bg-slate-50">Salir</button>
          </form>
        </div>
      </div>

      {children}
    </div>
  );
}
