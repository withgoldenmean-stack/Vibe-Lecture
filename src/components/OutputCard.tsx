import { ClipboardCheck } from "lucide-react";

type OutputCardProps = {
  output: string;
};

export function OutputCard({ output }: OutputCardProps) {
  return (
    <section className="rounded-lg border border-emerald-200 bg-emerald-50 px-5 py-4">
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-emerald-600 text-white">
          <ClipboardCheck className="h-5 w-5" aria-hidden="true" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-emerald-950">차시 산출물</h3>
          <p className="mt-1 text-base font-normal text-emerald-900">{output}</p>
        </div>
      </div>
    </section>
  );
}
