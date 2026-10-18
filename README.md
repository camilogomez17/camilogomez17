# c6m1lo — Software Engineering Portfolio

Personal portfolio and project demos built with Next.js App Router, React, and TypeScript.

## Stack

- **Frontend:** TypeScript, React, Next.js
- **Backend learning:** Python (in progress)
- **Quality:** ESLint, TypeScript checks, Node test runner, GitHub Actions CI, CodeQL, Dependabot
- **Deployment:** Vercel

## Run locally

Requirements: Node.js 22 and npm.

```bash
npm ci
npm run dev
```

Open http://localhost:3000.

## Quality checks

```bash
npm run lint
npx tsc --noEmit
npm test
npm run build
```

## Featured project: Habit Analytics

A browser-based activity log with timestamps, tags, notes, search, date filtering, a session timer, and JSON backup/import.

The app stores records in browser local storage. Data does not sync between devices, and clearing site data can remove records. Export backups regularly. The backup validator has automated tests; broader browser end-to-end tests are a known improvement area.

## Repository structure

- `app/page.jsx` — resume-style homepage
- `app/projects/page.tsx` — project case study
- `app/habitAnalytics/page.tsx` — Habit Analytics application
- `lib/habit-analytics-validation.js` — backup validation
- `lib/habit-analytics-validation.test.mjs` — validation tests
- `.github/workflows/ci.yml` — CI quality checks
- `.github/workflows/codeql.yml` — CodeQL analysis

## Scope

This repository is a work in progress. The portfolio describes implemented functionality and calls out known limitations rather than presenting planned work as shipped.
