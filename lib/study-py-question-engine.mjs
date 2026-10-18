/**
 * Deterministic, parameterized Python question generators.
 * Inputs are derived from a seed; answer labels are calculated from those inputs.
 */

/** @typedef {{ label: string, score: number, feedback: string }} Choice */
/** @typedef {{ id: string, skill: string, title: string, prompt: string, choices: Choice[], explanation: string, prerequisites: string[] }} Question */

function makeChoices(correct, candidates, seed) {
  const labels = [];
  for (const candidate of candidates) {
    const label = String(candidate);
    if (label && label !== String(correct) && !labels.includes(label)) labels.push(label);
  }

  if (labels.length < 2 && /^-?\d+(?:\.\d+)?$/.test(String(correct))) {
    const value = Number(correct);
    for (const delta of [1, -1, 2, -2, 3, -3, 4, -4]) {
      const label = String(value + delta);
      if (label !== String(correct) && !labels.includes(label)) labels.push(label);
      if (labels.length === 2) break;
    }
  }
  const fallbacks = ["None", "Not enough information", `Alternative answer ${(seed % 997) + 1}`, "A different result"];
  for (const label of fallbacks) {
    if (labels.length === 2) break;
    if (label !== String(correct) && !labels.includes(label)) labels.push(label);
  }

  const options = [
    { label: String(correct), score: 2, feedback: "Correct. Your answer matches the calculation shown." },
    { label: labels[0], score: 1, feedback: "Not quite. Check the operation and the values in the example." },
    { label: labels[1], score: 0, feedback: "Not quite. Work through the code one step at a time." },
  ];
  const offset = seed % options.length;
  return [...options.slice(offset), ...options.slice(0, offset)];
}

/**
 * @param {string} chapterHref
 * @param {number} level
 * @param {number} seed
 * @returns {Question | null}
 */
export function generatedQuestion(chapterHref, level, seed) {
  if (!Number.isInteger(level) || level < 0 || level > 2 || !Number.isSafeInteger(seed) || seed < 0) return null;
  const n = (seed * 7 + level * 11) % 10000;
  const difficulty = level;
  let title;
  let prompt;
  let correct;
  let distractors;
  let explanation;

  switch (chapterHref) {
    case "python_numbers.asp": {
      title = "Numbers";
      const a = 12 + n;
      const b = 2 + ((n * 3) % 8);
      const op = difficulty === 0 ? "+" : difficulty === 1 ? "//" : "%";
      const answer = op === "+" ? a + b : op === "//" ? Math.floor(a / b) : a % b;
      prompt = `What does ${a} ${op} ${b} evaluate to?`;
      correct = String(answer);
      distractors = op === "+" ? [a - b, a * b] : op === "//" ? [Math.ceil(a / b), a % b] : [Math.floor(a / b), a - b];
      explanation = op === "+" ? `Addition combines the values: ${a} + ${b} = ${answer}.` : op === "//" ? `Floor division returns the quotient rounded down: ${a} // ${b} = ${answer}.` : `Modulo returns the remainder: ${a} % ${b} = ${answer}.`;
      break;
    }
    case "python_operators.asp": {
      title = "Operators";
      const a = 8 + n;
      const b = 2 + ((n * 5) % 7);
      const op = difficulty === 0 ? "*" : difficulty === 1 ? "%" : "**";
      const shownB = op === "**" ? 2 + (n % 2) : b;
      const answer = op === "*" ? a * b : op === "%" ? a % b : a ** shownB;
      prompt = `What is the result of ${a} ${op} ${shownB}?`;
      correct = String(answer);
      distractors = op === "*" ? [a + b, a - b] : op === "%" ? [Math.floor(a / b), a * b] : [a * shownB, a + shownB];
      explanation = op === "*" ? `The * operator multiplies: ${a} × ${b} = ${answer}.` : op === "%" ? `The % operator returns the remainder: ${a} % ${b} = ${answer}.` : `The ** operator raises a number to a power: ${a} ** ${shownB} = ${answer}.`;
      break;
    }
    case "python_lists.asp": {
      title = "Lists";
      const values = [3 + n, 10 + n * 2, 20 + n * 3, 30 + n * 4];
      const index = difficulty === 0 ? n % values.length : difficulty === 1 ? -1 : -2;
      const resolvedIndex = index < 0 ? values.length + index : index;
      const answer = values[resolvedIndex];
      prompt = `What value does this code return?\n\nvalues = [${values.join(", ")}]\nprint(values[${index}])`;
      correct = String(answer);
      distractors = [values[(resolvedIndex + 1) % values.length], values[(resolvedIndex + 2) % values.length]];
      explanation = `List indexes start at 0. Negative indexes count backward from the end, so values[${index}] is ${answer}.`;
      break;
    }
    case "python_range.asp": {
      title = "Range";
      const start = n % 100;
      const step = difficulty + 1;
      const count = 2 + (n % 3);
      const stop = start + step * count;
      const values = Array.from({ length: count }, (_, i) => start + i * step);
      prompt = `What list is created by list(range(${start}, ${stop}, ${step}))?`;
      correct = `[${values.join(", ")}]`;
      distractors = [
        `[${[...values, stop].join(", ")}]`,
        step === 1
          ? `[${values.slice(0, -1).join(", ")}]`
          : `[${Array.from({ length: stop - start }, (_, i) => start + i).join(", ")}]`,
      ];
      explanation = `range(start, stop, step) includes ${start}, advances by ${step}, and stops before ${stop}. The result is ${correct}.`;
      break;
    }
    case "python_casting.asp": {
      title = "Casting";
      const value = 14 + n;
      const textValue = String(value);
      prompt = `Which expression converts the text "${textValue}" to an integer?`;
      correct = `int("${textValue}")`;
      distractors = [`str(${textValue})`, `float("${textValue}")`];
      explanation = "int() parses a valid integer string into an int. str() converts a value to text, while float() creates a floating-point value.";
      break;
    }
    case "python_strings.asp": {
      title = "Strings";
      const words = ["planet", "python", "coding", "branch", "future", "kernel"];
      const word = words[n % words.length];
      const index = difficulty === 0 ? 0 : difficulty === 1 ? 2 : -1;
      const answer = word[index < 0 ? word.length + index : index];
      prompt = `What does ${JSON.stringify(word)}[${index}] return?`;
      correct = JSON.stringify(answer);
      distractors = [JSON.stringify(word[(index + 1 + word.length) % word.length]), JSON.stringify(word)];
      explanation = `Strings support indexing. Index ${index} selects the character ${JSON.stringify(answer)}.`;
      break;
    }
    case "python_booleans.asp":
    case "python_conditions.asp": {
      title = chapterHref === "python_booleans.asp" ? "Booleans" : "If...Else";
      const a = 4 + n;
      const b = difficulty === 0 ? a : difficulty === 1 ? a + 1 : a - 1;
      const op = difficulty === 0 ? "==" : difficulty === 1 ? "<" : ">=";
      const answer = op === "==" ? a === b : op === "<" ? a < b : a >= b;
      prompt = `What is the value of ${a} ${op} ${b}?`;
      correct = String(answer);
      distractors = [String(!answer), "None"];
      explanation = `The comparison ${a} ${op} ${b} evaluates to the Boolean value ${answer}.`;
      break;
    }
    case "python_variables.asp": {
      title = "Variables";
      const initial = 2 + n;
      const change = 1 + (n % 5);
      const op = difficulty === 0 ? "+" : difficulty === 1 ? "*" : "-";
      const answer = op === "+" ? initial + change : op === "*" ? initial * change : initial - change;
      prompt = `What is the final value of x?\n\nx = ${initial}\nx ${op}= ${change}`;
      correct = String(answer);
      distractors = op === "+" ? [initial - change, initial] : [initial + change, initial];
      explanation = `The augmented assignment updates x using ${op}: ${initial} ${op} ${change} = ${answer}.`;
      break;
    }
    case "python_for_loops.asp": {
      title = "For Loops";
      const count = 2 + (n % 4);
      const start = 1 + (n % 100);
      const values = Array.from({ length: count }, (_, i) => start + i);
      const answer = values.reduce((sum, value) => sum + value, 0);
      prompt = `What does this code print?\n\ntotal = 0\nfor value in ${JSON.stringify(values)}:\n    total += value\nprint(total)`;
      correct = String(answer);
      distractors = [String(values.length), String(answer - values[values.length - 1])];
      explanation = `The loop adds every value to total: ${values.join(" + ")} = ${answer}.`;
      break;
    }
    default:
      return null;
  }

  const question = {
    id: `${chapterHref}-generated-${level}-${seed}`,
    skill: "python",
    title,
    prompt,
    choices: makeChoices(correct, distractors, n),
    explanation,
    prerequisites: [],
  };
  return isValidGeneratedQuestion(question) ? question : null;
}

/** @param {Question} question */
export function isValidGeneratedQuestion(question) {
  return Boolean(
    question &&
    typeof question.id === "string" && question.id.trim() &&
    typeof question.title === "string" && question.title.trim() &&
    typeof question.prompt === "string" && question.prompt.trim() &&
    typeof question.explanation === "string" && question.explanation.trim() &&
    Array.isArray(question.choices) &&
    question.choices.length === 3 &&
    question.choices.filter(choice => choice && choice.score === 2).length === 1 &&
    question.choices.every(choice => choice && typeof choice.label === "string" && choice.label.trim() && [0, 1, 2].includes(choice.score)) &&
    new Set(question.choices.map(choice => choice.label)).size === question.choices.length
  );
}
