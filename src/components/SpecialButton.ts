export class SpecialButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['text', 'href', 'icon', 'variant', 'type'];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    if (!this.shadowRoot) return;

    const text = this.getAttribute('text') || '';
    const href = this.getAttribute('href') || '';
    const icon = this.getAttribute('icon') || '';
    const variant = this.getAttribute('variant') || 'primary';
    const type = this.getAttribute('type') || 'button';
    const isLink = !!href;
    const hasIcon = !!icon;

    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
      <style>
        :host {
          display: inline-block;
        }

        /* ── Shared ── */
        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: none;
          outline: none;
          cursor: pointer;
          text-decoration: none;
          font-family: "DM Sans", sans-serif;
          font-weight: 600;
          -webkit-user-select: none;
          user-select: none;
          transition: transform 0.3s ease;
        }

        .btn:active {
          transform: scale(0.95);
        }

        /* ── Icon variant (text + circle) ── */
        .btn--icon {
          background: transparent;
          padding: 0;
          gap: 20px;
        }

        .btn__text {
          position: relative;
          z-index: 2;
          display: block;
          padding: 14px 40px;
          border-radius: 100px;
          background: var(--gradient-action);
          color: var(--clr-white);
          font-size: 1rem;
          white-space: nowrap;
          transition:
            padding 0.5s cubic-bezier(0.23, 1, 0.32, 1),
            margin 0.5s cubic-bezier(0.23, 1, 0.32, 1),
            background 0.3s ease;
        }

        .btn__icon {
          position: relative;
          z-index: 3;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: var(--gradient-action);
          color: var(--clr-white);
          font-size: 0.9rem;
          transition:
            transform 0.5s cubic-bezier(0.23, 1, 0.32, 1),
            background 0.5s cubic-bezier(0.23, 1, 0.32, 1),
            box-shadow 0.3s ease;
        }

        .btn__icon i {
          transition: transform 0.5s cubic-bezier(0.23, 1, 0.32, 1);
        }

        /* Hover: text grows right, negative margin compensates, icon glides in */
        .btn--icon:hover .btn__text {
          padding-right: 80px;
          margin-right: -50px;
          background: var(--clr-primary-700);
        }

        .btn--icon:hover .btn__icon {
          transform: translateX(-35px);
          background: transparent;
          box-shadow: none;
        }

        .btn--icon:hover .btn__icon i {
          transform: rotate(-45deg) scale(1.1);
        }

        /* ── Simple variants (no icon) ── */
        .btn--simple {
          padding: 16px 32px;
          border-radius: 100px;
          font-size: 1rem;
          gap: 8px;
        }

        .btn--primary {
          background: var(--gradient-action);
          color: var(--clr-white);
        }

        .btn--primary:hover {
          box-shadow: 0 8px 24px rgba(0, 107, 163, 0.3);
        }

        .btn--secondary {
          background: var(--clr-neutral-600);
          color: var(--clr-white);
        }

        .btn--secondary:hover {
          box-shadow: 0 8px 24px rgba(58, 79, 98, 0.25);
        }

        .btn--outline {
          background: transparent;
          color: var(--clr-primary-700);
          border: 2px solid var(--clr-primary-700);
        }

        .btn--outline:hover {
          background: var(--clr-primary-700);
          color: var(--clr-white);
        }

        .btn--ghost {
          background: transparent;
          color: var(--clr-text-main);
        }

        .btn--ghost:hover {
          background: var(--clr-bg-blue-light);
        }

        /* ── Responsive ── */
        @media (min-width: 768px) {
          .btn {
          }

          .btn__text {
            padding: 18px 40px;
          }

          .btn__icon {
            width: 58px;
            height: 58px;
          }

          .btn--icon:hover .btn__text {
            padding-right: 90px;
            margin-right: -55px;
          }


          .btn--simple {
            padding: 18px 36px;
            font-size: 1.125rem;
          }
        }
      </style>

      ${this.buildHTML(isLink, hasIcon, text, href, icon, variant, type)}
    `;
  }

  private buildHTML(
    isLink: boolean,
    hasIcon: boolean,
    text: string,
    href: string,
    icon: string,
    variant: string,
    type: string
  ): string {
    const tag = isLink ? 'a' : 'button';
    const hrefAttr = isLink ? `href="${href}"` : '';
    const typeAttr = !isLink ? `type="${type}"` : '';

    if (hasIcon) {
      return `
        <${tag} class="btn btn--icon" ${hrefAttr} ${typeAttr}>
          <span class="btn__text">${text}</span>
          <span class="btn__icon">
            <i class="${icon}"></i>
          </span>
        </${tag}>
      `;
    }

    return `
      <${tag} class="btn btn--simple btn--${variant}" ${hrefAttr} ${typeAttr}>
        ${text}
      </${tag}>
    `;
  }
}

customElements.define('special-button', SpecialButton);
