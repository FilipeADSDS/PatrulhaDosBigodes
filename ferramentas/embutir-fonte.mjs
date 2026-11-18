// Baixa a fonte "Baloo 2" do Google Fonts e coloca dentro do app,
// para o jogo ficar com a mesma letra mesmo sem internet.
import { readFile, writeFile, mkdir } from 'node:fs/promises';

const HTML = 'www/index.html';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36';
let html = await readFile(HTML, 'utf8');
const m = html.match(/<link href="(https:\/\/fonts\.googleapis\.com\/css2[^"]+)" rel="stylesheet">/);
if (!m) { console.log('Fonte já embutida ou link não encontrado.'); process.exit(0); }
const css = await (await fetch(m[1].replace(/&amp;/g, '&'), { headers: { 'User-Agent': UA } })).text();
await mkdir('www/fontes', { recursive: true });
let n = 0, local = css;
for (const [, url] of css.matchAll(/url\((https:[^)]+\.woff2)\)/g)) {
  const nome = 'baloo2-' + (n++) + '.woff2';
  const buf = Buffer.from(await (await fetch(url)).arrayBuffer());
  await writeFile('www/fontes/' + nome, buf);
  local = local.replace(url, nome);
}
if (!n) throw new Error('Nenhum arquivo de fonte encontrado.');
await writeFile('www/fontes/fontes.css', local);
html = html.replace(m[0], '<link href="fontes/fontes.css" rel="stylesheet">').replace('<link rel="preconnect" href="https://fonts.googleapis.com">\n', '');
await writeFile(HTML, html);
console.log('Fonte embutida: ' + n + ' arquivos.');
