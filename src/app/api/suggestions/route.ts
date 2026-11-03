import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyAdminAuth } from "@/lib/auth";

export async function GET() {
  const isAuth = await verifyAdminAuth();
  if (!isAuth) {
    return NextResponse.json({ error: "Acesso não autorizado." }, { status: 401 });
  }

  try {
    const suggestions = db.getSuggestions();
    return NextResponse.json(suggestions);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar sugestões." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.title || !body.description || !body.studentClass) {
      return NextResponse.json(
        { error: "Por favor preencha os campos obrigatórios (Título, Turma e Descrição)." },
        { status: 400 }
      );
    }

    const newSug = db.createSuggestion({
      date: new Date().toLocaleDateString("pt-BR"),
      studentName: body.isAnonymous ? "Estudante Anônimo" : (body.studentName || "Estudante"),
      isAnonymous: Boolean(body.isAnonymous),
      studentClass: body.studentClass,
      category: body.category || "Geral",
      title: body.title,
      description: body.description,
      justification: body.justification || "",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Sua contribuição foi enviada com sucesso! Ela passará por triagem ética e será levada à mesa do Conselho.",
        suggestion: newSug,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Erro ao enviar manifestação estudantil." }, { status: 500 });
  }
}
