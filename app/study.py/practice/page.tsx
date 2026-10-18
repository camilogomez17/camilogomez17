"use client";

import { useEffect, useMemo, useState } from "react";
import { generatePrintOutputQuestion, printOutputLessons } from "@/lib/study-py-print-output.mjs";

const STORAGE_KEY = "study-py-wiki-progress-v1";
type Question = NonNullable<ReturnType<typeof generatePrintOutputQuestion>>;

export default function StudyPyLessonPracticePage() {
  const [lesson, setLesson] = useState("");
  const [questionSeed, setQuestionSeed] = useState(0);
  const [question, setQuestion] = useState<Question | null>(null);
  const [choice, setChoice] = useState<string | null>(null);
  const [streak, setStreak] = useState(0);
  const [complete, setComplete] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requestedChapter = params.get("chapter");
    const requestedLesson = params.get("lesson") ?? "";
    if (requestedChapter === "python_output.asp" && printOutputLessons.includes(requestedLesson)) {
      setLesson(requestedLesson);
      setQuestion(generatePrintOutputQuestion(requestedLesson, 0));
      try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const saved = JSON.parse(raw) as { completed?: Record<string, true> };
          setComplete(saved.completed?.[requestedChapter + "::" + requestedLesson] === true);
        }
      } catch {
        // Invalid saved progress should not block practice.
      }
    }
    setLoaded(true);
  }, []);

  const key = useMemo(() => "python_output.asp::" + lesson, [lesson]);

  function answer(label: string) {
    if (!question || choice !== null || complete) return;
    setChoice(label);
    if (label === question.answer) {
      const nextStreak = streak + 1;
      setStreak(nextStreak);
      if (nextStreak >= 3) {
        setComplete(true);
        try {
          const raw = window.localStorage.getItem(STORAGE_KEY);
          const saved = raw ? JSON.parse(raw) as { completed?: Record<string, true> } : {};
          window.localStorage.setItem(STORAGE_KEY, JSON.stringify({
            ...saved,
            completed: { ...(saved.completed ?? {}), [key]: true },
          }));
        } catch {
          // The lesson remains usable when local storage is unavailable.
        }
      }
    } else {
      setStreak(0);
    }
  }

  function nextQuestion() {
    const nextSeed = questionSeed + 1;
    setQuestionSeed(nextSeed);
    setQuestion(generatePrintOutputQuestion(lesson, nextSeed));
    setChoice(null);
  }

  return (
    <main className="practice-page">
      <style jsx global>{`
        .practice-page { max-width:820px; min-height:100vh; margin:0 auto; padding:24px 20px 80px; color:#eee; background:#050505; font:13px/1.65 var(--font-mono,monospace); }
        .practice-page * { box-sizing:border-box; }
        .practice-top { display:flex; justify-content:space-between; gap:12px; border-bottom:1px solid #292929; padding-bottom:14px; color:#777; font-size:10px; letter-spacing:.12em; text-transform:uppercase; }
        .practice-hero { padding:clamp(38px,7vw,70px) 0 24px; }
        .practice-label { color:#777; font-size:10px; letter-spacing:.14em; text-transform:uppercase; }
        .practice-hero h1 { margin:8px 0 12px; font-size:clamp(32px,6vw,52px); line-height:1.08; letter-spacing:-.05em; }
        .practice-muted { color:#999; }
        .practice-panel { border:1px solid #292929; background:#090909; padding:clamp(18px,4vw,32px); }
        .practice-meter { height:3px; background:#252525; margin:12px 0 26px; }
        .practice-meter span { display:block; height:100%; background:#eee; transition:width .2s; }
        .practice-prompt { white-space:pre-wrap; overflow-wrap:anywhere; font-size:clamp(18px,3vw,25px); line-height:1.5; margin:10px 0 24px; }
        .practice-choices { display:grid; gap:9px; }
        .practice-choice { width:100%; padding:14px 15px; border:1px solid #333; background:#0d0d0d; color:#ddd; text-align:left; font:inherit; cursor:pointer; overflow-wrap:anywhere; }
        .practice-choice:disabled { cursor:default; opacity:.85; }
        .practice-choice[aria-pressed="true"] { border-color:#eee; color:#fff; }
        .practice-action { display:inline-flex; align-items:center; justify-content:center; margin:20px 8px 0 0; padding:10px 14px; border:1px solid #eee; background:#eee; color:#050505; font:inherit; text-decoration:none; cursor:pointer; }
        .practice-secondary { background:transparent; color:#eee; border-color:#444; }
        .practice-feedback { margin-top:18px; padding:14px; border-left:2px solid #777; color:#aaa; }
        @media(max-width:560px) { .practice-page { padding:18px 14px 60px; } .practice-top { font-size:9px; } }
      `}</style>
      <header className="practice-top"><a href="/study.py" style={{ color:"inherit", textDecoration:"none" }}>STUDY.PY</a><span>LESSON PRACTICE / PRINT OUTPUT</span></header>
      {!loaded ? <p className="practice-muted" style={{marginTop:32}}>Loading lesson…</p> : !lesson || !question ? <section className="practice-hero"><p className="practice-label">LESSON NOT FOUND</p><h1>Choose a supported lesson.</h1><p className="practice-muted">The first lesson-practice slice covers the four lessons in Print Output.</p><a className="practice-action" href="/study.py/wiki">Open the wiki →</a></section> : <>
        <section className="practice-hero"><p className="practice-label">PYTHON FUNDAMENTALS / PRINT OUTPUT</p><h1>{lesson}</h1><p className="practice-muted">Answer three questions correctly in a row to complete this lesson. Each question uses a tested answer rule.</p></section>
        <section className="practice-panel">
          {complete ? <>
            <p className="practice-label">LESSON COMPLETE</p><h2 className="practice-prompt">Three correct answers. Lesson mastered.</h2><p className="practice-muted">Your completion is saved on this device and counts toward the Print Output chapter percentage.</p><a className="practice-action" href="/study.py/wiki">Back to wiki →</a><button className="practice-action practice-secondary" onClick={() => { setComplete(false); setStreak(0); setQuestionSeed(0); setQuestion(generatePrintOutputQuestion(lesson, 0)); setChoice(null); }}>Practice again ↻</button>
          </> : <>
            <div style={{display:"flex",justifyContent:"space-between",gap:12}}><span className="practice-label">QUESTION {questionSeed + 1}</span><span className="practice-label">{streak} / 3 CORRECT IN A ROW</span></div>
            <div className="practice-meter"><span style={{width:(streak / 3 * 100) + "%"}} /></div>
            <h2 className="practice-prompt">{question.prompt}</h2>
            <div className="practice-choices">{question.choices.map((item,index) => <button key={item.label} className="practice-choice" disabled={choice !== null} aria-pressed={choice === item.label} onClick={() => answer(item.label)}><span style={{color:"#777",marginRight:12}}>{String.fromCharCode(65 + index)}.</span>{item.label}</button>)}</div>
            {choice !== null && <div className="practice-feedback" role="status"><strong>{choice === question.answer ? "Correct." : "Not quite."}</strong><p>{question.explanation}</p><p>{choice === question.answer ? (streak >= 3 ? "Lesson complete." : "Correct streak: " + streak + " of 3.") : "Your streak resets. Try another variation."}</p></div>}
            {choice !== null && <button className="practice-action" onClick={nextQuestion}>{streak >= 3 ? "Continue →" : "Next question →"}</button>}
          </>}
        </section>
        <p className="practice-muted" style={{fontSize:10,marginTop:18}}>PROGRESS STORED LOCALLY / NO ACCOUNT REQUIRED</p>
      </>}
    </main>
  );
}
