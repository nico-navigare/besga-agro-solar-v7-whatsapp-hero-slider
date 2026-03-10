"use client";

import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "/catalogo", label: "Catálogo" },
  { href: "/servicios", label: "Servicios" },
  { href: "/proyectos", label: "Proyectos" },
  { href: "/contacto", label: "Contacto" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
      <div className="container-page">
        <div className="flex min-h-16 items-center justify-between gap-3 py-2">
          <Link href="/" className="no-underline" onClick={() => setOpen(false)}>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl border font-semibold shadow-sm">BA</div>
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold sm:text-base">Besga Agro Solar</div>
                <div className="text-[11px] text-slate-500 sm:text-xs">Soluciones solares</div>
              </div>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="touch-target rounded-xl px-3 py-2 text-sm font-medium no-underline transition hover:bg-slate-100"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            className="touch-target inline-flex items-center justify-center rounded-xl border px-3 md:hidden"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            <div className="flex w-5 flex-col gap-1.5">
              <span className={`block h-0.5 rounded bg-slate-900 transition ${open ? "translate-y-2 rotate-45" : ""}`} />
              <span className={`block h-0.5 rounded bg-slate-900 transition ${open ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 rounded bg-slate-900 transition ${open ? "-translate-y-2 -rotate-45" : ""}`} />
            </div>
          </button>
        </div>

        {open ? (
          <nav className="grid gap-1 border-t py-3 md:hidden">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="touch-target rounded-xl px-3 py-3 text-sm font-medium no-underline transition hover:bg-slate-100"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        ) : null}
      </div>
    </header>
  );
}
