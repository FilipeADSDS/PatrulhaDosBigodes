// Baixa a fonte "Baloo 2" do Google Fonts e coloca dentro do app,
// para o jogo ficar com a mesma letra mesmo sem internet.
// Se algo der errado, o app é gerado normalmente com a fonte reserva.
import { readFile, writeFile, mkdir } from 'node:fs/promises';

const HTML = 'www/index.html';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';
try {
  let html = await readFile(HTML, 'utf8');
  const m = html.match(/<link href="(https:\/\/fonts\.googleapis\.com\/css2[^"]+)" rel="stylesheet">/);
  if (!m) { console.log('Fonte já embutida ou link não encontrado.'); process.exit(0); }
  const resp = await fetch(m[1].replace(/&amp;/g, '&'), { headers: { 'User-Agent': UA }, signal: AbortSignal.timeout(20000) });
  const css = await resp.text();
  const urls = [...new Set([...css.matchAll(/url\((['"]?)(https:\/\/[^)'"]+)\1\)/g)].map(x => x[2]))];
  if (!urls.length) { console.log('A Google Fonts não devolveu arquivos de fonte; seguindo sem embutir.'); process.exit(0); }
  await mkdir('www/fontes', { recursive: true });
  let local = css, n = 0;
  for (const url of urls) {
    const ext = (url.match(/\.(woff2|woff|ttf|otf)(\?|$)/) || [, 'woff2'])[1];
    const nome = 'baloo2-' + (n++) + '.' + ext;
    const buf = Buffer.from(await (await fetch(url, { signal: AbortSignal.timeout(20000) })).arrayBuffer());
    await writeFile('www/fontes/' + nome, buf);
    local = local.split(url).join(nome);
  }
  await writeFile('www/fontes/fontes.css', local);
  html = html.replace(m[0], '<link href="fontes/fontes.css" rel="stylesheet">').replace('<link rel="preconnect" href="https://fonts.googleapis.com">\n', '');
  await writeFile(HTML, html);
  console.log('Fonte embutida: ' + n + ' arquivo(s).');
} catch (e) {
  console.log('Não foi possível embutir a fonte (' + e.message + '); seguindo sem ela.');
}
