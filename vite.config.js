import { defineConfig } from 'vite';

export default defineConfig({
  // Relative asset paths so the build works from any subpath
  // (e.g. GitHub Pages at /racer2/).
  base: './',
  server: {
    host: true,
    port: 5173,
  },
  build: {
    target: 'es2022',
    sourcemap: false,
  },
});
