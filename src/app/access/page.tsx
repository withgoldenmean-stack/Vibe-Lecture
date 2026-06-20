import { Suspense } from "react";
import { AccessForm } from "@/components/AccessForm";

export default function AccessPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-canvas px-4 py-10">
      <Suspense fallback={<div className="h-72 w-full max-w-md rounded-lg border border-line bg-white shadow-soft" />}>
        <AccessForm />
      </Suspense>
    </main>
  );
}
