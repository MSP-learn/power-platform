# Add a documentation page

Use this guide to add reader-facing content while keeping the MSP publication directory flat.

## 1. Define the reader outcome

Start with the reader's question and choose the matching content approach:

- “What is this?” needs a concept explanation.
- “How does it fit together?” needs architecture or a technical breakdown.
- “What happens and who acts?” needs a workflow.
- “How do I do it?” needs a task-focused guide.
- “What is the exact value or rule?” needs reference content.
- “What failed and how do I recover?” needs troubleshooting content.

The content-type references in `guides/` describe what each approach must make visible.

## 2. Create the published file

Choose a descriptive kebab-case filename directly under `docs/`, for example:

```text
docs/add-a-documentation-page.md
```

Start with one `#` heading and add the smallest set of sections that makes the reader's outcome complete.

## 3. Make the page discoverable

Add a descriptive link to `docs/README.md` when readers need to find the page by browsing. Link related pages instead of duplicating shared explanations.

## 4. Keep required assets with the page

Place diagrams or screenshots directly under `docs/` and reference them by relative filename:

```markdown
![Portal synchronization flow](portal-sync-flow.svg)
```

Every published dependency must remain inside `docs/`, because MSP synchronizes only the configured documentation root.

## 5. Keep metadata aligned

Keep `.docs-source.yml` navigation empty while the publication directory remains flat. Update source name, category, description, or tags only when the source-level metadata changes.

## 6. Complete the review gate

Run:

```shell
node scripts/review-content.mjs --portal ../msp
```

Resolve every error and warning. Run or inspect code and visual assets when applicable, then record any check that could not be completed.
