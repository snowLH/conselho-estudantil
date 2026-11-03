import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyAdminAuth } from "@/lib/auth";

export async function PATCH(
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
    const updated = db.updateSuggestionStatus(id, body.status, body.adminNotes);
    if (!updated) {
      return NextResponse.json({ error: "Sugestão não encontrada." }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao atualizar sugestão." }, { status: 500 });
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
    const success = db.deleteSuggestion(id);
    if (!success) {
      return NextResponse.json({ error: "Sugestão não encontrada para exclusão." }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: "Sugestão excluída." });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao excluir sugestão." }, { status: 500 });
  }
}
