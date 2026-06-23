export type UnitName = "입문" | "AX/DX 기획" | "개발문서 설계" | "AI·API·리스크" | "운영·출시";

export type LessonListItem =
  | string
  | {
      title: string;
      description: string;
    };

export type LessonDetailBlock =
  | {
      type: "heading";
      level?: 3 | 4;
      text: string;
    }
  | {
      type: "paragraph";
      text: string;
    }
  | {
      type: "quote";
      text: string;
    }
  | {
      type: "list";
      style?: "cards" | "bullets" | "numbers";
      items: LessonListItem[];
    }
  | {
      type: "code";
      text: string;
    }
  | {
      type: "flow";
      title?: string;
      steps: string[];
    }
  | {
      type: "table";
      title?: string;
      columns: string[];
      rows: string[][];
    };

export type LessonSection = {
  sectionId: string;
  title: string;
  content: string;
  activity?: string;
  checklist?: string[];
  detailTitle?: string;
  detailBlocks?: LessonDetailBlock[];
  comparisonTable?: {
    title: string;
    columns: string[];
    rows: string[][];
  };
};

export type Lesson = {
  lessonId: string;
  lessonNo: number;
  unit: UnitName;
  title: string;
  duration: string;
  target: string;
  output: string;
  summary: string;
  sections: LessonSection[];
};
