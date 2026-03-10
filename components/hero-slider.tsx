"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const slides = [
  "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1497440001374-f26997328c1b?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=2000&auto=format&fit=crop",
];

export function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((value) => (value + 1) % slides.length);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative min-h-[92svh] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide}
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url('${slide}')` }}
        />
      ))}

      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/75 via-slate-900/60 to-slate-950/80" />
      <div className="absolute inset-0 bg-black/25" />

      <div className="container-page relative z-10 flex min-h-[92svh] items-center py-16 sm:py-20 lg:py-24">
        <div className="max-w-3xl text-white">
          <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur sm:text-sm">
            Energía solar para el agro, industria y proyectos a medida
          </div>

          <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            Energía solar profesional para el agro y la industria
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-white/85 sm:text-lg">
            Diseño, provisión e instalación de kits solares, bombeo, inversores, baterías y soluciones a medida
            con estética profesional y rendimiento confiable.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/catalogo"
              className="touch-target inline-flex min-h-12 items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 no-underline transition hover:bg-white/90"
            >
              Ver catálogo
            </Link>
            <Link
              href="/contacto"
              className="touch-target inline-flex min-h-12 items-center justify-center rounded-2xl border border-white/25 bg-white/10 px-5 py-3 text-sm font-semibold text-white no-underline backdrop-blur transition hover:bg-white/15"
            >
              Pedir presupuesto
            </Link>
          </div>

          <div className="mt-10 flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrent(index)}
                aria-label={`Ir a slide ${index + 1}`}
                className={`h-2.5 rounded-full transition-all ${
                  index === current ? "w-8 bg-white" : "w-2.5 bg-white/50"
                }`}
              />
            ))}
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
              <div className="text-2xl font-semibold">+100</div>
              <div className="mt-1 text-sm text-white/80">soluciones configurables</div>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
              <div className="text-2xl font-semibold">24/7</div>
              <div className="mt-1 text-sm text-white/80">asesoramiento técnico</div>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
              <div className="text-2xl font-semibold">Agro + Industria</div>
              <div className="mt-1 text-sm text-white/80">enfoque comercial y productivo</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
