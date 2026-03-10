import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const items = [
    {
      name: "Kit Solar Híbrido 3 kW",
      slug: "kit-solar-hibrido-3kw",
      category: "Kits solares",
      shortDesc: "Kit híbrido para vivienda o pequeño establecimiento.",
      description: "Incluye inversor híbrido, estructura y soporte técnico para instalación.",
      price: 3800000,
      currency: "ARS",
      images: JSON.stringify(["https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1200&auto=format&fit=crop"]),
      featured: true,
      active: true
    },
    {
      name: "Bomba Solar Sumergible",
      slug: "bomba-solar-sumergible",
      category: "Bombeo solar",
      shortDesc: "Solución eficiente para perforaciones rurales.",
      description: "Bomba con controlador y configuración para trabajo con paneles solares.",
      price: null,
      currency: "ARS",
      images: JSON.stringify(["https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=1200&auto=format&fit=crop"]),
      featured: true,
      active: true
    }
  ];

  for (const item of items) {
    await prisma.product.upsert({ where: { slug: item.slug }, update: item, create: item });
  }
  console.log("Seed completado");
}

main().finally(async () => { await prisma.$disconnect(); });
