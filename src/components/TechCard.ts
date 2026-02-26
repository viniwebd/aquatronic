export class TechCard extends HTMLElement {
  static get observedAttributes() {
    return ['icon', 'title', 'description'];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const icon = this.getAttribute('icon') || '';
    const title = this.getAttribute('title') || '';
    const description = this.getAttribute('description') || '';

    this.innerHTML = `
      <article class="tech-card" role="listitem">
        ${icon ? `<div class="card-icon" aria-hidden="true"><i class="${icon}"></i></div>` : ''}
        <h3>${title}</h3>
        ${description ? `<p>${description}</p>` : ''}
      </article>
    `;
  }
}

customElements.define('tech-card', TechCard);
