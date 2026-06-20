import type { Lesson } from "@/types/lesson";
import { BookOpenText, KeyRound, Layers3 } from "lucide-react";

type TopNavigationProps = {
  title: string;
  currentLesson?: Lesson;
  lessonCount: number;
};

export function TopNavigation({ title, currentLesson, lessonCount }: TopNavigationProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-white/95 backdrop-blur">
      <div className="mx-auto flex min-h-16 max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 lg:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-point text-white">
            <BookOpenText className="h-5 w-5" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <h1 className="truncate text-lg font-semibold text-ink">{title}</h1>
            <p className="truncate text-sm font-normal text-muted">
              {currentLesson ? `${currentLesson.lessonNo}교시 · ${currentLesson.title}` : "강의 준비 중"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
          <span className="inline-flex items-center gap-1 rounded-md border border-line bg-slate-50 px-3 py-2">
            <Layers3 className="h-4 w-4 text-point" aria-hidden="true" />
            {lessonCount}개 강의
          </span>
          <span className="inline-flex items-center gap-1 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-amber-900">
            <KeyRound className="h-4 w-4" aria-hidden="true" />
            GPT 준비
          </span>
        </div>
      </div>
    </header>
  );
}
