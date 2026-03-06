# Aquatronic - Tratamento de Água por Eletrólise Salina

Este é o repositório oficial do novo site institucional da **Aquatronic**, empresa brasileira com mais de 20 anos de experiência especializada no desenvolvimento de geradores de cloro por eletrólise salina para indústrias, saneamento básico, piscinas e projetos comerciais.

## 🛠 Entendendo o Projeto e a Stack Tecnológica

Optamos por construir este projeto **do zero com código puro (Vanilla Flow via Vite)** em vez de utilizar plataformas pré-moldadas como o WordPress. A stack atual compreende:

- **HTML5 Semântico:** Estrutura otimizada para SEO e acessibilidade.
- **CSS3 (Vanilla):** Sem frameworks utilitários (como Tailwind) ou bibliotecas pesadas de templates (como Elementor), garantindo que apenas os bytes necessários sejam carregados.
- **TypeScript & Web Components:** Toda a interatividade e modularização de UI (Header, Footer, Banners, Cards) foi construída usando _Native Web Components_ (classes customizadas do TS compiladas).
- **Vite:** Ferramenta de build incrivelmente rápida para ambiente de desenvolvimento e empacotamento (`/dist`) em produção.
- **NPM & Node.js:** Gerenciamento dos scripts de otimização (SEO, sitemaps, etc) e dependências de ambiente.
- **PHP 8+:** Script leve no back-end (`send-email.php`) para lidar com formulários sem a necessidade de plugins.

## 🚀 Por Que Código Puro (Code + IA) e não WordPress?

Essa foi uma decisão arquitetural estratégica que rendeu vantagens drásticas:

### 1. Performance Incomparável (Nota 100 no Lighthouse)

Ao removermos o ecossistema do WordPress, nós eliminamos: requisições ao banco de dados SQL a cada visita da página, dezenas de arquivos CSS/JS injetados por plugins aleatórios, e o gargalo do renderizador de temas. O Vite compila nosso HTML/CSS/TS num pacote estático ultraleve e veloz. O site abrirá quase instantaneamente, mesmo em conexões rurais 3G.

### 2. Segurança Reforçada (Zero Vulnerabilidades)

A grande maioria dos ataques a sites corporativos ocorre por brechas em plugins do WordPress (formulários vulneráveis, construtores antigos). Um site gerado estaticamente via Web Components nativos não possui banco de dados dinâmico sendo consultado na ponta, tornando injeções maliciosas (SQL injection e XSS) virtualmente impossíveis.

### 3. SEO e AEO Cirúrgicos

Construtores de páginas, mesmo com plugins de SEO (como Yoast), têm limitações severas de injeção técnica. Construindo direto no código, conseguimos injetar programaticamente:

- **Schema Markup avançado (JSON-LD)** nativo para Organização, Negócio Local e Produtos.
- Web Components gerando HTML semântico (`<section-tag>`, `<page-hero>`) que respeita regras rígidas de hierarquias `H1` e `H2` exigidas pelo Google.
- **AEO (AI Engine Optimization):** Criamos componentes como o `FaqAccordion.ts` que geram e injetam esquemas dinâmicos de perguntas sob demanda na DOM, facilitando a extração de dados por plataformas como ChatGPT, Perplexity e Google AI Overviews.

### 4. Ganhos de Tempo (A Revolução do Desenvolvimento com IA)

Antigamente, codificar um site moderno, modularizado e de altíssimo padrão sem um CMS levaria o triplo do tempo de um WordPress por causa da estruturação de arquivos. Contudo, usando **Design Systems e IA Agentica Avançada**, fomos capazes de:

- Escalar rapidamente dezenas de páginas reutilizando _Web Components Customizados_.
- Gerar dinamicamente tags canônicas, metadados B2B engajadores, `sitemap.xml` e `robots.txt` escrevendo scripts Node no terminal via IA em questão de segundos para o site todo (ao invés de alterar manualmente página por página ou depender de plugins pagos obscuros).
- Escalar segurança: O código PHP do formulário de contato foi gerado e polido contra falhas instantaneamente.
- Realizar revisões ortográficas e garantir alinhamento com escopo físico (através de upload e parse de PDFs locais) em frações de minutos, aplicando as mudanças de copy direto nos arquivos finais sem intervenção manual prolongada.

### Como Rodar o Projeto

1. Instale as dependências: `npm install`
2. Rode o servidor de dev: `npm run dev`
3. Compile para produção: `npm run build` (Suba a pasta `/dist` para a hospedagem).
