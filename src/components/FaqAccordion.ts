import './SectionTag';

const ITEMS = [
  {
    q: 'Como funciona a eletrólise salina?',
    a: 'A eletrólise salina converte água e sal comum em cloro no próprio local de uso. O processo elimina o transporte e manuseio de produtos químicos concentrados, garantindo desinfecção contínua, segura e econômica.',
  },
  {
    q: 'Quais são as vantagens em relação ao cloro convencional?',
    a: 'Eliminação de riscos logísticos com cloro líquido ou gasoso, redução de custos operacionais a médio prazo, menor impacto ambiental, geração contínua no ponto de uso e menor variação de concentração.',
  },
  {
    q: 'O sistema é seguro para piscinas, spas e parques aquáticos?',
    a: 'Sim. A eletrólise salina é uma das tecnologias mais recomendadas para esses ambientes, pois mantém a concentração de cloro estável, reduz irritação na pele e nos olhos e elimina a necessidade de armazenar cloro no local.',
  },
  {
    q: 'A tecnologia atende projetos de grande porte como ETAs?',
    a: 'Sim. Os sistemas Aquatronic são dimensionáveis e já operam em estações de tratamento de água, sistemas de saneamento e projetos industriais de alto volume. Cada solução é projetada conforme a demanda.',
  },
  {
    q: 'Qual é a vida útil dos equipamentos?',
    a: 'Os geradores de cloro Aquatronic são projetados para operação contínua e possuem vida útil superior a 10 anos com manutenção adequada. As células eletrolíticas têm ciclos de substituição definidos conforme o modelo e o uso.',
  },
  {
    q: 'Os equipamentos necessitam de manutenção periódica?',
    a: 'Sim. Oferecemos planos de manutenção preventiva e corretiva com periodicidade definida em contrato. A manutenção regular garante máxima eficiência, segurança operacional e longevidade dos equipamentos.',
  },
  {
    q: 'É possível locar os equipamentos sem precisar comprá-los?',
    a: 'Sim. Contamos com modalidade de locação de equipamentos, ideal para projetos temporários, obras e demandas sazonais. O modelo inclui instalação, suporte técnico e manutenção durante todo o período.',
  },
  {
    q: 'Como é feito o dimensionamento do sistema?',
    a: 'Nossa equipe de engenharia analisa variáveis como volume de água, vazão, temperatura e tipo de aplicação. Com base nessa análise, indicamos o sistema mais eficiente e econômico para o seu projeto.',
  },
  {
    q: 'Os sistemas são certificados por órgãos regulatórios?',
    a: 'Sim. Nossos equipamentos seguem as normas técnicas da ABNT e estão em conformidade com as exigências da ANVISA e do Ministério da Saúde para uso em sistemas de tratamento de água potável e recreacional.',
  },
  {
    q: 'Como funciona o suporte técnico após a instalação?',
    a: 'Oferecemos suporte técnico presencial e remoto, com equipes treinadas em todo o território nacional. O atendimento pode ser acionado via telefone, e-mail ou portal de suporte, com SLA definido por contrato.',
  },
  {
    q: 'É possível integrar o sistema a automações e CLPs existentes?',
    a: 'Sim. Os sistemas Aquatronic possuem saídas de sinal compatíveis com os principais protocolos industriais (Modbus, 4–20 mA, relé), permitindo integração com CLPs, SCADA e sistemas de automação já instalados.',
  },
  {
    q: 'Qual economia posso esperar ao migrar para a eletrólise?',
    a: 'A economia varia conforme o projeto, mas clientes relatam redução de 30 % a 60 % nos custos com produtos químicos de desinfecção, além de ganhos com segurança operacional, logística e conformidade ambiental.',
  },
  {
    q: 'A Aquatronic atende projetos fora do Rio Grande do Sul?',
    a: 'Sim. Atendemos clientes em todo o Brasil. Possuímos parceiros técnicos credenciados em diversas regiões e nossa equipe realiza visitas técnicas e instalações em qualquer estado mediante agendamento.',
  },
  {
    q: 'Como solicitar uma proposta comercial?',
    a: 'Você pode solicitar uma proposta pelo nosso formulário de contato, por e-mail ou diretamente por telefone. Nossa equipe responde em até 1 dia útil com as informações necessárias para iniciar o projeto.',
  },
];

export class FaqAccordion extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['heading'];
  }

  connectedCallback() {
    this.render();
    this.setupListeners();
    this.injectSchema();
  }

  private injectSchema() {
    // Prevent duplicate schema injections if multiple accordions exist
    if (document.querySelector('#faq-schema')) return;

    const schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": ITEMS.map(item => ({
        "@type": "Question",
        "name": item.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.a
        }
      }))
    };

    const script = document.createElement('script');
    script.id = 'faq-schema';
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema, null, 2);
    document.head.appendChild(script);
  }

  attributeChangedCallback() {
    this.render();
    this.setupListeners();
  }

  private render() {
    if (!this.shadowRoot) return;

    const heading =
      this.getAttribute('heading') || 'Dúvidas frequentes sobre nossas soluções';

    const left = ITEMS.slice(0, 7);
    const right = ITEMS.slice(7, 14);

    const renderItems = (items: typeof ITEMS) =>
      items
        .map(
          ({ q, a }) => `
        <div class="item">
          <button class="item-header" type="button" aria-expanded="false">
            <span>${q}</span>
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>
          <div class="item-body">
            <div class="item-body-inner">
              <p>${a}</p>
            </div>
          </div>
        </div>
      `
        )
        .join('');

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          font-family: var(--ff-primary);
        }

        /* ── Container ── */
        .inner {
          max-width: var(--container-width);
          margin: 0 auto;
          padding: 100px 20px;
        }

        /* ── section-tag: replica o estilo de global.css para o shadow DOM ── */
        .section-tag {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          font-size: var(--fs-small);
          font-weight: var(--fw-bold);
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--clr-primary-500);
          padding: 8px 18px;
          border-radius: 999px;
          margin-bottom: 24px;
        }

        .section-tag::before {
          content: '';
          display: block;
          width: 32px;
          height: 2px;
          background: currentColor;
          flex-shrink: 0;
        }

        /* ── Header ── */
        .faq-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          margin-bottom: 64px;
          gap: 16px;
        }

        h2 {
          font-size: var(--fs-h2);
          font-weight: var(--fw-semibold);
          color: var(--clr-neutral-900);
          line-height: var(--lh-heading);
          letter-spacing: -0.02em;
          max-width: 36ch;
          margin: 0;
        }

        /* ── Grid ── */
        .faq-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0 24px;
          align-items: start;
        }

        .faq-col {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        /* ── Accordion item — card style ── */
        .item {
          background: var(--clr-white);
          border: 1.5px solid var(--clr-neutral-100);
          border-radius: 16px;
          overflow: hidden;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .item:hover {
          border-color: var(--clr-neutral-200);
          box-shadow: 0 4px 16px var(--clr-black-05);
        }

        .item.is-open {
          border-color: var(--clr-primary-200);
          box-shadow: 0 4px 20px rgba(0, 128, 192, 0.08);
        }

        /* ── Header button ── */
        .item-header {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 18px 20px;
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
          font-family: inherit;
          font-size: var(--fs-body);
          font-weight: var(--fw-semibold);
          color: var(--clr-neutral-800);
          transition: color 0.2s ease;
        }

        .item-header:focus-visible {
          outline: 2px solid var(--clr-primary-500);
          outline-offset: -2px;
          border-radius: 14px;
        }

        .item.is-open .item-header {
          color: var(--clr-primary-600);
        }

        /* ── Chevron ── */
        .icon {
          flex-shrink: 0;
          width: 16px;
          height: 16px;
          color: var(--clr-primary-500);
          transition: transform 0.3s ease;
        }

        .item.is-open .icon {
          transform: rotate(180deg);
        }

        /* ── Body: grid-template-rows animation ── */
        .item-body {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.3s ease;
        }

        .item-body-inner {
          overflow: hidden;
        }

        .item-body-inner p {
          font-size: var(--fs-body);
          color: var(--clr-neutral-500);
          line-height: var(--lh-body);
          padding: 0 20px 18px;
          margin: 0;
        }

        .item.is-open .item-body {
          grid-template-rows: 1fr;
        }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .inner {
            padding: 72px 20px;
          }

          .faq-grid {
            grid-template-columns: 1fr;
            gap: 0;
          }

          .faq-col {
            gap: 12px;
          }

          .faq-col + .faq-col {
            margin-top: 12px;
          }

          h2 {
            max-width: 100%;
          }
        }
      </style>

      <div class="inner">
        <div class="faq-header">
          <section-tag text="FAQ"></section-tag>
          <h2>${heading}</h2>
        </div>

        <div class="faq-grid">
          <div class="faq-col">${renderItems(left)}</div>
          <div class="faq-col">${renderItems(right)}</div>
        </div>
      </div>
    `;
  }

  private setupListeners() {
    if (!this.shadowRoot) return;

    this.shadowRoot.querySelectorAll<HTMLButtonElement>('.item-header').forEach((btn) => {
      btn.addEventListener('click', () => {
        const item = btn.closest('.item')!;
        const isOpen = item.classList.contains('is-open');

        // Fecha todos
        this.shadowRoot!.querySelectorAll('.item').forEach((el) => {
          el.classList.remove('is-open');
          el.querySelector('.item-header')!.setAttribute('aria-expanded', 'false');
        });

        // Abre o clicado se estava fechado
        if (!isOpen) {
          item.classList.add('is-open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }
}

customElements.define('faq-accordion', FaqAccordion);
