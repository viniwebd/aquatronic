export class SiteButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['text', 'href'];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    if (!this.shadowRoot) return;

    const text = this.getAttribute('text') || 'Saiba Mais';
    const href = this.getAttribute('href') || '#';

    this.shadowRoot.innerHTML = `
      <style>
        @import url('/src/styles/global.css');

        :host {
          display: inline-block;
        }

        .btn {
          display: inline-block;
          padding: 17px 30px;
          border-radius: 9999px;
          font-family: var(--ff-primary);
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--clr-white);
          background: var(--gradient-action);
          text-decoration: none;
          cursor: pointer;
          border: none;
          text-align: center;
          transition: filter 0.3s ease, transform 0.3s ease;
        }

        .btn:hover {
          filter: brightness(1.1);
          transform: translateY(-2px);
        }

        .btn:active {
          transform: scale(0.97);
        }
      </style>
      <a href="${href}" class="btn">${text}</a>
    `;
  }
}

customElements.define('site-button', SiteButton);
