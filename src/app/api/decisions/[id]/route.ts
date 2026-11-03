import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyAdminAuth } from "@/lib/auth";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const decision = db.getDecisionById(id);
    if (!decision) {
      return NextResponse.json({ error: "Decisão não encontrada." }, { status: 404 });
    }
    return NextResponse.json(decision);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar decisão." }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const isAuth = await verifyAdminAuth();
  if (!isAuth) {
    return NextResponse.json({ error: "Acesso não autorizado." }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const updated = db.updateDecision(id, body);
    if (!updated) {
      return NextResponse.json({ error: "Decisão não encontrada para atualização." }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao atualizar decisão." }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const isAuth = await verifyAdminAuth();
  if (!isAuth) {
    return NextResponse.json({ error: "Acesso não autorizado." }, { status: 401 });
  }

  try {
    const { id } = await params;
    const success = db.deleteDecision(id);
    if (!success) {
      return NextResponse.json({ error: "Decisão não encontrada para exclusão." }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: "Decisão excluída com sucesso." });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao excluir decisão." }, { status: 500 });
  }
}
