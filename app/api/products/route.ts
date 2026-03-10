import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { getAdminSession } from "@/lib/auth";

const schema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  category: z.string().min(1),
  shortDesc: z.string().min(2),
  description: z.string().min(2),
  price: z.number().int().nullable(),
  currency: z.string().min(1),
 images: z.array(z.string().min(1)).default([]),
  featured: z.boolean().default(false),
  active: z.boolean().default(true),
});

export async function GET() {
  const items = await prisma.product.findMany({ where: { active: true }, orderBy: { updatedAt: "desc" } });
  return NextResponse.json(items);
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Datos inválidos", details: parsed.error.flatten() }, { status: 400 });

  try {
    const item = await prisma.product.create({ data: { ...parsed.data, images: JSON.stringify(parsed.data.images) } });
    return NextResponse.json(item);
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "No se pudo crear el producto" }, { status: 500 });
  }
}
