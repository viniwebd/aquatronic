import { defineConfig, loadEnv } from 'vite';
import { resolve } from 'path';
import fs from 'fs';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    server: {
      middlewareMode: false,
      fs: {
        strict: false
      }
    },
    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
          about: resolve(__dirname, 'sobre-nos/index.html'),
          contact: resolve(__dirname, 'contato/index.html'),
          technology: resolve(__dirname, 'tecnologia/index.html'),
          products: resolve(__dirname, 'produtos/index.html'),
          applications: resolve(__dirname, 'aplicacoes/index.html'),
          services: resolve(__dirname, 'servicos/index.html'),
          clients: resolve(__dirname, 'clientes-e-cases/index.html'),
          notFound: resolve(__dirname, '404.html'),
        },
      },
    },
    plugins: [
      {
        name: 'gtm-plugin',
        transformIndexHtml(html) {
          const gtmId = env.VITE_GTM_ID;
          const clarityId = env.VITE_CLARITY_ID;
          
          let updatedHtml = html;

          // GTM Injection
          if (gtmId) {
            const gtmScript = `
    <!-- Google Tag Manager -->
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','${gtmId}');</script>
    <!-- End Google Tag Manager -->`;

            const gtmNoScript = `
    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}"
    height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->`;

            updatedHtml = updatedHtml.replace('<head>', '<head>' + gtmScript.trim());
            updatedHtml = updatedHtml.replace('<body>', '<body>' + gtmNoScript.trim());
          }

          // Microsoft Clarity Injection
          if (clarityId) {
            const clarityScript = `
    <script type="text/javascript">
        (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "${clarityId}");
    </script>`;

            updatedHtml = updatedHtml.replace('<head>', '<head>' + clarityScript.trim());
          }

          return updatedHtml;
        }
      },
      {
        name: 'html-folder-plugin',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            const url = req.url?.split('?')[0];
            
            // List of folder routes
            const routes = [
              '/sobre-nos',
              '/produtos', 
              '/servicos',
              '/tecnologia',
              '/aplicacoes',
              '/contato',
              '/clientes-e-cases'
            ];
            
            // Check if the request matches a folder route (but not a specific file)
            if (url && routes.some(route => url === route || url === route + '/' || url === route + '/index.html')) {
              const folderPath = url.split('/')[1];
              const indexPath = resolve(__dirname, folderPath, 'index.html');

              if (fs.existsSync(indexPath)) {
                req.url = '/' + folderPath + '/index.html';
              }
            }
            
            next();
          });
        }
      }
    ]
  };
});
