import { prisma } from "@/lib/prisma";
import { ProductGallery } from "@/components/product-gallery";

export const dynamic = "force-dynamic";

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await prisma.product.findUnique({ where: { slug: params.slug } });

  if (!product || !product.active) {
    return (
      <div className="container-page section-space">
        <h1 className="text-2xl font-semibold">Producto no disponible</h1>
      </div>
    );
  }

  const images: string[] = JSON.parse(product.images || "[]");
  const safeImages = images.length ? images : [];
  const value =
    product.price == null
      ? "Consultar"
      : new Intl.NumberFormat("es-AR", { style: "currency", currency: product.currency }).format(product.price);

  const wa = process.env.WHATSAPP_NUMBER;
  const waUrl = wa
    ? `https://wa.me/${wa}?text=${encodeURIComponent(`Hola, quiero consultar por ${product.name}`)}`
    : null;

  return (
    <div className="container-page section-space">
      <div className="grid gap-8 xl:grid-cols-[minmax(0,1.1fr)_520px] xl:items-start">
        <div>
          <ProductGallery images={safeImages} alt={product.name} />
        </div>

        <div className="xl:sticky xl:top-24">
          <div className="rounded-3xl border bg-white p-5 shadow-sm sm:p-6 lg:p-8">
            <div className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
              Consulta por producto
            </div>

            <h1 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
              {product.name}
            </h1>

            <div className="mt-3 text-sm text-slate-500">{product.category}</div>

            <div className="mt-4 text-lg font-semibold sm:text-xl">{value}</div>

            <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
              {product.shortDesc}
            </p>

            <div className="my-6 border-t" />

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-800">
                Realizar una consulta
              </div>
              {waUrl ? (
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="touch-target inline-flex min-h-11 items-center justify-center rounded-2xl border px-4 py-2 text-sm font-semibold no-underline hover:bg-slate-50"
                >
                  WhatsApp
                </a>
              ) : null}
            </div>

            <form action="/api/inquiries" method="post" className="mt-5 grid gap-4">
              <input type="hidden" name="source" value={`producto:${product.slug}:${product.name}`} />

              <input
                name="name"
                required
                placeholder="Nombre y Apellido"
                className="min-h-12 rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-slate-400"
              />

              <input
                name="email"
                type="email"
                required
                placeholder="Email"
                className="min-h-12 rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-slate-400"
              />

              <input
                name="phone"
                placeholder="Teléfono"
                className="min-h-12 rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-slate-400"
              />

              <textarea
                name="message"
                required
                rows={7}
                placeholder={`Detalle su consulta sobre ${product.name}`}
                className="rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-slate-400"
              />

              <button className="touch-target mt-2 inline-flex min-h-12 items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:opacity-90">
                Enviar mensaje
              </button>
            </form>

            <div className="mt-8 border-t pt-6">
              <div className="text-sm font-semibold text-slate-900">Descripción del producto</div>
              <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-slate-600 sm:text-base">
                {product.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
