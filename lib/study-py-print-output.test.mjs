import test from "node:test";
import assert from "node:assert/strict";
import { generatePrintOutputQuestion, printOutputLessons } from "./study-py-print-output.mjs";

test("each Print Output lesson generates valid, reproducible questions", () => {
  for (const lesson of printOutputLessons) {
    for (let seed = 0; seed < 500; seed += 1) {
      const question = generatePrintOutputQuestion(lesson, seed);
      assert.ok(question, `${lesson} / seed ${seed}`);
      assert.equal(question.choices.length, 4);
      assert.equal(new Set(question.choices.map((choice) => choice.label)).size, 4);
      assert.equal(question.choices.filter((choice) => choice.correct).length, 1);
      assert.equal(question.choices.find((choice) => choice.correct).label, question.answer);
      assert.ok(question.explanation.length > 10);
      assert.deepEqual(generatePrintOutputQuestion(lesson, seed), question);
    }
  }
});

test("unsupported lessons and invalid seeds are rejected", () => {
  assert.equal(generatePrintOutputQuestion("Made up lesson", 0), null);
  assert.equal(generatePrintOutputQuestion(printOutputLessons[0], -1), null);
  assert.equal(generatePrintOutputQuestion(printOutputLessons[0], 1.5), null);
});
