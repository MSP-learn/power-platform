# Documentation diagrams

Use a diagram only when spatial grouping, sequence, branching, hierarchy, or repeated relationships are harder to understand in prose. The diagram and surrounding text must agree and must name the same entities as the implementation.

## Choose one question

Write the question the visual answers before drawing it. Select one form:

- context or container map for boundaries and dependencies
- flowchart for choices and alternate paths
- sequence diagram for messages over time
- state model for allowed transitions
- entity relationship view for records and cardinality
- hierarchy or tree for ownership and nesting

Split the visual when it mixes more than one primary question or abstraction level.

## Author for MSP

Create a self-contained SVG beside the Markdown page in the configured `docs_path` and reference it with a relative image link. Keep this template's publication directory flat. Mermaid is not rendered by the current portal.

The SVG must include:

- a descriptive `<title>` and `<desc>`
- a stable `viewBox` so it scales
- readable text at ordinary documentation width
- visible direction, labeled non-obvious arrows, and explicit boundaries
- meaning that does not depend on color alone
- enough contrast for text, lines, and state distinctions

Prefer a simple left-to-right or top-to-bottom reading order. Keep labels short, use consistent shapes for consistent roles, and add a legend only when the encoding is not self-evident.

## Pair visual and prose

Give the Markdown image meaningful alt text that states the diagram's subject. Follow it with the important conclusion, not a transcription of every node. Describe critical paths, exceptions, and trust or ownership changes in prose.

Validate entity names against evidence, open the SVG to inspect clipping and alignment, and run the live portal compatibility check before calling the diagram ready.
