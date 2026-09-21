# Reader experience

Treat Markdown as a semantic UI kit. Select each pattern for the reader interaction it supports, then let MSP Portal supply presentation. Use the [Docsify UI Kit](https://docsify.js.org/#/ui-kit) as inspiration for the available reading patterns, not as a syntax or CSS dependency.

## Shape the reading path

Design the page in three layers:

1. **Orient:** a specific title and opening paragraph tell the reader what the page covers, why it matters, and whether it matches their task.
2. **Act or understand:** the main path presents prerequisites before dependent actions, keeps the common case contiguous, and places evidence next to the claim it supports.
3. **Recover or continue:** success checks, limitations, failure guidance, and related pages give the reader a clear next move.

Make the first screen useful. Put the outcome and any safety-critical prerequisite before background detail. Use headings with information scent: a reader scanning only headings should understand the page's path.

## Select the semantic pattern

| Reader need | Authoring pattern | Use it when |
| --- | --- | --- |
| Important context | `> **Note:**` blockquote | The reader needs context at that exact point to interpret or complete the task. |
| Risk or irreversible effect | `> **Warning:**` blockquote | The reader must pause before the following action. State the consequence and safer action. |
| Optional detail | `<details>` with a descriptive `<summary>` | The main path remains complete while advanced detail can be collapsed. |
| Ordered action | Numbered list | Sequence affects the outcome. Put one observable action in each step. |
| Requirements or unordered facts | Bulleted list | Order does not carry meaning. Keep list items grammatically parallel. |
| Completion state | Task list | The reader is expected to track a finite set of checks. |
| Comparison or exact mapping | Table | Three or more peers share stable fields. Keep columns narrow enough for mobile reading. |
| Command, code, config, or output | Labeled fenced block | Exact characters matter. Separate input from expected output and explain the success signal. |
| Keyboard input | Semantic `<kbd>` | A key or shortcut must be distinguished from code or a value. |
| Spatial or relational model | Accessible local SVG | A diagram materially reduces the effort of understanding relationships. |
| Related action or page | Descriptive link | The destination advances the current task. Link meaningful words rather than “here.” |

Use emphasis to expose meaning, not decorate the page. Bold the term or decision a scanner needs; use inline code only for literal identifiers, values, paths, and commands.

## Keep components portable

MSP is not a Docsify runtime. Use standard Markdown and the semantic HTML explicitly allowed by the MSP contract. Docsify directives and presentation hooks—including `!>`, `?>`, `{docsify-ignore}`, `:include`, theme variables, and Docsify button or form classes—do not transfer to MSP.

Prefer a descriptive Markdown link over a styled button in source documentation. Prefer a task list over an interactive form. The documentation explains or guides product interaction; it does not recreate the product UI inside the page.

## Design for scanning and accessibility

- Keep paragraphs focused on one claim or decision and place the topic in the first sentence.
- Break long procedures into meaningful phases rather than a flat wall of steps.
- Introduce a table or diagram with the question it answers; follow it with the conclusion readers should take away.
- Split wide tables into smaller tables or lists. Do not require horizontal scanning to understand a critical relationship.
- Use descriptive link text, image alt text, and details summaries. Do not encode meaning only through color, position, or an icon.
- Keep essential information outside collapsed details, images, and hover-dependent interactions.

## Match the page type

- **How-to:** outcome, prerequisites, steps, verification, recovery.
- **Concept:** purpose, mental model, parts and relationships, example, limitations, next decision.
- **Reference:** scope, exact lookup structure, examples, edge cases, related operations.
- **Architecture or workflow:** scope, focused visual when useful, relationship narrative, state and failure behavior, implications.
- **Troubleshooting:** symptom, likely cause, diagnosis, correction, verification, escalation boundary.

These are reading paths, not mandatory heading templates. Keep only the sections needed to make the reader's outcome complete.
