---
name: technical-writing
description: Create, restructure, or review reader-centered technical Markdown for MSP Portal. Use for architecture explanations, workflows, documentation diagrams, code snippets, technical breakdowns, how-to guides, reference pages, and publication-readiness reviews.
---

# Technical writing for MSP

Produce evidence-based documentation that remains readable in its source repository and renders correctly after MSP Portal sync.

## Route the work

Always read [reader experience](references/reader-experience.md), [MSP Markdown](references/msp-markdown.md), and [review gateway](references/review-gateway.md). Then read every specialist reference that matches the deliverable:

- **Architecture:** read [architecture](references/architecture.md) for system boundaries, components, data paths, deployment views, or design decisions.
- **Workflow:** read [workflows](references/workflows.md) for procedures, lifecycle descriptions, state transitions, or multi-actor interactions.
- **Diagram:** read [diagrams](references/diagrams.md) whenever creating or changing a visual model or when prose contains relationships that need one.
- **Code:** read [code snippets](references/code-snippets.md) for commands, configuration, APIs, source excerpts, or runnable examples.
- **Breakdown:** read [technical breakdowns](references/technical-breakdowns.md) for concept explainers, component dissections, comparisons, or layered deep dives.

For mixed documents, combine only the applicable modes. A task guide with one command block, for example, uses workflow and code guidance without inheriting an architecture-page structure.

## Work from evidence

1. State the reader and the observable outcome the page must enable. Infer these from the request and repository when possible.
2. Inspect the relevant code, configuration, tests, existing terminology, and adjacent documentation. For time-sensitive or external behavior, verify against an authoritative source when access is available.
3. Classify each consequential statement as verified fact, inference, recommendation, or unresolved information. Make that distinction visible wherever a reader could otherwise act on uncertainty.
4. Put publishable reader content directly in the configured `docs_path`; this template keeps that directory flat. Use the root `guides/` directory only for contributor guidance that MSP must not publish. Update `docs/README.md` when a new page would otherwise be undiscoverable.

## Draft for decisions and action

- Lead with what the reader will understand or accomplish.
- Put prerequisites and scope before steps that depend on them.
- Use progressive disclosure: outcome and common path first; internals, variants, and edge cases later.
- Select semantic Markdown patterns by reader need using the reader-experience reference; let MSP own their visual styling.
- Keep one term per concept. Reuse terms already established by code and adjacent docs unless they are inaccurate.
- Explain consequential defaults, side effects, failure behavior, ownership, and success signals.
- Prefer a focused page over a catch-all. Link to one authoritative explanation instead of duplicating it.

## Complete the gate

Run the [review gateway](references/review-gateway.md) after the draft and after every correction. The task is incomplete while a required check is failing, a technical claim remains silently unverified, or a layout-sensitive change has not received the required portal compatibility check.
