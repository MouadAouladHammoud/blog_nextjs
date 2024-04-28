/*
// Middleware par défaut:
export { default } from "next-auth/middleware";
export const config = {
    matcher: ["/dashboard", "/write", "/app/:path*"],
};
*/

// Middleware personnalisé:
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const protectedRoutes = ["/dashboard", "/write", "/app/:path*"]; // Chemins qui nécessitent l'authentification
  const url = req.nextUrl.clone();

  if (protectedRoutes.some((route) => url.pathname.startsWith(route))) {
    if (!session) {
      url.pathname = "/login"; // Redirigez vers la page de login
      return NextResponse.redirect(url);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/write", "/app/:path*"],
};
