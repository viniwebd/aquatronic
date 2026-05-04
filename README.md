# Aquatronic - Tratamento de Água por Eletrólise Salina

Este é o repositório oficial do novo site institucional da **Aquatronic**, empresa brasileira com mais de 20 anos de experiência especializada no desenvolvimento de geradores de cloro por eletrólise salina para indústrias, saneamento básico, piscinas e projetos comerciais.

---

## 🛠 Stack Tecnológica

O projeto foi construído do zero com foco em performance extrema e SEO técnico:

- **Vite:** Ferramenta de build e servidor de desenvolvimento ultra-rápido.
- **TypeScript & Native Web Components:** Interface modularizada sem dependência de frameworks pesados (React/Vue).
- **Vanilla CSS:** Estilização pura com variáveis globais para consistência visual.
- **PHP 8+:** Script de processamento de formulários (`public/send-email.php`).

---

## 🚀 Como Editar o Projeto

Siga estes passos para configurar seu ambiente local:

### 1. Pré-requisitos

Certifique-se de ter o **Node.js** instalado em sua máquina.

### 2. Configuração Inicial

Clone o repositório e instale as dependências:

```bash
# Instalar dependências
npm install
```

### 3. Ambiente de Desenvolvimento

Para visualizar o site em tempo real enquanto edita:

```bash
# Iniciar servidor local
npm run dev
```

O site estará disponível em `http://localhost:5173`.

---

## 🤖 Trabalhando com o Claude (IA Agentic Coding)

Este projeto foi otimizado para ser mantido via IA. Ao abrir este projeto no VS Code com o Claude (ou Antigravity), você pode dar comandos diretos em linguagem natural.

**Como iniciar uma conversa/edição:**

1. Abra o terminal no VS Code.
2. Certifique-se de que o agente está ativo.
3. Use comandos como:
   - _"Analise o site e adicione uma nova seção de benefícios na home."_
   - _"Crie uma nova página de produto para o modelo AquaPro 500."_
   - _"Ajuste as cores do design system para um azul mais escuro."_
   - _"Otimize o SEO da página de tecnologia."_

O Claude cuidará da criação de componentes, rotas e estilos automaticamente.

---

## 📦 Build e Deploy (Hospedagem Turbo Cloud)

Quando estiver pronto para subir as alterações para o site oficial:

### 1. Gerar o Build

Execute o comando abaixo para compilar e otimizar todos os arquivos:

```bash
npm run build
```

Este comando criará uma pasta chamada `dist/` na raiz do projeto.

### 2. Onde Hospedar

O site foi projetado para rodar em servidores PHP modernos, como a **Turbo Cloud** (ou qualquer hospedagem cPanel/Apache/Nginx).

### 3. Quais Arquivos Subir

Você deve subir **APENAS** o conteúdo de dentro da pasta `dist/` para a raiz da sua hospedagem (dentro da pasta `public_html`).

**Importante:**

- O arquivo `send-email.php` agora é movido automaticamente para a pasta `dist/` durante o build.
- Certifique-se de que o arquivo `.htaccess` (se houver) ou as configurações do servidor permitam o roteamento de pastas (o site usa URLs limpas como `/produtos`).

---

## 🎯 Estratégia de SEO e Performance

Diferente de sites em WordPress, a Aquatronic utiliza uma arquitetura estática que garante:

- **Nota 100 no Lighthouse:** Carregamento instantâneo.
- **Schema Markup Nativo:** Dados estruturados para Google e IAs (AEO).
- **Segurança Total:** Sem banco de dados exposto, eliminando riscos de SQL Injection.

---

## 📂 Estrutura de Pastas

- `/src`: Código fonte (TypeScript, Componentes, Estilos).
- `/public`: Arquivos estáticos (Imagens, PDFs, scripts PHP).
- `/dist`: Arquivo final compilado (O que vai para o ar).
- `index.html`: Ponto de entrada principal.
- `vite.config.js`: Configurações de rotas e build.
