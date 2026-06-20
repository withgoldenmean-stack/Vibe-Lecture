import type { Lesson } from "@/types/lesson";
import { FileText, Target } from "lucide-react";
import { EmptyState } from "./EmptyState";

type SideNavigationProps = {
  lesson?: Lesson;
  selectedSectionId?: string;
  onSelectSection: (sectionId: string) => void;
};

export function SideNavigation({ lesson, selectedSectionId, onSelectSection }: SideNavigationProps) {
  if (!lesson) {
    return <EmptyState message="등록된 강의가 없습니다." />;
  }

  if (lesson.sections.length === 0) {
    return <EmptyState message="등록된 세부목차가 없습니다." />;
  }

  return (
    <aside className="rounded-lg border border-line bg-white shadow-sm">
      <div className="border-b border-line px-5 py-4">
        <div className="flex items-center gap-2 text-sm font-medium text-point">
          <Target className="h-4 w-4" aria-hidden="true" />
          {lesson.unit}
        </div>
        <h2 className="mt-2 text-lg font-semibold leading-snug text-ink">
          {lesson.lessonNo}교시. {lesson.title}
        </h2>
        <p className="mt-2 text-sm font-normal leading-normal text-muted">{lesson.summary}</p>
      </div>
      <div className="border-b border-line bg-slate-50 px-5 py-4">
        <div className="flex items-start gap-2">
          <FileText className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
          <p className="text-base font-normal text-emerald-900">{lesson.output}</p>
        </div>
      </div>
      <nav className="p-3" aria-label="세부목차">
        {lesson.sections.map((section, index) => {
          const selected = section.sectionId === selectedSectionId;

          return (
            <button
              key={section.sectionId}
              type="button"
              aria-current={selected ? "page" : undefined}
              onClick={() => onSelectSection(section.sectionId)}
              className={[
                "flex min-h-12 w-full items-center gap-3 rounded-md px-3 py-2 text-left text-base font-medium transition",
                selected
                  ? "border-l-4 border-point bg-blue-50 text-point"
                  : "border-l-4 border-transparent text-slate-700 hover:bg-slate-50 hover:text-ink"
              ].join(" ")}
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-slate-100 text-sm font-medium text-slate-600">
                {index + 1}
              </span>
              <span className="leading-5">{section.title}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
