export class SiteFooter extends HTMLElement {
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
      <style>
        @import url('/src/styles/global.css');
        
        :host {
          display: block;
          width: 100%;
          background: var(--gradient-brand);
          color: var(--clr-white);
          padding: 80px 0 40px;
          margin-top: 40px;
          font-family: var(--ff-primary);
          position: relative;
          overflow: hidden;
        }

        /* Abstract texture overlay simulation */
        :host::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background-image: url('/images/img-footer.png');
          background-size: cover;
          background-position: center;
          opacity: 0.15;
          pointer-events: none;
        }

        .footer-container {
          max-width: var(--container-width);
          margin: 5rem auto 0;
          padding: 0 40px;
          position: relative;
          z-index: 1;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 2.2fr 1.1fr 1.1fr 1.1fr;
          gap: 30px;
          align-items: start;
          margin-bottom: 40px;
        }

        .footer-info img {
          height: 50px;
          margin-bottom: 25px;
        }

        .footer-info p {
          font-size: 0.875rem;
          line-height: 1.6;
          max-width: 400px;
          opacity: 0.9;
        }

        .footer-column h6 {
          font-size: 1.125rem;
          font-weight: 600;
          margin-top: 0;
          margin-bottom: 25px;
          color: var(--clr-white);
        }

        .footer-column ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .footer-column li {
          margin-bottom: 12px;
        }

        .footer-column a {
          color: var(--clr-white);
          text-decoration: none;
          font-size: 0.875rem;
          display: block;
          overflow-wrap: break-word;
          word-break: break-word;
        }

        /* Bottom Bar */
        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 40px 0;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          font-size: 0.875rem;
          opacity: 0.9;
        }

        @media (max-width: 768px) {
          :host {
            padding: 40px 0;
          }
          
          .footer-container {
            margin-top: 4rem;
            padding: 0 20px;
          }

          .footer-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 30px 20px;
            text-align: left;
            align-items: start;
            width: 100%;
          }

          .footer-info {
            grid-column: 1 / -1;
            margin-bottom: 10px;
          }

          .contact-col {
            grid-column: 1 / -1;
          }

          .footer-info img {
            margin-bottom: 0;
          }

          .footer-info p {
            max-width: 100%;
          }

          .footer-column h6 {
            margin-bottom: 15px;
            font-size: 1rem;
          }
          
          .footer-bottom {
            flex-direction: column-reverse;
            gap: 15px;
            text-align: center;
            align-items: center;
            padding: 30px 0;
          }
        }
      </style>
      <footer>
        <div class="footer-container">
          <!-- Main Link Columns -->
          <div class="footer-grid">
            <div class="footer-info">
              <img src="/src/assets/images/logo-aquatronic-branco.png" alt="Aquatronic Logo">
              <p>Soluções completas em tratamento e desinfecção de água por eletrólise, unindo tecnologia, engenharia aplicada e sustentabilidade para garantir água segura em todo o Brasil.</p>
            </div>

            <div class="footer-column nav-col">
              <h6>Navegação</h6>
              <ul>
                <li><a href="/">Início</a></li>
                <li><a href="/tecnologia">Sobre a Aquatronic</a></li>
                <li><a href="/tecnologia">Tecnologia</a></li>
                <li><a href="/produtos">Produtos</a></li>
                <li><a href="/aplicacoes">Aplicações</a></li>
                <li><a href="/simulacao">Simulações de Cloro</a></li>
                <li><a href="/clientes">Clientes</a></li>
                <li><a href="/contato">Contato</a></li>
              </ul>
            </div>

            <div class="footer-column">
              <h6>Links rápidos</h6>
              <ul>
                <li><a href="/geradores">Geradores de Cloro por Eletrólise</a></li>
                <li><a href="/simulacao">Simulação de Geradores</a></li>
                <li><a href="/diferenciais">Diferenciais Aquatronic</a></li>
                <li><a href="/clientes">Clientes & Projetos</a></li>
                <li><a href="/carreiras">Trabalhe Conosco</a></li>
              </ul>
            </div>

            <div class="footer-column contact-col">
              <h6>Contato</h6>
              <ul>
                <li><a href="#">(54) 12345-1234</a></li>
                <li><a href="mailto:contato@aquatronic.com.br">contato@aquatronic.com.br</a></li>
                <li><a href="">Matriz: Passo Fundo – RS<br>Filial: Fortaleza – CE</a></li>
              </ul>
            </div>
          </div>

          <!-- Bottom Bar -->
          <div class="footer-bottom">
            <div class="developer">Desenvolvido por Grupo Anbar</div>
            <div class="copyright">© Aquatronic Brasil — Todos os direitos reservados</div>
          </div>
        </div>
      </footer>
    `;
  }
}

customElements.define('site-footer', SiteFooter);
