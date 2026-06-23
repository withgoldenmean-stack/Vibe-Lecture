import { NextResponse } from "next/server";
import {
  ACCESS_COOKIE_NAME,
  getApprovedAccessCodes,
  getAccessCookieSecret,
  isAccessGateEnabled,
  isApprovedAccessCode
} from "@/lib/access-control";

export async function GET() {
  return NextResponse.json({
    enabled: isAccessGateEnabled(),
    approvedCodeCount: getApprovedAccessCodes().length,
    cookieSecretConfigured: Boolean(getAccessCookieSecret())
  });
}

export async function POST(request: Request) {
  if (!isAccessGateEnabled()) {
    return NextResponse.json({ approved: true });
  }

  const body = (await request.json().catch(() => ({}))) as { code?: string };
  const code = body.code?.trim() ?? "";
  const cookieSecret = getAccessCookieSecret();
  const approvedCodes = getApprovedAccessCodes();

  if (approvedCodes.length === 0) {
    return NextResponse.json(
      {
        approved: false,
        error: "관리자 승인코드가 설정되지 않았습니다. Vercel 환경변수 APPROVED_ACCESS_CODES를 등록하세요."
      },
      { status: 500 }
    );
  }

  if (!isApprovedAccessCode(code)) {
    return NextResponse.json(
      {
        approved: false,
        error: "승인되지 않은 접속 코드입니다."
      },
      { status: 401 }
    );
  }

  const response = NextResponse.json({ approved: true });
  const isHttps = new URL(request.url).protocol === "https:";

  response.cookies.set({
    name: ACCESS_COOKIE_NAME,
    value: cookieSecret || code,
    httpOnly: true,
    secure: isHttps,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8
  });

  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ approved: false });

  response.cookies.set({
    name: ACCESS_COOKIE_NAME,
    value: "",
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 0
  });

  return response;
}
