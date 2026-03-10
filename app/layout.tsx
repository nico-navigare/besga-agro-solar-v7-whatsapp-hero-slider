import { FloatingWhatsApp } from "@/components/floating-whatsapp";
import "./globals.css";
import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Besga Agro Solar",
  description: "Catálogo de energía solar, contacto y panel administrador",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen">
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />

          <FloatingWhatsApp />
          
        </div>
      </body>
    </html>
  );
}
