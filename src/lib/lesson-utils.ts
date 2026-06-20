import type { Lesson, LessonSection, UnitName } from "@/types/lesson";

export const getLessonsByUnit = (lessons: Lesson[], unit: UnitName) =>
  lessons.filter((lesson) => lesson.unit === unit);

export const getLessonById = (lessons: Lesson[], lessonId: string) =>
  lessons.find((lesson) => lesson.lessonId === lessonId);

export const getSectionById = (lesson: Lesson | undefined, sectionId: string | undefined) =>
  lesson?.sections.find((section) => section.sectionId === sectionId);

export const getFirstSection = (lesson: Lesson | undefined): LessonSection | undefined =>
  lesson?.sections[0];

export const getAdjacentSections = (
  lessons: Lesson[],
  currentLessonId: string,
  currentSectionId: string
) => {
  const flatSections = lessons.flatMap((lesson) =>
    lesson.sections.map((section) => ({
      lesson,
      section
    }))
  );
  const currentIndex = flatSections.findIndex(
    (item) => item.lesson.lessonId === currentLessonId && item.section.sectionId === currentSectionId
  );

  return {
    prev: currentIndex > 0 ? flatSections[currentIndex - 1] : undefined,
    next: currentIndex >= 0 && currentIndex < flatSections.length - 1 ? flatSections[currentIndex + 1] : undefined
  };
};

export const findInitialSelection = (lessons: Lesson[]) => {
  const firstLesson = lessons[0];
  const firstSection = firstLesson?.sections[0];

  return {
    selectedUnit: firstLesson?.unit,
    selectedLessonId: firstLesson?.lessonId,
    selectedSectionId: firstSection?.sectionId
  };
};
