import type { Metadata } from "next";
import "./globals.css";

const appName = process.env.NEXT_PUBLIC_APP_NAME ?? "AX/DX Vibe Coding Course";

export const metadata: Metadata = {
  title: appName,
  description: "AX/DX 바이브코딩 20시간 과정 강의 콘텐츠 내비게이터"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
