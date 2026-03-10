"use client";

import { useState } from "react";
import { slugify } from "@/lib/slugify";

export default function NewProductPage() {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("Kits solares");
  const [shortDesc, setShortDesc] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("ARS");
  const [imagesText, setImagesText] = useState("");
  const [featured, setFeatured] = useState(false);
  const [active, setActive] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    setSaving(true);
    setError(null);

    const images = imagesText.split("\n").map((item) => item.trim()).filter(Boolean);

    const response = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-admin-request": "1" },
      body: JSON.stringify({
        name,
        slug: slug || slugify(name),
        category,
        shortDesc,
        description,
        price: price ? Number(price) : null,
        currency,
        images,
        featured,
        active,
      }),
    });

    const data = await response.json().catch(() => null);
    if (!response.ok) {
      setError(data?.error ?? "No se pudo guardar");
      setSaving(false);
      return;
    }

    window.location.href = `/admin/productos/${data.id}`;
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-semibold">Nuevo producto</h1>

      <form onSubmit={onSubmit} className="mt-6 grid gap-4 rounded-3xl border p-6">
        <div className="grid gap-2">
          <label className="text-sm text-slate-600">Nombre</label>
          <input
            className="rounded-2xl border px-4 py-3 text-sm"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (!slug) setSlug(slugify(e.target.value));
            }}
            required
          />
        </div>

        <div className="grid gap-2">
          <label className="text-sm text-slate-600">Slug</label>
          <input className="rounded-2xl border px-4 py-3 text-sm" value={slug} onChange={(e) => setSlug(e.target.value)} />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="grid gap-2">
            <label className="text-sm text-slate-600">Categoría</label>
            <input className="rounded-2xl border px-4 py-3 text-sm" value={category} onChange={(e) => setCategory(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <label className="text-sm text-slate-600">Precio (vacío = Consultar)</label>
            <input className="rounded-2xl border px-4 py-3 text-sm" value={price} onChange={(e) => setPrice(e.target.value)} inputMode="numeric" />
          </div>
        </div>

        <div className="grid gap-2">
          <label className="text-sm text-slate-600">Moneda</label>
          <select className="rounded-2xl border px-4 py-3 text-sm" value={currency} onChange={(e) => setCurrency(e.target.value)}>
            <option value="ARS">ARS</option>
            <option value="USD">USD</option>
          </select>
        </div>

        <div className="grid gap-2">
          <label className="text-sm text-slate-600">Descripción corta</label>
          <textarea className="rounded-2xl border px-4 py-3 text-sm" rows={2} value={shortDesc} onChange={(e) => setShortDesc(e.target.value)} required />
        </div>

        <div className="grid gap-2">
          <label className="text-sm text-slate-600">Descripción completa</label>
          <textarea className="rounded-2xl border px-4 py-3 text-sm" rows={7} value={description} onChange={(e) => setDescription(e.target.value)} required />
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
            Cuando subís una imagen, el sistema la guarda en <span className="font-medium">/public/uploads</span> y agrega su URL automáticamente.
          </p>
        </div>

        <div className="grid gap-2">
          <label className="text-sm text-slate-600">Imágenes (una URL por línea)</label>
          <textarea className="rounded-2xl border px-4 py-3 text-sm" rows={5} value={imagesText} onChange={(e) => setImagesText(e.target.value)} />
          <p className="text-xs text-slate-500">También podés pegar URLs manualmente o usar rutas locales como /uploads/archivo.jpg</p>
        </div>

        <div className="flex flex-wrap gap-4 text-sm">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={active} onChange={(e) => setActive(e.target.checked)} />
            Activo
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} />
            Destacado
          </label>
        </div>

        <button disabled={saving || uploading} className="rounded-2xl bg-slate-900 px-4 py-3 text-sm text-white hover:opacity-90 disabled:opacity-60">
          {uploading ? "Subiendo imágenes..." : saving ? "Guardando..." : "Guardar producto"}
        </button>

        {error ? <div className="text-sm text-red-600">{error}</div> : null}
      </form>
    </div>
  );
}
