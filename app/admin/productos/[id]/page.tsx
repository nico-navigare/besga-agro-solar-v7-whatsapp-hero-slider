"use client";

import { useEffect, useState } from "react";

type Product = {
  id: string;
  name: string;
  slug: string;
  category: string;
  shortDesc: string;
  description: string;
  price: number | null;
  currency: string;
  images: string;
  featured: boolean;
  active: boolean;
};

export default function EditProductPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [imagesText, setImagesText] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/products/${params.id}`, { headers: { "x-admin-request": "1" } })
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setImagesText(JSON.parse(data.images || "[]").join("\n"));
      })
      .catch(() => setError("No se pudo cargar el producto"));
  }, [params.id]);

  async function uploadFiles(files: FileList | null) {
    if (!files?.length) return;
    setUploading(true);
    setError(null);

    try {
      const uploadedUrls: string[] = [];
      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("/api/upload-image", { method: "POST", body: formData });
        const data = await response.json().catch(() => null);

        if (!response.ok) {
          throw new Error(data?.error ?? "No se pudo subir la imagen");
        }
        uploadedUrls.push(data.url);
      }

      setImagesText((prev) => [prev.trim(), ...uploadedUrls].filter(Boolean).join("\n"));
    } catch (err: any) {
      setError(err?.message ?? "No se pudo subir la imagen");
    } finally {
      setUploading(false);
    }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!product) return;

    setSaving(true);
    setError(null);

    const images = imagesText.split("\n").map((item) => item.trim()).filter(Boolean);

    const response = await fetch(`/api/products/${product.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", "x-admin-request": "1" },
      body: JSON.stringify({ ...product, images }),
    });

    const data = await response.json().catch(() => null);
    if (!response.ok) {
      setError(data?.error ?? "No se pudo guardar");
      setSaving(false);
      return;
    }

    setProduct(data);
    setSaving(false);
  }

  async function removeProduct() {
    if (!product) return;
    if (!confirm("¿Eliminar producto?")) return;

    const response = await fetch(`/api/products/${product.id}`, { method: "DELETE", headers: { "x-admin-request": "1" } });
    if (response.ok) window.location.href = "/admin/productos";
  }

  if (!product) return <div className="mx-auto max-w-3xl px-4 py-10 text-slate-600">Cargando...</div>;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="mb-6 flex items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold">Editar producto</h1>
        <button onClick={removeProduct} className="rounded-2xl border px-4 py-2 text-sm hover:bg-slate-50">Eliminar</button>
      </div>

      <form onSubmit={onSubmit} className="grid gap-4 rounded-3xl border p-6">
        <div className="grid gap-2">
          <label className="text-sm text-slate-600">Nombre</label>
          <input className="rounded-2xl border px-4 py-3 text-sm" value={product.name} onChange={(e) => setProduct({ ...product, name: e.target.value })} />
        </div>

        <div className="grid gap-2">
          <label className="text-sm text-slate-600">Slug</label>
          <input className="rounded-2xl border px-4 py-3 text-sm" value={product.slug} onChange={(e) => setProduct({ ...product, slug: e.target.value })} />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="grid gap-2">
            <label className="text-sm text-slate-600">Categoría</label>
            <input className="rounded-2xl border px-4 py-3 text-sm" value={product.category} onChange={(e) => setProduct({ ...product, category: e.target.value })} />
          </div>
          <div className="grid gap-2">
            <label className="text-sm text-slate-600">Precio</label>
            <input className="rounded-2xl border px-4 py-3 text-sm" value={product.price ?? ""} onChange={(e) => setProduct({ ...product, price: e.target.value === "" ? null : Number(e.target.value) })} />
          </div>
        </div>

        <div className="grid gap-2">
          <label className="text-sm text-slate-600">Moneda</label>
          <select className="rounded-2xl border px-4 py-3 text-sm" value={product.currency} onChange={(e) => setProduct({ ...product, currency: e.target.value })}>
            <option value="ARS">ARS</option>
            <option value="USD">USD</option>
          </select>
        </div>

        <div className="grid gap-2">
          <label className="text-sm text-slate-600">Descripción corta</label>
          <textarea className="rounded-2xl border px-4 py-3 text-sm" rows={2} value={product.shortDesc} onChange={(e) => setProduct({ ...product, shortDesc: e.target.value })} />
        </div>

        <div className="grid gap-2">
          <label className="text-sm text-slate-600">Descripción completa</label>
          <textarea className="rounded-2xl border px-4 py-3 text-sm" rows={7} value={product.description} onChange={(e) => setProduct({ ...product, description: e.target.value })} />
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-medium text-slate-700">Subir imágenes desde tu PC</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => uploadFiles(e.target.files)}
            className="rounded-2xl border px-4 py-3 text-sm file:mr-3 file:rounded-xl file:border-0 file:bg-slate-900 file:px-3 file:py-2 file:text-white"
          />
          <p className="text-xs text-slate-500">
            Al subir una imagen, se guarda en <span className="font-medium">/public/uploads</span> y su URL se agrega al listado.
          </p>
        </div>

        <div className="grid gap-2">
          <label className="text-sm text-slate-600">Imágenes (una URL por línea)</label>
          <textarea className="rounded-2xl border px-4 py-3 text-sm" rows={5} value={imagesText} onChange={(e) => setImagesText(e.target.value)} />
        </div>

        <div className="flex flex-wrap gap-4 text-sm">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={product.active} onChange={(e) => setProduct({ ...product, active: e.target.checked })} />
            Activo
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={product.featured} onChange={(e) => setProduct({ ...product, featured: e.target.checked })} />
            Destacado
          </label>
        </div>

        <button disabled={saving || uploading} className="rounded-2xl bg-slate-900 px-4 py-3 text-sm text-white hover:opacity-90 disabled:opacity-60">
          {uploading ? "Subiendo imágenes..." : saving ? "Guardando..." : "Guardar cambios"}
        </button>

        {error ? <div className="text-sm text-red-600">{error}</div> : null}
      </form>
    </div>
  );
}
