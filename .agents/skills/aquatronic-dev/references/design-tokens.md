# Design Tokens — Aquatronic

All tokens are defined in `src/styles/global.css` as CSS custom properties.

## Colors

### Primary Scale (Blue)
```css
--clr-primary-100: #c7edff   /* lightest — backgrounds, tints */
--clr-primary-200: #8dd8ff
--clr-primary-300: #4dbef0
--clr-primary-400: #00a0e3
--clr-primary-500: #0080c0   /* main brand blue */
--clr-primary-600: #006ba3
--clr-primary-700: #114973
--clr-primary-800: #0c3455   /* dark sections */
--clr-primary-900: #071e35   /* darkest — hero overlays */
```

### Neutral Scale (Blue-Gray)
```css
--clr-neutral-100: #dfe7ef   /* lightest — section backgrounds */
--clr-neutral-200: #c2ccd8
--clr-neutral-300: #a5b3c2
--clr-neutral-400: #8899ac
--clr-neutral-500: #6b8096
--clr-neutral-600: #556878
--clr-neutral-700: #3e515b
--clr-neutral-800: #283a41   /* body text alternative */
--clr-neutral-900: #131e28   /* body text */
```

### White/Black Opacity Variants
```css
--clr-white: #ffffff
--clr-white-80, -60, -40, -20, -10  /* rgba(255,255,255, .8/.6/.4/.2/.1) */
--clr-black: #000000
--clr-black-80, -60, -40, -20, -10, -05
```

### Feedback
```css
--clr-red: #ef4444
--clr-yellow: #f59e0b
--clr-green: #22c55e
```

### Deprecated — Do Not Use
| Deprecated | Replace With |
|------------|-------------|
| `--clr-blue: #0181fe` | `--clr-primary-500` |
| `--clr-baby-blue: #e9f4ff` | `--clr-primary-100` |
| `--clr-cyan: #33d3cd` | removed — no replacement |
| Any hardcoded hex | Closest token above |

## Gradients

```css
--gradient-brand: linear-gradient(135deg, #114973, #00a0e3)
/* Use: footer, hero overlays, dark section backgrounds */

--gradient-action: linear-gradient(135deg, #006ba3, #4dbef0)
/* Use: buttons, CTAs, interactive highlights */
```

## Typography

```css
--ff-primary: "DM Sans", sans-serif   /* all text — no other font family */
```

Font weights in use: 400 (body), 500 (medium), 600 (headings), 700 (bold), 900 (display).

Heading line-height: `1.1`. Body line-height: `1.6`.

## Layout

```css
--container-width: 1300px    /* max-width of .container */
--section-padding: 100px 0   /* applied by .section-padding utility */
```

Responsive overrides for `.section-padding`:
```css
@media (max-width: 1024px) { padding: 60px 0; }
@media (max-width: 768px)  { padding: 60px 20px; }
```

## Utility Classes (global.css)

| Class | Effect |
|-------|--------|
| `.container` | `max-width: 1300px; margin: 0 auto; padding: 0 20px` |
| `.section-padding` | `padding: 100px 0` (responsive, see above) |
| `.section-tag` | Small label chip — prefer the `<section-tag>` component instead |
