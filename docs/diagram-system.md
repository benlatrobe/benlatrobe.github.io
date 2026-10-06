# Portfolio Diagram System

This site uses a shared editorial diagram language for system, architecture, process, lifecycle, responsibility, and before/after visuals.

The goal is not to make every visual look identical. The goal is to make diagrams easy to scan, consistent with the portfolio, and focused on the engineering idea the reader needs to understand.

## Core principles

- Prefer deletion. Every node and connector must carry information.
- Target moderate information density. If a diagram needs a guide to decode it, split it.
- Use the lime accent on only one or two focal elements.
- Keep one dominant reading direction.
- Prefer orthogonal connectors over decorative curves or diagonal routing.
- Use visual hierarchy. Do not render every node with the same weight.
- Use diagrams to explain a system or change. Use prose, lists, metrics, or screenshots when they communicate better.
- Diagrams explain. Screenshots prove implementation.

## Portfolio visual tokens

Use the existing site design system from `styles.css`:

- paper: `#f4f1e9`
- ink: `#161817`
- muted: `#6c706d`
- dark: `#151816`
- light: `#f5f2ea`
- accent: `#bbff49`

Primary diagram classes use the `.editorial-diagram` namespace and semantic roles such as:

- `.dd-node`
- `.dd-node-soft`
- `.dd-node-accent`
- `.dd-connector`
- `.dd-connector-muted`
- `.dd-connector-dashed`
- `.dd-connector-accent`
- `.dd-eyebrow`
- `.dd-title`
- `.dd-copy`
- `.dd-tech`

Dark surfaces add `.diagram-dark`.

## Accessibility

Every explanatory SVG must include:

- `role="img"`
- one `<title>`
- one `<desc>`
- `aria-labelledby` pointing to those elements

Decorative SVGs should instead be hidden from assistive technology.

## Type selection

Use the simplest visual grammar that matches the story:

- Architecture — components and connections in one system snapshot
- Process — sequential work, handoffs, and decision points
- Before / After — one operating model changed into another
- Layer stack — real abstraction or product layers
- Lifecycle — stages plus feedback or re-entry
- Responsibility map — ownership and coordination, not necessarily reporting
- Exploded assembly — only when physical geometry and assembly order are credible
- Timeline — career or event progression

Do not convert a clear list, metric block, or existing timeline into an SVG just for consistency.

## Current focal choices

- Homepage: Engineering is the focal system; AI-enabled methods support it.
- Universe: Core/CEMs and engineer review are focal.
- Engineering Operations: normalized data layer and user-facing application are focal.
- NPI: pilot build is the evidence-generating focal stage.
- RTLS: hub / reader / locator is focal because the case is device-side engineering.
- Product Engineering: factory reality is focal because production evidence is part of product development.
- Storage Platform: system integration is focal because product ownership persists across partner development.
- Engineering Leadership: product / program is the shared focal point.
- Continuous Improvement: the operating intervention is focal, not the original failure state.

## Source methodology

The design approach is informed by the public MIT-licensed Diagram Design project:
https://github.com/cathrynlavery/diagram-design

The portfolio uses its own site tokens, content, layout decisions, and SVG implementations.
