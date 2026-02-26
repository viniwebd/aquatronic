export class ImageCard extends HTMLElement {
  static get observedAttributes() {
    return ['image', 'alt', 'title', 'description', 'href', 'link-text'];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const image = this.getAttribute('image') || '';
    const alt = this.getAttribute('alt') || '';
    const title = this.getAttribute('title') || '';
    const description = this.getAttribute('description') || '';
    const href = this.getAttribute('href') || '#';
    const linkText = this.getAttribute('link-text') || '';

    this.innerHTML = `
      <div class="image-card">
        <div class="image-card__image">
          ${image
            ? `<img src="${image}" alt="${alt}" loading="lazy" />`
            : '<div class="image-card__placeholder"></div>'
          }
        </div>
        <div class="image-card__body">
          <h3 class="image-card__title">${title}</h3>
          <p class="image-card__desc">${description}</p>
          ${linkText ? `<a href="${href}" class="image-card__link">${linkText} <i class="fas fa-chevron-right"></i></a>` : ''}
        </div>
      </div>
    `;
  }
}

customElements.define('image-card', ImageCard);
