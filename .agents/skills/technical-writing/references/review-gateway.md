# Mandatory content review gateway

The gateway is a release condition, not a suggestion. Run it after every Markdown or documentation-asset change and repeat it after corrections.

## 1. Evidence gate

Verify every consequential technical claim against code, configuration, tests, approved design material, or an authoritative external source. Confirm that named files, commands, fields, APIs, and links exist. Label unresolved facts and separate implemented behavior from proposed behavior.

Pass when a reviewer can trace claims to evidence and no invented detail is presented as fact.

## 2. Reader and content-mode gate

Confirm that the page serves one identifiable reader outcome, applies each selected specialist reference, uses established terminology, and exposes prerequisites, boundaries, side effects, failure behavior, and success checks where consequential.

Pass when the intended reader can understand or complete the stated outcome without guessing a missing critical step.

## 3. Reader UX gate

Scan the page once using only its title, opening paragraph, headings, callouts, lists, tables, diagrams, and code labels. Confirm that the common reading path is visible, critical guidance appears before the affected action, and each component matches the need defined by the reader-experience reference.

Check narrow-screen behavior conceptually: tables remain compact, code and diagrams retain their meaning, and no essential instruction depends on side-by-side layout, color, hover, or collapsed content.

Pass when a reader can orient, act or understand, and identify the next step without decoding decorative or platform-specific markup.

## 4. MSP source gate

From the repository root, run:

```shell
node scripts/review-content.mjs
```

Fix every reported error. Warnings require an explicit disposition: correct the content or explain why it is safe.

When an MSP Portal checkout is available, bind the check to its live renderer contract:

```shell
node scripts/review-content.mjs --portal ../msp
```

Pass when the command exits successfully and every warning has been resolved or justified.

## 5. Visual and executable gate

For code, run or compile the example and verify the stated success signal when the environment permits. For SVGs, inspect the rendered asset for clipping, reading order, contrast, legibility, and agreement with the prose. For tables, raw HTML, portal extensions, diagrams, or complex relative paths, use the live portal compatibility check; preview the affected portal page when it is already available through the normal source integration.

Pass when the example behaves as documented and layout-sensitive content has been inspected at its publication surface. If the environment prevents an applicable runtime or visual check, report the gate as not run rather than passed and do not call the content publication-ready.

## 6. Change report

Report:

- reader outcome and selected content modes
- files created or changed
- evidence inspected
- automated, runtime, and visual checks with results
- remaining assumptions, unverified claims, or skipped checks

The work is complete only when gates 1–5 pass for every changed page and asset.
