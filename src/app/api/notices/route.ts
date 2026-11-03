import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyAdminAuth } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get("featured");

    let notices = db.getNotices();
    if (featured === "true") {
      notices = notices.filter((n) => n.featured);
    }

    return NextResponse.json(notices);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar comunicados." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const isAuth = await verifyAdminAuth();
  if (!isAuth) {
    return NextResponse.json({ error: "Acesso não autorizado." }, { status: 401 });
  }

  try {
    const body = await request.json();
    if (!body.title || !body.summary || !body.content) {
      return NextResponse.json(
        { error: "Campos obrigatórios ausentes: título, resumo e conteúdo." },
        { status: 400 }
      );
    }

    const slug =
      body.slug ||
      body.title
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

    const newNotice = db.createNotice({
      title: body.title,
      slug,
      date: body.date || new Date().toLocaleDateString("pt-BR"),
      category: body.category || "Institucional",
      summary: body.summary,
      content: body.content,
      featured: Boolean(body.featured),
      author: body.author || "Conselho Estudantil",
    });

    return NextResponse.json(newNotice, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao criar comunicado." }, { status: 500 });
  }
}
