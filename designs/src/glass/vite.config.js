import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

const here = path.dirname(fileURLToPath(import.meta.url));
const coreDir = path.resolve(here, '../core');
const artDir = path.resolve(here, '../art');
const CORE_FILES = ['data.js', 'content.js', 'relations.js', 'core.js', 'covers.js'];

/* Injects the shared portfolio core (Rana's text + artworks) as a classic script.
   Production embeds the artworks as data URIs so the output is one self-contained file;
   dev serves them straight from ../art. */
function ranaCore() {
  let isDev = false;
  return {
    name: 'rana-core',
    configResolved(cfg) { isDev = cfg.command === 'serve'; },
    transformIndexHtml(html) {
      let js = CORE_FILES.map((f) => fs.readFileSync(path.join(coreDir, f), 'utf8')).join('\n');
      js = js.replace(/@@ART:(art-\d\d)@@/g, (_, id) => {
        const file = path.join(artDir, `${id}.jpg`);
        return isDev ? `/@fs${file}` : `data:image/jpeg;base64,${fs.readFileSync(file).toString('base64')}`;
      });
      /* Replacer function, not a string: a replacement string would turn "$$" in the core into "$" */
      return html.replace('<!--@CORE_JS@-->', () => `<script>\n${js}\n</script>`);
    }
  };
}

export default defineConfig({
  plugins: [react(), ranaCore(), viteSingleFile()],
  server: { fs: { allow: [path.resolve(here, '..')] } },
  build: { target: 'es2020', cssCodeSplit: false, assetsInlineLimit: 100000000, chunkSizeWarningLimit: 5000 }
});
