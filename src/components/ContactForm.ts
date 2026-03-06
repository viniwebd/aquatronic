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

        /* ── Textarea ── */
        textarea {
          resize: vertical;
          min-height: 120px;
          line-height: 1.65;
        }

        /* ── Char count ── */
        .char-count {
          font-size: 0.78rem;
          color: var(--clr-neutral-300, #96aabb);
          text-align: right;
          transition: color 0.2s ease;
          align-self: flex-end;
        }

        .char-count.near-limit {
          color: var(--clr-yellow, #f59e0b);
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
        }
      </style>

      <div class="form-wrapper" role="region" aria-label="Formulário de contato">

        <div class="form-content">
          <form id="contact-form" novalidate>

            <!-- Nome + Sobrenome -->
            <div class="form-row">
              <div class="form-field" data-field="firstName">
                <label for="cf-firstName">
                  Nome <span class="required-mark" aria-hidden="true">*</span>
                </label>
                <input
                  type="text"
                  id="cf-firstName"
                  name="firstName"
                  autocomplete="given-name"
                  placeholder="Ex: João"
                  required
                  aria-required="true"
                  aria-describedby="err-firstName"
                >
                <span class="error-msg" id="err-firstName" role="alert">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                  Informe seu nome.
                </span>
              </div>

              <div class="form-field" data-field="lastName">
                <label for="cf-lastName">
                  Sobrenome
                  <span class="label-hint">opcional</span>
                </label>
                <input
                  type="text"
                  id="cf-lastName"
                  name="lastName"
                  autocomplete="family-name"
                  placeholder="Ex: Silva"
                >
              </div>
            </div>

            <!-- Email -->
            <div class="form-field" data-field="email">
              <label for="cf-email">
                Email <span class="required-mark" aria-hidden="true">*</span>
              </label>
              <input
                type="email"
                id="cf-email"
                name="email"
                autocomplete="email"
                placeholder="comercial@aquatronic.com.br"
                required
                aria-required="true"
                aria-describedby="err-email"
              >
              <span class="error-msg" id="err-email" role="alert">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                Informe um e-mail válido.
              </span>
            </div>

            <!-- WhatsApp -->
            <div class="form-field" data-field="whatsapp">
              <label for="cf-whatsapp">
                WhatsApp <span class="required-mark" aria-hidden="true">*</span>
              </label>
              <input
                type="tel"
                id="cf-whatsapp"
                name="whatsapp"
                autocomplete="tel"
                placeholder="(11) 99999-9999"
                maxlength="15"
                required
                aria-required="true"
                aria-describedby="err-whatsapp"
              >
              <span class="error-msg" id="err-whatsapp" role="alert">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                Informe um WhatsApp válido.
              </span>
            </div>

            <!-- Assunto -->
            <div class="form-field" data-field="subject">
              <label for="cf-subject">
                Assunto <span class="required-mark" aria-hidden="true">*</span>
              </label>
              <div class="select-wrapper">
                <select
                  id="cf-subject"
                  name="subject"
                  required
                  aria-required="true"
                  aria-describedby="err-subject"
                >
                  <option value="" disabled selected hidden>Selecione um assunto</option>
                  <option value="proposta">Solicitar proposta comercial</option>
                  <option value="suporte">Suporte técnico</option>
                  <option value="produtos">Informações sobre produtos</option>
                  <option value="manutencao">Manutenção preventiva</option>
                  <option value="outros">Outros</option>
                </select>
              </div>
              <span class="error-msg" id="err-subject" role="alert">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                Selecione um assunto.
              </span>
            </div>

            <!-- Mensagem -->
            <div class="form-field" data-field="message">
              <label for="cf-message">
                Mensagem <span class="required-mark" aria-hidden="true">*</span>
              </label>
              <textarea
                id="cf-message"
                name="message"
                rows="5"
                maxlength="600"
                placeholder="Descreva sua necessidade ou dúvida..."
                required
                aria-required="true"
                aria-describedby="err-message cf-char-count"
              ></textarea>
              <span class="char-count" id="cf-char-count" aria-live="polite">0 / 600</span>
              <span class="error-msg" id="err-message" role="alert">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                Escreva sua mensagem.
              </span>
            </div>

            <button type="submit" class="btn-submit" aria-live="polite">
              <span class="spinner" aria-hidden="true"></span>
              <span class="btn-text">Enviar mensagem</span>
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
          <h3>Mensagem enviada!</h3>
          <p>Recebemos seu contato e retornaremos<br>em até 1 dia útil.</p>
        </div>

      </div>
    `;
  }

  private setupListeners() {
    if (!this.shadowRoot) return;

    const form = this.shadowRoot.getElementById('contact-form') as HTMLFormElement;
    const textarea = this.shadowRoot.getElementById('cf-message') as HTMLTextAreaElement;
    const charCount = this.shadowRoot.getElementById('cf-char-count')!;

    // Contador de caracteres
    textarea?.addEventListener('input', () => {
      const len = textarea.value.length;
      charCount.textContent = `${len} / 600`;
      charCount.classList.toggle('near-limit', len > 500);
    });

    // Máscara WhatsApp: (XX) XXXXX-XXXX
    const whatsappInput = this.shadowRoot.getElementById('cf-whatsapp') as HTMLInputElement;
    whatsappInput?.addEventListener('input', () => {
      const d = whatsappInput.value.replace(/\D/g, '').slice(0, 11);
      if (d.length === 0)       whatsappInput.value = '';
      else if (d.length <= 2)   whatsappInput.value = `(${d}`;
      else if (d.length <= 7)   whatsappInput.value = `(${d.slice(0, 2)}) ${d.slice(2)}`;
      else                      whatsappInput.value = `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
    });

    // Validação inline ao sair do campo (somente após o usuário interagir)
    const requiredFields = ['firstName', 'email', 'whatsapp', 'subject', 'message'];
    requiredFields.forEach((name) => {
      const el = this.shadowRoot!.getElementById(`cf-${name}`) as HTMLInputElement;
      const wrapper = this.shadowRoot!.querySelector(`[data-field="${name}"]`)!;

      el?.addEventListener('blur', () => this.validateField(el, wrapper));
      // Limpa o erro em tempo real após correção
      el?.addEventListener('input', () => {
        if (wrapper.classList.contains('has-error')) {
          this.validateField(el, wrapper);
        }
      });
    });

    form?.addEventListener('submit', (e) => this.handleSubmit(e));
  }

  private validateField(
    el: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement,
    wrapper: Element
  ): boolean {
    const isEmpty = !el.value.trim();
    let invalid = false;

    if (el.required && isEmpty) {
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

  private async handleSubmit(e: Event) {
    e.preventDefault();
    if (!this.shadowRoot) return;

    const form = e.target as HTMLFormElement;
    const btn = this.shadowRoot.querySelector('.btn-submit') as HTMLButtonElement;

    // Valida todos os campos obrigatórios
    const requiredFields = ['firstName', 'email', 'whatsapp', 'subject', 'message'];
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
        
        const response = await fetch('/send-email.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            throw new Error('Falha no envio');
        }

        const result = await response.json();

        // Despacha evento com os dados do formulário
        this.dispatchEvent(
            new CustomEvent('contact-submitted', {
                bubbles: true,
                composed: true,
                detail: result,
            })
        );

        // Exibe mensagem de sucesso
        const wrapper = this.shadowRoot.querySelector('.form-wrapper')!;
        const success = this.shadowRoot.querySelector('.success-message')!;
        wrapper.classList.add('submitted');
        success.classList.add('visible');

    } catch (error) {
        console.error('Erro ao enviar:', error);
        alert('Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente mais tarde.');
        btn.classList.remove('loading');
        btn.disabled = false;
    }
  }
}

customElements.define('contact-form', ContactForm);
