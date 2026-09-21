# MSP Template

Starter repository for documentation sources that plug into MSP Portal.

This template gives a new documentation section a predictable shape without forcing every folder to be used on day one. Keep the content plain Markdown, keep assets local to the repository, and adjust the structure as the section grows.

## How this repository fits into MSP Portal

Each MSP documentation source owns its own `docs/` content and `.docs-source.yml` metadata.

MSP Portal then:

1. reads `.docs-source.yml`
2. syncs the repository's `docs/` directory
3. builds shared navigation and search from the source metadata

That keeps documentation close to the team that maintains it while still publishing through one portal.

## Getting started

1. Review `.docs-source.yml` and set the source `id`, `name`, `category`, and `description` for your section; add `tags` only if they help discovery.
2. Update `docs/README.md` so the published overview matches your subject area.
3. Add reader-facing Markdown and required assets directly under `docs/`; keep the publication directory flat.
4. Use `guides/` for contributor instructions and content-type guidance that MSP should not publish.
5. Run `node scripts/review-content.mjs`; when MSP Portal is available beside this repository, also run `node scripts/review-content.mjs --portal ../msp`.
6. Open a pull request after the automated, evidence, and applicable visual or executable checks pass.

## Repository layout

| Path | Purpose |
| --- | --- |
| `.docs-source.yml` | Source metadata consumed by MSP Portal sync and build scripts |
| `AGENT.md` | MSP technical-writer persona and required operating contract |
| `.agents/skills/technical-writing/` | Reader-UX and specialist playbooks for architecture, workflows, diagrams, code, breakdowns, and review |
| `scripts/review-content.mjs` | Automated MSP Markdown publication gate |
| `docs/` | Flat publication surface synchronized into MSP Portal |
| `docs/README.md` | Published landing page for the documentation source |
| `guides/` | Contributor and content-type guidance excluded from portal sync |
| `.github/PULL_REQUEST_TEMPLATE.md` | Review checklist for documentation changes |

## Choosing the content approach

Keep published pages directly under `docs/`. Use the lightest content approach that matches the reader's need:

- **Concepts** for "what is this and who owns it?"
- **Architecture** for "how is it structured?"
- **Workflows** for "what happens, who acts, and how does state change?"
- **Guides** for "how do I do it?"
- **Patterns** for "what approach should I repeat?"
- **Components** for "what reusable pieces exist?"
- **Examples** for "show me a complete sample"
- **Snippets** for "give me the small piece"
- **Troubleshooting** for "what went wrong?"
- **Reference** for "what are the exact fields, commands, or rules?"

The detailed playbooks live under `guides/` and `.agents/skills/technical-writing/`. Link related published pages from `docs/README.md` instead of duplicating content.

## Markdown, links, and images

- Prefer plain Markdown that renders well on GitHub and in static site pipelines.
- Use one `#` heading per file and descriptive filenames such as `add-a-documentation-page.md`.
- Keep links relative inside the repository so they survive sync into MSP Portal.
- Store images and diagrams directly under `docs/` beside the page that references them.
- Add alt text for images and avoid embedding text only in screenshots when a Markdown explanation would be clearer.

## Review expectations

A documentation pull request must pass the [content review gateway](guides/reference/content-review-gateway.md) and make it easy for reviewers to answer:

- what changed
- which audience the page is for
- whether links and assets render correctly
- whether `.docs-source.yml` still reflects the section
- whether the new page sits in the right folder

See `CONTRIBUTING.md` for the working agreement used by this template.
