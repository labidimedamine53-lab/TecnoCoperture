import { NextResponse } from "next/server";

import { auth } from "@/auth";

export default auth((request) => {
  const pathname = request.nextUrl.pathname;
  const isLoginRoute = pathname === "/admin/login";
  const isAdmin = request.auth?.user?.role === "ADMIN";

  if (!isLoginRoute && !isAdmin) {
    return NextResponse.redirect(new URL("/admin/login", request.nextUrl));
  }

  if (isLoginRoute && isAdmin) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*"],
};
