import { NextRequest, NextResponse } from "next/server";
import {
  ACCESS_COOKIE_NAME,
  hasValidAccessCookie,
  isAccessGateEnabled
} from "@/lib/access-control";

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (!isAccessGateEnabled()) {
    return NextResponse.next();
  }

  if (
    pathname === "/access" ||
    pathname.startsWith("/api/access") ||
    pathname.startsWith("/_next") ||
    pathname === "/favicon.ico" ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const cookieValue = request.cookies.get(ACCESS_COOKIE_NAME)?.value;

  if (hasValidAccessCookie(cookieValue)) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/api")) {
    return NextResponse.json(
      {
        error: "관리자 승인 후 접속할 수 있습니다."
      },
      { status: 401 }
    );
  }

  const accessUrl = request.nextUrl.clone();
  accessUrl.pathname = "/access";
  accessUrl.searchParams.set("next", `${pathname}${search}`);

  return NextResponse.redirect(accessUrl);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"]
};
