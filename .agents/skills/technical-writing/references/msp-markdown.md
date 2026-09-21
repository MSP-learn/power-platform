# MSP Markdown contract

MSP Portal copies the configured documentation directory into its source collection and renders pages with `marked` in GitHub-flavored Markdown mode. Its page title comes from the first level-one heading, and its table of contents indexes level-two and level-three headings.

## Portable source

- Begin each page with one descriptive `#` heading. Do not add YAML frontmatter; the current renderer treats it as page content rather than metadata.
- Build the main hierarchy with `##` and `###`. Keep heading text unique within the page so generated anchors do not collide.
- Use relative links for repository pages and assets. MSP rewrites them after sync; absolute filesystem paths and deployment-root URLs are not portable.
- Keep diagrams and images beside their Markdown page inside the configured documentation root. This template uses a flat `docs/` publication directory, and every image needs useful alt text.
- Use GitHub-flavored tables, task lists, block quotes, and fenced code. Keep the source understandable when portal enhancements are unavailable.
- Use `> **Note:**`, `> **Important:**`, or `> **Warning:**` for callouts. MSP styles the blockquote container; it does not currently transform Docsify or GitHub alert markers into distinct components.
- Use raw HTML only for a necessary, reviewed semantic element such as `<details>`, `<summary>`, or `<kbd>`. Source documentation must not contain executable, embedding, or form controls such as `<script>`, `<iframe>`, `<object>`, `<embed>`, `<form>`, `<input>`, `<button>`, `<select>`, or `<textarea>`.
- Keep inline presentation styles out of source Markdown. Semantic content belongs to the source; typography, spacing, color, and responsive behavior belong to MSP Portal.
- Keep tables compact. MSP styles tables but does not add a dedicated horizontal-scroll wrapper, so wide tables require a mobile preview or a different structure.

Docsify-only directives such as `!>`, `?>`, `{docsify-ignore}`, and `:include` are not part of the MSP contract. Use the equivalent standard Markdown pattern from the reader-experience reference.

## Code behavior

Use a language on every fence. MSP adds highlighting and a copy action. The renderer also recognizes these optional forms:

- `html preview` or `html demo` creates a sandboxed HTML preview.
- A `jsfiddle` fence embeds a valid saved `https://jsfiddle.net/` URL.
- A normal YouTube link becomes an embedded player.
- `embed:<language>` reads a path from the portal repository root, not from the source repository. Avoid it in source-owned documentation unless the portal integration and fallback have been explicitly designed and previewed.

These extensions enhance a page; the surrounding Markdown must still explain the example.

## Diagram behavior

The current renderer has no Mermaid transformation. A `mermaid` fence appears as code, not as a diagram. Publish diagrams as local accessible SVG assets and embed them with normal image syntax:

```markdown
![Request path from client to API](request-path.svg)
```

Include a short prose interpretation near the diagram so its conclusion is available to screen-reader users and readers scanning the page.

## Renderer-sensitive changes

Treat diagrams, tables, raw HTML, portal-specific fence flags, deep relative links, and large code blocks as layout-sensitive. They require the live compatibility check in the review gateway when the sibling MSP Portal checkout is available.
