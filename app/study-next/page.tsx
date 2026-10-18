"use client";

import { useMemo, useState } from "react";

type Choice = { label: string; score: number; feedback: string };
type Question = {
  id: string;
  skill: string;
  title: string;
  prompt: string;
  choices: Choice[];
  explanation: string;
  prerequisites: string[];
};

const skills = [
  { id: "python", label: "Python fundamentals", weight: 1.2, prerequisites: [] },
  { id: "http", label: "HTTP & REST", weight: 1.1, prerequisites: ["python"] },
  { id: "fastapi", label: "FastAPI", weight: 1.3, prerequisites: ["python", "http"] },
  { id: "sql", label: "SQL & data modeling", weight: 1.2, prerequisites: ["python"] },
  { id: "integration", label: "Backend integration", weight: 1.4, prerequisites: ["fastapi", "sql"] },
  { id: "testing", label: "Testing & reliability", weight: 1, prerequisites: ["fastapi"] },
  { id: "deployment", label: "Deployment", weight: 0.9, prerequisites: ["integration", "testing"] },
];

type LearningChapter = { title: string; category: string; href: string; skills: string[] };

const learningChapters: LearningChapter[] = [
  { category: "Python fundamentals", title: "Introduction", href: "python_intro.asp", skills: ["python"] },
  { category: "Python fundamentals", title: "Get Started", href: "python_getstarted.asp", skills: ["python"] },
  { category: "Python fundamentals", title: "Syntax", href: "python_syntax.asp", skills: ["python"] },
  { category: "Python fundamentals", title: "Print Output", href: "python_output.asp", skills: ["python"] },
  { category: "Python fundamentals", title: "Comments", href: "python_comments.asp", skills: ["python"] },
  { category: "Python fundamentals", title: "Variables", href: "python_variables.asp", skills: ["python"] },
  { category: "Python fundamentals", title: "Data Types", href: "python_datatypes.asp", skills: ["python"] },
  { category: "Python fundamentals", title: "Numbers", href: "python_numbers.asp", skills: ["python"] },
  { category: "Python fundamentals", title: "Casting", href: "python_casting.asp", skills: ["python"] },
  { category: "Python fundamentals", title: "Strings", href: "python_strings.asp", skills: ["python"] },
  { category: "Python fundamentals", title: "Booleans", href: "python_booleans.asp", skills: ["python"] },
  { category: "Python fundamentals", title: "Operators", href: "python_operators.asp", skills: ["python"] },
  { category: "Collections", title: "Lists", href: "python_lists.asp", skills: ["python"] },
  { category: "Collections", title: "Tuples", href: "python_tuples.asp", skills: ["python"] },
  { category: "Collections", title: "Sets", href: "python_sets.asp", skills: ["python"] },
  { category: "Collections", title: "Dictionaries", href: "python_dictionaries.asp", skills: ["python", "integration"] },
  { category: "Control flow", title: "If...Else", href: "python_conditions.asp", skills: ["python"] },
  { category: "Control flow", title: "Match", href: "python_match.asp", skills: ["python"] },
  { category: "Control flow", title: "While Loops", href: "python_while_loops.asp", skills: ["python"] },
  { category: "Control flow", title: "For Loops", href: "python_for_loops.asp", skills: ["python"] },
  { category: "Functions", title: "Functions", href: "python_functions.asp", skills: ["python", "fastapi", "testing"] },
  { category: "Functions", title: "Range", href: "python_range.asp", skills: ["python"] },
  { category: "Functions", title: "Lambda", href: "python_lambda.asp", skills: ["python"] },
  { category: "Functions", title: "Recursion", href: "python_recursion.asp", skills: ["python"] },
  { category: "Functions", title: "Generators", href: "python_generators.asp", skills: ["python"] },
  { category: "Intermediate Python", title: "Arrays", href: "python_arrays.asp", skills: ["python", "sql"] },
  { category: "Intermediate Python", title: "Iterators", href: "python_iterators.asp", skills: ["python"] },
  { category: "Intermediate Python", title: "Modules", href: "python_modules.asp", skills: ["python", "fastapi", "deployment"] },
  { category: "Intermediate Python", title: "Scope", href: "python_scope.asp", skills: ["python"] },
  { category: "Intermediate Python", title: "Decorators", href: "python_decorators.asp", skills: ["fastapi"] },
  { category: "Object-oriented Python", title: "Classes and Objects", href: "python_classes.asp", skills: ["python", "fastapi"] },
  { category: "Object-oriented Python", title: "Inheritance", href: "python_inheritance.asp", skills: ["python", "fastapi"] },
  { category: "Object-oriented Python", title: "Polymorphism", href: "python_polymorphism.asp", skills: ["python"] },
  { category: "Object-oriented Python", title: "Encapsulation", href: "python_encapsulation.asp", skills: ["python"] },
  { category: "Utilities", title: "Dates", href: "python_datetime.asp", skills: ["python", "sql"] },
  { category: "Utilities", title: "Math", href: "python_math.asp", skills: ["python"] },
  { category: "Utilities", title: "JSON", href: "python_json.asp", skills: ["http", "fastapi", "integration"] },
  { category: "Utilities", title: "Regular Expressions", href: "python_regex.asp", skills: ["python"] },
  { category: "Utilities", title: "PIP", href: "python_pip.asp", skills: ["deployment"] },
  { category: "Errors and input", title: "Try...Except", href: "python_try_except.asp", skills: ["python", "fastapi", "testing"] },
  { category: "Errors and input", title: "String Formatting", href: "python_string_formatting.asp", skills: ["python"] },
  { category: "Errors and input", title: "None", href: "python_none.asp", skills: ["python", "fastapi"] },
  { category: "Errors and input", title: "User Input", href: "python_user_input.asp", skills: ["python"] },
  { category: "Environment", title: "Virtual Environments", href: "python_virtualenv.asp", skills: ["deployment"] },
  { category: "Files and data", title: "File Handling", href: "python_file_handling.asp", skills: ["python", "integration"] },
  { category: "Files and data", title: "NumPy", href: "python_numpy.asp", skills: ["sql"] },
  { category: "Files and data", title: "Pandas", href: "python_pandas.asp", skills: ["sql"] },
  { category: "Files and data", title: "SciPy", href: "python_scipy.asp", skills: ["sql"] },
  { category: "Visualization", title: "Matplotlib", href: "python_matplotlib.asp", skills: ["sql"] },
  { category: "Advanced topics", title: "Machine Learning", href: "python_ml_getting_started.asp", skills: ["sql"] },
  { category: "Databases and frameworks", title: "MySQL", href: "python_mysql_getstarted.asp", skills: ["sql", "integration"] },
  { category: "Databases and frameworks", title: "MongoDB", href: "python_mongodb_getstarted.asp", skills: ["sql", "integration"] },
  { category: "Databases and frameworks", title: "Django", href: "django_intro.php", skills: ["fastapi", "integration"] },
  { category: "Practice", title: "Python DSA", href: "python_dsa.asp", skills: ["python", "testing"] },
];


type LessonQuestionData = { prompt: string; correct: string; partial: string; incorrect: string };

const lessonQuestionData: Record<string, LessonQuestionData> = {
  "python_intro.asp": { prompt: "What is Python primarily used for?", correct: "A general-purpose language for tasks such as web apps, automation, and data analysis", partial: "A language used only to style web pages", incorrect: "A database that stores application records" },
  "python_getstarted.asp": { prompt: "Which command commonly checks whether Python is installed and shows its version?", correct: "python --version", partial: "python --install", incorrect: "python --browser" },
  "python_syntax.asp": { prompt: "In Python, what usually marks the beginning of an indented code block?", correct: "A colon after a statement such as if, for, or def, followed by indentation", partial: "Curly braces around the block", incorrect: "A semicolon at the start of each line" },
  "python_output.asp": { prompt: "How do you display the text Hello in a Python terminal?", correct: "print('Hello')", partial: "console.log('Hello')", incorrect: "echo = 'Hello' without calling anything" },
  "python_comments.asp": { prompt: "Which syntax starts a single-line Python comment?", correct: "# comment", partial: "// comment", incorrect: "<!-- comment -->" },
  "python_variables.asp": { prompt: "What happens when you write count = 3 in Python?", correct: "The name count refers to the integer value 3", partial: "It declares a fixed constant that cannot change", incorrect: "It compares count with 3 without assigning anything" },
  "python_datatypes.asp": { prompt: "Which built-in type represents a sequence of characters such as 'hello'?", correct: "str", partial: "int", incorrect: "bool" },
  "python_numbers.asp": { prompt: "What is the result of 7 // 2 in Python?", correct: "3, because // performs floor division", partial: "3.5, because // performs ordinary division", incorrect: "1, because // is the modulo operator" },
  "python_casting.asp": { prompt: "How can you convert the string '42' to an integer?", correct: "int('42')", partial: "str(42)", incorrect: "number('42')" },
  "python_strings.asp": { prompt: "What does 'Python'[0] return?", correct: "'P', the character at index zero", partial: "'y', because indexing starts at one", incorrect: "The full string 'Python'" },
  "python_booleans.asp": { prompt: "Which expression evaluates to True?", correct: "5 > 2", partial: "5 < 2", incorrect: "bool('')" },
  "python_operators.asp": { prompt: "What does the % operator return for 10 % 3?", correct: "1, the remainder after division", partial: "3, the quotient rounded down", incorrect: "30, the product" },
  "python_lists.asp": { prompt: "How do you add the value 4 to the end of a list named items?", correct: "items.append(4)", partial: "items.add(4)", incorrect: "items.pushBack(4)" },
  "python_tuples.asp": { prompt: "What is a key property of a Python tuple?", correct: "It is ordered and cannot be modified after creation", partial: "It stores only unique values", incorrect: "It automatically sorts values alphabetically" },
  "python_sets.asp": { prompt: "Why use a set when removing duplicates from a collection?", correct: "A set stores unique elements", partial: "A set preserves every duplicate in insertion order", incorrect: "A set allows values to be accessed only by integer index" },
  "python_dictionaries.asp": { prompt: "Given user = {'name': 'Ari'}, how do you retrieve the name value?", correct: "user['name']", partial: "user.name()", incorrect: "user[0]" },
  "python_conditions.asp": { prompt: "Which structure runs a block only when age is at least 18?", correct: "if age >= 18:", partial: "when age >= 18:", incorrect: "repeat age >= 18:" },
  "python_match.asp": { prompt: "What is match/case useful for in Python?", correct: "Choosing a branch based on which pattern a value matches", partial: "Repeating a block until a condition becomes false", incorrect: "Declaring a class constructor" },
  "python_while_loops.asp": { prompt: "What must you watch for in a while loop?", correct: "The loop condition must eventually become false or the loop may never end", partial: "A while loop always runs exactly once", incorrect: "A while loop cannot use variables in its condition" },
  "python_for_loops.asp": { prompt: "What does for item in items do?", correct: "Runs the block once for each item yielded by items", partial: "Runs only when items is a Boolean True", incorrect: "Creates a new list without iterating" },
  "python_functions.asp": { prompt: "What does a return statement do inside a function?", correct: "Sends a value back to the caller and ends that function call", partial: "Prints the value to the terminal but returns nothing", incorrect: "Restarts the function from the beginning" },
  "python_range.asp": { prompt: "What numbers are produced by list(range(2, 5))?", correct: "[2, 3, 4]", partial: "[2, 3, 4, 5]", incorrect: "[0, 1, 2, 3, 4]" },
  "python_lambda.asp": { prompt: "What is lambda x: x * 2?", correct: "A small anonymous function that returns x multiplied by two", partial: "A loop that repeats twice", incorrect: "A class named x" },
  "python_recursion.asp": { prompt: "What does a recursive function need to avoid calling itself forever?", correct: "A base case that stops the recursion", partial: "A global variable for every argument", incorrect: "A print statement at the end" },
  "python_generators.asp": { prompt: "What does yield do in a generator function?", correct: "Produces a value and suspends execution so iteration can resume later", partial: "Returns all values at once and permanently exits", incorrect: "Raises an exception whenever the function is called" },
  "python_arrays.asp": { prompt: "When is an array-like structure useful compared with unrelated scalar variables?", correct: "When storing and processing a sequence of related values", partial: "When you need to store exactly one named value", incorrect: "When you need to define a conditional branch" },
  "python_iterators.asp": { prompt: "What does an iterator provide?", correct: "A way to retrieve values one at a time, typically through next()", partial: "A way to sort any collection automatically", incorrect: "A database connection pool" },
  "python_modules.asp": { prompt: "How do you make functions from a module named math available as math.sqrt(...)?", correct: "import math", partial: "include math", incorrect: "module math()" },
  "python_scope.asp": { prompt: "What does local scope mean for a variable created inside a function?", correct: "It is normally accessible only within that function", partial: "It is automatically shared with every module", incorrect: "It is stored permanently in the database" },
  "python_decorators.asp": { prompt: "What is a Python decorator commonly used for?", correct: "Wrapping or extending a function's behavior without rewriting its core body", partial: "Converting every function into a class", incorrect: "Installing a package from the internet" },
  "python_classes.asp": { prompt: "In a Python class, what is self commonly used to refer to?", correct: "The current instance, allowing access to its attributes and methods", partial: "The parent class in every inheritance chain", incorrect: "The Python interpreter process" },
  "python_inheritance.asp": { prompt: "What does inheritance allow a class to do?", correct: "Reuse or extend behavior defined by a parent class", partial: "Prevent all methods from being called", incorrect: "Automatically turn instance attributes into database columns" },
  "python_polymorphism.asp": { prompt: "What is polymorphism in object-oriented programming?", correct: "Different object types can respond to the same operation through their own implementations", partial: "Every object must have exactly the same data", incorrect: "A function can only accept one type of argument" },
  "python_encapsulation.asp": { prompt: "What is the purpose of encapsulation?", correct: "Keeping an object's state and behavior together while controlling how its internals are accessed", partial: "Making every attribute globally accessible", incorrect: "Combining multiple Python files into one string" },
  "python_datetime.asp": { prompt: "Which module provides Python date and time objects such as datetime?", correct: "datetime", partial: "calendar only provides the current timestamp", incorrect: "timeparse" },
  "python_math.asp": { prompt: "How can you access functions such as sqrt from Python's standard math module?", correct: "import math, then call math.sqrt(value)", partial: "Call sqrt(value) without importing or defining it", incorrect: "Use SQL's SELECT SQRT statement in Python code" },
  "python_json.asp": { prompt: "Which standard-library call converts a JSON string into Python data?", correct: "json.loads(json_text)", partial: "json.dumps(json_text)", incorrect: "json.parseFileOnly(json_text)" },
  "python_regex.asp": { prompt: "What is a regular expression useful for?", correct: "Matching or extracting text patterns, such as a sequence of digits", partial: "Managing database transactions", incorrect: "Rendering charts from numeric data" },
  "python_pip.asp": { prompt: "What is pip primarily used for?", correct: "Installing and managing Python packages", partial: "Running SQL migrations automatically", incorrect: "Formatting HTML in a browser" },
  "python_try_except.asp": { prompt: "How should code handle an expected ValueError?", correct: "Catch ValueError specifically and handle or report the invalid input", partial: "Catch every possible exception and silently ignore it", incorrect: "Assume the error cannot occur" },
  "python_string_formatting.asp": { prompt: "What does f'Hello, {name}' do when name is 'Mina'?", correct: "Produces the string 'Hello, Mina'", partial: "Produces the literal text 'Hello, {name}' in every case", incorrect: "Converts name to an integer" },
  "python_none.asp": { prompt: "What does None represent in Python?", correct: "The absence of a value or a deliberate no-result value", partial: "The number zero", incorrect: "An empty string" },
  "python_user_input.asp": { prompt: "What type of value does input() return by default?", correct: "A string, which may need conversion before numeric calculations", partial: "An integer whenever the user types digits", incorrect: "A Boolean value only" },
  "python_virtualenv.asp": { prompt: "Why create a virtual environment for a Python project?", correct: "To isolate that project's installed packages and dependencies", partial: "To make the project run without an interpreter", incorrect: "To automatically host the app in production" },
  "python_file_handling.asp": { prompt: "Why is using with open(...) as file recommended?", correct: "It closes the file reliably when the block exits", partial: "It automatically encrypts every file", incorrect: "It prevents the file from ever raising an exception" },
  "python_numpy.asp": { prompt: "What is NumPy especially useful for?", correct: "Efficient numerical computing with multidimensional arrays", partial: "Defining URL routes for a web server", incorrect: "Managing Python virtual environments" },
  "python_pandas.asp": { prompt: "What is a pandas DataFrame?", correct: "A labeled two-dimensional tabular data structure with rows and columns", partial: "A function that starts a web server", incorrect: "A Python package installer" },
  "python_scipy.asp": { prompt: "What does SciPy add to the Python ecosystem?", correct: "Scientific computing algorithms for areas such as optimization and statistics", partial: "A replacement syntax for Python loops", incorrect: "A browser-based CSS layout engine" },
  "python_matplotlib.asp": { prompt: "What is Matplotlib commonly used for?", correct: "Creating plots and charts from data", partial: "Validating request bodies for a REST API", incorrect: "Defining relational foreign keys" },
  "python_ml_getting_started.asp": { prompt: "In a basic machine-learning workflow, what is training data used for?", correct: "Fitting a model so it can learn patterns from examples", partial: "Storing website styles and page layouts", incorrect: "Replacing the need to evaluate model performance" },
  "python_mysql_getstarted.asp": { prompt: "What is the role of a database connector in Python code that uses MySQL?", correct: "Open a connection and send SQL statements to the database", partial: "Convert Python functions into HTML components", incorrect: "Train a neural network without data" },
  "python_mongodb_getstarted.asp": { prompt: "How does MongoDB typically organize records?", correct: "As documents grouped into collections", partial: "Only as rows in fixed relational tables", incorrect: "As Python functions inside modules" },
  "django_intro.php": { prompt: "What is Django?", correct: "A Python web framework that includes tools for building web applications", partial: "A Python-only data visualization library", incorrect: "A SQL query language" },
  "python_dsa.asp": { prompt: "What do data structures and algorithms help you reason about?", correct: "How data is organized and how efficiently operations solve a problem", partial: "How to choose a website's accent color", incorrect: "How to write package metadata only" },
};

const questions: Question[] = learningChapters.map((chapter, index) => {
  const data = lessonQuestionData[chapter.href];
  const baseChoices = [
    { label: data.correct, score: 2 },
    { label: data.partial, score: 1 },
    { label: data.incorrect, score: 0 },
  ];
  const offset = index % baseChoices.length;
  const orderedChoices = [...baseChoices.slice(offset), ...baseChoices.slice(0, offset)];
  return {
    id: chapter.href,
    skill: chapter.skills[0],
    title: chapter.title,
    prompt: data.prompt,
    choices: orderedChoices.map(choice => ({
      ...choice,
      feedback: choice.score === 2
        ? \`Correct. Your answer shows a solid signal for \${chapter.title}.\`
        : choice.score === 1
          ? \`Partially correct. Review the W3Schools \${chapter.title} chapter to reinforce this concept.\`
          : \`This answer suggests a gap in \${chapter.title}. Review the linked chapter before moving on.\`,
    })),
    explanation: \`Review the W3Schools \${chapter.title} chapter to strengthen this skill.\`,
    prerequisites: [],
  };
});

const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

export default function StudyNextPage() {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [lastFeedback, setLastFeedback] = useState("");

  const scores = useMemo(() => {
    const values: Record<string, number[]> = {};
    for (const question of questions) {
      const score = answers[question.id];
      if (score !== undefined) (values[question.skill] ??= []).push(score);
    }
    return Object.fromEntries(skills.map(skill => {
      const items = values[skill.id] ?? [];
      return [skill.id, items.length ? items.reduce((a, b) => a + b, 0) / (items.length * 2) : null];
    })) as Record<string, number | null>;
  }, [answers]);

  const answered = Object.keys(answers).length;
  const current = questions.find(q => q.id === currentId) ?? null;
  const nextQuestion = useMemo(() => {
    const remaining = questions.filter(q => answers[q.id] === undefined);
    if (!remaining.length) return null;
    const prerequisitePenalty = (q: Question) => q.prerequisites.reduce((total, id) => {
      const score = scores[id];
      return total + (score === null || score === undefined ? 0.15 : (1 - score) * 0.7);
    }, 0);
    return [...remaining].sort((a, b) => {
      const aScore = scores[a.skill];
      const bScore = scores[b.skill];
      const aPriority = skills.find(s => s.id === a.skill)?.weight ?? 1;
      const bPriority = skills.find(s => s.id === b.skill)?.weight ?? 1;
      const aWeakness = aScore === null || aScore === undefined ? 0.25 : 1 - aScore;
      const bWeakness = bScore === null || bScore === undefined ? 0.25 : 1 - bScore;
      return (bPriority + bWeakness + prerequisitePenalty(b)) - (aPriority + aWeakness + prerequisitePenalty(a));
    })[0];
  }, [answers, scores]);

  const recommendedChapters = useMemo(() => {
    const ranked = learningChapters
      .map((chapter, index) => ({
        ...chapter,
        score: answers[chapter.href] ?? 0,
        index,
      }))
      .filter(chapter => chapter.score < 2)
      .sort((a, b) => a.score - b.score || a.index - b.index)
      .slice(0, 10);
    return ranked;
  }, [answers]);

  function startOrContinue() {
    if (showResult) return;
    if (currentId) return;
    if (nextQuestion) setCurrentId(nextQuestion.id);
  }

  function choose(score: number, feedback: string) {
    if (!current) return;
    setAnswers(previous => ({ ...previous, [current.id]: score }));
    setLastFeedback(feedback);
    setCurrentId(null);
    if (answered + 1 >= questions.length) setShowResult(true);
  }

  function restart() {
    setAnswers({});
    setCurrentId(null);
    setShowResult(false);
    setLastFeedback("");
  }

  return (
    <main className="sn-page">
      <style jsx global>{`
        .sn-page { --sn-line:#252525; --sn-muted:#888; max-width:900px; margin:0 auto; padding:28px 22px 100px; color:#eee; font:13px/1.65 var(--font-mono,monospace); }
        .sn-page * { box-sizing:border-box; }
        .sn-top { display:flex; justify-content:space-between; gap:12px; color:#777; font-size:10px; letter-spacing:.14em; text-transform:uppercase; border-bottom:1px solid var(--sn-line); padding-bottom:14px; }
        .sn-hero { padding:clamp(42px,8vw,86px) 0 38px; }
        .sn-kicker { color:#888; font-size:10px; letter-spacing:.18em; text-transform:uppercase; }
        .sn-hero h1 { margin:12px 0 10px; color:#fff; font-size:clamp(34px,7vw,64px); line-height:1.05; letter-spacing:-.06em; }
        .sn-hero p { max-width:600px; color:#999; font-size:13px; }
        .sn-meta { display:flex; flex-wrap:wrap; gap:8px; margin-top:22px; }
        .sn-chip { border:1px solid #303030; padding:5px 9px; color:#aaa; font-size:10px; letter-spacing:.08em; }
        .sn-panel { border:1px solid #292929; background:#080808; padding:clamp(20px,4vw,34px); margin-top:16px; }
        .sn-panel-head { display:flex; justify-content:space-between; gap:16px; align-items:center; margin-bottom:24px; }
        .sn-label { color:#777; font-size:10px; letter-spacing:.15em; text-transform:uppercase; }
        .sn-count { color:#bbb; font-size:11px; }
        .sn-progress { height:2px; background:#222; margin:12px 0 30px; }
        .sn-progress span { display:block; height:100%; background:#eee; transition:width .2s; }
        .sn-question { color:#fff; font-size:clamp(20px,3vw,28px); line-height:1.35; letter-spacing:-.03em; margin:8px 0 28px; }
        .sn-choices { display:grid; gap:9px; }
        .sn-choice { width:100%; text-align:left; padding:15px 16px; background:#0c0c0c; border:1px solid #303030; color:#ddd; font:inherit; cursor:pointer; }
        .sn-choice:hover { border-color:#888; background:#111; }
        .sn-choice:focus-visible,.sn-action:focus-visible { outline:1px solid #fff; outline-offset:3px; }
        .sn-action { display:inline-flex; align-items:center; justify-content:center; border:1px solid #eee; background:#eee; color:#000; padding:11px 16px; margin-top:22px; font:inherit; cursor:pointer; }
        .sn-action:hover { background:#ccc; }
        .sn-secondary { background:transparent; color:#eee; border-color:#444; }
        .sn-feedback { margin-top:18px; padding:14px; border-left:2px solid #888; color:#aaa; }
        .sn-skill-list { display:grid; gap:16px; margin-top:22px; }
        .sn-skill-row { display:grid; grid-template-columns:minmax(0,1fr) 90px; gap:8px 18px; align-items:center; }
        .sn-skill-name { color:#ddd; }
        .sn-skill-value { color:#999; text-align:right; font-size:11px; }
        .sn-meter { grid-column:1/-1; height:3px; background:#242424; }
        .sn-meter span { display:block; height:100%; background:#ddd; }
        .sn-rec { border:1px solid #555; padding:20px; margin-top:22px; }
        .sn-rec h3 { margin:9px 0; font-size:24px; letter-spacing:-.04em; }
        .sn-rec p { color:#aaa; }
        .sn-chapters { list-style:none; margin:22px 0 0; padding:0; display:grid; gap:0; }
        .sn-chapters li { display:grid; grid-template-columns:36px minmax(0,1fr); gap:12px; padding:12px 0; border-top:1px solid #252525; }
        .sn-chapter-number { color:#666; font-size:11px; padding-top:3px; }
        .sn-chapter-copy { display:grid; gap:2px; }
        .sn-chapter-category { color:#777; font-size:10px; letter-spacing:.1em; text-transform:uppercase; }
        .sn-chapter-copy a { color:#eee; text-decoration:underline; text-underline-offset:3px; }
        .sn-chapter-copy a:hover { color:#aaa; }
        .sn-chapter-note { margin-top:22px; font-size:11px; }
        .sn-footer { display:flex; flex-wrap:wrap; justify-content:space-between; gap:12px; margin-top:20px; color:#666; font-size:10px; letter-spacing:.08em; text-transform:uppercase; }
        @media (max-width:560px) { .sn-top { font-size:9px; } .sn-panel-head { align-items:flex-start; } .sn-skill-row { grid-template-columns:minmax(0,1fr) 72px; } }
      `}</style>

      <header className="sn-top"><span>STUDY SYSTEM / 002</span><span>ADAPTIVE ASSESSMENT</span></header>
      <section className="sn-hero">
        <p className="sn-kicker">Python full-stack / diagnostic engine</p>
        <h1>What should you<br />learn next?</h1>
        <p>Answer one question for each curriculum chapter. Your results identify the specific lessons to review, ranked by your demonstrated understanding.</p>
        <div className="sn-meta"><span className="sn-chip">PYTHON</span><span className="sn-chip">FASTAPI</span><span className="sn-chip">POSTGRESQL</span><span className="sn-chip">TESTING</span></div>
      </section>

      {!showResult ? (
        <section className="sn-panel">
          <div className="sn-panel-head"><span className="sn-label">Knowledge interview</span><span className="sn-count">{answered} / {questions.length} answered</span></div>
          <div className="sn-progress"><span style={{ width: `${(answered / questions.length) * 100}%` }} /></div>
          {!current ? (
            <>
              <p className="sn-label">NEXT DIAGNOSTIC</p>
              <p className="sn-question">{answered === 0 ? "Let's establish your starting point." : "Your previous answer has updated the next question priority."}</p>
              <p style={{ color: "#888" }}>Each question tests one W3Schools chapter. Choose the answer that best matches your current understanding.</p>
              <button className="sn-action" onClick={startOrContinue}>{answered === 0 ? "Begin assessment →" : "Continue →"}</button>
              {lastFeedback ? <p className="sn-feedback">{lastFeedback}</p> : null}
            </>
          ) : (
            <>
              <p className="sn-label">{current.title}</p>
              <h2 className="sn-question">{current.prompt}</h2>
              <div className="sn-choices">
                {current.choices.map(choice => <button className="sn-choice" key={choice.label} onClick={() => choose(choice.score, choice.feedback)}>{choice.label}</button>)}
              </div>
              <p className="sn-footer"><span>Skill: {skills.find(s => s.id === current.skill)?.label}</span><span>Selection changes the next question</span></p>
            </>
          )}
        </section>
      ) : (
        <section className="sn-panel">
          <p className="sn-label">Assessment complete</p>
          <h2 className="sn-question">Your learning gaps.</h2>
          <div className="sn-rec">
            <p className="sn-label">RECOMMENDED CHAPTERS / W3SCHOOLS PYTHON</p>
            <h3>What to study next</h3>
            <p>Each chapter has its own question and score. These are the lessons where your answers showed gaps or partial understanding.</p>
            {recommendedChapters.length ? (
              <ol className="sn-chapters">
                {recommendedChapters.map((chapter, index) => (
                  <li key={chapter.href}>
                    <span className="sn-chapter-number">{String(index + 1).padStart(2, "0")}</span>
                    <span className="sn-chapter-copy"><span className="sn-chapter-category">{chapter.category} · {chapter.score === 0 ? "Needs review" : "Developing"}</span><a href={`https://www.w3schools.com/python/${chapter.href}`} target="_blank" rel="noreferrer">{chapter.title} ↗</a></span>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="sn-chapter-note">No clear chapter gaps were identified by this assessment. Try the coding exercises to check practical understanding.</p>
            )}
            <p className="sn-chapter-note">Each lesson is assessed by one question. Scores are directional rather than proof of mastery. W3Schools chapter links open in a new tab.</p>
          </div>
          <div className="sn-skill-list">
            {skills.map(skill => {
              const score = scores[skill.id];
              const percent = score === null ? 0 : clamp(Math.round(score * 100), 0, 100);
              return <div className="sn-skill-row" key={skill.id}>
                <span className="sn-skill-name">{skill.label}</span><span className="sn-skill-value">{score === null ? "Not assessed" : `${percent}% signal`}</span>
                <div className="sn-meter"><span style={{ width: `${percent}%` }} /></div>
              </div>;
            })}
          </div>
          <button className="sn-action" onClick={restart}>Retake assessment ↻</button>
          <p className="sn-feedback">This prototype uses one rule-based question per chapter. Results are directional, not proof of mastery. Progress is stored only for this local session.</p>
        </section>
      )}
      <footer className="sn-footer"><span>RULE-BASED PROTOTYPE / LOCAL SESSION</span><span>01 — ASSESS / 02 — RECOMMEND / 03 — PRACTICE</span></footer>
    </main>
  );
}
