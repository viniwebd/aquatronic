export class SiteHeader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    if (!this.shadowRoot) return;
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
      <style>
        @import url('/src/styles/global.css');
        
        :host {
          display: block;
          width: 100%;
          background-color: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          position: sticky;
          top: 0;
          z-index: 1000;
          box-shadow: 0 4px 20px rgba(0,0,0,0.03);
          font-family: var(--ff-primary);
          transition: background-color 0.3s ease, backdrop-filter 0.3s ease;
        }

        :host(.header-solid) {
          background-color: var(--clr-primary-500);
          backdrop-filter: none;
          -webkit-backdrop-filter: none;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        }

        .header-container {
          max-width: var(--container-width);
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 20px;
          position: relative;
        }

        .logo img {
          height: 35px;
          width: auto;
          display: block;
        }

        .logo img.logo-white { display: none; }

        :host(.header-solid) .logo img.logo-blue { display: none; }
        :host(.header-solid) .logo img.logo-white { display: block; }

        /* Desktop Nav */
        @media (min-width: 1025px) {
          nav {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            height: 100%;
            display: flex;
            align-items: center;
          }
        }

        nav ul {
          display: flex;
          gap: 30px;
          list-style: none;
          margin: 0;
          padding: 0;
          align-items: center;
          height: 100%;
        }

        nav li {
          position: relative;
          height: 100%;
          display: flex;
          align-items: center;
        }

        nav li .fas .fa-chevron-down {
          color: var(--clr-white);
        }

        nav a {
          text-decoration: none;
          color: var(--clr-white);
          font-weight: 500;
          font-size: 0.95rem;
          transition: color 0.3s ease;
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 10px 0;
        }

        nav a:hover, nav li:hover > a {
          color: var(--clr-primary-400);
        }

        :host(.header-solid) nav a:hover,
        :host(.header-solid) nav li:hover > a {
          color: var(--clr-black);
        }

        nav a i {
          font-size: 0.8rem;
          color: var(--clr-neutral-400);
          transition: transform 0.3s;
        }

        nav li:hover > a i {
          transform: rotate(180deg);
          color: var(--clr-primary-400);
        }

        :host(.header-solid) nav li:hover > a i {
          color: var(--clr-black);
        }

        .dropdown {
          position: absolute;
          top: 100%;
          left: 50%;
          height: auto;
          transform: translateX(-50%) translateY(10px);
          background: var(--clr-white);
          border-radius: 12px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.1);
          padding: 10px;
          min-width: 180px;
          display: flex;
          flex-direction: column;
          gap: 5px;
          opacity: 0;
          visibility: hidden;
          transition: all 0.2s ease;
          border: 1px solid rgba(0, 128, 192, 0.2);
        }

        nav li:hover .dropdown {
          opacity: 1;
          visibility: visible;
          transform: translateX(-50%) translateY(0);
        }

        /* Dropdown Items */
        .dropdown li {
          display: block;
          height: auto;
          width: 100%;
        }

        .dropdown a {
          padding: 8px 15px;
          border-radius: 8px;
          white-space: nowrap;
          color: var(--clr-neutral-700);
          width: 100%;
          box-sizing: border-box;
          display: block;
          font-size: 0.9rem;
        }

        .dropdown a:hover {
          background-color: var(--clr-primary-100);
          color: var(--clr-primary-400);
        }

        /* Nested menu items styles */
        .dropdown-subtitle {
          font-size: 0.75rem;
          text-transform: uppercase;
          color: var(--clr-neutral-400);
          font-weight: 600;
          letter-spacing: 0.5px;
          margin: 10px 15px 5px;
          display: block;
        }

        .nested-item {
          padding-left: 25px !important;
          font-size: 0.85rem !important;
          color: var(--clr-neutral-500) !important;
        }

        /* Actions */
        .actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .btn-contato {
          background: var(--clr-primary-500);
          color: var(--clr-white);
          padding: 8px 24px;
          border-radius: 9999px;
          font-weight: 600;
          font-size: 0.95rem;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .btn-contato:hover {
          background: var(--clr-primary-400);
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0, 128, 192, 0.3);
        }

        :host(.header-solid) .btn-contato {
          background: var(--clr-white);
          color: var(--clr-primary-500);
        }

        :host(.header-solid) .btn-contato:hover {
          background: #e9f4ff;
          box-shadow: 0 5px 15px rgba(255, 255, 255, 0.2);
        }

        /* Hamburger */
        .hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          cursor: pointer;
          background: transparent;
          border: none;
          padding: 5px;
          z-index: 1001;
        }

        .hamburger span {
          width: 25px;
          height: 3px;
          background-color: var(--clr-white);
          border-radius: 2px;
          transition: all 0.3s ease;
        }

        .hamburger.active span:nth-child(1) { transform: translateY(8px) rotate(45deg); }
        .hamburger.active span:nth-child(2) { opacity: 0; }
        .hamburger.active span:nth-child(3) { transform: translateY(-8px) rotate(-45deg); }

        /* Mobile Nav */
        .mobile-nav {
          position: fixed;
          top: 75px;
          left: 0;
          width: 100%;
          background: var(--clr-white);
          box-shadow: 0 10px 20px rgba(0,0,0,0.05);
          padding: 0;
          display: flex;
          flex-direction: column;
          z-index: 998;
          max-height: 0;
          overflow-y: auto;
          transition: all 0.3s ease;
          opacity: 0;
          visibility: hidden;
          border-top: 1px solid #eee;
        }

        .mobile-nav.active {
          max-height: 80vh;
          opacity: 1;
          visibility: visible;
        }

        .mobile-group {
          border-bottom: 1px solid #f0f0f0;
        }

        .mobile-link {
          display: block;
          padding: 15px 25px;
          text-decoration: none;
          color: var(--clr-black);
          font-weight: 500;
          font-size: 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .mobile-link i {
          font-size: 0.8rem;
          transition: transform 0.3s ease;
        }

        .mobile-link.active i {
          transform: rotate(180deg);
        }

        .mobile-content {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease;
        }

        .mobile-content.active {
          max-height: 500px;
        }

        .mobile-sublink {
          display: block;
          padding: 12px 25px 12px 40px;
          text-decoration: none;
          color: var(--clr-neutral-700);
          font-size: 0.95rem;
          border-top: 1px solid #f9f9f9;
        }

        .mobile-nested {
            padding-left: 55px;
            color: var(--clr-neutral-500);
            font-size: 0.9rem;
        }

        @media (max-width: 1024px) {
          nav { display: none; }
          .hamburger { display: flex; }
          .actions .btn-contato { display: none; }
        }
      </style>
      
      <header>
        <div class="header-container">
          <div class="logo">
            <a href="/">
              <img src="/images/logo-aquatronic-auzl.png" alt="Aquatronic Logo" class="logo-blue">
              <img src="/images/logo-aquatronic-branco.png" alt="Aquatronic Logo" class="logo-white">
            </a>
          </div>
          
          <!-- Desktop Nav -->
          <nav>
            <ul>
              <li><a href="/">Início</a></li>
              
              <!-- Empresa Dropdown -->
              <li>
                <a href="#">Empresa <i class="fas fa-chevron-down"></i></a>
                <ul class="dropdown">
                  <li><a href="/sobre-nos">Sobre a Aquatronic</a></li>
                  <li><a href="/tecnologia">Tecnologia</a></li>
                  <li><a href="/servicos">Serviços</a></li>
                </ul>
              </li>

              <!-- Soluções Dropdown -->
              <li>
                <a href="#">Soluções <i class="fas fa-chevron-down"></i></a>
                <ul class="dropdown">
                  <li><a href="/produtos" style="font-weight:600;">Produtos</a></li>
                  <li><a href="/produtos#aquastart" class="nested-item">AquaStart</a></li>
                  <li><a href="/produtos#aquacore" class="nested-item">AquaCore</a></li>
                  <li><a href="/produtos#aquamax" class="nested-item">AquaMax</a></li>
                  <div style="height:1px; background:#eee; margin:5px 0;"></div>
                  <li><a href="/aplicacoes">Aplicações</a></li>
                  <li><a href="/contato">Simulação de Cloro</a></li>
                </ul>
              </li>

              <li><a href="/clientes-e-cases">Clientes</a></li>
              <li><a href="/contato">Contato</a></li>
            </ul>
          </nav>

          <div class="actions">
            <a href="/contato" class="btn-contato">Contato</a>
            <button class="hamburger" id="hamburger-toggle">
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>

        <!-- Mobile Nav (Flattened/Accordion simplified) -->
        <div class="mobile-nav" id="mobile-menu">
            <a href="/" class="mobile-link">Início</a>
            
            <div class="mobile-group">
                <div class="mobile-link" data-accordion="empresa">
                  Empresa
                  <i class="fas fa-chevron-down"></i>
                </div>
                <div class="mobile-content" id="empresa-content">
                  <a href="/sobre-nos" class="mobile-sublink">Sobre a Aquatronic</a>
                  <a href="/tecnologia" class="mobile-sublink">Tecnologia</a>
                  <a href="/servicos" class="mobile-sublink">Serviços</a>
                </div>
            </div>

            <div class="mobile-group">
                <div class="mobile-link" data-accordion="solucoes">
                  Soluções
                  <i class="fas fa-chevron-down"></i>
                </div>
                <div class="mobile-content" id="solucoes-content">
                  <a href="/produtos" class="mobile-sublink" style="font-weight:600">Produtos</a>
                  <a href="/produtos#aquastart" class="mobile-sublink mobile-nested">AquaStart</a>
                  <a href="/produtos#aquacore" class="mobile-sublink mobile-nested">AquaCore</a>
                  <a href="/produtos#aquamax" class="mobile-sublink mobile-nested">AquaMax</a>
                  <a href="/aplicacoes" class="mobile-sublink">Aplicações</a>
                  <a href="/contato" class="mobile-sublink">Simulação de Cloro</a>
                </div>
            </div>

            <a href="/clientes-e-cases" class="mobile-link">Clientes</a>
            <a href="/contato" class="mobile-link">Contato</a>
        </div>
      </header>
    `;

    const toggle = this.shadowRoot.getElementById('hamburger-toggle');
    const menu = this.shadowRoot.getElementById('mobile-menu');

    if (toggle && menu) {
      const toggleMenu = () => {
        const isActive = menu.classList.toggle('active');
        toggle.classList.toggle('active', isActive);
      };

      const closeMenu = () => {
        menu.classList.remove('active');
        toggle.classList.remove('active');
      };

      toggle.addEventListener('click', toggleMenu);

      menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
      });

      // Accordion functionality
      const accordionHeaders = this.shadowRoot.querySelectorAll('[data-accordion]');
      accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
          const targetId = header.getAttribute('data-accordion') + '-content';
          const content = this.shadowRoot?.getElementById(targetId);
          
          if (content) {
            const isActive = content.classList.toggle('active');
            header.classList.toggle('active', isActive);
          }
        });
      });
    }

    // Header background logic
    const isHomePage = window.location.pathname === '/' || window.location.pathname === '/index.html';

    if (isHomePage) {
      const onScroll = () => {
        if (window.scrollY > 100) {
          this.classList.add('header-solid');
        } else {
          this.classList.remove('header-solid');
        }
      };
      window.addEventListener('scroll', onScroll);
      onScroll();
    } else {
      this.classList.add('header-solid');
    }
  }
}

customElements.define('site-header', SiteHeader);
