"use client";

import type { Lesson, LessonDetailBlock, LessonSection } from "@/types/lesson";
import { ArrowRight, Check, Clock, GraduationCap, ListChecks } from "lucide-react";
import { useEffect, useRef } from "react";
import { EmptyState } from "./EmptyState";
import { OutputCard } from "./OutputCard";

type ContentBodyProps = {
  lesson?: Lesson;
  section?: LessonSection;
};

function DetailTable({ block }: { block: Extract<LessonDetailBlock, { type: "table" }> }) {
  return (
    <div className="overflow-hidden rounded-lg border border-line">
      {block.title ? (
        <div className="border-b border-line bg-slate-50 px-4 py-3">
          <h4 className="text-lg font-semibold text-ink">{block.title}</h4>
        </div>
      ) : null}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-line text-sm">
          <thead className="bg-white">
            <tr>
              {block.columns.map((column) => (
                <th key={column} scope="col" className="min-w-40 px-4 py-3 text-left font-semibold text-slate-800">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-line bg-white">
            {block.rows.map((row) => (
              <tr key={row.join("|")}>
                {row.map((cell, index) => (
                  <td
                    key={`${cell}-${index}`}
                    className={[
                      "px-4 py-3 leading-relaxed text-slate-700",
                      index === 0 ? "font-semibold text-ink" : ""
                    ].join(" ")}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function DetailFlow({ block }: { block: Extract<LessonDetailBlock, { type: "flow" }> }) {
  return (
    <div className="rounded-lg border border-blue-100 bg-blue-50 px-4 py-4">
      {block.title ? <h4 className="text-lg font-semibold text-blue-950">{block.title}</h4> : null}
      <ol className="mt-3 grid gap-2 text-sm leading-normal text-blue-950 sm:grid-cols-2">
        {block.steps.map((step, index) => (
          <li key={`${step}-${index}`} className="flex items-start gap-2 rounded-md bg-white px-3 py-2">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-medium text-white">
              {index + 1}
            </span>
            <span>{step}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function DetailBlockView({ block }: { block: LessonDetailBlock }) {
  if (block.type === "heading") {
    const className =
      block.level === 4
        ? "pt-2 text-lg font-semibold text-slate-800"
        : "border-t border-line pt-6 text-xl font-semibold text-ink";

    return <h4 className={className}>{block.text}</h4>;
  }

  if (block.type === "paragraph") {
    return <p className="max-w-3xl text-base font-normal leading-relaxed text-slate-700">{block.text}</p>;
  }

  if (block.type === "quote") {
    return (
      <blockquote className="rounded-lg border-l-4 border-point bg-slate-50 px-4 py-3 text-base font-normal leading-relaxed text-slate-800">
        {block.text}
      </blockquote>
    );
  }

  if (block.type === "list") {
    return (
      <ul
        className="grid gap-3"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 14rem), 1fr))" }}
      >
        {block.items.map((item, index) => {
          const title = typeof item === "string" ? item : item.title;
          const description = typeof item === "string" ? undefined : item.description;

          return (
            <li
              key={`${title}-${index}`}
              className="flex min-h-36 flex-col rounded-lg border border-blue-100 bg-blue-50 px-4 py-4 text-blue-950"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
                {index + 1}
              </span>
              <strong className="mt-4 text-base font-semibold leading-snug text-ink">{title}</strong>
              {description ? (
                <span className="mt-2 text-sm font-normal leading-relaxed text-slate-700">{description}</span>
              ) : null}
              <ArrowRight className="mt-auto h-4 w-4 text-point" aria-hidden="true" />
            </li>
          );
        })}
      </ul>
    );
  }

  if (block.type === "flow") {
    return <DetailFlow block={block} />;
  }

  return <DetailTable block={block} />;
}

export function ContentBody({ lesson, section }: ContentBodyProps) {
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: 0 });
  }, [lesson?.lessonId, section?.sectionId]);

  if (!lesson) {
    return <EmptyState message="등록된 강의가 없습니다." />;
  }

  if (!section) {
    return <EmptyState message="등록된 상세교육내용이 없습니다." />;
  }

  return (
    <article className="flex flex-col overflow-hidden rounded-lg border border-line bg-white shadow-sm">
      <div className="shrink-0 border-b border-line px-5 py-5 sm:px-7">
        <div className="flex flex-wrap items-center gap-2 text-sm font-medium text-slate-600">
          <span className="rounded-md bg-blue-50 px-2.5 py-1 text-point">{lesson.unit}</span>
          <span className="rounded-md bg-slate-100 px-2.5 py-1">{lesson.lessonNo}교시</span>
          <span className="inline-flex items-center gap-1 rounded-md bg-amber-50 px-2.5 py-1 text-amber-900">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
            {lesson.duration}
          </span>
        </div>
        <h2 className="mt-4 text-2xl font-bold leading-tight text-ink">{section.title}</h2>
        <p className="mt-3 text-base font-normal leading-relaxed text-slate-700">{lesson.title}</p>
      </div>
      <div
        ref={bodyRef}
        className="max-h-[68vh] min-h-0 space-y-6 overflow-y-auto overscroll-contain px-5 py-6 [scrollbar-gutter:stable] sm:px-7 lg:max-h-[calc(100vh-18rem)]"
      >
        <section>
          <h3 className="flex items-center gap-2 text-xl font-semibold text-ink">
            <GraduationCap className="h-5 w-5 text-point" aria-hidden="true" />
            상세 교육내용
          </h3>
          <p className="mt-3 max-w-3xl text-base font-normal leading-relaxed text-slate-700">{section.content}</p>
          {section.comparisonTable ? (
            <div className="mt-5 overflow-hidden rounded-lg border border-line">
              <div className="border-b border-line bg-slate-50 px-4 py-3">
                <h4 className="text-lg font-semibold text-ink">{section.comparisonTable.title}</h4>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-line text-sm">
                  <thead className="bg-white">
                    <tr>
                      {section.comparisonTable.columns.map((column) => (
                        <th
                          key={column}
                          scope="col"
                          className="min-w-44 px-4 py-3 text-left font-semibold text-slate-800"
                        >
                          {column}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line bg-white">
                    {section.comparisonTable.rows.map((row) => (
                      <tr key={row.join("|")}>
                        {row.map((cell, index) => (
                          <td
                            key={`${cell}-${index}`}
                            className={[
                              "px-4 py-3 leading-relaxed",
                              index === 0 ? "text-slate-700" : "font-medium text-point"
                            ].join(" ")}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : null}
          {section.detailBlocks && section.detailBlocks.length > 0 ? (
            <div className="mt-7 space-y-5">
              {section.detailBlocks.map((block, index) => (
                <DetailBlockView key={`${block.type}-${index}`} block={block} />
              ))}
            </div>
          ) : null}
        </section>

        {section.activity ? (
          <section className="rounded-lg border border-amber-200 bg-amber-50 px-5 py-4">
            <h3 className="text-lg font-semibold text-amber-950">실습 활동</h3>
            <p className="mt-2 text-base font-normal leading-relaxed text-amber-900">{section.activity}</p>
          </section>
        ) : null}

        {section.checklist && section.checklist.length > 0 ? (
          <section>
            <h3 className="flex items-center gap-2 text-xl font-semibold text-ink">
              <ListChecks className="h-5 w-5 text-emerald-600" aria-hidden="true" />
              확인 항목
            </h3>
            <ul className="mt-3 grid gap-2">
              {section.checklist.map((item) => (
                <li key={item} className="flex items-start gap-2 text-base font-normal leading-relaxed text-slate-700">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <OutputCard output={lesson.output} />
      </div>
    </article>
  );
}
