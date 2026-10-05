# Ben Lin — Personal Engineering Portfolio

Static GitHub Pages portfolio for Ben Lin, focused on engineering leadership, product development, manufacturing/NPI, software, and AI-enabled engineering.

## Live site

https://benlatrobe.github.io/

## Portfolio pages

- `index.html` — portfolio homepage and career story
- `ai-engineering.html` — Universe / AI-enabled engineering
- `engineering-visibility.html` — Engineering Operations Dashboard
- `npi-readiness.html` — NPI & manufacturing readiness
- `execution-system.html` — continuous-improvement cases
- `wireless-module.html` — high-volume NFC module
- `connected-positioning.html` — RTLS, positioning hardware, RFID and patent work
- `storage-platform.html` — storage platform + management software
- `cv.html` — concise career history with links to portfolio evidence
- `404.html` — custom error page

Two older narrative pages, `product-engineering.html` and `engineering-leadership.html`, are retained only for old links and are marked `noindex,follow`.

## Design approach

The site is intentionally built with plain HTML, CSS, and a small amount of JavaScript so it remains easy to host, inspect, and maintain on GitHub Pages.

Case studies are visual-first and use diagrams, real sanitized screenshots where available, and concise technical context rather than reproducing a resume.

## Visual QA

`.github/workflows/visual-qa.yml` runs browser-based checks on the primary portfolio pages at desktop, tablet, and mobile viewports. It validates:

- horizontal overflow
- internal anchor integrity
- representative screenshots for visual review

The workflow uploads screenshots and QA results as a GitHub Actions artifact.

## Development

Serve the repository with any static file server, for example:

```bash
python3 -m http.server 8000
```

Then open:

```
http://localhost:8000/
```
