export class SectionTag extends HTMLElement {
  static get observedAttributes() {
    return ['text', 'icon'];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const text = this.getAttribute('text') || '';
    const icon = this.getAttribute('icon') || '';

    this.innerHTML = `
      <div class="section-tag">
        ${icon ? `<i class="${icon}"></i>` : ''}
        <span>${text}</span>
      </div>
    `;
  }
}

customElements.define('section-tag', SectionTag);
