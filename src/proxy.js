// import { NextResponse } from "next/server";

import { auth } from "./app/lib/auth";

// export async function proxy(request) {
//   const sessionToken = request.cookies.get("better-auth.session_token");
//   if (!sessionToken) {
//     const loginUrl = new URL("/auth/login", request.url);

//     loginUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);

//     return NextResponse.redirect(loginUrl);
//   }

//   return NextResponse.next();

// }
// export const config = {
//   matcher: "/properties/:path+",
// };
import { NextResponse } from "next/server";

export async function proxy(request) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session) {
    const loginUrl = new URL("/auth/login", request.url);

    loginUrl.searchParams.set("next", request.nextUrl.pathname);

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/properties/:path",
    "/dashboard/:path*",
    "/add-idea",
    "/my-interactions",
    "/dashboard",
  ],
};
