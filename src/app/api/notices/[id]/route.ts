import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyAdminAuth } from "@/lib/auth";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const notice = db.getNoticeById(id);
    if (!notice) {
      return NextResponse.json({ error: "Comunicado não encontrado." }, { status: 404 });
    }
    return NextResponse.json(notice);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar comunicado." }, { status: 500 });
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
    const updated = db.updateNotice(id, body);
    if (!updated) {
      return NextResponse.json({ error: "Comunicado não encontrado para atualização." }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao atualizar comunicado." }, { status: 500 });
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
    const success = db.deleteNotice(id);
    if (!success) {
      return NextResponse.json({ error: "Comunicado não encontrado para exclusão." }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: "Comunicado excluído com sucesso." });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao excluir comunicado." }, { status: 500 });
  }
}
