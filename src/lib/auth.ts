import { cookies } from "next/headers";

const ADMIN_COOKIE_NAME = "ceem_admin_token";
// Default access key for council administrators (can be overridden by env variable ADMIN_SECRET_KEY)
const ADMIN_SECRET = process.env.ADMIN_SECRET_KEY || "conselho2026";
const TOKEN_VALUE = "ceem_auth_session_valid_token_2026";

export async function verifyAdminAuth(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  return token === TOKEN_VALUE;
}

export async function loginAdmin(password: string): Promise<boolean> {
  if (password === ADMIN_SECRET) {
    const cookieStore = await cookies();
    cookieStore.set(ADMIN_COOKIE_NAME, TOKEN_VALUE, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });
    return true;
  }
  return false;
}

export async function logoutAdmin(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
}

export { ADMIN_COOKIE_NAME, ADMIN_SECRET };
