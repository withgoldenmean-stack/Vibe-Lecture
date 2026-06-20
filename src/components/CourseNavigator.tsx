"use client";

import { useEffect, useMemo, useState } from "react";
import { ContentBody } from "@/components/ContentBody";
import { EmptyState } from "@/components/EmptyState";
import { LessonSelector } from "@/components/LessonSelector";
import { PrevNextButtons } from "@/components/PrevNextButtons";
import { SideNavigation } from "@/components/SideNavigation";
import { TopNavigation } from "@/components/TopNavigation";
import { UnitTabs } from "@/components/UnitTabs";
import { lessons, units } from "@/data/lessons";
import {
  getAdjacentSections,
  getFirstSection,
  getLessonById,
  getLessonsByUnit,
  getSectionById
} from "@/lib/lesson-utils";
import type { UnitName } from "@/types/lesson";

type CourseNavigatorProps = {
  appName: string;
  initialLessonId?: string;
  initialSectionId?: string;
};

export function CourseNavigator({ appName, initialLessonId, initialSectionId }: CourseNavigatorProps) {
  const firstLesson = lessons[0];
  const initialLesson = initialLessonId ? getLessonById(lessons, initialLessonId) ?? firstLesson : firstLesson;
  const initialSection = getSectionById(initialLesson, initialSectionId) ?? getFirstSection(initialLesson);

  const [selectedUnit, setSelectedUnit] = useState<UnitName>(initialLesson?.unit ?? "입문");
  const [selectedLessonId, setSelectedLessonId] = useState(initialLesson?.lessonId ?? "");
  const [selectedSectionId, setSelectedSectionId] = useState(initialSection?.sectionId ?? "");

  const selectedLesson = useMemo(() => getLessonById(lessons, selectedLessonId), [selectedLessonId]);
  const selectedSection = useMemo(
    () => getSectionById(selectedLesson, selectedSectionId),
    [selectedLesson, selectedSectionId]
  );
  const lessonsInUnit = useMemo(() => getLessonsByUnit(lessons, selectedUnit), [selectedUnit]);
  const adjacent = useMemo(
    () => getAdjacentSections(lessons, selectedLessonId, selectedSectionId),
    [selectedLessonId, selectedSectionId]
  );

  useEffect(() => {
    if (!selectedLessonId || !selectedSectionId) {
      return;
    }

    const params = new URLSearchParams(window.location.search);
    params.set("lesson", selectedLessonId);
    params.set("section", selectedSectionId);
    window.history.replaceState(null, "", `?${params.toString()}`);
  }, [selectedLessonId, selectedSectionId]);

  const handleSelectUnit = (unit: UnitName) => {
    const nextLesson = getLessonsByUnit(lessons, unit)[0];
    const nextSection = getFirstSection(nextLesson);

    setSelectedUnit(unit);
    setSelectedLessonId(nextLesson?.lessonId ?? "");
    setSelectedSectionId(nextSection?.sectionId ?? "");
  };

  const handleSelectLesson = (lessonId: string) => {
    const nextLesson = getLessonById(lessons, lessonId);
    const nextSection = getFirstSection(nextLesson);

    if (!nextLesson) {
      return;
    }

    setSelectedUnit(nextLesson.unit);
    setSelectedLessonId(nextLesson.lessonId);
    setSelectedSectionId(nextSection?.sectionId ?? "");
  };

  const moveTo = (lessonId: string, sectionId: string) => {
    const nextLesson = getLessonById(lessons, lessonId);

    if (!nextLesson) {
      return;
    }

    setSelectedUnit(nextLesson.unit);
    setSelectedLessonId(lessonId);
    setSelectedSectionId(sectionId);
  };

  return (
    <main className="min-h-screen bg-canvas">
      <TopNavigation title={appName} currentLesson={selectedLesson} lessonCount={lessons.length} />

      <div className="mx-auto max-w-7xl px-4 py-5 lg:px-6">
        {lessons.length === 0 ? (
          <EmptyState message="등록된 강의가 없습니다." />
        ) : (
          <div className="space-y-5">
            <section className="space-y-4" aria-label="강의 선택 영역">
              <UnitTabs units={units} selectedUnit={selectedUnit} onSelectUnit={handleSelectUnit} />

              <div className="grid gap-3 md:hidden">
                <select
                  aria-label="단원 선택"
                  value={selectedUnit}
                  onChange={(event) => handleSelectUnit(event.target.value as UnitName)}
                  className="min-h-12 rounded-md border border-line bg-white px-3 text-base font-normal text-ink"
                >
                  {units.map((unit) => (
                    <option key={unit} value={unit}>
                      {unit}
                    </option>
                  ))}
                </select>

                <select
                  aria-label="강의 선택"
                  value={selectedLessonId}
                  onChange={(event) => handleSelectLesson(event.target.value)}
                  className="min-h-12 rounded-md border border-line bg-white px-3 text-base font-normal text-ink"
                >
                  {lessonsInUnit.map((lesson) => (
                    <option key={lesson.lessonId} value={lesson.lessonId}>
                      {lesson.lessonNo}교시 · {lesson.title}
                    </option>
                  ))}
                </select>

                {selectedLesson ? (
                  <select
                    aria-label="세부목차 선택"
                    value={selectedSectionId}
                    onChange={(event) => setSelectedSectionId(event.target.value)}
                    className="min-h-12 rounded-md border border-line bg-white px-3 text-base font-normal text-ink"
                  >
                    {selectedLesson.sections.map((section) => (
                      <option key={section.sectionId} value={section.sectionId}>
                        {section.title}
                      </option>
                    ))}
                  </select>
                ) : null}
              </div>

              <div className="hidden md:block">
                <LessonSelector
                  lessons={lessonsInUnit}
                  selectedLessonId={selectedLessonId}
                  onSelectLesson={handleSelectLesson}
                />
              </div>
            </section>

            <div className="grid gap-5 lg:grid-cols-[280px_minmax(0,1fr)]">
              <div className="hidden lg:block">
                <SideNavigation
                  lesson={selectedLesson}
                  selectedSectionId={selectedSectionId}
                  onSelectSection={setSelectedSectionId}
                />
              </div>

              <div className="min-w-0 space-y-4">
                <ContentBody lesson={selectedLesson} section={selectedSection} />
                <PrevNextButtons
                  prevLabel={adjacent.prev ? `${adjacent.prev.lesson.lessonNo}교시 · ${adjacent.prev.section.title}` : "이전"}
                  nextLabel={adjacent.next ? `${adjacent.next.lesson.lessonNo}교시 · ${adjacent.next.section.title}` : "다음"}
                  onPrev={
                    adjacent.prev
                      ? () => moveTo(adjacent.prev!.lesson.lessonId, adjacent.prev!.section.sectionId)
                      : undefined
                  }
                  onNext={
                    adjacent.next
                      ? () => moveTo(adjacent.next!.lesson.lessonId, adjacent.next!.section.sectionId)
                      : undefined
                  }
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
