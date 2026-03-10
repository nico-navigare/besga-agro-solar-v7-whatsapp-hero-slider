"use client";

import { useState } from "react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      setError(data?.error ?? "No se pudo iniciar sesión");
      setLoading(false);
      return;
    }

    window.location.href = "/admin";
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <h1 className="text-2xl font-semibold">Panel administrador</h1>
      <p className="mt-2 text-sm text-slate-600">Ingresá con el email y la contraseña configurados en el archivo .env</p>
      <form onSubmit={onSubmit} className="mt-6 grid gap-3 rounded-3xl border p-6">
        <input className="rounded-2xl border px-4 py-3 text-sm" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input className="rounded-2xl border px-4 py-3 text-sm" type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button disabled={loading} className="rounded-2xl bg-slate-900 px-4 py-3 text-sm text-white hover:opacity-90 disabled:opacity-60">{loading ? "Ingresando..." : "Ingresar"}</button>
        {error ? <div className="text-sm text-red-600">{error}</div> : null}
      </form>
    </div>
  );
}
