import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyAdminAuth } from "@/lib/auth";

export async function GET() {
  try {
    const config = db.getConfig();
    return NextResponse.json(config);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao obter configurações." }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const isAuth = await verifyAdminAuth();
  if (!isAuth) {
    return NextResponse.json({ error: "Acesso não autorizado." }, { status: 401 });
  }

  try {
    const body = await request.json();
    const updated = db.updateConfig(body);
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao atualizar configurações." }, { status: 500 });
  }
}
