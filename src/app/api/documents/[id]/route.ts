import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyAdminAuth } from "@/lib/auth";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const doc = db.getDocumentById(id);
    if (!doc) {
      return NextResponse.json({ error: "Documento não encontrado." }, { status: 404 });
    }
    return NextResponse.json(doc);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar documento." }, { status: 500 });
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
    const updated = db.updateDocument(id, body);
    if (!updated) {
      return NextResponse.json({ error: "Documento não encontrado para atualização." }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao atualizar documento." }, { status: 500 });
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
    const success = db.deleteDocument(id);
    if (!success) {
      return NextResponse.json({ error: "Documento não encontrado para exclusão." }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: "Documento excluído com sucesso." });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao excluir documento." }, { status: 500 });
  }
}
