import test from "node:test";
import assert from "node:assert/strict";
import { getStudyPyLessonGuide, studyPyChapters } from "./study-py-curriculum.mjs";

test("curriculum has unique chapters and a stable lesson catalog", () => {
  assert.ok(studyPyChapters.length >= 50);
  const chapterHrefs = studyPyChapters.map((chapter) => chapter.href);
  assert.equal(new Set(chapterHrefs).size, chapterHrefs.length);

  const lessonKeys = studyPyChapters.flatMap((chapter) => chapter.lessons.map((lesson) => chapter.href + "::" + lesson));
  assert.ok(lessonKeys.length >= 350);
  assert.equal(new Set(lessonKeys).size, lessonKeys.length);
});

test("every curriculum lesson resolves to a usable wiki guide", () => {
  for (const chapter of studyPyChapters) {
    assert.ok(chapter.lessons.length > 0, chapter.title + " should contain lessons");
    for (const lesson of chapter.lessons) {
      const guide = getStudyPyLessonGuide(chapter.href, lesson);
      assert.ok(guide, chapter.title + " / " + lesson + " should have a guide");
      assert.equal(guide.chapter, chapter.title);
      assert.equal(guide.lesson, lesson);
      assert.ok(guide.summary.trim().length > 20);
      assert.equal(guide.concepts.length, 3);
      assert.ok(guide.concepts.every((concept) => typeof concept === "string" && concept.trim()));
      assert.ok(guide.example.trim());
      assert.ok(guide.sourceUrl.startsWith("https://www.w3schools.com/python/"));
    }
  }
});

test("guide lookup rejects unknown chapters and lessons", () => {
  assert.equal(getStudyPyLessonGuide("not-a-chapter", "Anything"), null);
  assert.equal(getStudyPyLessonGuide("python_intro.asp", "Not a lesson"), null);
});

test("core lesson guides include concrete Python examples", () => {
  const cases = [
    ["python_numbers.asp", "Integer numbers"],
    ["python_lists.asp", "Create lists"],
    ["python_conditions.asp", "if statements"],
    ["python_for_loops.asp", "Loop through a list"],
    ["python_functions.asp", "Define a function"],
  ];
  for (const [chapterHref, lesson] of cases) {
    const guide = getStudyPyLessonGuide(chapterHref, lesson);
    assert.ok(guide);
    assert.match(guide.example, /print|def |if |for |\[|%|\/\//);
    assert.doesNotThrow(() => new URL(guide.sourceUrl));
  }
});
