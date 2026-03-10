import { Section } from "@/components/section";

export default function ContactoPage() {
  const city = process.env.COMPANY_CITY ?? "Santa Rosa, La Pampa";
  const wa = process.env.WHATSAPP_NUMBER;
  const waUrl = wa ? `https://wa.me/${wa}?text=${encodeURIComponent("Hola, quiero pedir presupuesto.")}` : null;

  return (
    <Section title="Contacto" subtitle="Escribinos y armamos una propuesta según tu necesidad.">
      <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
        <div className="rounded-3xl border p-5 sm:p-6">
          <h3 className="font-semibold">Enviar consulta</h3>
          <form action="/api/inquiries" method="post" className="mt-4 grid gap-3">
            <input name="name" required placeholder="Nombre" className="min-h-12 rounded-2xl border px-4 py-3 text-sm" />
            <input name="email" type="email" required placeholder="Email" className="min-h-12 rounded-2xl border px-4 py-3 text-sm" />
            <input name="phone" placeholder="Teléfono" className="min-h-12 rounded-2xl border px-4 py-3 text-sm" />
            <textarea name="message" required rows={6} placeholder="Mensaje" className="rounded-2xl border px-4 py-3 text-sm" />
            <input type="hidden" name="source" value="contacto" />
            <button className="touch-target inline-flex min-h-12 items-center justify-center rounded-2xl bg-slate-900 px-4 py-3 text-sm font-medium text-white hover:opacity-90">
              Enviar consulta
            </button>
          </form>
        </div>

        <div className="rounded-3xl border p-5 sm:p-6">
          <h3 className="font-semibold">Datos</h3>
          <div className="mt-4 grid gap-2 text-sm leading-6 text-slate-600">
            <div><span className="text-slate-500">Zona:</span> {city}</div>
            {waUrl ? (
              <a href={waUrl} target="_blank" rel="noreferrer" className="mt-3 inline-flex min-h-12 items-center justify-center rounded-2xl border px-4 py-3 text-sm font-medium no-underline hover:bg-slate-50">
                Escribir por WhatsApp
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </Section>
  );
}
