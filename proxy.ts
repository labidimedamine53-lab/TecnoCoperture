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

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-admin-path", "1");

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
});

export const config = {
  matcher: ["/admin/:path*"],
};
