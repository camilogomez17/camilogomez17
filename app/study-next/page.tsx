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

const questions: Question[] = [
  {
    id: "py-functions", skill: "python", title: "Python foundations", prompt: "A function receives a list and needs to return a new list without changing the original. What is the safest starting point?",
    choices: [
      { label: "Create a new list and build the result", score: 2, feedback: "Correct. A new list avoids mutating the caller's data." },
      { label: "Change each item in the original list", score: 0, feedback: "That mutates the input and can create unexpected side effects." },
      { label: "Use a global variable for the result", score: 0, feedback: "A global variable adds shared state and makes the function harder to test." },
    ],
    explanation: "Functions, collections, and predictable data flow are foundations for backend logic.",
    prerequisites: [],
  },
  {
    id: "py-errors", skill: "python", title: "Error handling", prompt: "A file may not exist. How should your code handle that possibility?",
    choices: [
      { label: "Catch the expected exception and handle it deliberately", score: 2, feedback: "Correct. Handle specific exceptions and define a useful fallback." },
      { label: "Catch every exception and silently ignore it", score: 0, feedback: "Silencing all errors hides bugs and makes failures difficult to diagnose." },
      { label: "Assume the file is always present", score: 0, feedback: "External state is not guaranteed; code should handle expected failures." },
    ],
    explanation: "Backend services need clear error paths and predictable behavior when dependencies fail.",
    prerequisites: [],
  },
  {
    id: "http-status", skill: "http", title: "HTTP basics", prompt: "A client successfully creates a new record. Which status code is the best fit?",
    choices: [
      { label: "201 Created", score: 2, feedback: "Correct. 201 communicates that a resource was created." },
      { label: "404 Not Found", score: 0, feedback: "404 means the requested resource could not be found." },
      { label: "500 Internal Server Error", score: 0, feedback: "500 signals an unexpected server failure." },
    ],
    explanation: "Knowing HTTP methods, status codes, and request/response shapes is essential before building APIs.",
    prerequisites: ["python"],
  },
  {
    id: "http-methods", skill: "http", title: "API design", prompt: "Which HTTP method is normally used to retrieve a list of records without changing them?",
    choices: [
      { label: "GET", score: 2, feedback: "Correct. GET retrieves a representation and should not change server state." },
      { label: "POST", score: 0, feedback: "POST commonly submits data or creates a resource." },
      { label: "DELETE", score: 0, feedback: "DELETE requests removal of a resource." },
    ],
    explanation: "Clear API conventions make services easier to use and maintain.",
    prerequisites: ["python"],
  },
  {
    id: "fastapi-validation", skill: "fastapi", title: "FastAPI validation", prompt: "An endpoint expects a request body with a name and an integer quantity. How should you validate it?",
    choices: [
      { label: "Define a Pydantic request model with typed fields", score: 2, feedback: "Correct. FastAPI uses Pydantic models to validate and document request bodies." },
      { label: "Accept any dictionary and trust the caller", score: 0, feedback: "Unvalidated input can cause incorrect data and runtime errors." },
      { label: "Parse the raw request body manually for every endpoint", score: 1, feedback: "It can work, but typed request models are safer and reduce repeated code." },
    ],
    explanation: "FastAPI request models give you validation, useful errors, and generated API documentation.",
    prerequisites: ["python", "http"],
  },
  {
    id: "fastapi-async", skill: "fastapi", title: "Request handlers", prompt: "When should you use async def in a FastAPI endpoint?",
    choices: [
      { label: "When calling awaitable I/O operations with an async-compatible library", score: 2, feedback: "Correct. Async is useful when the work uses non-blocking awaitable operations." },
      { label: "For every function, because async always makes code faster", score: 0, feedback: "Async is not automatically faster and does not speed up CPU-bound work by itself." },
      { label: "Only when the endpoint returns JSON", score: 0, feedback: "The response format does not determine whether async is appropriate." },
    ],
    explanation: "Understand request lifecycle and I/O before adding concurrency to an API.",
    prerequisites: ["python", "http"],
  },
  {
    id: "sql-keys", skill: "sql", title: "Relational data", prompt: "You need every activity record to belong to a user. What database feature models that relationship?",
    choices: [
      { label: "A foreign key from the activity table to the user table", score: 2, feedback: "Correct. A foreign key expresses the relationship and can enforce referential integrity." },
      { label: "Copy the user's full profile into every activity row", score: 0, feedback: "Duplicating profile data creates update inconsistencies." },
      { label: "Put all users and activities into one text field", score: 0, feedback: "That prevents reliable constraints and efficient relational queries." },
    ],
    explanation: "Tables, primary keys, foreign keys, and constraints are the basis of dependable persistent storage.",
    prerequisites: ["python"],
  },
  {
    id: "sql-query", skill: "sql", title: "SQL queries", prompt: "How do you retrieve only records created by a particular user?",
    choices: [
      { label: "Use SELECT with a WHERE condition on user_id", score: 2, feedback: "Correct. Filter records using a parameterized query." },
      { label: "Fetch every row and filter only in the browser", score: 0, feedback: "That wastes bandwidth and may expose records the user should not receive." },
      { label: "Use ORDER BY user_id", score: 0, feedback: "ORDER BY sorts results; it does not filter them." },
    ],
    explanation: "SQL filtering and safe parameter handling matter for performance and access control.",
    prerequisites: ["python"],
  },
  {
    id: "integration-db", skill: "integration", title: "Persistence", prompt: "Your FastAPI app restarts and all records disappear. What is the likely architectural issue?",
    choices: [
      { label: "The records exist only in process memory instead of persistent storage", score: 2, feedback: "Correct. Store durable records in a database such as PostgreSQL." },
      { label: "The endpoint needs a different HTTP status code", score: 0, feedback: "A status code cannot make in-memory data persistent." },
      { label: "The frontend needs more CSS", score: 0, feedback: "Styling does not affect server-side data persistence." },
    ],
    explanation: "A full-stack app needs a clear boundary between UI state, API logic, and durable database storage.",
    prerequisites: ["fastapi", "sql"],
  },
  {
    id: "testing", skill: "testing", title: "Automated tests", prompt: "How would you check that an API rejects a request with a missing required field?",
    choices: [
      { label: "Write an API test that sends invalid input and checks the response", score: 2, feedback: "Correct. Test both the response status and useful validation details." },
      { label: "Manually test only the happy path once", score: 0, feedback: "That does not protect validation behavior from regressions." },
      { label: "Check that the page looks correct", score: 0, feedback: "Visual checks do not verify backend request validation." },
    ],
    explanation: "Tests make refactoring safer and document expected behavior.",
    prerequisites: ["fastapi"],
  },
  {
    id: "deployment", skill: "deployment", title: "Deployment configuration", prompt: "Your app works locally but cannot connect to PostgreSQL after deployment. What should you check first?",
    choices: [
      { label: "The deployed DATABASE_URL, network access, and database credentials", score: 2, feedback: "Correct. Production configuration and connectivity differ from local development." },
      { label: "Whether the browser cache is empty", score: 0, feedback: "Browser cache does not resolve server-to-database connectivity." },
      { label: "Whether the button has a hover state", score: 0, feedback: "UI styling is unrelated to database connection failures." },
    ],
    explanation: "Environment variables, secrets, networking, migrations, and logs are core deployment skills.",
    prerequisites: ["integration", "testing"],
  },
];


type LearningTopic = { title: string; category: string; skill: string; href: string };

const learningTopics: LearningTopic[] = [
  { title: "Introduction", category: "Python basics", skill: "python", href: "python_intro.asp" },
  { title: "Get Started", category: "Python basics", skill: "python", href: "python_getstarted.asp" },
  { title: "Syntax", category: "Python basics", skill: "python", href: "python_syntax.asp" },
  { title: "Print Output", category: "Python basics", skill: "python", href: "python_output.asp" },
  { title: "Comments", category: "Python basics", skill: "python", href: "python_comments.asp" },
  { title: "Variables", category: "Python basics", skill: "python", href: "python_variables.asp" },
  { title: "Data Types", category: "Python basics", skill: "python", href: "python_datatypes.asp" },
  { title: "Numbers", category: "Python basics", skill: "python", href: "python_numbers.asp" },
  { title: "Casting", category: "Python basics", skill: "python", href: "python_casting.asp" },
  { title: "Strings", category: "Python basics", skill: "python", href: "python_strings.asp" },
  { title: "Booleans", category: "Python basics", skill: "python", href: "python_booleans.asp" },
  { title: "Operators", category: "Python basics", skill: "python", href: "python_operators.asp" },
  { title: "Lists", category: "Data structures", skill: "python", href: "python_lists.asp" },
  { title: "Tuples", category: "Data structures", skill: "python", href: "python_tuples.asp" },
  { title: "Sets", category: "Data structures", skill: "python", href: "python_sets.asp" },
  { title: "Dictionaries", category: "Data structures", skill: "python", href: "python_dictionaries.asp" },
  { title: "If...Else", category: "Control flow", skill: "python", href: "python_conditions.asp" },
  { title: "Match", category: "Control flow", skill: "python", href: "python_match.asp" },
  { title: "While Loops", category: "Control flow", skill: "python", href: "python_while_loops.asp" },
  { title: "For Loops", category: "Control flow", skill: "python", href: "python_for_loops.asp" },
  { title: "Functions", category: "Control flow", skill: "python", href: "python_functions.asp" },
  { title: "Range", category: "Control flow", skill: "python", href: "python_range.asp" },
  { title: "Lambda", category: "Control flow", skill: "python", href: "python_lambda.asp" },
  { title: "Recursion", category: "Control flow", skill: "python", href: "python_recursion.asp" },
  { title: "Iterators", category: "Intermediate Python", skill: "python", href: "python_iterators.asp" },
  { title: "Generators", category: "Intermediate Python", skill: "python", href: "python_generators.asp" },
  { title: "Modules", category: "Intermediate Python", skill: "python", href: "python_modules.asp" },
  { title: "Scope", category: "Intermediate Python", skill: "python", href: "python_scope.asp" },
  { title: "Decorators", category: "Intermediate Python", skill: "python", href: "python_decorators.asp" },
  { title: "Classes and Objects", category: "Object-oriented Python", skill: "python", href: "python_classes.asp" },
  { title: "Inheritance", category: "Object-oriented Python", skill: "python", href: "python_inheritance.asp" },
  { title: "Polymorphism", category: "Object-oriented Python", skill: "python", href: "python_polymorphism.asp" },
  { title: "Encapsulation", category: "Object-oriented Python", skill: "python", href: "python_encapsulation.asp" },
  { title: "Dates", category: "Python utilities", skill: "python", href: "python_datetime.asp" },
  { title: "Math", category: "Python utilities", skill: "python", href: "python_math.asp" },
  { title: "JSON", category: "Data exchange", skill: "http", href: "python_json.asp" },
  { title: "Regular Expressions", category: "Python utilities", skill: "python", href: "python_regex.asp" },
  { title: "PIP", category: "Environment and packages", skill: "deployment", href: "python_pip.asp" },
  { title: "Try...Except", category: "Errors and reliability", skill: "testing", href: "python_try_except.asp" },
  { title: "String Formatting", category: "Python utilities", skill: "python", href: "python_string_formatting.asp" },
  { title: "None", category: "Python basics", skill: "python", href: "python_none.asp" },
  { title: "User Input", category: "Python basics", skill: "python", href: "python_user_input.asp" },
  { title: "Virtual Environments", category: "Environment and packages", skill: "deployment", href: "python_virtualenv.asp" },
  { title: "File Handling", category: "Files and storage", skill: "integration", href: "python_file_handling.asp" },
  { title: "NumPy", category: "Data libraries", skill: "sql", href: "python_numpy.asp" },
  { title: "Pandas", category: "Data libraries", skill: "sql", href: "python_pandas.asp" },
  { title: "SciPy", category: "Data libraries", skill: "sql", href: "python_scipy.asp" },
  { title: "Matplotlib", category: "Data visualization", skill: "sql", href: "python_matplotlib.asp" },
  { title: "Machine Learning", category: "Data science", skill: "sql", href: "python_machine_learning.asp" },
  { title: "MySQL", category: "Databases", skill: "sql", href: "python_mysql.asp" },
  { title: "MongoDB", category: "Databases", skill: "sql", href: "python_mongodb.asp" },
  { title: "Django", category: "Web development", skill: "fastapi", href: "python_django.asp" },
];

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

  const recommendation = useMemo(() => {
    const ranked = [...skills].map(skill => {
      const score = scores[skill.id];
      const unmet = skill.prerequisites.filter(id => scores[id] === null || (scores[id] ?? 0) < 0.5);
      return { ...skill, score, unmet, priority: skill.weight + (score === null ? 0.6 : 1 - score) + unmet.length * 0.5 };
    }).sort((a, b) => b.priority - a.priority);
    return ranked.find(skill => skill.score === null || skill.score < 0.75) ?? ranked[0];
  }, [scores]);

  const recommendedTopics = useMemo(() => {
    return [...learningTopics]
      .sort((a, b) => {
        const aScore = scores[a.skill];
        const bScore = scores[b.skill];
        const aValue = aScore === null || aScore === undefined ? -1 : aScore;
        const bValue = bScore === null || bScore === undefined ? -1 : bScore;
        return aValue - bValue;
      })
      .slice(0, 7);
  }, [scores]);

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
        .sn-chapters { margin-top:30px; }
        .sn-chapters-intro { color:#888; max-width:620px; margin:-10px 0 16px; }
        .sn-chapter-list { list-style:none; padding:0; margin:0; border-top:1px solid #292929; }
        .sn-chapter { display:grid; grid-template-columns:32px minmax(0,1fr) minmax(90px,auto); gap:12px; align-items:center; padding:13px 0; border-bottom:1px solid #292929; }
        .sn-chapter-number,.sn-chapter-category,.sn-chapter-skill { color:#777; font-size:10px; }
        .sn-chapter-category { display:block; text-transform:uppercase; letter-spacing:.1em; margin-bottom:3px; }
        .sn-chapter a,.sn-all-chapters { color:#eee; text-decoration:underline; text-underline-offset:4px; }
        .sn-chapter-skill { text-align:right; }
        .sn-all-chapters { display:inline-block; margin-top:18px; font-size:11px; }
        @media (max-width:560px) { .sn-chapter { grid-template-columns:26px minmax(0,1fr); } .sn-chapter-skill { grid-column:2; text-align:left; } }
        .sn-footer { display:flex; flex-wrap:wrap; justify-content:space-between; gap:12px; margin-top:20px; color:#666; font-size:10px; letter-spacing:.08em; text-transform:uppercase; }
        @media (max-width:560px) { .sn-top { font-size:9px; } .sn-panel-head { align-items:flex-start; } .sn-skill-row { grid-template-columns:minmax(0,1fr) 72px; } }
      `}</style>

      <header className="sn-top"><span>STUDY SYSTEM / 002</span><span>ADAPTIVE ASSESSMENT</span></header>
      <section className="sn-hero">
        <p className="sn-kicker">Python full-stack / diagnostic engine</p>
        <h1>What should you<br />learn next?</h1>
        <p>Answer a short set of questions. The engine adapts the order, estimates your current skills, and recommends the next topic to study.</p>
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
              <p style={{ color: "#888" }}>Choose the answer closest to what you can do today, without guessing.</p>
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
          <h2 className="sn-question">Your next learning target.</h2>
          <div className="sn-rec">
            <p className="sn-label">RECOMMENDED NEXT</p>
            <h3>{recommendation.label}</h3>
            <p>{recommendation.unmet.length ? `Build toward this by reviewing: ${recommendation.unmet.map(id => skills.find(s => s.id === id)?.label).join(", ")}.` : "This topic is a high-value next step based on your current answers."}</p>
            <p style={{ marginTop: 12 }}>Why: this topic has high relevance to the full-stack path and is either not yet demonstrated or has prerequisite gaps.</p>
          </div>
          <section className="sn-chapters">
            <div className="sn-panel-head">
              <span className="sn-label">Recommended W3Schools chapters</span>
              <span className="sn-count">PICKED FROM YOUR RESULTS</span>
            </div>
            <p className="sn-chapters-intro">Start with these chapters, selected from the Python tutorial based on the skills that need the most work.</p>
            <ol className="sn-chapter-list">
              {recommendedTopics.map((topic, index) => (
                <li className="sn-chapter" key={topic.href}>
                  <span className="sn-chapter-number">{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <span className="sn-chapter-category">{topic.category}</span>
                    <a href={`https://www.w3schools.com/python/${topic.href}`} target="_blank" rel="noreferrer">{topic.title} ↗</a>
                  </div>
                  <span className="sn-chapter-skill">{skills.find(skill => skill.id === topic.skill)?.label}</span>
                </li>
              ))}
            </ol>
            <a className="sn-all-chapters" href="https://www.w3schools.com/python/" target="_blank" rel="noreferrer">View all Python chapters at W3Schools ↗</a>
          </section>
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
          <p className="sn-feedback">This prototype uses rule-based scoring. Results are directional, not proof of mastery. The next step is to add coding exercises and persist progress in a backend.</p>
        </section>
      )}
      <footer className="sn-footer"><span>RULE-BASED PROTOTYPE / LOCAL SESSION</span><span>01 — ASSESS / 02 — RECOMMEND / 03 — PRACTICE</span></footer>
    </main>
  );
}
