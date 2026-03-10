import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional().nullable(),
  message: z.string().min(5),
  source: z.string().optional().nullable(),
});

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";
  let body: any = null;

  if (contentType.includes("application/json")) {
    body = await request.json().catch(() => null);
  } else {
    const form = await request.formData().catch(() => null);
    if (form) body = { name: String(form.get("name") ?? ""), email: String(form.get("email") ?? ""), phone: String(form.get("phone") ?? ""), message: String(form.get("message") ?? ""), source: String(form.get("source") ?? "") };
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Datos inválidos", details: parsed.error.flatten() }, { status: 400 });

  await prisma.inquiry.create({ data: { ...parsed.data, phone: parsed.data.phone ?? null, source: parsed.data.source ?? null } });

  if (!contentType.includes("application/json")) return NextResponse.redirect(new URL("/gracias", request.url));
  return NextResponse.json({ ok: true });
}
