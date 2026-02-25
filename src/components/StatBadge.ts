export class StatBadge extends HTMLElement {
  static get observedAttributes() {
    return ['value', 'label'];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const value = this.getAttribute('value') || '';
    const label = this.getAttribute('label') || '';

    this.innerHTML = `
      <div class="stat-badge">
        <strong class="stat-badge-value">${value}</strong>
        <span class="stat-badge-label">${label}</span>
      </div>
    `;
  }
}

customElements.define('stat-badge', StatBadge);
