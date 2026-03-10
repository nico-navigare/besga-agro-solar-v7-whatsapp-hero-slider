import Image from "next/image";
import Link from "next/link";

export function ProductCard({
  product,
}: {
  product: {
    id: string;
    name: string;
    slug: string;
    category: string;
    shortDesc: string;
    images: string;
    price: number | null;
    currency: string;
  };
}) {
  const images: string[] = JSON.parse(product.images || "[]");
  const cover = images[0];
  const value =
    product.price == null
      ? "Consultar"
      : new Intl.NumberFormat("es-AR", { style: "currency", currency: product.currency }).format(product.price);

  return (
    <Link href={`/producto/${product.slug}`} className="group no-underline">
      <article className="overflow-hidden rounded-3xl border bg-white transition duration-200 hover:-translate-y-0.5 hover:shadow-sm">
        <div className="relative aspect-[4/3] bg-slate-50">
          {cover ? (
            <Image src={cover} alt={product.name} fill className="object-cover transition duration-300 group-hover:scale-[1.02]" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-sm text-slate-400">Sin imagen</div>
          )}
        </div>

        <div className="space-y-2 p-4 sm:p-5">
          <div className="text-xs text-slate-500">{product.category}</div>
          <div className="text-base font-semibold leading-6 sm:text-lg">{product.name}</div>
          <p className="line-clamp-2 text-sm leading-6 text-slate-600">{product.shortDesc}</p>
          <div className="pt-1 text-sm font-semibold sm:text-base">{value}</div>
        </div>
      </article>
    </Link>
  );
}
