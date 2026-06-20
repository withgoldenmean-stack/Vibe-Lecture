import { readFileSync } from "node:fs";

const source = readFileSync(new URL("../src/data/lessons.ts", import.meta.url), "utf8");

const lessonIds = [...source.matchAll(/lessonId:\s*`(L\$\{pad\(lesson\.lessonNo\)\})`|lessonNo:\s*(\d+)/g)]
  .map((match) => match[2])
  .filter(Boolean);
const sectionIds = [...source.matchAll(/sectionId:\s*`(S\$\{lessonCode\}-0[1-5])`/g)].map((match) => match[1]);
const titles = [...source.matchAll(/title:\s*"([^"]+)"/g)].map((match) => match[1]);
const outputs = [...source.matchAll(/output:\s*"([^"]+)"/g)].map((match) => match[1]);

const lessonNumbers = [...new Set(lessonIds.map(Number))];
const expectedLessonNumbers = Array.from({ length: 20 }, (_, index) => index + 1);
const missingLessons = expectedLessonNumbers.filter((lessonNo) => !lessonNumbers.includes(lessonNo));
const duplicateLessons = lessonNumbers.filter((lessonNo, index) => lessonNumbers.indexOf(lessonNo) !== index);

const failures = [];

if (lessonNumbers.length !== 20) {
  failures.push(`Expected 20 lessons, found ${lessonNumbers.length}.`);
}

if (missingLessons.length > 0) {
  failures.push(`Missing lessons: ${missingLessons.join(", ")}.`);
}

if (duplicateLessons.length > 0) {
  failures.push(`Duplicate lesson numbers: ${duplicateLessons.join(", ")}.`);
}

if (sectionIds.length !== 5) {
  failures.push("Section generator should define exactly 5 section templates.");
}

if (titles.length < 20) {
  failures.push("Expected at least 20 lesson titles.");
}

if (outputs.length < 20) {
  failures.push("Expected at least 20 lesson outputs.");
}

if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log("Lesson data validation passed: 20 lessons, 5 section templates, outputs present.");
