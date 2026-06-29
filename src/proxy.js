import { NextResponse } from "next/server";

export async function proxy(request) {
  const sessionToken = request.cookies.get("better-auth.session_token");
  if (!sessionToken) {
    const loginUrl = new URL("/auth/login", request.url);

    loginUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
  //   if (!sessionToken) {
  //     return NextResponse.redirect(new URL("/auth/login", request.url));
  //   }

  //   return NextResponse.next();
}
export const config = {
  matcher: "/properties/:path+",
};
