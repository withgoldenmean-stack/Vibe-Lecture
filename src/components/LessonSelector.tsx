import type { Lesson } from "@/types/lesson";
import { CheckCircle2 } from "lucide-react";

type LessonSelectorProps = {
  lessons: Lesson[];
  selectedLessonId: string;
  onSelectLesson: (lessonId: string) => void;
};

export function LessonSelector({ lessons, selectedLessonId, onSelectLesson }: LessonSelectorProps) {
  return (
    <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-3" aria-label="강의 선택">
      {lessons.map((lesson) => {
        const selected = lesson.lessonId === selectedLessonId;

        return (
          <button
            key={lesson.lessonId}
            type="button"
            aria-current={selected ? "page" : undefined}
            onClick={() => onSelectLesson(lesson.lessonId)}
            className={[
              "min-h-20 rounded-lg border bg-white px-4 py-3 text-left transition",
              selected
                ? "border-point shadow-soft ring-1 ring-point"
                : "border-line hover:border-slate-300 hover:bg-slate-50"
            ].join(" ")}
          >
            <div className="flex items-start justify-between gap-3">
              <span className="text-sm font-medium text-point">{lesson.lessonNo}교시</span>
              {selected ? <CheckCircle2 className="h-4 w-4 shrink-0 text-point" aria-hidden="true" /> : null}
            </div>
            <p className="mt-2 line-clamp-2 text-lg font-semibold leading-snug text-ink">{lesson.title}</p>
            <p className="mt-1 truncate text-sm font-normal text-muted">{lesson.output}</p>
          </button>
        );
      })}
    </div>
  );
}
