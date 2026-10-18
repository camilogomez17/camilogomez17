/**
 * Lesson-specific, deterministic question generator for the Print Output chapter.
 * Each answer is computed from the same values shown in the prompt.
 */
export const printOutputLessons = [
  "The print() function",
  "Print multiple values",
  "Print without a newline",
  "Output variables and expressions",
];

export function generatePrintOutputQuestion(lesson, seed = 0) {
  if (!printOutputLessons.includes(lesson) || !Number.isSafeInteger(seed) || seed < 0) return null;
  const n = (seed * 13 + 7) % 97;
  let prompt;
  let answer;
  let explanation;
  let wrong;
  if (lesson === "The print() function") {
    const words = ["Hello", "Python", "Study", "World", "Ready"];
    const word = words[n % words.length];
    prompt = `What appears when this Python code runs?\n\nprint(${JSON.stringify(word)})`;
    answer = word;
    wrong = [JSON.stringify(word), "None", words[(n + 1) % words.length]];
    explanation = `print() displays the string's contents, without the surrounding quote marks: ${word}.`;
  } else if (lesson === "Print multiple values") {
    const left = ["Study", "Learn", "Write", "Build"][n % 4];
    const right = ["Python", "Code", "Skills", "Projects"][(n + 1) % 4];
    prompt = `What does this statement print?\n\nprint(${JSON.stringify(left)}, ${JSON.stringify(right)})`;
    answer = `${left} ${right}`;
    wrong = [`${left}${right}`, `${right} ${left}`, `${left}, ${right}`];
    explanation = "print() separates multiple values with a space by default.";
  } else if (lesson === "Print without a newline") {
    const first = String(1 + (n % 8));
    const second = String(2 + (n % 7));
    prompt = `What is printed on the line?\n\nprint(${JSON.stringify(first)}, end="")\nprint(${JSON.stringify(second)})`;
    answer = first + second;
    wrong = [first + " " + second, second + first, first + "\\n" + second];
    explanation = 'Setting end="" prevents print() from adding a newline, so the second value follows immediately.';
  } else {
    const x = 2 + (n % 17);
    const y = 3 + ((n * 3) % 13);
    prompt = `What does this code print?\n\nx = ${x}\ny = ${y}\nprint(x + y)`;
    answer = String(x + y);
    wrong = [String(x - y), String(x * y), String(x + y + 1)];
    explanation = `The expression x + y adds the variable values: ${x} + ${y} = ${answer}.`;
  }
  const labels = [...new Set(wrong.filter((value) => value !== answer))];
  for (const fallback of ["No output", "Syntax error", "0", "Other"]) {
    if (labels.length >= 3) break;
    if (fallback !== answer && !labels.includes(fallback)) labels.push(fallback);
  }
  const choices = [answer, ...labels.slice(0, 3)].map((label) => ({ label, correct: label === answer }));
  const shift = n % choices.length;
  const shuffled = [...choices.slice(shift), ...choices.slice(0, shift)];
  if (new Set(shuffled.map((choice) => choice.label)).size !== 4 || shuffled.filter((choice) => choice.correct).length !== 1) return null;
  return { id: `print-output-${seed}-${lesson}`, lesson, prompt, choices: shuffled, answer, explanation };
}
