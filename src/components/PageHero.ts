export class PageHero extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    if (!this.shadowRoot) return;

    // Get attributes for dynamic content
    const title = this.getAttribute('title') || 'Título da Página';
    const subtitle = this.getAttribute('subtitle') || '';

    this.shadowRoot.innerHTML = `
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
      <link rel="stylesheet" href="/src/styles/global.css">
      <style>
        .about-hero {
          align-content: center;
          background-color: var(--clr-primary-800);
          background-image: url('/images/img-hero-pages.png');
          background-position: bottom;
          background-size: cover;
          position: relative;
          text-align: center;
          color: var(--clr-white);
          height: 40vh;
        }

        .about-hero::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: var(--clr-primary-600);
          opacity: 0.63;
          z-index: 1;
        }

        .hero-header-content {
          position: relative;
          max-width: 900px;
          margin: 0 auto;
          text-align: center;
          z-index: 2;
        }

        .main-title {
          font-size: clamp(2.5rem, 5vw, 3.5rem);
          font-weight: 700;
          color: var(--clr-white);
          line-height: 1.1;
          margin-bottom: 24px;
          font-family: var(--ff-primary);
        }

        .subtitle {
          font-size: 1.125rem;
          line-height: 1.6;
          margin-bottom: 40px;
          max-width: 100%;
          margin-left: auto;
          margin-right: auto;
        }

        @media (max-width: 768px) {
          .about-hero {
            padding: 80px 20px 60px;
          }

          .main-title {
            font-size: 2rem;
          }

          .subtitle {
            font-size: 1rem;
          }
        }
      </style>

      <section class="about-hero">
        <div class="hero-header-content">

          <h1 class="main-title">${title}</h1>
          ${subtitle ? `<p class="subtitle">${subtitle}</p>` : ''}

        </div>
    </section>
    `;
  }
}

customElements.define('page-hero', PageHero);
