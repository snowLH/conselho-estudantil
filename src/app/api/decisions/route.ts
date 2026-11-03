import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyAdminAuth } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const status = searchParams.get("status");
    const type = searchParams.get("type");
    const search = searchParams.get("search");

    let decisions = db.getDecisions();

    if (category) {
      decisions = decisions.filter((d) => d.category.toLowerCase() === category.toLowerCase());
    }
    if (status) {
      decisions = decisions.filter((d) => d.status.toLowerCase() === status.toLowerCase());
    }
    if (type) {
      decisions = decisions.filter((d) => d.type.toLowerCase() === type.toLowerCase());
    }
    if (search) {
      const q = search.toLowerCase();
      decisions = decisions.filter(
        (d) =>
          d.title.toLowerCase().includes(q) ||
          d.summary.toLowerCase().includes(q) ||
          d.context.toLowerCase().includes(q)
      );
    }

    return NextResponse.json(decisions);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar decisões." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const isAuth = await verifyAdminAuth();
  if (!isAuth) {
    return NextResponse.json({ error: "Acesso não autorizado." }, { status: 401 });
  }

  try {
    const body = await request.json();
    if (!body.title || !body.summary || !body.status) {
      return NextResponse.json(
        { error: "Campos obrigatórios ausentes: título, resumo e status." },
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

    const newDecision = db.createDecision({
      ...body,
      slug,
      date: body.date || new Date().toLocaleDateString("pt-BR"),
      targetClasses: body.targetClasses || ["1ª Série EM", "2ª Série EM", "3ª Série EM"],
      timeline: body.timeline || [
        {
          id: `t-${Date.now()}`,
          date: body.date || new Date().toLocaleDateString("pt-BR"),
          title: "Publicação Inicial",
          description: "Entrada registrada no Diário Deliberativo.",
        },
      ],
      isDemonstrative: Boolean(body.isDemonstrative),
    });

    return NextResponse.json(newDecision, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao criar decisão." }, { status: 500 });
  }
}
