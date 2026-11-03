import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, ADMIN_SECRET } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password } = body;

    if (password !== ADMIN_SECRET) {
      return NextResponse.json(
        { error: "Senha de acesso administrativo incorreta." },
        { status: 401 }
      );
    }

    const response = NextResponse.json({ success: true, message: "Autenticado com sucesso." });
    response.cookies.set(ADMIN_COOKIE_NAME, "ceem_auth_session_valid_token_2026", {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login route error:", error);
    return NextResponse.json({ error: "Falha ao processar solicitação de login." }, { status: 500 });
  }
}
