import { NextResponse } from "next/server";
import { clearAdminSession } from "@/lib/auth";

export async function POST() {
  clearAdminSession();
  return NextResponse.redirect(new URL("/admin/login", process.env.SITE_URL ?? "http://localhost:3000"));
}
