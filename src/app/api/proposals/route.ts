import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyAdminAuth } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const category = searchParams.get("category");

    let proposals = db.getProposals();

    if (status) {
      proposals = proposals.filter((p) => p.status.toLowerCase() === status.toLowerCase());
    }
    if (category) {
      proposals = proposals.filter((p) => p.category.toLowerCase() === category.toLowerCase());
    }

    return NextResponse.json(proposals);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar propostas." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const isAuth = await verifyAdminAuth();
  if (!isAuth) {
    return NextResponse.json({ error: "Acesso não autorizado." }, { status: 401 });
  }

  try {
    const body = await request.json();
    if (!body.title || !body.problemIdentified || !body.proposedSolution) {
      return NextResponse.json(
        { error: "Campos obrigatórios do Modelo Anexo I ausentes." },
        { status: 400 }
      );
    }

    const proposals = db.getProposals();
    const nextNum = `${String(proposals.length + 1).padStart(2, "0")}/2026`;

    const newProp = db.createProposal({
      proposalNumber: body.proposalNumber || nextNum,
      title: body.title,
      date: body.date || new Date().toLocaleDateString("pt-BR"),
      status: body.status || "Nova proposta",
      category: body.category || "Geral",
      problemIdentified: body.problemIdentified,
      proposedSolution: body.proposedSolution,
      justification: body.justification || "",
      targetClasses: body.targetClasses || ["1ª Série EM", "2ª Série EM", "3ª Série EM"],
      classPositions: body.classPositions || {
        turma1: "Em análise",
        turma2: "Em análise",
        turma3: "Em análise",
      },
      deliberationResult: body.deliberationResult || "Aguardando deliberação formal das turmas.",
      forwarding: body.forwarding || "Aguardando deliberação",
      updates: body.updates || [
        {
          id: `u-${Date.now()}`,
          date: body.date || new Date().toLocaleDateString("pt-BR"),
          note: "Proposta protocolada no sistema oficial.",
        },
      ],
      isDemonstrative: Boolean(body.isDemonstrative),
    });

    return NextResponse.json(newProp, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao criar proposta." }, { status: 500 });
  }
}
