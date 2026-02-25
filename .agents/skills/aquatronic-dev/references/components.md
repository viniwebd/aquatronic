# Component Catalog — Aquatronic

All components are Web Components (custom elements) defined in `src/components/`.
Load each via `<script type="module" src="../src/components/ComponentName.ts">`.

## Table of Contents
1. [SiteHeader](#siteheader)
2. [SiteFooter](#sitefooter)
3. [PageHero](#pagehero)
4. [SpecialButton](#specialbutton)
5. [SiteButton](#sitebutton)
6. [ContactButton](#contactbutton)
7. [SectionTag](#sectiontag)
8. [StatBadge](#statbadge)
9. [CtaBanner](#ctabanner)

---

## SiteHeader

**File:** `src/components/SiteHeader.ts`
**Tag:** `<site-header>`
**Use on:** Every page, always the first element inside `<body>`.

```html
<site-header></site-header>
<script type="module" src="../src/components/SiteHeader.ts"></script>
```

No attributes. Includes sticky behavior, scroll-triggered background (`header-solid` class), desktop dropdown nav, and mobile hamburger menu (collapses at 1024px).

---

## SiteFooter

**File:** `src/components/SiteFooter.ts`
**Tag:** `<site-footer>`
**Use on:** Every page, always the last element inside `<body>` (before scripts).

```html
<site-footer></site-footer>
<script type="module" src="../src/components/SiteFooter.ts"></script>
```

No attributes. Multi-column grid layout with company info, nav links, quick links, and contact. Uses `--gradient-brand` background.

---

## PageHero

**File:** `src/components/PageHero.ts`
**Tag:** `<page-hero>`
**Use on:** All inner pages (not the homepage). Place right after `<site-header>`, before `<main>` content, or as first child of `<main>`.

| Attribute | Required | Description |
|-----------|----------|-------------|
| `title` | Yes | Main heading of the page |
| `subtitle` | No | Supporting text below the title |

```html
<page-hero title="Nossos Serviços" subtitle="Soluções completas em automação industrial"></page-hero>
<script type="module" src="../src/components/PageHero.ts"></script>
```

Uses a full-height layout with background image overlay. Font size via `clamp()` for responsiveness.

---

## SpecialButton

**File:** `src/components/SpecialButton.ts`
**Tag:** `<special-button>`
**Use for:** Primary CTAs, hero actions, prominent call-to-action links.

| Attribute | Required | Values | Description |
|-----------|----------|--------|-------------|
| `text` | Yes | string | Button label |
| `href` | No | URL | Renders as `<a>` if provided, `<button>` otherwise |
| `icon` | No | FA class | Font Awesome icon class, e.g. `fa-solid fa-arrow-right` |
| `variant` | No | `primary` \| `secondary` \| `outline` \| `ghost` | Visual style (default: `primary`) |
| `type` | No | `button` \| `submit` | Only when rendered as `<button>` |

```html
<!-- Primary CTA with icon -->
<special-button text="Fale Conosco" href="/contato" icon="fa-solid fa-arrow-right" variant="primary"></special-button>

<!-- Outline variant -->
<special-button text="Saiba Mais" href="/sobre-nos" variant="outline"></special-button>

<script type="module" src="../src/components/SpecialButton.ts"></script>
```

Uses `--gradient-action` for `primary` variant.

---

## SiteButton

**File:** `src/components/SiteButton.ts`
**Tag:** `<site-button>`
**Use for:** Secondary CTAs, navigation links styled as buttons.

| Attribute | Required | Description |
|-----------|----------|-------------|
| `text` | Yes | Button label |
| `href` | Yes | Link URL (always renders as `<a>`) |

```html
<site-button text="Ver Produtos" href="/produtos"></site-button>
<script type="module" src="../src/components/SiteButton.ts"></script>
```

Pill-shaped, gradient background (`--gradient-action`). Hover: `brightness` filter + `translateY(-2px)`.

---

## ContactButton

**File:** `src/components/ContactButton.ts`
**Tag:** `<contact-button>`
**Use for:** Contact/WhatsApp CTAs, usually in hero sections or contact blocks.

| Attribute | Required | Description |
|-----------|----------|-------------|
| `text` | Yes | Button label |
| `href` | Yes | Link URL |
| `inverted` | No | Boolean — white background with blue text (for dark section backgrounds) |

```html
<!-- Default (blue bg) -->
<contact-button text="Entre em Contato" href="/contato"></contact-button>

<!-- Inverted (white bg, for use on dark/gradient sections) -->
<contact-button text="WhatsApp" href="https://wa.me/..." inverted></contact-button>

<script type="module" src="../src/components/ContactButton.ts"></script>
```

---

## SectionTag

**File:** `src/components/SectionTag.ts`
**Tag:** `<section-tag>`
**Use for:** Small label above section headings to categorize or introduce a section.

| Attribute | Required | Description |
|-----------|----------|-------------|
| `text` | Yes | Label text |
| `icon` | No | Font Awesome class, e.g. `fa-solid fa-gear` |

```html
<section-tag text="Nossos Diferenciais" icon="fa-solid fa-star"></section-tag>
<h2>Por que escolher a Aquatronic?</h2>

<script type="module" src="../src/components/SectionTag.ts"></script>
```

No Shadow DOM. Styled with uppercase, letter-spacing. Uses `--clr-primary-500`.

---

## StatBadge

**File:** `src/components/StatBadge.ts`
**Tag:** `<stat-badge>`
**Use for:** Displaying key metrics or statistics (e.g., "500+ Projetos").

| Attribute | Required | Description |
|-----------|----------|-------------|
| `value` | Yes | The number/metric, e.g. `500+` |
| `label` | Yes | Description, e.g. `Projetos Entregues` |

```html
<stat-badge value="500+" label="Projetos Entregues"></stat-badge>
<stat-badge value="20+" label="Anos de Experiência"></stat-badge>

<script type="module" src="../src/components/StatBadge.ts"></script>
```

No Shadow DOM. Used in stats/numbers sections.

---

---

## CtaBanner

**File:** `src/components/CtaBanner.ts`
**Tag:** `<cta-banner>`
**Use for:** Full-width CTA section at the bottom of pages. Renders a gradient background (`--gradient-brand`), left-aligned text, two pill buttons, and concentric decorative circles anchored to the right edge.

| Attribute | Required | Default | Description |
|-----------|----------|---------|-------------|
| `heading` | Yes | — | Section heading text |
| `description` | Yes | — | Paragraph below the heading |
| `primary-text` | No | `Falar com um especialista` | First button label |
| `primary-href` | No | `/contato` | First button URL (contact page) |
| `secondary-text` | No | `Conhecer produtos` | Second button label |
| `secondary-href` | No | `/produtos` | Second button URL (products page) |

```html
<cta-banner
    heading="Tecnologia certa para o seu projeto de tratamento de água"
    description="Fale com nossos especialistas e descubra como a tecnologia Aquatronic pode transformar a eficiência, segurança e sustentabilidade do seu sistema."
    primary-text="Falar com um especialista"
    primary-href="/contato"
    secondary-text="Conhecer produtos"
    secondary-href="/produtos">
</cta-banner>

<script type="module" src="/src/components/CtaBanner.ts"></script>
```

Uses Shadow DOM. Handles its own padding, layout, circle decoration, and responsive behavior — no extra CSS needed on the page.

---

## Decision Guide: Which Button to Use?

| Situation | Component |
|-----------|-----------|
| Primary hero or section CTA | `<special-button variant="primary">` |
| Secondary action, less prominent | `<special-button variant="outline">` or `<site-button>` |
| Navigation-style pill button | `<site-button>` |
| Contact / WhatsApp link | `<contact-button>` |
| Inverted CTA on dark background | `<contact-button inverted>` |
