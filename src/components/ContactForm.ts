export class ContactForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.setupListeners();
  }

  private render() {
    if (!this.shadowRoot) return;

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          font-family: var(--ff-primary, "DM Sans", sans-serif);
        }

        /* ── Wrapper ── */
        .form-wrapper {
          background: #f4f9ff;
          padding: 40px;
          border-radius: 24px;
        }


        /* ── Row ── */
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        /* ── Field ── */
        .form-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 20px;
        }

        .form-field.hidden,
        .hidden {
          display: none !important;
        }

        #campos-piscina,
        #campos-eta-ete {
          margin-top: 24px;
        }

        /* ── Label ── */
        label {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--clr-neutral-700, #2c3d4e);
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .required-mark {
          color: var(--clr-red, #ef4444);
          font-size: 0.8rem;
          line-height: 1;
        }

        .label-hint {
          font-size: 0.8rem;
          font-weight: 400;
          color: var(--clr-neutral-300, #96aabb);
          margin-left: auto;
        }

        /* ── Inputs / Select / Textarea ── */
        input,
        select,
        textarea {
          width: 100%;
          padding: 12px 16px;
          border: 1.5px solid var(--clr-neutral-200, #c2d0dc);
          border-radius: 12px;
          font-family: inherit;
          font-size: 0.95rem;
          color: var(--clr-neutral-800, #1e2d3b);
          background: #fff;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
          -webkit-appearance: none;
          appearance: none;
          box-sizing: border-box;
        }

        input::placeholder,
        textarea::placeholder {
          color: var(--clr-neutral-300, #96aabb);
        }

        input:focus,
        select:focus,
        textarea:focus {
          outline: none;
          border-color: var(--clr-primary-500, #0080c0);
          box-shadow: 0 0 0 3px rgba(0, 128, 192, 0.12);
        }

        /* ── Radio buttons ── */
        .radio-group {
          display: flex;
          gap: 20px;
          padding: 8px 0;
        }

        .radio-option {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
        }

        .radio-option input[type="radio"] {
          width: 18px;
          height: 18px;
          cursor: pointer;
          margin: 0;
          -webkit-appearance: radio;
          appearance: auto;
          accent-color: var(--clr-primary-500, #0080c0);
        }

        .radio-option label {
          cursor: pointer;
          margin: 0;
          font-weight: 500;
        }

        /* ── Select arrow ── */
        .select-wrapper {
          position: relative;
        }

        .select-wrapper::after {
          content: '';
          pointer-events: none;
          position: absolute;
          right: 16px;
          top: 50%;
          transform: translateY(-50%);
          width: 10px;
          height: 6px;
          background: var(--clr-neutral-400, #6b8399);
          clip-path: polygon(0 0, 100% 0, 50% 100%);
          transition: background 0.2s ease;
        }

        .select-wrapper:focus-within::after {
          background: var(--clr-primary-500, #0080c0);
        }

        select {
          cursor: pointer;
          padding-right: 40px;
        }

        select:required:invalid {
          color: var(--clr-neutral-300, #96aabb);
        }

        /* ── Autocomplete ── */
        .autocomplete-wrapper {
          position: relative;
        }

        .autocomplete-list {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: #fff;
          border: 1.5px solid var(--clr-neutral-200, #c2d0dc);
          border-top: none;
          border-radius: 0 0 12px 12px;
          max-height: 200px;
          overflow-y: auto;
          z-index: 100;
          display: none;
        }

        .autocomplete-list.visible {
          display: block;
        }

        .autocomplete-item {
          padding: 10px 16px;
          cursor: pointer;
          font-size: 0.95rem;
          color: var(--clr-neutral-700, #2c3d4e);
          transition: background 0.15s ease;
        }

        .autocomplete-item:hover,
        .autocomplete-item.active {
          background: var(--clr-primary-100, #e0f2fe);
        }

        /* ── Error state ── */
        .form-field.has-error input,
        .form-field.has-error select,
        .form-field.has-error textarea {
          border-color: var(--clr-red, #ef4444);
          box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
        }

        .error-msg {
          display: none;
          font-size: 0.8rem;
          color: var(--clr-red, #ef4444);
          font-weight: 500;
          align-items: center;
          gap: 5px;
        }

        .error-msg svg {
          flex-shrink: 0;
        }

        .form-field.has-error .error-msg {
          display: flex;
        }

        /* ── Valid state ── */
        .form-field.is-valid input,
        .form-field.is-valid select {
          border-color: var(--clr-green, #22c55e);
        }

        /* ── Submit button ── */
        .btn-submit {
          width: 100%;
          padding: 15px 32px;
          background: var(--gradient-action, linear-gradient(135deg, #006ba3, #4dbef0));
          color: #fff;
          border: none;
          border-radius: 100px;
          font-family: inherit;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: opacity 0.2s ease, transform 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-top: 8px;
          letter-spacing: 0.01em;
        }

        .btn-submit:hover:not(:disabled) {
          opacity: 0.9;
          transform: translateY(-2px);
        }

        .btn-submit:focus-visible {
          outline: 2px solid var(--clr-primary-500, #0080c0);
          outline-offset: 3px;
        }

        .btn-submit:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        /* ── Spinner ── */
        .spinner {
          display: none;
          width: 18px;
          height: 18px;
          border: 2.5px solid rgba(255, 255, 255, 0.35);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.65s linear infinite;
          flex-shrink: 0;
        }

        .btn-submit.loading .spinner { display: block; }
        .btn-submit.loading .btn-text { display: none; }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* ── Success state ── */
        .form-content {
          display: block;
        }

        .success-message {
          display: none;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 56px 24px;
          gap: 12px;
        }

        .success-message.visible {
          display: flex;
        }

        .form-wrapper.submitted .form-content {
          display: none;
        }

        .success-icon {
          width: 68px;
          height: 68px;
          background: rgba(34, 197, 94, 0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 4px;
        }

        .success-icon svg {
          width: 34px;
          height: 34px;
          color: var(--clr-green, #22c55e);
        }

        .success-message h3 {
          font-size: 1.4rem;
          font-weight: 700;
          color: var(--clr-neutral-800, #1e2d3b);
          margin: 0;
        }

        .success-message p {
          color: var(--clr-neutral-400, #6b8399);
          font-size: 0.95rem;
          margin: 0;
          line-height: 1.6;
        }

        /* ── Responsive ── */
        @media (max-width: 640px) {
          .form-wrapper {
            padding: 24px 20px;
            border-radius: 16px;
          }

          .form-row {
            grid-template-columns: 1fr;
          }

          .radio-group {
            flex-direction: column;
            gap: 12px;
          }
        }
      </style>

      <div class="form-wrapper" role="region" aria-label="Formulário de simulação">

        <div class="form-content">
          <form id="contact-form" novalidate>

            <!-- Nome -->
            <div class="form-field" data-field="nome">
              <label for="cf-nome">
                Nome <span class="required-mark" aria-hidden="true">*</span>
              </label>
              <input
                type="text"
                id="cf-nome"
                name="nome"
                autocomplete="name"
                placeholder="Seu nome completo"
                required
                aria-required="true"
                aria-describedby="err-nome"
              >
              <span class="error-msg" id="err-nome" role="alert">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                Informe seu nome.
              </span>
            </div>

            <!-- Telefone + Email -->
            <div class="form-row">
              <div class="form-field" data-field="telefone">
                <label for="cf-telefone">
                  Telefone <span class="required-mark" aria-hidden="true">*</span>
                </label>
                <input
                  type="tel"
                  id="cf-telefone"
                  name="telefone"
                  autocomplete="tel"
                  placeholder="(11) 99999-9999"
                  maxlength="15"
                  required
                  aria-required="true"
                  aria-describedby="err-telefone"
                >
                <span class="error-msg" id="err-telefone" role="alert">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                  Informe um telefone válido.
                </span>
              </div>

              <div class="form-field" data-field="email">
                <label for="cf-email">
                  E-mail <span class="required-mark" aria-hidden="true">*</span>
                </label>
                <input
                  type="email"
                  id="cf-email"
                  name="email"
                  autocomplete="email"
                  placeholder="seu@email.com"
                  required
                  aria-required="true"
                  aria-describedby="err-email"
                >
                <span class="error-msg" id="err-email" role="alert">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                  Informe um e-mail válido.
                </span>
              </div>
            </div>

            <!-- Estado + Cidade -->
            <div class="form-row">
              <div class="form-field autocomplete-wrapper" data-field="estado">
                <label for="cf-estado">
                  Estado <span class="required-mark" aria-hidden="true">*</span>
                </label>
                <input
                  type="text"
                  id="cf-estado"
                  name="estado"
                  placeholder="Digite seu estado"
                  required
                  aria-required="true"
                  aria-describedby="err-estado"
                  autocomplete="off"
                >
                <div class="autocomplete-list" id="estado-list"></div>
                <span class="error-msg" id="err-estado" role="alert">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                  Informe seu estado.
                </span>
              </div>

              <div class="form-field autocomplete-wrapper" data-field="cidade">
                <label for="cf-cidade">
                  Cidade <span class="required-mark" aria-hidden="true">*</span>
                </label>
                <input
                  type="text"
                  id="cf-cidade"
                  name="cidade"
                  placeholder="Primeiro selecione um estado"
                  required
                  aria-required="true"
                  aria-describedby="err-cidade"
                  autocomplete="off"
                  disabled
                >
                <div class="autocomplete-list" id="cidade-list"></div>
                <span class="error-msg" id="err-cidade" role="alert">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                  Informe sua cidade.
                </span>
              </div>
            </div>

            <div class="form-field" data-field="tipoServico">
              <label for="cf-tipoServico">
                Tipo de Serviço <span class="required-mark" aria-hidden="true">*</span>
              </label>
              <div class="select-wrapper">
                <select
                  id="cf-tipoServico"
                  name="tipoServico"
                  required
                  aria-required="true"
                  aria-describedby="err-tipoServico"
                >
                  <option value="" disabled selected hidden>Selecione o tipo de serviço</option>
                  <option value="compra-equipamento">Compra de Equipamento</option>
                  <option value="manutencao">Manutenção Técnica</option>
                  <option value="locacao">Locação de Equipamentos</option>
                  <option value="suporte-treinamento">Suporte e Treinamento</option>
                  <option value="consultoria">Consultoria em Projetos</option>
                  <option value="outro">Outro serviço</option>
                </select>
              </div>
              <span class="error-msg" id="err-tipoServico" role="alert">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                Selecione um tipo de serviço.
              </span>
            </div>

            <div class="form-field" data-field="tipoAplicacao">
              <label for="cf-tipoAplicacao">
                Tipo de Aplicação <span class="required-mark" aria-hidden="true">*</span>
              </label>
              <div class="select-wrapper">
                <select
                  id="cf-tipoAplicacao"
                  name="tipoAplicacao"
                  required
                  aria-required="true"
                  aria-describedby="err-tipoAplicacao"
                >
                  <option value="" disabled selected hidden>Selecione o tipo de aplicação</option>
                  <option value="piscina">Piscina</option>
                  <option value="eta-ete">ETA/ETE</option>
                </select>
              </div>
              <span class="error-msg" id="err-tipoAplicacao" role="alert">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                Selecione um tipo de aplicação.
              </span>
            </div>

            <!-- Campos Condicionais: Piscina -->
            <div id="campos-piscina" class="hidden">

              <div class="form-field" data-field="volumePiscina">
                <label for="cf-volumePiscina">
                  Volume (m³)
                </label>
                <input
                  type="text"
                  id="cf-volumePiscina"
                  name="volumePiscina"
                  placeholder="Ex: 500"
                >
                <span class="error-msg" id="err-volumePiscina" role="alert">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                  Informe o volume da piscina.
                </span>
              </div>

              <div class="form-field" data-field="termica">
                <label>Térmica?</label>
                <div class="radio-group">
                  <div class="radio-option">
                    <input type="radio" id="cf-termica-sim" name="termica" value="sim">
                    <label for="cf-termica-sim">Sim</label>
                  </div>
                  <div class="radio-option">
                    <input type="radio" id="cf-termica-nao" name="termica" value="nao">
                    <label for="cf-termica-nao">Não</label>
                  </div>
                </div>
                <span class="error-msg" id="err-termica" role="alert">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                  Selecione uma opção.
                </span>
              </div>

              <div class="form-field" data-field="coberta">
                <label>Coberta?</label>
                <div class="radio-group">
                  <div class="radio-option">
                    <input type="radio" id="cf-coberta-sim" name="coberta" value="sim">
                    <label for="cf-coberta-sim">Sim</label>
                  </div>
                  <div class="radio-option">
                    <input type="radio" id="cf-coberta-nao" name="coberta" value="nao">
                    <label for="cf-coberta-nao">Não</label>
                  </div>
                </div>
                <span class="error-msg" id="err-coberta" role="alert">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                  Selecione uma opção.
                </span>
              </div>

              <div class="form-field" data-field="externa">
                <label>Externa? </label>
                <div class="radio-group">
                  <div class="radio-option">
                    <input type="radio" id="cf-externa-sim" name="externa" value="sim">
                    <label for="cf-externa-sim">Sim</label>
                  </div>
                  <div class="radio-option">
                    <input type="radio" id="cf-externa-nao" name="externa" value="nao">
                    <label for="cf-externa-nao">Não</label>
                  </div>
                </div>
                <span class="error-msg" id="err-externa" role="alert">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                  Selecione uma opção.
                </span>
              </div>

              <div class="form-field" data-field="marcaCloro">
                <label for="cf-marcaCloro">
                  Qual a marca de cloro utilizada atualmente?
                </label>
                <input
                  type="text"
                  id="cf-marcaCloro"
                  name="marcaCloro"
                  placeholder="Ex: Genco"
                >
              </div>

              <div class="form-field" data-field="quantidadeCloro">
                <label for="cf-quantidadeCloro">
                  Quantidade de cloro usado por dia (dia de maior consumo)
                </label>
                <input
                  type="text"
                  id="cf-quantidadeCloro"
                  name="quantidadeCloro"
                  placeholder="Ex: 2kg por dia"
                >
              </div>

              <div class="form-field" data-field="tempoFiltragem">
                <label for="cf-tempoFiltragem">
                  Tempo de filtragem da piscina por dia
                </label>
                <input
                  type="text"
                  id="cf-tempoFiltragem"
                  name="tempoFiltragem"
                  placeholder="Ex: 8 horas"
                >
              </div>
            </div>

            <!-- Campos Condicionais: ETA/ETE -->
            <div id="campos-eta-ete" class="hidden">

              <div class="form-field" data-field="vazao">
                <label for="cf-vazao">
                  Vazão (m³)
                </label>
                <input
                  type="text"
                  id="cf-vazao"
                  name="vazao"
                  placeholder="Ex: 1000"
                >
                <span class="error-msg" id="err-vazao" role="alert">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                  Informe a vazão.
                </span>
              </div>

              <div class="form-field" data-field="tempoBomba">
                <label for="cf-tempoBomba">
                  Tempo de bomba (horas/dia)
                </label>
                <input
                  type="text"
                  id="cf-tempoBomba"
                  name="tempoBomba"
                  placeholder="Ex: 24"
                >
                <span class="error-msg" id="err-tempoBomba" role="alert">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                  Informe o tempo de bomba.
                </span>
              </div>

              <div class="form-field" data-field="tratamentoAtual">
                <label for="cf-tratamentoAtual">
                  Qual tratamento usado atualmente?
                </label>
                <input
                  type="text"
                  id="cf-tratamentoAtual"
                  name="tratamentoAtual"
                  placeholder="Ex: Hipoclorito de sódio"
                >
              </div>

              <div class="form-field" data-field="quantidadeInsumo">
                <label for="cf-quantidadeInsumo">
                  Quantidade deste insumo usado por dia (dia de maior consumo)
                </label>
                <input
                  type="text"
                  id="cf-quantidadeInsumo"
                  name="quantidadeInsumo"
                  placeholder="Ex: 50 litros por dia"
                >
              </div>
            </div>

            <button type="submit" class="btn-submit" aria-live="polite">
              <span class="spinner" aria-hidden="true"></span>
              <span class="btn-text">Enviar simulação</span>
            </button>

          </form>
        </div>

        <!-- Estado de sucesso -->
        <div class="success-message" role="status" aria-live="assertive">
          <div class="success-icon" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3>Simulação enviada!</h3>
          <p>Recebemos suas informações e retornaremos<br>em até 1 dia útil.</p>
        </div>

      </div>
    `;
  }

  private setupListeners() {
    if (!this.shadowRoot) return;

    const form = this.shadowRoot.getElementById('contact-form') as HTMLFormElement;

    // Máscara Telefone
    const telefoneInput = this.shadowRoot.getElementById('cf-telefone') as HTMLInputElement;
    telefoneInput?.addEventListener('input', () => {
      const d = telefoneInput.value.replace(/\D/g, '').slice(0, 11);
      if (d.length === 0)       telefoneInput.value = '';
      else if (d.length <= 2)   telefoneInput.value = `(${d}`;
      else if (d.length <= 7)   telefoneInput.value = `(${d.slice(0, 2)}) ${d.slice(2)}`;
      else                      telefoneInput.value = `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
    });

    // Autocomplete de Estados usando API do IBGE
    this.setupEstadoAutocomplete();

    // Autocomplete de Cidades usando API do IBGE
    this.setupCidadeAutocomplete();

    // Tipo de Aplicação - Mostrar/Ocultar campos condicionais
    const tipoAplicacaoSelect = this.shadowRoot.getElementById('cf-tipoAplicacao') as HTMLSelectElement;
    const camposPiscina = this.shadowRoot.getElementById('campos-piscina')!;
    const camposEtaEte = this.shadowRoot.getElementById('campos-eta-ete')!;

    tipoAplicacaoSelect?.addEventListener('change', () => {
      const valor = tipoAplicacaoSelect.value;

      if (valor === 'piscina') {
        camposPiscina.classList.remove('hidden');
        camposEtaEte.classList.add('hidden');
      } else if (valor === 'eta-ete') {
        camposPiscina.classList.add('hidden');
        camposEtaEte.classList.remove('hidden');
      } else {
        camposPiscina.classList.add('hidden');
        camposEtaEte.classList.add('hidden');
      }
    });

    // Validação inline
    const requiredFields = ['nome', 'telefone', 'email', 'estado', 'cidade', 'tipoServico', 'tipoAplicacao'];
    requiredFields.forEach((name) => {
      const el = this.shadowRoot!.getElementById(`cf-${name}`) as HTMLInputElement;
      const wrapper = this.shadowRoot!.querySelector(`[data-field="${name}"]`)!;

      el?.addEventListener('blur', () => this.validateField(el, wrapper));
      el?.addEventListener('change', () => {
        if (wrapper.classList.contains('has-error')) {
          this.validateField(el, wrapper);
        }
      });
      el?.addEventListener('input', () => {
        if (wrapper.classList.contains('has-error')) {
          this.validateField(el, wrapper);
        }
      });
    });

    form?.addEventListener('submit', (e) => this.handleSubmit(e));
  }

  private estadoSelecionado: string = '';
  private estadosCache: any[] = [];

  private async setupEstadoAutocomplete() {
    if (!this.shadowRoot) return;

    const estadoInput = this.shadowRoot.getElementById('cf-estado') as HTMLInputElement;
    const estadoList = this.shadowRoot.getElementById('estado-list') as HTMLElement;
    const cidadeInput = this.shadowRoot.getElementById('cf-cidade') as HTMLInputElement;

    if (!estadoInput || !estadoList) return;

    // Carrega estados uma vez
    if (this.estadosCache.length === 0) {
      try {
        const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome');
        this.estadosCache = await response.json();
      } catch (error) {
        console.error('Erro ao carregar estados:', error);
      }
    }

    estadoInput.addEventListener('input', () => {
      const value = estadoInput.value.trim();

      if (value.length < 1) {
        estadoList.classList.remove('visible');
        estadoList.innerHTML = '';
        this.estadoSelecionado = '';
        cidadeInput.disabled = true;
        cidadeInput.value = '';
        cidadeInput.placeholder = 'Primeiro selecione um estado';
        return;
      }

      const filtered = this.estadosCache.filter((estado: any) =>
        estado.nome.toLowerCase().includes(value.toLowerCase()) ||
        estado.sigla.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 10);

      if (filtered.length === 0) {
        estadoList.classList.remove('visible');
        estadoList.innerHTML = '';
        return;
      }

      estadoList.innerHTML = filtered
        .map((estado: any) => `<div class="autocomplete-item" data-uf="${estado.sigla}">${estado.nome}</div>`)
        .join('');

      estadoList.classList.add('visible');

      estadoList.querySelectorAll('.autocomplete-item').forEach(item => {
        item.addEventListener('click', () => {
          const uf = item.getAttribute('data-uf') || '';
          estadoInput.value = item.textContent || '';
          this.estadoSelecionado = uf;
          estadoList.classList.remove('visible');
          estadoList.innerHTML = '';

          // Habilita campo de cidade
          cidadeInput.disabled = false;
          cidadeInput.value = '';
          cidadeInput.placeholder = 'Digite sua cidade';
          cidadeInput.focus();
        });
      });
    });

    document.addEventListener('click', (e) => {
      if (!estadoInput.contains(e.target as Node) && !estadoList.contains(e.target as Node)) {
        estadoList.classList.remove('visible');
      }
    });
  }

  private async setupCidadeAutocomplete() {
    if (!this.shadowRoot) return;

    const cidadeInput = this.shadowRoot.getElementById('cf-cidade') as HTMLInputElement;
    const cidadeList = this.shadowRoot.getElementById('cidade-list') as HTMLElement;

    if (!cidadeInput || !cidadeList) return;

    cidadeInput.addEventListener('input', async () => {
      const value = cidadeInput.value.trim();

      if (!this.estadoSelecionado) {
        cidadeList.classList.remove('visible');
        cidadeList.innerHTML = '';
        return;
      }

      if (value.length < 2) {
        cidadeList.classList.remove('visible');
        cidadeList.innerHTML = '';
        return;
      }

      try {
        const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${this.estadoSelecionado}/municipios?orderBy=nome`);
        const cidades = await response.json();

        const filtered = cidades.filter((cidade: any) =>
          cidade.nome.toLowerCase().includes(value.toLowerCase())
        ).slice(0, 10);

        if (filtered.length === 0) {
          cidadeList.classList.remove('visible');
          cidadeList.innerHTML = '';
          return;
        }

        cidadeList.innerHTML = filtered
          .map((cidade: any) => `<div class="autocomplete-item">${cidade.nome}</div>`)
          .join('');

        cidadeList.classList.add('visible');

        cidadeList.querySelectorAll('.autocomplete-item').forEach(item => {
          item.addEventListener('click', () => {
            cidadeInput.value = item.textContent || '';
            cidadeList.classList.remove('visible');
            cidadeList.innerHTML = '';
          });
        });
      } catch (error) {
        console.error('Erro ao carregar cidades:', error);
      }
    });

    document.addEventListener('click', (e) => {
      if (!cidadeInput.contains(e.target as Node) && !cidadeList.contains(e.target as Node)) {
        cidadeList.classList.remove('visible');
      }
    });
  }

  private validateField(
    el: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement,
    wrapper: Element
  ): boolean {
    const isEmpty = !el.value.trim();
    let invalid = false;

    // Radio buttons
    if (el.type === 'radio') {
      const name = el.getAttribute('name');
      const checked = this.shadowRoot!.querySelector(`input[name="${name}"]:checked`);
      invalid = !checked;
    } else if (el.hasAttribute('required') && isEmpty) {
      invalid = true;
    } else if (el.type === 'email' && !isEmpty) {
      invalid = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value);
    } else if (el.type === 'tel' && !isEmpty) {
      invalid = !/^\(\d{2}\) \d{5}-\d{4}$/.test(el.value);
    }

    wrapper.classList.toggle('has-error', invalid);
    wrapper.classList.toggle('is-valid', !invalid && !isEmpty);

    return !invalid;
  }

  // Captura UTMs da URL ou sessionStorage
  private getUTMParams(): Record<string, string> {
    const utmParams: Record<string, string> = {};
    const urlParams = new URLSearchParams(window.location.search);

    // Lista de UTMs para capturar
    const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];

    // Tenta pegar da URL primeiro
    utmKeys.forEach(key => {
      const value = urlParams.get(key);
      if (value) {
        utmParams[key] = value;
        // Salva no sessionStorage para persistir durante a sessão
        sessionStorage.setItem(key, value);
      } else {
        // Se não está na URL, tenta pegar do sessionStorage
        const stored = sessionStorage.getItem(key);
        if (stored) {
          utmParams[key] = stored;
        }
      }
    });

    return utmParams;
  }

  private async handleSubmit(e: Event) {
    e.preventDefault();
    if (!this.shadowRoot) return;

    const form = e.target as HTMLFormElement;
    const btn = this.shadowRoot.querySelector('.btn-submit') as HTMLButtonElement;

    // Valida todos os campos obrigatórios
    const requiredFields = ['nome', 'telefone', 'email', 'estado', 'cidade', 'tipoServico', 'tipoAplicacao'];
    let allValid = true;

    requiredFields.forEach((name) => {
      const el = this.shadowRoot!.getElementById(`cf-${name}`) as HTMLInputElement;
      const wrapper = this.shadowRoot!.querySelector(`[data-field="${name}"]`)!;
      if (!this.validateField(el, wrapper)) allValid = false;
    });

    if (!allValid) {
      const firstError = this.shadowRoot.querySelector(
        '.has-error input, .has-error select, .has-error textarea'
      ) as HTMLElement;
      firstError?.focus();
      return;
    }

    // Estado de carregamento
    btn.classList.add('loading');
    btn.disabled = true;

    try {
        const formData = Object.fromEntries(new FormData(form));

        // Adiciona UTMs ao payload
        const utmParams = this.getUTMParams();
        const payload = {
          ...formData,
          ...utmParams
        };

        const response = await fetch('/send-email.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Falha no envio');
        }

        const result = await response.json();

        this.dispatchEvent(
            new CustomEvent('contact-submitted', {
                bubbles: true,
                composed: true,
                detail: result,
            })
        );

        const wrapper = this.shadowRoot.querySelector('.form-wrapper')!;
        const success = this.shadowRoot.querySelector('.success-message')!;
        wrapper.classList.add('submitted');
        success.classList.add('visible');

    } catch (error) {
        console.error('Erro ao enviar:', error);
        alert('Ocorreu um erro ao enviar sua simulação. Por favor, tente novamente mais tarde.');
        btn.classList.remove('loading');
        btn.disabled = false;
    }
  }

}

customElements.define('contact-form', ContactForm);
