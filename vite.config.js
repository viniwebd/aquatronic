import { defineConfig } from 'vite';
import { resolve } from 'path';
import fs from 'fs';

export default defineConfig({
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
              req.url = `/${folderPath}/index.html`;
            }
          }
          
          next();
        });
      }
    }
  ]
});
