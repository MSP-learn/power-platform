# Documentation ownership and organization

MSP Portal is the publishing layer, but each source repository owns its own documentation.

## Ownership model

- The source repository owns the Markdown, assets, and metadata in `.docs-source.yml`.
- The portal owns aggregation, navigation, search, and presentation across many sources.
- Teams update documentation close to the code, process, or domain they already maintain.

This split keeps content maintenance local while giving readers one place to browse and search.

## Organizing a source repository

Keep the publication boundary explicit:

- Put reader-facing Markdown and required assets directly under `docs/` so MSP can synchronize them.
- Put contributor instructions and reusable content-type guidance under the repository-level `guides/` directory.
- Put agent operating instructions under `.agents/skills/`.

Use descriptive filenames and `docs/README.md` links to give readers information scent without nesting the published source.

## Practical conventions

- Keep filenames descriptive and stable.
- Use relative links so pages work in both GitHub and MSP Portal.
- Prefer small, focused pages over one long catch-all document.
- Keep `.docs-source.yml` navigation empty while the publication directory remains flat.
