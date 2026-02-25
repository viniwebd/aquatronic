---
name: aquatronic-dev
description: Development standards and conventions for the Aquatronic project website. Use when creating, editing, or reviewing HTML pages, TypeScript components, or CSS styles in this project. Ensures design system compliance, visual consistency across pages, reuse of existing components, responsive design (desktop/tablet/mobile), and accessibility best practices (ARIA, semantic HTML). Key visual rules: no dark section backgrounds, consistent gradient icon boxes on all cards, section-tag used without icon (dash + text only).
---

# Aquatronic Dev

## Core Rules

1. **Use design tokens** — never hardcode colors, gradients, or fonts. See [design-tokens.md](references/design-tokens.md).
2. **Reuse components** — before writing new markup, check if a component already exists. See [components.md](references/components.md).
3. **Match existing patterns** — if a page already has a section style (card layout, list structure, spacing pattern), replicate it on other pages.
4. **Responsive by default** — every new section or component must work at all three breakpoints: 1024px+ (desktop), 768px–1023px (tablet), <768px (mobile).
5. **Accessibility first** — use semantic HTML and ARIA attributes throughout.
6. **No dark section backgrounds** — section backgrounds are always `#fff` or `var(--clr-neutral-100)`. The only allowed exception is the CTA section, which uses `var(--gradient-brand)`.
7. **Consistent icon boxes** — every card icon container must use the same CSS: `52×52px`, `border-radius: 14px`, `background: var(--gradient-action)`, white icon at `1.35rem`. Never override this pattern per-section.
8. **`section-tag` without icon** — always use `<section-tag text="...">` with no `icon` attribute. The component renders as a dash + text label.

## Page Structure

Every page follows this pattern:

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page Title | Aquatronic</title>
  <link rel="stylesheet" href="../src/styles/global.css">
  <link rel="stylesheet" href="../src/styles/[page].css">
  <!-- Font Awesome -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
  <site-header></site-header>
  <main>
    <page-hero title="..." subtitle="..."></page-hero>
    <!-- sections -->
  </main>
  <site-footer></site-footer>
  <script type="module" src="../src/components/SiteHeader.ts"></script>
  <script type="module" src="../src/components/SiteFooter.ts"></script>
  <!-- other component scripts as needed -->
</body>
</html>
```

## Section Pattern

```html
<section class="[name]-section section-padding" aria-labelledby="[name]-title">
  <div class="container">
    <section-tag text="Label"></section-tag>
    <h2 id="[name]-title">Section Title</h2>
    <!-- content -->
  </div>
</section>
```

## Responsive Breakpoints

```css
/* Tablet */
@media (max-width: 1024px) { }

/* Mobile */
@media (max-width: 768px) { }
```

Use `clamp()` for fluid typography: `font-size: clamp(1.5rem, 4vw, 2.5rem)`.
Use `grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))` for auto-responsive grids.

## Accessibility Checklist

- `<html lang="pt-BR">` on every page
- Semantic landmarks: `<main>`, `<nav>`, `<section>`, `<footer>`, `<article>`
- All `<section>` elements have `aria-labelledby` pointing to their heading id
- All images have descriptive `alt` text (empty `alt=""` for decorative images)
- Interactive elements (`<button>`, `<a>`) have visible focus states via `:focus-visible`
- Form inputs paired with `<label>` using `for`/`id`; required fields use `aria-required="true"`
- Icon-only buttons have `aria-label`
- Color contrast: text must meet WCAG AA (4.5:1 for normal text, 3:1 for large text)
- Avoid `display: none` for content that should be accessible; use `.sr-only` instead

## References

- **Design tokens** (colors, gradients, typography, spacing): [design-tokens.md](references/design-tokens.md)
- **Component catalog** (usage, attributes, examples): [components.md](references/components.md)
