import test from "node:test";
import assert from "node:assert/strict";
import { generatedQuestion, isValidGeneratedQuestion } from "./study-py-question-engine.mjs";

const supportedTopics = [
  "python_numbers.asp",
  "python_operators.asp",
  "python_lists.asp",
  "python_range.asp",
  "python_casting.asp",
  "python_strings.asp",
  "python_booleans.asp",
  "python_conditions.asp",
  "python_variables.asp",
  "python_for_loops.asp",
];

test("every supported topic produces valid questions across seeds and levels", () => {
  for (const topic of supportedTopics) {
    for (let level = 0; level < 3; level += 1) {
      for (let seed = 0; seed < 250; seed += 1) {
        const question = generatedQuestion(topic, level, seed);
        assert.ok(question, `missing question for ${topic}, level ${level}, seed ${seed}`);
        assert.ok(isValidGeneratedQuestion(question), `invalid question for ${topic}, level ${level}, seed ${seed}`);
        assert.equal(question.choices.filter(choice => choice.score === 2).length, 1);
        assert.equal(new Set(question.choices.map(choice => choice.label)).size, 3);
        assert.ok(question.explanation.trim().length > 0);
      }
    }
  }
});

test("same seed is reproducible and different seeds vary the generated prompt", () => {
  for (const topic of supportedTopics) {
    const first = generatedQuestion(topic, 1, 13);
    assert.deepEqual(generatedQuestion(topic, 1, 13), first);
    assert.notEqual(generatedQuestion(topic, 1, 13).prompt, generatedQuestion(topic, 1, 14).prompt, topic);
  }
});

test("unsupported topics and invalid generator inputs return null", () => {
  assert.equal(generatedQuestion("python_unknown.asp", 0, 0), null);
  assert.equal(generatedQuestion("python_numbers.asp", -1, 0), null);
  assert.equal(generatedQuestion("python_numbers.asp", 3, 0), null);
  assert.equal(generatedQuestion("python_numbers.asp", 0, -1), null);
  assert.equal(generatedQuestion("python_numbers.asp", 0, Number.NaN), null);
});

test("validator rejects duplicate answers, multiple correct answers, and missing explanations", () => {
  const valid = generatedQuestion("python_numbers.asp", 0, 7);
  assert.ok(valid);
  assert.equal(isValidGeneratedQuestion({ ...valid, choices: [valid.choices[0], valid.choices[0], valid.choices[2]] }), false);
  assert.equal(isValidGeneratedQuestion({ ...valid, choices: valid.choices.map(choice => ({ ...choice, score: 2 })) }), false);
  assert.equal(isValidGeneratedQuestion({ ...valid, explanation: "  " }), false);
});
