import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container-page section-space grid gap-8 md:grid-cols-3">
        <div>
          <div className="font-semibold">Besga Agro Solar</div>
          <p className="mt-2 max-w-sm text-sm leading-6 text-slate-600">
            Venta, instalación y asesoramiento en sistemas solares para el agro, industria y viviendas.
          </p>
        </div>

        <div>
          <div className="font-semibold">Navegación</div>
          <div className="mt-2 grid gap-2 text-sm">
            <Link className="touch-target flex items-center no-underline hover:underline" href="/catalogo">Catálogo</Link>
            <Link className="touch-target flex items-center no-underline hover:underline" href="/servicios">Servicios</Link>
            <Link className="touch-target flex items-center no-underline hover:underline" href="/proyectos">Proyectos</Link>
            <Link className="touch-target flex items-center no-underline hover:underline" href="/contacto">Contacto</Link>
          </div>
        </div>

        <div>
          <div className="font-semibold">Administración</div>
          <p className="mt-2 max-w-sm text-sm leading-6 text-slate-600">
            Panel seguro para carga de productos y consulta de mensajes.
          </p>
          <Link className="mt-3 inline-flex min-h-11 items-center no-underline hover:underline" href="/admin/login">
            Ingresar al panel →
          </Link>
        </div>
      </div>

      <div className="border-t px-4 py-4 text-center text-xs text-slate-500">
        © 2026 Besga Agro Solar
      </div>
    </footer>
  );
}
