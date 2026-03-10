import Link from "next/link";

export default function GraciasPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="text-3xl font-semibold">Gracias por tu consulta</h1>
      <p className="mt-3 text-slate-600">Recibimos tu mensaje y te responderemos a la brevedad.</p>
      <Link href="/catalogo" className="mt-8 inline-block rounded-2xl border px-5 py-3 text-sm no-underline hover:bg-slate-50">Volver al catálogo</Link>
    </div>
  );
}
