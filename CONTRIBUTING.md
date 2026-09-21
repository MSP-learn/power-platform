# Contributing

Thanks for improving this documentation source.

The goal of this template is balanced structure: enough consistency for MSP Portal to sync and present the content well, without forcing a rigid process for small updates.

## First steps for contributors

1. Read `docs/README.md` to understand the current section structure.
2. Confirm whether the change belongs in an existing page or a new file.
3. Update `.docs-source.yml` only when source-level metadata changes.
4. Run the [content review gateway](guides/reference/content-review-gateway.md) before opening a pull request.

## Publication boundary

Keep the two content surfaces separate:

- `docs/` contains only reader-facing pages and the assets MSP needs to render them. Keep it flat.
- `guides/` contains contributor instructions, authoring standards, and content-type guidance that MSP should not publish.
- `.agents/skills/` contains agent-only operating instructions.

Choose a descriptive kebab-case filename for every additional published page and link it from `docs/README.md` when readers need to discover it by browsing.

## Markdown conventions

- Use plain Markdown that stays readable on GitHub.
- Keep one top-level heading per file.
- Prefer short sections, descriptive headings, and concrete examples.
- Use fenced code blocks with a language when it helps readability.
- Choose clear kebab-case filenames.
- Avoid raw HTML unless Markdown cannot express the content cleanly.

## Links and images

- Use relative links for pages and assets within the repository.
- Keep published images directly under `docs/` beside the Markdown that uses them.
- Add meaningful alt text.
- Prefer SVG or compressed PNG/WebP for diagrams when practical.
- Remove or replace broken links before requesting review.

## Metadata expectations

`.docs-source.yml` is the contract MSP Portal uses to discover and organize this source.

Update it when you change:

- the source name or description
- the category
- the set of tags
- the folder list represented in `navigation`
- the documentation root if `docs_path` changes

For field-by-field guidance, see `guides/reference/README.md`.

## Review expectations

A documentation change is ready for review only after this command succeeds:

```shell
node scripts/review-content.mjs
```

When the MSP Portal repository is available beside this checkout, also bind the review to its current renderer:

```shell
node scripts/review-content.mjs --portal ../msp
```

Fix every error. Resolve each warning in the content or explain its safe disposition in the pull request. Code, diagrams, tables, raw HTML, portal-specific extensions, and complex link structures also need the applicable runtime or visual check described by the gateway.

A pull request should describe:

- the documentation scope
- the paths changed under `docs/`
- whether `.docs-source.yml` changed
- the automated, renderer, runtime, and visual checks you ran
- any unverified claim or check that could not be completed
- anything reviewers should open locally or review carefully

If the change adds a new page, reviewers should be able to answer three questions quickly: why this page exists, why it belongs in that folder, and how readers will find it.

## Connection to MSP Portal

This repository is a source, not the portal itself. Keep content source-owned and portable:

- do not rely on portal-only components to make a page understandable
- keep relative links working from the source repository
- avoid assumptions that only make sense inside one product area unless the repository is explicitly about that area

That keeps the template reusable for future MSP documentation sections.
