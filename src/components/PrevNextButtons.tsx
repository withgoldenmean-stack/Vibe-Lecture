import { ArrowLeft, ArrowRight } from "lucide-react";

type PrevNextButtonsProps = {
  onPrev?: () => void;
  onNext?: () => void;
  prevLabel?: string;
  nextLabel?: string;
};

export function PrevNextButtons({ onPrev, onNext, prevLabel, nextLabel }: PrevNextButtonsProps) {
  return (
    <nav className="grid gap-3 border-t border-line pt-5 sm:grid-cols-2" aria-label="이전 다음 세부목차">
      <button
        type="button"
        onClick={onPrev}
        disabled={!onPrev}
        className="flex min-h-12 items-center justify-center gap-2 rounded-md border border-line bg-white px-4 text-base font-medium text-ink transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-45"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        <span className="truncate">{prevLabel ?? "이전"}</span>
      </button>
      <button
        type="button"
        onClick={onNext}
        disabled={!onNext}
        className="flex min-h-12 items-center justify-center gap-2 rounded-md bg-point px-4 text-base font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
      >
        <span className="truncate">{nextLabel ?? "다음"}</span>
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </button>
    </nav>
  );
}
