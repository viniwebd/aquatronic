# Auditoria de Consistência — Aquatronic
> Gerado em 2026-02-24 · Base: `design-system/index.html` v1.0

---

## Índice

1. [Mapa de Tokens](#1-mapa-de-tokens)
2. [Tokens Legados em Uso](#2-tokens-legados-em-uso)
3. [Cores Hardcoded em CSS](#3-cores-hardcoded-em-css)
4. [Cores Hardcoded em Componentes TS](#4-cores-hardcoded-em-componentes-ts)
5. [Imagens Externas Sem Fallback](#5-imagens-externas-sem-fallback)
6. [Web Components por Página](#6-web-components-por-página)
7. [Outros Erros e Inconsistências](#7-outros-erros-e-inconsistências)
8. [Prioridades](#8-prioridades)

---

## 1. Mapa de Tokens

### Tokens novos (canônicos) — `global.css`

| Token | Valor |
|-------|-------|
| `--clr-primary-100` | `#c7edff` |
| `--clr-primary-200` | `#8dd8ff` |
| `--clr-primary-300` | `#4dbef0` |
| `--clr-primary-400` | `#00a0e3` |
| `--clr-primary-500` | `#0080c0` |
| `--clr-primary-600` | `#006ba3` |
| `--clr-primary-700` | `#114973` |
| `--clr-primary-800` | `#0c3455` |
| `--clr-primary-900` | `#071e35` |
| `--clr-neutral-100` a `900` | Escala de azul-acinzentado |
| `--gradient-brand` | `135deg · primary-700 → primary-400` |
| `--gradient-action` | `135deg · primary-600 → primary-300` |

### Mapeamento: legado → novo

| Token Legado | Valor | Token Novo Equivalente | Observação |
|---|---|---|---|
| `--clr-blue` | `#0181fe` | `--clr-primary-500` (`#0080c0`) | Mais próximo. **30+ ocorrências no site** |
| `--clr-cyan` | `#33d3cd` | `--clr-primary-300` (`#4dbef0`) | Apenas definição, sem uso ativo |
| `--clr-primary` | `#212121` | `--clr-neutral-900` ou `--clr-black` | Texto escuro |
| `--clr-secondary` | `#54595f` | `--clr-neutral-600` (`#3a4f62`) | Texto secundário |
| `--clr-text` | `#7a7a7a` | `--clr-neutral-400` (`#6b8399`) | Texto de suporte |
| `--clr-accent` | `#61ce70` | `--clr-green` (`#22c55e`) | Apenas definição |
| `--clr-baby-blue` | `#e9f4ff` | `--clr-primary-100` (`#c7edff`) | Ícones e bg sutil |
| `--clr-light-grey` | `#f3f3f3` | `--clr-neutral-100` (`#dfe7ef`) | Backgrounds sutis |
| `--clr-text-main` | `#000000` | `--clr-black` | Equivalência exata |
| `--clr-bg-blue-light` | `#009FE31A` | `--clr-primary-100` com opacity | Hover backgrounds |
| `--home-blue-gradient` | alias `--gradient-brand` | `--gradient-brand` | Alias aceitável |
| `--btn-gradient` | alias `--gradient-action` | `--gradient-action` | Alias aceitável |

---

## 2. Tokens Legados em Uso

### `SiteHeader.ts`

| Linha | Seletor | Valor atual | Trocar por |
|---|---|---|---|
| 33 | `:host(.header-solid)` | `var(--clr-blue)` | `var(--clr-primary-500)` |
| 106 | `nav a:hover` | `var(--clr-blue)` | `var(--clr-primary-400)` |
| 123 | `nav li:hover > a i` | `var(--clr-blue)` | `var(--clr-primary-400)` |
| 175 | `.dropdown a:hover` | `var(--clr-blue)` | `var(--clr-primary-400)` |
| 203 | `.btn-contato` | `var(--clr-blue)` | `var(--clr-primary-500)` |
| 221 | `:host(.header-solid) .btn-contato` | `var(--clr-blue)` | `var(--clr-primary-500)` |

### `home.css`

| Linha | Seletor | Valor atual | Trocar por |
|---|---|---|---|
| ~117 | `.btn-special:hover .btn-special-text` | `var(--clr-blue)` | `var(--clr-primary-500)` |
| ~122 | `.btn-special:hover .btn-special-icon` | `var(--clr-blue)` | `var(--clr-primary-500)` |
| ~601 | `.form-field:focus` | `var(--clr-blue)` | `var(--clr-primary-500)` |
| ~710 | `.btn-circle-arrow` | `var(--clr-blue)` | `var(--clr-primary-500)` |

### `products.css`

| Linha | Seletor | Valor atual | Trocar por |
|---|---|---|---|
| ~29 | `.tab-btn` | `var(--clr-blue)` | `var(--clr-primary-500)` |
| ~31 | `.tab-btn` | `var(--clr-blue)` | `var(--clr-primary-500)` |
| ~45 | `.tab-btn.active` | `var(--clr-blue)` | `var(--clr-primary-500)` |
| ~96 | `.detail-col h4` | `var(--clr-blue)` | `var(--clr-primary-500)` |
| ~131 | `.btn-outline` | `var(--clr-blue)` | `var(--clr-primary-500)` |
| ~136 | `.btn-outline:hover` | `var(--clr-blue)` | `var(--clr-primary-500)` |
| ~170 | `.support-list i` | `var(--clr-blue)` | `var(--clr-primary-500)` |

### `technology.css`

| Linha | Seletor | Valor atual | Trocar por |
|---|---|---|---|
| ~88 | `.benefit-list i` | `var(--clr-blue)` | `var(--clr-primary-500)` |
| ~144 | `.tech-card i` | `var(--clr-blue)` | `var(--clr-primary-500)` |

### `services.css`

| Linha | Seletor | Valor atual | Trocar por |
|---|---|---|---|
| ~50 | `.explanation-card .icon-box` | `var(--clr-baby-blue)` | `var(--clr-primary-100)` |
| ~64 | `.explanation-card .icon-box i` | `var(--clr-blue)` | `var(--clr-primary-500)` |
| ~100 | `.btn-outline-white:hover` | `var(--clr-blue)` | `var(--clr-primary-500)` |

### `applications.css`

| Linha | Seletor | Valor atual | Trocar por |
|---|---|---|---|
| ~46 | `.explanation-card .icon-box` | `var(--clr-baby-blue)` | `var(--clr-primary-100)` |
| ~60 | `.explanation-card .icon-box i` | `var(--clr-blue)` | `var(--clr-primary-500)` |
| ~94 | `.btn-outline-white:hover` | `var(--clr-blue)` | `var(--clr-primary-500)` |

### `clients.css`

| Linha | Seletor | Valor atual | Trocar por |
|---|---|---|---|
| ~28 | `.icon-header` | `var(--clr-blue)` | `var(--clr-primary-500)` |
| ~84 | `.results-box h4` | `var(--clr-blue)` | `var(--clr-primary-500)` |
| ~109 | `.check-list li::before` | `var(--clr-blue)` | `var(--clr-primary-500)` |
| ~134 | `.client-logo:hover` | `var(--clr-blue)` | `var(--clr-primary-500)` |
| ~135 | `.client-logo:hover` | `var(--clr-blue)` | `var(--clr-primary-500)` |
| ~141 | `.clients-cta` | `var(--clr-primary)` + `var(--clr-blue)` | `var(--gradient-brand)` |
| ~167 | `.btn-outline-white:hover` | `var(--clr-blue)` | `var(--clr-primary-500)` |

---

## 3. Cores Hardcoded em CSS

### `contact.css` — 🔴 Crítico

| Linha | Seletor | Valor | Trocar por |
|---|---|---|---|
| ~20 | `.section-tag` | `background: #E8F0FE` | `var(--clr-primary-100)` |
| ~20 | `.section-tag` | `color: #0853A0` | `var(--clr-primary-600)` |
| ~51 | `.icon-box` | `background: #E8F0FE` | `var(--clr-primary-100)` |
| ~52 | `.icon-box` | `color: #0853A0` | `var(--clr-primary-600)` |
| ~63 | `.info-item:hover .icon-box` | `background: #0853A0` | `var(--clr-primary-600)` |
| ~124 | `.form-group input:focus` | `border-color: #0853A0` | `var(--clr-primary-600)` |
| ~125 | `.form-group input:focus` | `box-shadow: rgba(8,83,160,0.1)` | Token + `0.1` opacidade |
| **~129** | **`.btn-submit`** | **`background: #00d2d3`** | **`var(--gradient-action)` — cor CYAN sem origem no DS** |
| **~142** | **`.btn-submit:hover`** | **`background: #01b8b9`** | **Idem — cor fora do sistema** |
| ~178 | `.faq-link` | `color: #0853A0` | `var(--clr-primary-600)` |
| ~213 | `.accordion-header i` | `color: #0853A0` | `var(--clr-primary-600)` |

### `home.css`

| Linha | Seletor | Valor | Trocar por |
|---|---|---|---|
| ~213 | `.mission-card-link` | `color: #0853a0` | `var(--clr-primary-700)` |
| ~420 | `.product-card-link` | `color: #0853a0` | `var(--clr-primary-700)` |
| ~722 | `.btn-circle-arrow:hover` | `background: #0066cc` | `var(--clr-primary-600)` |

### `SiteHeader.ts` (estilos internos)

| Linha | Seletor | Valor | Trocar por |
|---|---|---|---|
| ~116 | `nav a i` | `color: #999` | `var(--clr-neutral-400)` |
| ~146 | `.dropdown` | `border: rgba(1,129,254,0.2)` | `rgba` de `--clr-primary-500` |
| ~166 | `.dropdown a` | `color: #444` | `var(--clr-neutral-700)` |
| ~174 | `.dropdown a:hover` | `background: #f5f9ff` | `var(--clr-primary-100)` |
| ~182 | `.dropdown-subtitle` | `color: #999` | `var(--clr-neutral-400)` |
| ~192 | `.nested-item` | `color: #666` | `var(--clr-neutral-500)` |
| ~214 | `.btn-contato:hover` | `background: #2563EB` | `var(--clr-primary-400)` |
| ~318 | `.mobile-sublink` | `color: #444` | `var(--clr-neutral-700)` |
| ~326 | `.mobile-nested` | `color: #666` | `var(--clr-neutral-500)` |

---

## 4. Cores Hardcoded em Componentes TS

### `PageHero.ts`

| Linha | Seletor | Valor | Trocar por |
|---|---|---|---|
| 38 | `.about-hero::before` | `background: #0853A0` | `var(--clr-primary-600)` |

### `SpecialButton.ts`

| Linha | Seletor | Valor | Observação |
|---|---|---|---|
| 134 | `.btn--primary:hover` | `rgba(0, 107, 163, 0.3)` | Shadow — difícil substituir diretamente |
| 143 | `.btn--secondary:hover` | `rgba(58, 79, 98, 0.25)` | Shadow — idem |
| 163 | `.btn--ghost:hover` | `var(--clr-bg-blue-light)` | Token legado aceitável |

### `SiteHeader.ts` — Header Sólido
O estado sólido do header usa `var(--clr-blue)` = `#0181fe`.
O tom equivalente no DS novo é **`--clr-primary-500`** (`#0080c0`).
Esta é a principal inconsistência de cor no componente mais visível do site.

---

## 5. Imagens Externas Sem Fallback

### CSS files (já corrigidos ✓)

| Arquivo | Seção | Fallback atual |
|---|---|---|
| `home.css` | `.hero-section` | `var(--clr-primary-800)` ✓ |
| `home.css` | `.carousel-section` | `var(--clr-neutral-900)` ✓ |
| `home.css` | `.stats-floating` | `var(--clr-primary-800)` ✓ |
| `products.css` | `.products-hero` | `var(--clr-primary-800)` ✓ |
| `services.css` | `.services-hero` | `var(--clr-primary-800)` ✓ |
| `technology.css` | `.tech-hero` | `var(--clr-primary-800)` ✓ |
| `applications.css` | `.applications-hero` | `var(--clr-primary-800)` ✓ |
| `clients.css` | `.clients-hero` | `var(--clr-primary-800)` ✓ |
| `PageHero.ts` | `.about-hero` | `var(--clr-primary-800)` ✓ |

### Inline em HTML — 🔴 Sem fallback

| Arquivo | Linha | Contexto | Fallback necessário |
|---|---|---|---|
| `index.html` | ~107 | `.mission-card-inner` | `var(--clr-primary-800)` |
| `index.html` | ~312 | `.products-grid-overlay` | `var(--clr-neutral-900)` |
| `index.html` | ~427 | `.contact-image-overlay` | `var(--clr-primary-700)` |
| `sobre-nos/index.html` | ~32 | `.vision-card` (imagem 1) | `var(--clr-primary-800)` |
| `sobre-nos/index.html` | ~48 | `.vision-card` (imagem 2) | `var(--clr-neutral-900)` |

---

## 6. Web Components por Página

| Página | `<site-header>` | `<site-footer>` | `<page-hero>` | Status |
|---|---|---|---|---|
| `index.html` | ✓ | ✓ | — (hero próprio) | ✓ |
| `sobre-nos/index.html` | ✓ | ✓ | ✓ | ✓ |
| `contato/index.html` | ✓ | ✓ | — (hero próprio) | ✓ |
| `produtos/index.html` | ✓ | ✓ | ✓ | ✓ |
| `servicos/index.html` | ✓ | ✓ | ✓ | ✓ |
| `tecnologia/index.html` | ✓ | ✓ | ✓ | ✓ |
| `aplicacoes/index.html` | ✓ | ✓ | ✓ | ✓ |
| `clientes-e-cases/index.html` | ✓ | ✓ | ✓ | ✓ |
| `404.html` | ✓ | ✓ | — (esperado) | ✓ |

### Componentes `<site-button>` e `<contact-button>` (novos)

Nenhuma página ainda importa ou usa os novos componentes. Devem ser adicionados conforme necessário nas refatorações futuras.

---

## 7. Outros Erros e Inconsistências

### `!important` em uso

| Arquivo | Linha | Contexto | Necessário? |
|---|---|---|---|
| `SpecialButton.ts` | ~170 | `margin-top: 16px !important` | ⚠️ Pode ser removido |
| `products.css` | ~190 | `.nested-item { padding-left: 25px !important }` | ✓ Override legítimo |
| `home.css` | ~908 | `.contact-header-left { width: 100% !important }` | ⚠️ Pode ser otimizado |

### Z-index inconsistentes

| Componente | Elemento | z-index | Observação |
|---|---|---|---|
| `SiteHeader.ts` | `:host` (header) | `1000` | OK |
| `SiteHeader.ts` | `.hamburger` | `1001` | OK |
| `SiteHeader.ts` | `.mobile-nav` | `998` | OK |
| `home.css` | `.hero-section::before` | `1` | OK |
| `home.css` | `.hero-content-wrapper` | `2` | OK |

Escala funcional mas pode ser normalizada para valores menores (10/20/30).

### Inconsistência de border-radius

O site usa três valores diferentes para pill/arredondado sem padrão claro:
- `border-radius: 100px` — SiteHeader, ContactButton, SpecialButton
- `border-radius: 9999px` — global.css `.btn`, SiteButton
- `border-radius: 99px` — design system DS tags

Recomendação: padronizar como `9999px` (valor semântico para "pill").

### `SiteHeader.ts` — Possível bug de width

| Linha | Código | Problema |
|---|---|---|
| ~277 | `width: 48px` | Provavelmente deveria ser `48%` — investigar |

### `contact.css` — Botão submit com cor CYAN fora do DS

O `.btn-submit` usa `#00d2d3` (cyan turquesa) que **não existe em nenhum token** do design system atual. O token `--clr-cyan: #33d3cd` existia no legado mas foi descontinuado. Este botão precisa ser atualizado para `var(--gradient-action)` ou `var(--clr-primary-500)`.

### Gradiente legado ainda no footer

`SiteFooter.ts` usa `var(--home-blue-gradient)` que é um alias de `--gradient-brand`. Funciona corretamente mas deveria migrar para `var(--gradient-brand)` para consistência com o DS.

---

## 8. Prioridades

### 🔴 Fase 1 — Crítico

- [x] `SiteHeader.ts` — substituir `var(--clr-blue)` por `var(--clr-primary-500)` (6 ocorrências)
- [x] `SiteHeader.ts` — substituir hardcoded `#2563EB` por `var(--clr-primary-400)` no hover
- [x] `contact.css` — substituir `#00d2d3` / `#01b8b9` no `.btn-submit` (CYAN → `var(--gradient-action)`)
- [x] `contact.css` — substituir 7+ ocorrências de `#0853A0` / `#E8F0FE` por tokens
- [x] `index.html` + `sobre-nos/index.html` — adicionar `background-color` com token nas 5 imagens externas inline

### 🟡 Fase 2 — Moderado

- [x] Todos os CSS de página — substituir `var(--clr-blue)` por `var(--clr-primary-500)` (30+ ocorrências)
- [x] `services.css`, `applications.css` — substituir `var(--clr-baby-blue)` por `var(--clr-primary-100)`
- [x] `clients.css` — substituir gradiente legado `--clr-primary` + `--clr-blue` por `var(--gradient-brand)`
- [x] `SiteHeader.ts` — substituir hardcoded `#999`, `#444`, `#666`, `#f5f9ff` por tokens neutros
- [x] `PageHero.ts` — substituir `#0853A0` no `::before` por `var(--clr-primary-600)`
- [x] `home.css` — substituir 3 ocorrências de `#0853a0` / `#0066cc` por tokens

### 🟢 Fase 3 — Otimização

- [x] `SiteFooter.ts` — migrar `var(--home-blue-gradient)` para `var(--gradient-brand)`
- [x] Normalizar `border-radius` para `9999px` em pill shapes (SiteHeader, home.css, contact.css)
- [ ] Normalizar z-index scale para valores menores (funcional, baixa prioridade)
- [x] Remover `!important` desnecessário em `SpecialButton.ts` (`margin-top`)
- [x] Corrigido `width: 48px` → `48%` em `home.css` linha 277 (`.tech-header-right`) — typo confirmado

---

*Auditoria realizada sobre o estado atual do repositório. `~` indica linha aproximada — confirmar no editor.*
