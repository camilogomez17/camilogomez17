"use client";

import { useEffect, useMemo, useState } from "react";

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

const questionSets: Record<string, Question[]> = Object.fromEntries(learningChapters.map((chapter, index) => {
  const data = lessonQuestionData[chapter.href];
  const stages = [
    { prompt: data.prompt, correct: data.correct, partial: data.partial, incorrect: data.incorrect, explanation: `The key idea in ${chapter.title} is: ${data.correct}. Keep this distinction in mind as you practice.` },
    { prompt: `Misconception check: which statement about ${chapter.title} is the misconception?`, correct: data.incorrect, partial: data.partial, incorrect: data.correct, explanation: `The misconception is “${data.incorrect}”. The accurate idea is: ${data.correct}.` },
    { prompt: `Challenge: you're teaching ${chapter.title} to another Python learner. Which statement should they remember?`, correct: data.correct, partial: data.partial, incorrect: data.incorrect, explanation: `Remember this core idea: ${data.correct}. The other options either confuse the topic with a related idea or describe it inaccurately.` },
  ];
  const questions = stages.map((stage, level) => {
    const choices = [{ label: stage.correct, score: 2 }, { label: stage.partial, score: 1 }, { label: stage.incorrect, score: 0 }];
    const offset = (index + level) % choices.length;
    const ordered = [...choices.slice(offset), ...choices.slice(0, offset)];
    return {
      id: `${chapter.href}-level-${level + 1}`, skill: chapter.skills[0], title: chapter.title, prompt: stage.prompt,
      choices: ordered.map(choice => ({ ...choice, feedback: choice.score === 2 ? `Correct. You passed level ${level + 1} for ${chapter.title}.` : choice.score === 1 ? "Partially correct. Review the distinction and try this level again." : "Not quite. Read the explanation, then try this level again." })),
      explanation: stage.explanation, prerequisites: [],
    } satisfies Question;
  });
  return [chapter.href, questions] as const;
}));

type LessonProgress = { level: number; attempts: number; correct: number; mastered: boolean };

export default function StudyNextPage() {
  const [selectedChapter, setSelectedChapter] = useState<string | null>(null);
  const [lessonProgress, setLessonProgress] = useState<Record<string, LessonProgress>>({});
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [showAllLessons, setShowAllLessons] = useState(false);
  const [lastLessonId, setLastLessonId] = useState<string | null>(null);
  const [progressLoaded, setProgressLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("study-next-progress-v2") ?? window.localStorage.getItem("study-next-progress-v1");
      if (saved) {
        const parsed = JSON.parse(saved) as { lessonProgress?: Record<string, LessonProgress>; answered?: Record<string, number>; lastLessonId?: string | null; showAllLessons?: boolean };
        if (parsed.lessonProgress && typeof parsed.lessonProgress === "object") {
          const validProgress = Object.fromEntries(Object.entries(parsed.lessonProgress).filter(([id, value]) => learningChapters.some(chapter => chapter.href === id) && value && Number.isInteger(value.level) && value.level >= 0 && value.level <= 3 && Number.isFinite(value.attempts) && Number.isFinite(value.correct)).map(([id, value]) => [id, { level: Math.max(0, Math.min(3, value.level)), attempts: Math.max(0, value.attempts), correct: Math.max(0, value.correct), mastered: value.level >= 3 || value.mastered === true }]));
          setLessonProgress(validProgress);
        } else if (parsed.answered && typeof parsed.answered === "object") {
          const migrated = Object.fromEntries(Object.entries(parsed.answered).filter(([id, score]) => learningChapters.some(chapter => chapter.href === id) && [0, 1, 2].includes(score)).map(([id, score]) => [id, { level: score === 2 ? 1 : 0, attempts: 1, correct: score === 2 ? 1 : 0, mastered: false }]));
          setLessonProgress(migrated);
        }
        if (parsed.lastLessonId && learningChapters.some(chapter => chapter.href === parsed.lastLessonId)) setLastLessonId(parsed.lastLessonId);
        if (typeof parsed.showAllLessons === "boolean") setShowAllLessons(parsed.showAllLessons);
      }
    } catch {
      window.localStorage.removeItem("study-next-progress-v1");
    } finally {
      setProgressLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!progressLoaded) return;
    try {
      window.localStorage.setItem("study-next-progress-v2", JSON.stringify({ lessonProgress, lastLessonId, showAllLessons }));
    } catch {
      // The lesson experience still works if browser storage is unavailable.
    }
  }, [lessonProgress, lastLessonId, showAllLessons, progressLoaded]);
  const currentProgress = selectedChapter ? lessonProgress[selectedChapter] : undefined;
  const current = selectedChapter ? questionSets[selectedChapter]?.[Math.min(currentProgress?.level ?? 0, 2)] ?? null : null;
  const attemptedCount = Object.values(lessonProgress).filter(progress => progress.attempts > 0).length;
  const masteredCount = Object.values(lessonProgress).filter(progress => progress.mastered).length;
  const totalAttempts = Object.values(lessonProgress).reduce((total, progress) => total + progress.attempts, 0);
  const correctCount = Object.values(lessonProgress).reduce((total, progress) => total + progress.correct, 0);
  const activeCategory = selectedChapter ? learningChapters.find(chapter => chapter.href === selectedChapter)?.category : null;
  const groups = useMemo(() => { const result = new Map<string, LearningChapter[]>(); learningChapters.forEach(chapter => result.set(chapter.category, [...(result.get(chapter.category) ?? []), chapter])); return [...result.entries()]; }, []);
  function openLesson(id: string) { setSelectedChapter(id); setLastLessonId(id); setSelectedChoice(null); setLessonProgress(previous => { const progress = previous[id]; return progress?.mastered ? { ...previous, [id]: { ...progress, level: 0 } } : previous; }); }
  function answerQuestion(choice: Choice) { if (!current || !selectedChapter || selectedChoice !== null) return; setSelectedChoice(choice.score); setLessonProgress(previous => { const progress = previous[selectedChapter] ?? { level: 0, attempts: 0, correct: 0, mastered: false }; return { ...previous, [selectedChapter]: { ...progress, attempts: progress.attempts + 1, correct: progress.correct + (choice.score === 2 ? 1 : 0) } }; }); }
  function continueQuestion() { if (!selectedChapter || selectedChoice !== 2) return; setLessonProgress(previous => { const progress = previous[selectedChapter] ?? { level: 0, attempts: 0, correct: 0, mastered: false }; const level = Math.min(3, progress.level + 1); return { ...previous, [selectedChapter]: { ...progress, level, mastered: progress.mastered || level >= 3 } }; }); setSelectedChoice(null); if ((currentProgress?.level ?? 0) >= 2) { setSelectedChapter(null); setSelectedChoice(null); } }
  function resetProgress() { setLessonProgress({}); setSelectedChapter(null); setSelectedChoice(null); setLastLessonId(null); }
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
      <header className="sn-top"><span>STUDY SYSTEM / 002</span><span>SKILL PRACTICE / PYTHON</span></header>
      <section className="sn-hero"><p className="sn-kicker">LEARN · PRACTICE · IMPROVE</p><h1>One skill at a time.</h1><p>Short, focused Python exercises with instant feedback. Build mastery through three short stages—no long diagnostic to finish first.</p><div className="sn-meta"><span className="sn-chip">INSTANT FEEDBACK</span><span className="sn-chip">162 PRACTICE STAGES</span><span className="sn-chip">SELF-PACED</span></div></section>
      <div style={{ display:"grid", gridTemplateColumns:"minmax(0,1.5fr) minmax(220px,.8fr)", gap:14, alignItems:"start" }}>
        <section className="sn-panel">
          {!current ? <>
            <div className="sn-panel-head"><span className="sn-label">Choose a lesson</span><span className="sn-count">{masteredCount} / {learningChapters.length} mastered</span></div>
            <div className="sn-progress"><span style={{ width: ((masteredCount / learningChapters.length) * 100) + "%" }} /></div>
            <h2 className="sn-question">What do you want to work on?</h2><p style={{color:"#888"}}>Choose a topic to get immediate feedback. Your progress updates as you go.</p>
            {lastLessonId && <button className="sn-action" style={{marginTop:12}} onClick={() => openLesson(lastLessonId)}>Resume {learningChapters.find(chapter => chapter.href === lastLessonId)?.title ?? "last lesson"} →</button>}
            {!progressLoaded && <p style={{color:"#777",fontSize:10,marginTop:10}}>RESTORING YOUR PROGRESS…</p>}
            {progressLoaded && attemptedCount > 0 && <p style={{color:"#777",fontSize:10,marginTop:10}}>PROGRESS SAVED ON THIS DEVICE</p>}
            {(showAllLessons ? groups : groups.slice(0,4)).map(([category, chapters]) => <div key={category} style={{marginTop:20}}>
              <div style={{display:"flex",justifyContent:"space-between",borderBottom:"1px solid #252525",paddingBottom:8,color:"#aaa"}}><span>{category}</span><span>{chapters.filter(chapter => lessonProgress[chapter.href]?.mastered).length}/{chapters.length}</span></div>
              {chapters.map(chapter => { const progress = lessonProgress[chapter.href]; const score = progress?.mastered ? 2 : progress?.level || progress?.attempts ? 1 : undefined; return <button key={chapter.href} onClick={() => openLesson(chapter.href)} style={{display:"grid",gridTemplateColumns:"22px 1fr auto",gap:8,width:"100%",padding:"11px 0",textAlign:"left",color:"#ddd",background:"transparent",border:0,borderBottom:"1px solid #1d1d1d",font:"inherit",cursor:"pointer"}}><span style={{color:score === 2 ? "#fff" : "#777"}}>{score === undefined ? "○" : score === 2 ? "✓" : "↻"}</span><span>{chapter.title}</span><span style={{fontSize:9,color:"#777"}}>{progress?.mastered ? "MASTERED" : progress?.level ? `LEVEL ${progress.level + 1}/3` : progress?.attempts ? "REVIEW" : "PRACTICE"}</span></button>; })}
            </div>)}
            <button className="sn-action sn-secondary" onClick={() => setShowAllLessons(!showAllLessons)}>{showAllLessons ? "Show fewer lessons ↑" : "Show all lessons ↓"}</button>
          </> : <>
            <div className="sn-panel-head"><span className="sn-label">{activeCategory} / {current.title}</span><span className="sn-count">{masteredCount} / {learningChapters.length} mastered</span></div>
            <div className="sn-progress"><span style={{width: ((attemptedCount / learningChapters.length) * 100) + "%"}} /></div>
            <p className="sn-label">LEVEL {(currentProgress?.level ?? 0) + 1} OF 3 · {["RECALL", "MISCONCEPTION CHECK", "CHALLENGE"][currentProgress?.level ?? 0]}</p><h2 className="sn-question">{current.prompt}</h2>
            <div className="sn-choices">{current.choices.map((choice,index) => <button key={choice.label} disabled={selectedChoice !== null} className={"sn-choice" + (selectedChoice === choice.score ? " is-selected" : "")} onClick={() => answerQuestion(choice)}><span style={{color:"#777",marginRight:12}}>{String.fromCharCode(65+index)}.</span>{choice.label}</button>)}</div>
            {selectedChoice !== null && <div className="sn-feedback" role="status"><strong>{selectedChoice === 2 ? "Correct." : selectedChoice === 1 ? "Partially correct." : "Not quite."}</strong><p>{current.explanation}</p><p style={{marginTop:8}}>{selectedChoice === 2 ? "Level complete. Continue to the next stage." : "You need a correct answer to advance. Try again when ready."}</p><a style={{color:"#eee",textDecoration:"underline"}} href={"https://www.w3schools.com/python/" + selectedChapter} target="_blank" rel="noreferrer">Review lesson ↗</a></div>}
            <div style={{display:"flex",flexWrap:"wrap",gap:8}}><button className="sn-action sn-secondary" onClick={() => {setSelectedChapter(null);setSelectedChoice(null);}}>All lessons</button>{selectedChoice !== null && <button className="sn-action" onClick={selectedChoice === 2 ? continueQuestion : () => setSelectedChoice(null)}>{selectedChoice === 2 ? ((currentProgress?.level ?? 0) >= 2 ? "Complete lesson ✓" : "Next level →") : "Try again ↻"}</button>}</div>
          </>}
        </section>
        <aside style={{display:"grid",gap:14}}>
          <section className="sn-panel"><p className="sn-label">YOUR PROGRESS</p><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginTop:14}}><div style={{border:"1px solid #292929",padding:12}}><strong style={{display:"block",fontSize:22,fontWeight:500}}>{attemptedCount}</strong><span style={{fontSize:9,color:"#777"}}>LESSONS TRIED</span></div><div style={{border:"1px solid #292929",padding:12}}><strong style={{display:"block",fontSize:22,fontWeight:500}}>{totalAttempts ? Math.round(correctCount/totalAttempts*100) : 0}%</strong><span style={{fontSize:9,color:"#777"}}>ANSWER ACCURACY</span></div></div><p style={{marginTop:16,color:"#999",fontSize:11}}>Mastery · {Math.round(masteredCount/learningChapters.length*100)}%</p><div className="sn-progress"><span style={{width:(masteredCount/learningChapters.length*100)+"%"}} /></div>{attemptedCount > 0 && <button className="sn-action sn-secondary" onClick={resetProgress}>Reset progress ↻</button>}</section>
          <section className="sn-panel"><p className="sn-label">RECOMMENDED NEXT</p>{learningChapters.filter(chapter => !lessonProgress[chapter.href]?.mastered).slice(0,5).map(chapter => <button key={chapter.href} onClick={() => openLesson(chapter.href)} style={{display:"grid",gridTemplateColumns:"20px 1fr auto",gap:8,width:"100%",padding:"10px 0",textAlign:"left",color:"#ddd",background:"transparent",border:0,borderBottom:"1px solid #1d1d1d",font:"inherit",cursor:"pointer"}}><span style={{color:"#777"}}>{lessonProgress[chapter.href]?.level ? "↻" : "○"}</span><span>{chapter.title}</span><span style={{fontSize:9,color:"#777"}}>{lessonProgress[chapter.href]?.attempts ? "CONTINUE" : "NEW"}</span></button>)}</section>
        </aside>
      </div>
      <footer className="sn-footer"><span>INSTANT FEEDBACK / SAVED ON THIS DEVICE</span><span>LEARN — PRACTICE — REPEAT</span></footer>
    </main>
  );
}