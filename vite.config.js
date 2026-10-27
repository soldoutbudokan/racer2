import { realpathSync } from 'node:fs';
import { defineConfig, searchForWorkspaceRoot } from 'vite';

export default defineConfig({
  // Relative asset paths so the build works from any subpath
  // (e.g. GitHub Pages at /racer2/).
  base: './',
  server: {
    host: true,
    port: 5173,
    // CI serves the base revision from a worktree whose node_modules is a
    // symlink to the checkout's (verify-game.yml). The bundled fonts resolve
    // through it to a path outside that worktree, which Vite refuses to serve
    // unless it is allowed here.
    fs: { allow: [searchForWorkspaceRoot(process.cwd()), realpathSync('node_modules')] },
  },
  build: {
    target: 'es2022',
    sourcemap: false,
  },
});
