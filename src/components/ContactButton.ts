export class ContactButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['text', 'href', 'inverted'];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    if (!this.shadowRoot) return;

    const text = this.getAttribute('text') || 'Contato';
    const href = this.getAttribute('href') || '/contato';
    const inverted = this.hasAttribute('inverted');

    this.shadowRoot.innerHTML = `
      <style>
        @import url('/src/styles/global.css');

        :host {
          display: inline-block;
        }

        .btn-contato {
          display: inline-block;
          padding: 8px 24px;
          border-radius: 100px;
          font-family: var(--ff-primary);
          font-size: 0.95rem;
          font-weight: 600;
          text-decoration: none;
          transition: background 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
          background: ${inverted ? 'var(--clr-white)' : 'var(--clr-primary-500)'};
          color: ${inverted ? 'var(--clr-primary-500)' : 'var(--clr-white)'};
        }

        .btn-contato:hover {
          transform: translateY(-2px);
          background: ${inverted ? 'var(--clr-primary-100)' : 'var(--clr-primary-600)'};
          box-shadow: 0 5px 15px rgba(0, 128, 192, 0.3);
        }

        .btn-contato:active {
          transform: scale(0.97);
        }
      </style>
      <a href="${href}" class="btn-contato">${text}</a>
    `;
  }
}

customElements.define('contact-button', ContactButton);
