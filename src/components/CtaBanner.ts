export class CtaBanner extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['heading', 'description', 'primary-text', 'primary-href', 'secondary-text', 'secondary-href'];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    if (!this.shadowRoot) return;

    const heading     = this.getAttribute('heading')        || 'Fale com a Aquatronic';
    const description = this.getAttribute('description')    || '';
    const primaryText = this.getAttribute('primary-text')   || 'Falar com um especialista';
    const primaryHref = this.getAttribute('primary-href')   || '/contato';
    const secondaryText = this.getAttribute('secondary-text') || 'Conhecer produtos';
    const secondaryHref = this.getAttribute('secondary-href') || '/produtos';

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          background: var(--gradient-brand);
          overflow: hidden;
          position: relative;
        }

        .cta-inner {
          max-width: 1300px;
          margin: 0 auto;
          padding: 100px 20px;
          position: relative;
        }

        .cta-content {
          max-width: 600px;
          text-align: left;
        }

        h2 {
          font-family: var(--ff-primary);
          font-size: clamp(1.75rem, 3vw, 2.75rem);
          font-weight: 700;
          color: #fff;
          line-height: 1.15;
          margin: 0 0 16px;
        }

        p {
          font-family: var(--ff-primary);
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.75);
          line-height: 1.65;
          margin: 0 0 36px;
        }

        .cta-actions {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
          align-items: center;
        }

        a {
          display: inline-flex;
          align-items: center;
          padding: 14px 28px;
          border-radius: 100px;
          font-family: var(--ff-primary);
          font-size: 0.95rem;
          font-weight: 600;
          text-decoration: none;
          transition: background 0.2s ease, transform 0.2s ease;
        }

        a:focus-visible {
          outline: 2px solid #fff;
          outline-offset: 3px;
        }

        .btn-primary {
          background: #fff;
          color: var(--clr-primary-500);
        }

        .btn-primary:hover {
          background: var(--clr-primary-100);
          transform: translateY(-2px);
        }

        .btn-ghost {
          background: rgba(0, 0, 0, 0.25);
          color: #fff;
        }

        .btn-ghost:hover {
          background: rgba(0, 0, 0, 0.38);
        }

        /* Círculos concêntricos decorativos */
        .cta-decoration {
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 0;
          height: 0;
          pointer-events: none;
        }

        .cta-circle {
          position: absolute;
          border-radius: 50%;
          top: 0;
          left: 0;
          transform: translate(-50%, -50%);
          border: 1.5px solid rgba(255, 255, 255, 0.18);
        }

        .cta-circle:nth-child(1) {
          width: 72px;
          height: 72px;
          background: rgba(255, 255, 255, 0.15);
          border: none;
        }

        .cta-circle:nth-child(2) { width: 160px; height: 160px; }
        .cta-circle:nth-child(3) { width: 280px; height: 280px; }
        .cta-circle:nth-child(4) { width: 420px; height: 420px; }
        .cta-circle:nth-child(5) { width: 560px; height: 560px; }

        @media (max-width: 768px) {
          .cta-inner {
            padding: 60px 20px;
          }

          .cta-content {
            max-width: 100%;
          }
        }
      </style>

      <div class="cta-inner">
        <div class="cta-content">
          <h2>${heading}</h2>
          <p>${description}</p>
          <div class="cta-actions">
            <a class="btn-primary" href="${primaryHref}">${primaryText}</a>
            <a class="btn-ghost"   href="${secondaryHref}">${secondaryText}</a>
          </div>
        </div>
        <div class="cta-decoration" aria-hidden="true">
          <span class="cta-circle"></span>
          <span class="cta-circle"></span>
          <span class="cta-circle"></span>
          <span class="cta-circle"></span>
          <span class="cta-circle"></span>
        </div>
      </div>
    `;
  }
}

customElements.define('cta-banner', CtaBanner);
