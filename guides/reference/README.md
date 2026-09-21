# `.docs-source.yml` reference

`.docs-source.yml` is the metadata contract between this repository and MSP Portal.

For publication checks that apply to every documentation change, see the [content review gateway](content-review-gateway.md).

For choosing Markdown structures that fit the reader's task and the MSP interface, see [reader-centered Markdown patterns](reader-experience-patterns.md).

## Required fields used by the current portal scripts

| Field | Type | Purpose |
| --- | --- | --- |
| `id` | string | Stable source identifier used for URLs and aggregation |
| `name` | string | Display name shown to readers |
| `category` | string | Portal grouping label |
| `description` | string | Short summary for listings and search context |
| `docs_path` | string | Relative path to the documentation root, usually `docs` |
| `navigation` | list of strings | Empty list for this template's flat publication directory |

## Optional fields supported by the current portal scripts

| Field | Type | Purpose |
| --- | --- | --- |
| `tags` | list of strings | Search and discovery labels; omitted `tags` behave the same as an empty list |

## Conventions

- Keep `id` short, lowercase, and stable once the source is published.
- Use a human-readable `name`; it does not need to match the repository name exactly.
- Keep `description` concise and factual.
- Point `docs_path` at the directory the portal should sync.
- Add short tags when they improve discovery without becoming a keyword dump.
- If you omit `tags`, MSP Portal treats them as an empty list.
- Keep `navigation` as an empty list while `docs/` remains flat.

## Example

```yml
id: msp-template
name: MSP Template
category: Shared Services
description: Starter structure for documentation repositories that publish through MSP Portal.
docs_path: docs
tags: [documentation, template, portal]
navigation: []
```

## Notes on compatibility

The current MSP validation and sync scripts read these fields directly. Keep the top-level field names stable, and prefer adding comments over inventing alternative keys unless the portal schema is updated first.
