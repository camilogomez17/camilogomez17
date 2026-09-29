"use client";

import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from "react";

type Entry = { id: string; action: string; start: string; end: string; tags: string[]; context: string; createdAt: string; updatedAt: string };
type Journal = { date: string; text: string; updatedAt: string };
type Database = { version: 1; events: Entry[]; journals: Journal[] };
type Draft = { action: string; start: string; end: string; tags: string; context: string };

const KEY = "habit-analytics-v1";
const TIMER = "habit-analytics-timer-v1";
const empty: Database = { version: 1, events: [], journals: [] };
const pad = (n: number) => String(n).padStart(2, "0");
const local = (value: string | number) => {
    const d = new Date(value);
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
};
const blank = (): Draft => ({ action: "", start: local(Date.now() - 60000), end: local(Date.now()), tags: "", context: "" });
const seconds = (e: Entry) => Math.round((Date.parse(e.end) - Date.parse(e.start)) / 1000);
const download = (name: string, content: string) => {
    const url = URL.createObjectURL(new Blob([content], { type: "application/json" }));
    const a = document.createElement("a"); a.href = url; a.download = name; a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
};

export default function Page() {
    const [data, setData] = useState<Database>(empty);
    const [ready, setReady] = useState(false);
    const [error, setError] = useState("");
    const [tab, setTab] = useState("Record");
    const [form, setForm] = useState({ action: "", start: "", end: "", tags: "", context: "" });
    const [edit, setEdit] = useState<string | null>(null);
    const [query, setQuery] = useState("");
    const [day, setDay] = useState("");
    const [timer, setTimer] = useState<string | null>(null);

    useEffect(() => {
        try {
            const stored = JSON.parse(localStorage.getItem(KEY) || "null") as Database | null;
            if (stored) {
                if (!Array.isArray(stored.events) || !Array.isArray(stored.journals)) throw Error("Saved data is unreadable. Export a backup before clearing browser data.");
                setData(stored);
            }
            setTimer(localStorage.getItem(TIMER));
            setForm(blank());
            setReady(true);
        } catch (e) { setError(e instanceof Error ? e.message : "Browser storage is unavailable."); }
    }, []);

    function commit(next: Database) {
        try { localStorage.setItem(KEY, JSON.stringify(next)); setData(next); setError(""); return true; }
        catch { setError("Could not save to this browser. Export your data and check storage settings."); return false; }
    }
    function change(field: keyof Draft, value: string) { setForm(f => ({ ...f, [field]: value })); }
    function save(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const start = new Date(form.start), end = new Date(form.end);
        if (!form.action.trim() || !Number.isFinite(+start) || !Number.isFinite(+end) ||
            !form.start.startsWith(local(+start).slice(0, 16)) || !form.end.startsWith(local(+end).slice(0, 16)) ||
            Math.round((+end - +start) / 1000) < 1) {
            setError("Enter an action and valid times at least one second apart."); return;
        }
        const old = data.events.find(x => x.id === edit);
        const now = new Date().toISOString();
        const item = {
            id: old?.id || crypto.randomUUID(), action: form.action.trim(),
            start: start.toISOString(), end: end.toISOString(),
            tags: [...new Set(form.tags.split(",").map(x => x.trim()).filter(Boolean))],
            context: form.context.trim(), createdAt: old?.createdAt || now, updatedAt: now
        };
        const events = old ? data.events.map(x => x.id === edit ? item : x) : [...data.events, item];
        if (commit({ ...data, events })) { setForm(blank()); setEdit(null); setDay(local(item.start).slice(0, 10)); setTab("Explore"); }
    }
    function startTimer() {
        try { const now = new Date().toISOString(); localStorage.setItem(TIMER, now); setTimer(now); }
        catch { setError("Could not save the timer."); }
    }
    function stopTimer() {
        if (!timer) return;
        const end = new Date(Math.max(Date.now(), Date.parse(timer) + 1000));
        setForm(f => ({ ...f, start: local(timer), end: local(+end) }));
        localStorage.removeItem(TIMER); setTimer(null);
    }
    function importFile(e: ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0]; e.target.value = "";
        if (!file) return;
        file.text().then(text => {
            const next = JSON.parse(text) as Database;
            if (next.version !== 1 || !Array.isArray(next.events) || !Array.isArray(next.journals)) throw Error("Invalid backup.");
            if (confirm(`Replace current data with ${next.events.length} entries?`)) commit(next);
        }).catch(() => setError("Could not import that JSON backup."));
    }
    const found = useMemo(() => data.events.filter(x =>
        `${x.action} ${x.context} ${x.tags.join(" ")}`.toLowerCase().includes(query.toLowerCase())
    ).sort((a, b) => b.start.localeCompare(a.start)), [data.events, query]);
    const days = [...new Set(found.map(x => local(x.start).slice(0, 10)))];
    const activeDay = days.includes(day) ? day : days[0];
    const visible = found.filter(x => local(x.start).startsWith(activeDay || "\0"));

    return <main className="ha">
        <style>{`
      @font-face { font-family: "HA Valencia"; src: local("Valencia"), url("/fonts/Valencia.woff2") format("woff2"); font-display: swap; }
      .ha {
        --white: #f5f5f7; --secondary: #a1a1a6; --line: #303033;
        --display: var(--font-valencia, "HA Valencia"), Georgia, serif;
        width: 100%; max-width: 920px; min-width: 0; min-height: 100vh;
        margin: 0 auto; padding: 0 24px 100px;
        color: var(--white); background: #000;
        font: 15px/1.55 -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif;
        -webkit-font-smoothing: antialiased;
      }
      .ha * { box-sizing: border-box; }
      .ha ::selection { color: #000; background: #fff; }
      .ha .hero { text-align: center; padding: clamp(88px, 12vw, 144px) 16px 76px; }
      .ha .eyebrow { margin: 0 0 17px; color: #c4c4c7; font-size: 12px; font-weight: 600;
        letter-spacing: .13em; text-transform: uppercase; }
      .ha h1 { margin: 0; font: 400 clamp(54px, 9vw, 92px)/1.04 var(--display); letter-spacing: -.035em;
        color: #fff; }
      .ha .hero .muted { max-width: 540px; margin: 22px auto 0; color: var(--secondary);
        font-size: clamp(17px, 2.3vw, 21px); line-height: 1.4; letter-spacing: -.02em; }
      .ha h2 { margin: 0 0 22px; color: #fff; font-size: clamp(25px, 3.2vw, 32px);
        font-weight: 600; letter-spacing: -.035em; line-height: 1.15; }
      .ha nav { width: fit-content; display: flex; gap: 4px; margin: 0 auto 38px;
        padding: 4px; background: #1c1c1e; border: 1px solid #333336; border-radius: 999px; }
      .ha nav button { min-width: 122px; margin: 0; padding: 9px 22px; border: 0; border-radius: 999px;
        background: transparent; color: #aaaab0; font-size: 13px; font-weight: 600; }
      .ha nav button.active { color: #000; background: #f5f5f7; }
      .ha section { padding: clamp(24px, 4vw, 42px); margin: 16px 0;
        background: #111113; border: 1px solid #222225; border-radius: 24px; }
      .ha label { display: block; margin: 19px 0; color: #d1d1d6; font-size: 13px; font-weight: 600; }
      .ha input, .ha textarea, .ha button { font: inherit; }
      .ha input, .ha textarea { display: block; width: 100%; min-width: 0; margin-top: 8px;
        padding: 13px 15px; color: #fff; background: #1c1c1e; border: 1px solid #39393d;
        border-radius: 12px; outline: none; color-scheme: dark; font-size: 15px; font-weight: 400;
        transition: border-color .2s, background .2s; }
      .ha textarea { min-height: 132px; resize: vertical; }
      .ha input::placeholder, .ha textarea::placeholder { color: #85858b; }
      .ha input:focus, .ha textarea:focus { border-color: #a1a1a6; background: #242427; }
      .ha button, .ha .file { display: inline-flex; align-items: center; justify-content: center;
        min-height: 42px; padding: 10px 18px; margin: 5px 8px 5px 0; color: #f5f5f7;
        background: #303033; border: 1px solid transparent; border-radius: 999px;
        cursor: pointer; font-size: 13px; font-weight: 600; line-height: 1.2;
        transition: background .2s, color .2s, transform .2s; }
      .ha button:hover, .ha .file:hover { background: #48484c; }
      .ha button:active, .ha .file:active { transform: scale(.98); }
      .ha form > button:first-of-type, .ha section > button:first-of-type { color: #000; background: #f5f5f7; }
      .ha form > button:first-of-type:hover, .ha section > button:first-of-type:hover { background: #d8d8dc; }
      .ha button:focus-visible, .ha .file:focus-within { outline: 2px solid #fff; outline-offset: 3px; }
      .ha button:disabled { opacity: .4; cursor: not-allowed; }
      .ha .row { display: flex; gap: 18px; flex-wrap: wrap; }
      .ha .row label { flex: 1 1 260px; }
      .ha .entry { border-top: 1px solid var(--line); padding: 24px 0 18px; }
      .ha .entry:first-of-type { margin-top: 18px; }
      .ha .entry strong { display: inline-block; margin-right: 6px; font-size: 19px; letter-spacing: -.025em; }
      .ha .entry p { margin: 10px 0; }
      .ha .muted { color: var(--secondary); }
      .ha .error { max-width: 920px; margin: 0 auto 22px; padding: 14px 18px;
        color: #fff; background: #262628; border: 1px solid #66666a; border-radius: 12px; }
      .ha .active { color: #000; background: #f5f5f7; }
      .ha .file { position: relative; overflow: hidden; vertical-align: middle; }
      .ha .file input { position: absolute; inset: 0; opacity: 0; cursor: pointer; }
      .ha p { white-space: pre-wrap; overflow-wrap: anywhere; }
      @media (max-width: 620px) {
        .ha { padding: 0 14px 60px; }
        .ha .hero { padding: 78px 12px 52px; }
        .ha section { padding: 25px 20px; border-radius: 20px; }
        .ha input, .ha textarea { font-size: 16px; }
      }
    `}</style>
        <header className="hero"><p className="eyebrow">Your time, in focus</p><h1>Habit Analytics</h1><p className="muted">Record actions and context. Data stays in this browser; export a backup to keep it.</p></header>
        {error && <p className="error" role="alert">{error}</p>}
        <nav>{["Record", "Explore"].map(x => <button key={x} className={tab === x ? "active" : ""} onClick={() => setTab(x)}>{x}</button>)}</nav>
        {tab === "Record" ? <>
            <section><h2>{edit ? "Edit action" : "Record action"}</h2>
                <form onSubmit={save}>
                    <label>Action<input required value={form.action} onChange={e => change("action", e.target.value)} placeholder="What did you do?" /></label>
                    <div className="row"><label>Start<input type="datetime-local" step="1" required value={form.start} onChange={e => change("start", e.target.value)} /></label><label>End<input type="datetime-local" step="1" required value={form.end} onChange={e => change("end", e.target.value)} /></label></div>
                    <label>Tags, separated by commas<input value={form.tags} onChange={e => change("tags", e.target.value)} /></label>
                    <label>Context<textarea value={form.context} onChange={e => change("context", e.target.value)} placeholder="Intention, outcome, interruptions..." /></label>
                    <button disabled={!ready}>Save action</button>{edit && <button type="button" onClick={() => { setEdit(null); setForm(blank()); }}>Cancel edit</button>}
                </form>
                {!edit && (timer ? <button onClick={stopTimer}>Stop timer and fill times</button> : <button disabled={!ready} onClick={startTimer}>Start timer</button>)}
            </section>
        </> : <>
            <section><h2>Explore {found.length} actions</h2><input aria-label="Search actions" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search actions, tags, and context" />
                <p className="muted">Total time: {found.reduce((n, x) => n + seconds(x), 0)} seconds</p>
                <div>{days.map(x => <button key={x} className={x === activeDay ? "active" : ""} onClick={() => setDay(x)}>{x}</button>)}</div>
                {visible.map(x => <div className="entry" key={x.id}><strong>{x.action}</strong> · {seconds(x)} seconds<br /><span className="muted">{local(x.start).replace("T", " ")} → {local(x.end).replace("T", " ")}</span>
                    {x.tags.length > 0 && <p>#{x.tags.join(" #")}</p>}{x.context && <p>{x.context}</p>}
                    <button onClick={() => { setEdit(x.id); setForm({ action: x.action, start: local(x.start), end: local(x.end), tags: x.tags.join(", "), context: x.context }); setTab("Record"); }}>Edit</button>
                    <button onClick={() => { if (confirm(`Delete “${x.action}”?`)) commit({ ...data, events: data.events.filter(e => e.id !== x.id) }); }}>Delete</button>
                </div>)}{!visible.length && <p>No matching actions.</p>}
            </section>
        </>}
        <section><h2>Backup</h2><button disabled={!ready} onClick={() => download("habit-analytics.json", JSON.stringify(data, null, 2))}>Export JSON</button>
            <label className="file">Import JSON<input type="file" accept=".json,application/json" onChange={importFile} /></label></section>
    </main>;
}
