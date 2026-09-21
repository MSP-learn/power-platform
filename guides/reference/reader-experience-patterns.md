# Reader-centered Markdown patterns

Use Markdown as the interface between the reader and the technical content. Choose structures for the reader's task, then let MSP Portal apply the presentation. The [Docsify UI Kit](https://docsify.js.org/#/ui-kit) provides useful pattern inspiration, but MSP uses its own renderer and styles.

## Shape a complete reader path

Design the page in three layers:

1. **Orient:** use a specific title and opening paragraph to establish the subject, outcome, audience, and scope.
2. **Act or understand:** keep the common path contiguous, put prerequisites before dependent steps, and place evidence next to the claim it supports.
3. **Recover or continue:** provide success checks, limitations, likely failure guidance, and the most useful next page.

A reader scanning only the opening, headings, callouts, diagrams, and code labels should still understand the page's direction.

## Choose a pattern by reader need

| Reader need | MSP-compatible pattern | Design constraint |
| --- | --- | --- |
| Important context | Blockquote with a bold label | Place it where the context changes interpretation or action. |
| Risk or irreversible effect | Warning blockquote | State the consequence and safer action before the risky step. |
| Optional advanced detail | `<details>` and descriptive `<summary>` | Keep the main path complete when the detail is closed. |
| Ordered action | Numbered list | Put one observable action in each step. |
| Requirements or unordered facts | Bulleted list | Keep peer items grammatically parallel. |
| Completion tracking | Task list | Use it only for a finite set of checks the reader performs. |
| Comparison or exact mapping | Compact table | Split tables that require wide horizontal scanning. |
| Command, configuration, code, or output | Language-labeled fence | Separate input from output and explain the success signal. |
| Keyboard input | `<kbd>` | Reserve it for keys and shortcuts, such as <kbd>Ctrl</kbd>+<kbd>K</kbd>. |
| Spatial relationships | Accessible local SVG | Follow the visual with its important conclusion in prose. |
| Related action | Descriptive Markdown link | Name the destination or outcome instead of writing “click here.” |

## Put callouts in the reading flow

MSP styles blockquotes as callouts. Use a bold text label so the meaning survives on GitHub and in other Markdown renderers.

> **Note:** Use context that helps the reader interpret the current section.

> **Warning:** State what could happen and what the reader should do before continuing.

Use callouts sparingly. Information required by every reader usually belongs in the main prose rather than a series of highlighted boxes.

## Collapse only optional detail

The summary should tell the reader what they will reveal. Essential steps, warnings, and success criteria stay outside the collapsed region.

<details>
<summary>See when a details section is appropriate</summary>

Use it for an advanced explanation, a lengthy example, or background that supports the common path without interrupting it.

</details>

## Pair actions with feedback

Show the input first, then tell the reader which observable result confirms success.

```shell
node scripts/review-content.mjs
```

A successful review reports the number of Markdown and SVG files checked. An error identifies the file, line, and contract violation to correct.

## Protect narrow-screen reading

- Prefer two or three concise table columns. Split a wide matrix by reader decision.
- Keep code lines focused and avoid examples that require side-by-side explanation.
- Give diagrams a stable reading direction and legible labels at documentation width.
- Put meaning in text and structure rather than color, screen position, or hover behavior.
- Use descriptive links and summaries so navigation remains clear with the sidebar collapsed.

## Keep the source portable

Docsify-specific directives, theme classes, interactive forms, and presentation styles are not MSP content primitives. Prefer standard Markdown, semantic details and keyboard elements, and local accessible SVG assets. The content must remain understandable in the source repository even when portal enhancements are unavailable.
