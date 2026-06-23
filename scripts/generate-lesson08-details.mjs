import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const sourcePath = resolve(root, "강의콘텐츠", "08교시_강의상세내용.md");
const outputPath = resolve(root, "src", "data", "generated", "lesson08Details.ts");
const markdown = readFileSync(sourcePath, "utf8").replace(/\r\n/g, "\n");

const cleanInline = (value) =>
  value
    .trim()
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/__([^_]+)__/g, "$1");

const parseTableRow = (line) =>
  line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map(cleanInline);

const isTableDivider = (line) =>
  /^\s*\|?(?:\s*:?-{3,}:?\s*\|)+\s*:?-{3,}:?\s*\|?\s*$/.test(line);

const lines = markdown.split("\n");
const contentLines = lines;
const blocks = [];
let paragraph = [];
let list = [];
let listStyle = null;
let code = [];
let inCode = false;

const flushParagraph = () => {
  if (paragraph.length === 0) return;
  blocks.push({ type: "paragraph", text: cleanInline(paragraph.join(" ")) });
  paragraph = [];
};

const flushList = () => {
  if (list.length === 0) return;
  blocks.push({ type: "list", style: listStyle, items: list.map(cleanInline) });
  list = [];
  listStyle = null;
};

const flushText = () => {
  flushParagraph();
  flushList();
};

for (let index = 0; index < contentLines.length; index += 1) {
  const line = contentLines[index];
  const trimmed = line.trim();

  if (trimmed.startsWith("```")) {
    flushText();
    if (inCode) {
      blocks.push({ type: "code", text: code.join("\n").trimEnd() });
      code = [];
      inCode = false;
    } else {
      inCode = true;
    }
    continue;
  }

  if (inCode) {
    code.push(line);
    continue;
  }

  if (!trimmed || /^---+$/.test(trimmed)) {
    flushText();
    continue;
  }

  const heading = trimmed.match(/^(#{1,6})\s+(.+)$/);
  if (heading) {
    flushText();
    blocks.push({
      type: "heading",
      level: heading[1].length === 1 ? 3 : 4,
      text: cleanInline(heading[2])
    });
    continue;
  }

  if (trimmed.startsWith(">")) {
    flushText();
    blocks.push({ type: "quote", text: cleanInline(trimmed.replace(/^>\s?/, "")) });
    continue;
  }

  if (trimmed.startsWith("|") && contentLines[index + 1] && isTableDivider(contentLines[index + 1])) {
    flushText();
    const columns = parseTableRow(trimmed);
    const rows = [];
    index += 2;

    while (index < contentLines.length && contentLines[index].trim().startsWith("|")) {
      rows.push(parseTableRow(contentLines[index]));
      index += 1;
    }

    index -= 1;
    blocks.push({ type: "table", columns, rows });
    continue;
  }

  const unorderedItem = trimmed.match(/^[-*+]\s+(.+)$/);
  const orderedItem = trimmed.match(/^\d+[.)]\s+(.+)$/);
  if (unorderedItem || orderedItem) {
    flushParagraph();
    const nextStyle = orderedItem ? "numbers" : "bullets";
    if (list.length > 0 && listStyle !== nextStyle) flushList();
    listStyle = nextStyle;
    list.push((orderedItem ?? unorderedItem)[1]);
    continue;
  }

  flushList();
  paragraph.push(trimmed);
}

flushText();
if (inCode && code.length > 0) {
  blocks.push({ type: "code", text: code.join("\n").trimEnd() });
}

const output = `// 이 파일은 강의콘텐츠/08교시_강의상세내용.md에서 자동 생성됩니다.
// 원본 MD를 수정한 뒤 npm run generate:lesson08을 실행하세요.
import type { LessonSection } from "@/types/lesson";

export const lesson08CoreDetailBlocks: NonNullable<LessonSection["detailBlocks"]> = ${JSON.stringify(blocks, null, 2)};
`;

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, output, "utf8");
console.log(`Generated ${blocks.length} lesson detail blocks from ${sourcePath}`);
