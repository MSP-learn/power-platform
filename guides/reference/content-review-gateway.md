# Content review gateway

Use this gateway to determine whether a documentation change is ready to publish through MSP Portal. It combines repository checks with the technical, reader-experience, and visual review that automation cannot replace.

## Run the automated gate

From the documentation source repository root, run:

```shell
node scripts/review-content.mjs
```

The command checks every Markdown page and SVG under `docs/`, plus the source metadata contract. It fails on broken local targets, invalid heading structure, unusable anchors, unlabeled images, unclosed or unlabeled code fences, unsafe or presentation-dependent HTML, inaccessible SVG structure, missing navigation directories, Docsify-only directives, dangerous links, and known contract violations such as Mermaid fences when the MSP renderer has no Mermaid support.

When an MSP Portal checkout is available, bind the gate to its live renderer implementation:

```shell
node scripts/review-content.mjs --portal ../msp
```

If MSP is not a sibling directory, replace `../msp` with its repository path. A successful run reports the number of Markdown and SVG files checked and confirms the portal contract location.

## Resolve the result

- An `ERROR` blocks publication. Correct the source and rerun the command until it exits successfully.
- A `WARNING` identifies a check that needs human disposition. Correct the content or explain in the pull request why the behavior is safe.
- A passing command completes the automated portion only. Apply the evidence and content checks below before marking the change ready.

## Verify the content

Confirm that consequential claims match code, configuration, tests, approved design material, or an authoritative source. Clearly label proposed behavior, inference, and unresolved information.

Scan the page using [reader-centered Markdown patterns](reader-experience-patterns.md). The title and opening should orient the reader; headings and components should expose the common path; verification, limitations, recovery, and related links should provide the next move. Critical information must appear before the action it affects and remain available without relying on color, hover, or collapsed content.

Review the page using the mode that matches its purpose:

| Mode | Publication question |
| --- | --- |
| Architecture | Are boundaries, responsibilities, relationships, state, and consequential trade-offs accurate? |
| Workflow | Can the reader identify the trigger, actor, path, branches, end state, and recovery behavior? |
| Diagram | Does the SVG answer one clear question, remain legible, and agree with the prose? |
| Code | Is the example grounded, safe, executable or clearly partial, and paired with a success signal? |
| Breakdown | Does the decomposition preserve how the parts interact and end in a usable decision or action? |

## Inspect the publication surface

Run or compile changed code examples when the environment permits. Open changed SVGs and check their reading order, clipping, contrast, and text size. Preview pages containing diagrams, tables, raw HTML, portal-specific code fences, or complex relative links through the normal MSP source integration when it is available.

If a required runtime or visual check cannot run, record it as not run. The change can be shared for review, but it is not publication-ready until every applicable check passes.

## Record the review

In the pull request, identify the reader outcome, changed paths, source evidence, commands and previews run, and any remaining uncertainty. This record gives the reviewer enough context to reproduce the gate instead of relying on an unchecked readiness claim.
