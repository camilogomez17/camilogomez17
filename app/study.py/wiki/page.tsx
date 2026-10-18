"use client";

import { useEffect, useMemo, useState } from "react";
import { getStudyPyLessonGuide, studyPyChapters } from "@/lib/study-py-curriculum.mjs";

const STORAGE_KEY = "study-py-wiki-progress-v1";

export default function StudyPyWikiPage() {
  const [selectedChapterHref, setSelectedChapterHref] = useState(studyPyChapters[0]?.href ?? "");
  const [selectedLesson, setSelectedLesson] = useState(studyPyChapters[0]?.lessons[0] ?? "");
  const [completed, setCompleted] = useState<Record<string, true>>({});
  const [query, setQuery] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const value = JSON.parse(raw) as { completed?: Record<string, true> };
        const valid = new Set(studyPyChapters.flatMap((chapter) => chapter.lessons.map((lesson) => chapter.href + "::" + lesson)));
        setCompleted(Object.fromEntries(Object.entries(value.completed ?? {}).filter(([key, value]) => valid.has(key) && value === true)));
      }
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    } finally {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ completed }));
    } catch {
      // Reading and practice remain usable if browser storage is unavailable.
    }
  }, [completed, loaded]);

  const selectedChapter = studyPyChapters.find((chapter) => chapter.href === selectedChapterHref) ?? studyPyChapters[0];
  const guide = selectedChapter ? getStudyPyLessonGuide(selectedChapter.href, selectedLesson) : null;
  const totalLessons = studyPyChapters.reduce((sum, chapter) => sum + chapter.lessons.length, 0);
  const completedCount = Object.keys(completed).length;
  const groups = useMemo(() => {
    const categories = new Map<string, typeof studyPyChapters>();
    for (const chapter of studyPyChapters) categories.set(chapter.category, [...(categories.get(chapter.category) ?? []), chapter]);
    return [...categories.entries()];
  }, []);
  const matchingGroups = groups.map(([category, chapters]) => [category, chapters.map((chapter) => ({
    ...chapter,
    lessons: chapter.lessons.filter((lesson) => (chapter.title + " " + lesson + " " + category).toLowerCase().includes(query.toLowerCase())),
  })).filter((chapter) => chapter.lessons.length > 0)] as const).filter(([, chapters]) => chapters.length > 0);

  function chooseChapter(href: string, firstLesson?: string) {
    const chapter = studyPyChapters.find((item) => item.href === href);
    if (!chapter) return;
    setSelectedChapterHref(href);
    setSelectedLesson(firstLesson ?? chapter.lessons[0] ?? "");
  }

  function lessonKey(chapterHref: string, lesson: string) {
    return chapterHref + "::" + lesson;
  }

  function toggleComplete() {
    if (!selectedChapter || !guide) return;
    const key = lessonKey(selectedChapter.href, guide.lesson);
    setCompleted((previous) => {
      const next = { ...previous };
      if (next[key]) delete next[key];
      else next[key] = true;
      return next;
    });
  }

  return (
    <main className="wiki-page">
      <style jsx global>{`
        .wiki-page { --line:#292929; max-width:1180px; margin:0 auto; padding:24px 20px 80px; color:#eee; background:#050505; min-height:100vh; font:13px/1.65 var(--font-mono,monospace); }
        .wiki-page * { box-sizing:border-box; }
        .wiki-top { display:flex; justify-content:space-between; gap:12px; border-bottom:1px solid var(--line); padding-bottom:14px; color:#777; font-size:10px; letter-spacing:.12em; text-transform:uppercase; }
        .wiki-hero { padding:42px 0 28px; }
        .wiki-hero h1 { margin:8px 0; font-size:clamp(36px,6vw,58px); line-height:1; letter-spacing:-.06em; }
        .wiki-muted { color:#929292; }
        .wiki-layout { display:grid; grid-template-columns:minmax(240px,.8fr) minmax(0,1.5fr); gap:14px; align-items:start; }
        .wiki-panel { min-width:0; border:1px solid var(--line); background:#090909; padding:20px; }
        .wiki-label { color:#777; font-size:10px; letter-spacing:.14em; text-transform:uppercase; }
        .wiki-progress { height:3px; background:#252525; margin:10px 0 18px; }
        .wiki-progress span { display:block; height:100%; background:#eee; transition:width .2s; }
        .wiki-input { width:100%; background:#050505; color:#eee; border:1px solid #383838; padding:10px 12px; font:inherit; margin:12px 0 16px; }
        .wiki-category { color:#8c8c8c; font-size:10px; text-transform:uppercase; letter-spacing:.12em; margin:18px 0 7px; }
        .wiki-chapter { width:100%; display:flex; justify-content:space-between; gap:10px; text-align:left; color:#ddd; border:0; border-bottom:1px solid #1f1f1f; background:transparent; padding:10px 0; font:inherit; cursor:pointer; }
        .wiki-chapter[aria-current="true"] { color:#fff; }
        .wiki-lesson-list { display:grid; gap:2px; margin:4px 0 12px 10px; }
        .wiki-lesson { display:flex; gap:8px; align-items:flex-start; text-align:left; color:#888; background:transparent; border:0; padding:6px 4px; font:inherit; font-size:11px; cursor:pointer; }
        .wiki-lesson[aria-current="true"] { color:#fff; background:#151515; }
        .wiki-check { color:#eee; width:14px; flex:none; }
        .wiki-title { margin:8px 0 14px; font-size:clamp(25px,4vw,38px); line-height:1.15; letter-spacing:-.04em; }
        .wiki-section { margin-top:28px; }
        .wiki-section h3 { margin:0 0 10px; color:#eee; font-size:13px; font-weight:500; }
        .wiki-section ul { margin:0; padding-left:20px; color:#b0b0b0; }
        .wiki-code { white-space:pre-wrap; overflow-wrap:anywhere; border:1px solid #262626; background:#030303; color:#e3e3e3; padding:16px; font:12px/1.7 ui-monospace,SFMono-Regular,Menlo,monospace; }
        .wiki-button { display:inline-flex; align-items:center; justify-content:center; padding:10px 13px; margin:18px 8px 0 0; border:1px solid #eee; background:#eee; color:#050505; font:inherit; cursor:pointer; text-decoration:none; }
        .wiki-button.secondary { background:transparent; color:#eee; border-color:#444; }
        .wiki-source { color:#bbb; text-decoration:underline; text-underline-offset:3px; }
        .wiki-warning { margin-top:18px; border-left:2px solid #555; padding-left:12px; color:#888; font-size:11px; }
        @media(max-width:760px) { .wiki-layout { grid-template-columns:1fr; } .wiki-panel { padding:16px; } .wiki-hero { padding-top:32px; } }
      `}</style>

      <header className="wiki-top"><a href="/study.py" style={{color:"inherit",textDecoration:"none"}}>STUDY.PY</a><span>PYTHON WIKI / {totalLessons} LESSONS</span></header>
      <section className="wiki-hero">
        <p className="wiki-label">REFERENCE / PRACTICE / PROGRESS</p>
        <h1>Python, explained.</h1>
        <p className="wiki-muted" style={{maxWidth:650}}>A lesson-by-lesson reference for the study.py curriculum. Read the guide, inspect the example, and track which lessons you have reviewed.</p>
        <div style={{display:"flex",justifyContent:"space-between",gap:12,marginTop:22,color:"#aaa",fontSize:11}}><span>{completedCount} / {totalLessons} lessons reviewed or completed</span><span>{Math.round(completedCount / Math.max(totalLessons,1) * 100)}%</span></div>
        <div className="wiki-progress"><span style={{width:(completedCount / Math.max(totalLessons,1) * 100) + "%"}} /></div>
      </section>

      <div className="wiki-layout">
        <nav className="wiki-panel" aria-label="Python curriculum">
          <div className="wiki-label">CURRICULUM</div>
          <input className="wiki-input" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search chapters and lessons" aria-label="Search chapters and lessons" />
          {matchingGroups.map(([category, chapters]) => <div key={category}>
            <div className="wiki-category">{category}</div>
            {chapters.map((chapter) => {
              const count = chapter.lessons.filter((lesson) => completed[lessonKey(chapter.href, lesson)]).length;
              const percent = chapter.lessons.length ? Math.round(count / chapter.lessons.length * 100) : 0;
              const selected = chapter.href === selectedChapterHref;
              return <div key={chapter.href}>
                <button className="wiki-chapter" aria-current={selected ? "true" : "false"} onClick={() => chooseChapter(chapter.href)}><span>{chapter.title}</span><span>{percent}%</span></button>
                {selected && <div className="wiki-lesson-list">{chapter.lessons.map((lesson) => {
                  const done = Boolean(completed[lessonKey(chapter.href, lesson)]);
                  return <button key={lesson} className="wiki-lesson" aria-current={selectedLesson === lesson ? "true" : "false"} onClick={() => setSelectedLesson(lesson)}><span className="wiki-check">{done ? "✓" : "○"}</span><span>{lesson}</span></button>;
                })}</div>}
              </div>;
            })}
          </div>)}
        </nav>

        <article className="wiki-panel">
          {guide ? <>
            <p className="wiki-label">{guide.category} / {guide.chapter}</p>
            <h2 className="wiki-title">{guide.lesson}</h2>
            <p className="wiki-muted">{guide.summary}</p>
            <section className="wiki-section">
              <h3>Key ideas</h3>
              <ul>{guide.concepts.map((concept: string) => <li key={concept} style={{marginBottom:8}}>{concept}</li>)}</ul>
            </section>
            <section className="wiki-section">
              <h3>Example</h3>
              <pre className="wiki-code"><code>{guide.example}</code></pre>
              <p className="wiki-muted" style={{fontSize:11}}>Run the example, predict its output, then change one value and run it again.</p>
            </section>
            <section className="wiki-section">
              <h3>Check your understanding</h3>
              <p className="wiki-muted">Before marking this lesson reviewed, explain the key ideas without looking and modify the example yourself.</p>
              <a className="wiki-source" href={guide.sourceUrl} target="_blank" rel="noreferrer">Open the W3Schools reference ↗</a>
              <div>
                {selectedChapter.href === "python_output.asp" ? <>
                  <a className="wiki-button" href={"/study.py/practice?chapter=" + encodeURIComponent(selectedChapter.href) + "&lesson=" + encodeURIComponent(guide.lesson)}>{completed[lessonKey(selectedChapter.href, guide.lesson)] ? "Practice again ↻" : "Practice this lesson →"}</a>
                  <span className="wiki-muted" style={{fontSize:11}}>{completed[lessonKey(selectedChapter.href, guide.lesson)] ? "COMPLETED" : "3 correct answers to complete"}</span>
                </> : <>
                  <button className="wiki-button" onClick={toggleComplete}>{completed[lessonKey(selectedChapter.href, guide.lesson)] ? "Mark as not reviewed" : "Mark lesson reviewed"}</button>
                  <a className="wiki-button secondary" href="/study.py">Open practice →</a>
                </>}
              </div>
            </section>
            <p className="wiki-warning">Print Output lessons use three consecutive correct answers for completion. Other chapters still use review tracking while their lesson-specific practice is built.</p>
          </> : <p className="wiki-muted">Select a lesson to open its guide.</p>}
        </article>
      </div>
      <footer style={{display:"flex",justifyContent:"space-between",gap:12,flexWrap:"wrap",marginTop:22,color:"#666",fontSize:10,letterSpacing:".1em"}}><span>LOCAL PROGRESS / THIS DEVICE</span><span>STUDY.PY WIKI</span></footer>
    </main>
  );
}
