import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyAdminAuth } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    let docs = db.getDocuments();
    if (category) {
      docs = docs.filter((d) => d.category.toLowerCase() === category.toLowerCase());
    }
    return NextResponse.json(docs);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar documentos." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const isAuth = await verifyAdminAuth();
  if (!isAuth) {
    return NextResponse.json({ error: "Acesso não autorizado." }, { status: 401 });
  }

  try {
    const body = await request.json();
    if (!body.title || !body.category || !body.description) {
      return NextResponse.json(
        { error: "Campos obrigatórios ausentes: título, categoria e descrição." },
        { status: 400 }
      );
    }

    const newDoc = db.createDocument({
      title: body.title,
      category: body.category,
      date: body.date || new Date().toLocaleDateString("pt-BR"),
      description: body.description,
      fileUrl: body.fileUrl || "#",
      content: body.content || "",
      downloadable: body.downloadable !== undefined ? Boolean(body.downloadable) : true,
      status: body.status || "Vigente",
    });

    return NextResponse.json(newDoc, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao cadastrar documento." }, { status: 500 });
  }
}
