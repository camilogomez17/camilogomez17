# Security

## Reporting a vulnerability

Please report suspected vulnerabilities privately to **c6m1lo@proton.me**. Include the affected URL or file, impact, and reproducible steps. Do not include real personal data in reports. Please allow reasonable time to investigate and fix a report before public disclosure.

## Data boundaries

Habit Analytics stores its records in the browser's local storage. The site operator does not receive those records through the app's normal save, search, export, or import flows. Browser extensions, other scripts running in the same origin, and anyone with access to the browser profile may be able to access browser-local data. Users should export backups carefully and avoid importing untrusted files.

JSON imports are size-limited and validated against a versioned schema before replacing current records. Validation reduces malformed-input risk; it does not make arbitrary files or a compromised browser safe.

## Deployment checks

GitHub Actions runs linting, TypeScript checking, unit tests, and a production build. Dependency alerts and secret scanning should also be enabled in repository settings when available. Review all third-party scripts and CSP changes when adding integrations.

This document is a reporting guide, not a promise that the software is vulnerability-free.
