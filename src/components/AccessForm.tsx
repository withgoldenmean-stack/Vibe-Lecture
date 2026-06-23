"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { KeyRound, Lock, ShieldCheck } from "lucide-react";

export function AccessForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = useMemo(() => searchParams.get("next") || "/", [searchParams]);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const response = await fetch("/api/access", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ code })
    });

    const result = (await response.json().catch(() => ({}))) as { approved?: boolean; error?: string };

    if (!response.ok || !result.approved) {
      setError(result.error ?? "승인 확인 중 문제가 발생했습니다.");
      setIsSubmitting(false);
      return;
    }

    router.replace(nextPath.startsWith("/") ? nextPath : "/");
    router.refresh();
  };

  return (
    <section className="w-full max-w-md rounded-lg border border-line bg-white p-6 shadow-soft">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-md bg-point text-white">
          <Lock className="h-5 w-5" aria-hidden="true" />
        </div>
        <div>
          <h1 className="text-xl font-semibold text-ink">승인된 수강생 입장</h1>
          <p className="mt-1 text-sm font-normal text-muted">관리자가 발급한 접속 코드를 입력하세요.</p>
        </div>
      </div>

      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <label className="block">
          <span className="mb-2 flex items-center gap-2 text-sm font-normal text-slate-700">
            <KeyRound className="h-4 w-4 text-point" aria-hidden="true" />
            접속 코드
          </span>
          <input
            type="password"
            value={code}
            onChange={(event) => setCode(event.target.value)}
            autoComplete="one-time-code"
            className="h-12 w-full rounded-md border border-line px-4 text-base font-normal text-ink outline-none transition placeholder:text-slate-400 focus:border-point focus:ring-4 focus:ring-blue-100"
            placeholder="관리자에게 받은 코드"
            required
          />
        </label>

        {error ? (
          <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm font-normal text-red-700">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-md bg-point px-4 text-base font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          <ShieldCheck className="h-4 w-4" aria-hidden="true" />
          {isSubmitting ? "확인 중..." : "강의실 입장"}
        </button>
      </form>
    </section>
  );
}
