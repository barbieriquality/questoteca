// Gera o site em /dist a partir de produtos.json. Sem dependências.
const fs = require('fs'), path = require('path');
const D = JSON.parse(fs.readFileSync('produtos.json', 'utf8'));
const S = D.site, P = D.produtos, OUT = 'dist', BRL = 'R$ 9,98';
const e = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const AV = 'Material independente de estudo para concursos, sem vínculo com bancas organizadoras ou instituições públicas. A legislação muda; confira sempre o edital e a norma vigente.';
const CSS = ':root{--bg:#FBFCFA;--ink:#1B211E;--mu:#5F6B64;--ln:#E3E8E3;--ac:#2F6B55}*{box-sizing:border-box}' +
'body{margin:0;background:var(--bg);color:var(--ink);font:16px/1.6 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif}' +
'.w{max-width:1040px;margin:0 auto;padding:0 18px}a{color:inherit}.mu{color:var(--mu)}' +
'header{display:flex;justify-content:space-between;align-items:baseline;gap:12px;flex-wrap:wrap;padding:22px 0}' +
'.logo{display:block;line-height:0}.logo img{display:block;height:28px;width:auto}nav a{margin-left:20px;color:var(--mu);text-decoration:none;font-size:14px}' +
'h1{font-size:clamp(2rem,5vw,3.1rem);line-height:1.08;letter-spacing:-.03em;margin:.3em 0 .5em}h2{font-size:1.35rem;margin:2.2em 0 .6em}' +
'.lede{font-size:18px;color:var(--mu);max-width:56ch}.tag{font-size:13px;color:var(--mu)}' +
'.hero,.pg{display:grid;grid-template-columns:1.1fr .9fr;gap:40px;padding:28px 0}.pg{grid-template-columns:1.4fr .8fr}' +
'@media(max-width:760px){.hero,.pg{grid-template-columns:1fr;gap:24px}}' +
'.btn{display:inline-block;background:var(--ac);color:#fff;padding:13px 24px;border-radius:999px;font-weight:600;text-decoration:none;text-align:center}.btn:hover{filter:brightness(1.1)}' +
'.row{display:grid;grid-template-columns:44px 1fr auto auto;gap:14px;align-items:center;padding:14px 0;border-top:1px solid var(--ln);text-decoration:none}.row:hover b{text-decoration:underline}' +
'@media(max-width:560px){.row{grid-template-columns:44px 1fr auto}.row .q{display:none}}' +
'.tile{width:40px;height:40px;border-radius:8px;background:var(--c);color:#fff;font:600 12px system-ui;display:grid;place-items:center}' +
'.box{background:#fff;border:1px solid var(--ln);border-radius:14px;padding:22px}.buy{position:sticky;top:16px;align-self:start}.price{font-size:2rem;font-weight:700}' +
'dl{margin:12px 0}dl div{display:flex;justify-content:space-between;padding:6px 0;border-top:1px solid var(--ln);font-size:14px}dt{color:var(--mu)}dd{margin:0}' +
'.o{display:block;width:100%;text-align:left;font:inherit;background:#fff;border:1px solid var(--ln);border-radius:10px;padding:10px 14px;margin:8px 0;cursor:pointer}.o:hover:enabled{border-color:var(--ac)}' +
'.o.ok{background:#E1F1E8;border-color:#1E7A52}.o.bad{background:#F7E4E0;border-color:#B3402F}#why{font-size:15px;margin-top:12px}' +
'details{border-top:1px solid var(--ln);padding:10px 0}summary{cursor:pointer;font-weight:600}ul.t{columns:2;padding-left:18px}@media(max-width:560px){ul.t{columns:1}}' +
'footer{border-top:1px solid var(--ln);margin-top:56px;padding:24px 0 48px;font-size:14px;color:var(--mu)}:focus-visible{outline:2px solid var(--ac);outline-offset:3px}';

fs.rmSync(OUT, { recursive: true, force: true });
const W = (rel, txt) => { const f = path.join(OUT, rel); fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, txt); };
const U = p => S.url + p;

function layout(p, title, desc, body, ld) {
  return '<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light">' +
    '<title>' + e(title) + '</title><meta name="description" content="' + e(desc) + '"><link rel="canonical" href="' + U(p) + '"><link rel="icon" href="/questoteca-icone.svg" type="image/svg+xml">' +
    '<meta property="og:title" content="' + e(title) + '"><meta property="og:description" content="' + e(desc) + '"><meta property="og:type" content="website"><meta property="og:url" content="' + U(p) + '">' +
    (S.verificacao ? '<meta name="google-site-verification" content="' + e(S.verificacao) + '">' : '') +
    '<style>' + CSS + '</style>' + (ld ? '<script type="application/ld+json">' + JSON.stringify(ld) + '</script>' : '') +
    '</head><body><div class="w"><header><a class="logo" href="/"><img src="/questoteca-logo.svg" alt="' + S.nome + '" width="140" height="28"></a><nav><a href="/#catalogo">Simulados</a><a href="/#como">Como funciona</a><a href="/sobre/">Sobre</a></nav></header>' + body +
    '<footer><p>' + AV + '</p><p><a href="/sobre/">Sobre</a> · <a href="/contato/">Contato</a> · <a href="/privacidade/">Privacidade</a></p><p>' + S.nome + ' · ' + S.descritor + '</p></footer></div></body></html>';
}

const row = p => '<a class="row" href="/' + p.slug + '/"><span class="tile" style="--c:' + p.cor + '">' + p.questoes + '</span><span><b>' + e(p.nome) + '</b><br><span class="tag">' + e(p.nivel) + '</span></span><span class="tag q">' + p.questoes + ' questões</span><span>' + BRL + '</span></a>';

// Questão de teste da página inicial
const QUIZ = '<div class="box" id="quiz"><span class="tag">Teste uma questão · Informática</span><p>Em uma planilha, a célula B2 contém a fórmula <code>=A2*10%</code>. Ao copiar B2 e colar em B3, a fórmula que passa a constar em B3 é:</p>' +
  ['=A2*10%', '=A3*10%', '=$A$2*10%', '=A3*10', '=B2*10%'].map((o, i) => '<button class="o" data-i="' + i + '"><b>' + 'ABCDE'[i] + '</b> &nbsp;<code>' + o + '</code></button>').join('') +
  '<div id="why" hidden></div></div><script>!function(){var b=document.querySelectorAll("#quiz .o"),w=document.getElementById("why");b.forEach(function(x,i){x.onclick=function(){b.forEach(function(y,j){y.disabled=true;if(j==1)y.classList.add("ok");else if(j==i)y.classList.add("bad")});w.innerHTML=(i==1?"Correto. ":"Não foi dessa vez. ")+"<b>=A3*10%.</b> A referência A2 é relativa e acompanha o deslocamento de uma linha para baixo. Com $A$2 a referência seria fixa.";w.hidden=false}})}()</script>';

function home() {
  const cargos = P.filter(p => p.tipo === 'Cargo'), mats = P.filter(p => p.tipo === 'Matéria');
  const body = '<section class="hero"><div><span class="tag">Nível médio · Simulados digitais</span><h1>Simulados para concursos de nível médio</h1>' +
    '<p class="lede">Cada simulado traz de 300 a 500 questões com resposta na hora, explicação e relatório do seu desempenho por assunto. Você baixa o arquivo e estuda no celular ou no computador, até sem internet.</p>' +
    '<p><a class="btn" href="#catalogo">Ver os ' + P.length + ' simulados</a></p><p class="tag">' + BRL + ' cada · Sem cadastro · Funciona offline</p></div>' + QUIZ + '</section>' +
    '<section id="catalogo"><h2>Simulados por cargo</h2>' + cargos.map(row).join('') + '<h2>Simulados por matéria</h2>' + mats.map(row).join('') + '</section>' +
    '<section id="como"><h2>Como funciona</h2><ol><li><b>Compre e baixe.</b> O pagamento é feito na Hotmart. Depois dele, você baixa o arquivo ZIP.</li><li><b>Extraia e abra.</b> Abra o arquivo HTML no navegador do celular ou do computador.</li><li><b>Responda e revise.</b> Veja na hora se acertou, leia a explicação e, no fim, receba o relatório por assunto.</li></ol>' +
    '<h2>O que vem em cada simulado</h2><ul><li>Resposta na hora, com explicação</li><li>Relatório por assunto, com o que estudar primeiro</li><li>Revisão das questões erradas</li><li>Exportação do progresso, para continuar depois</li><li>Modo noturno dentro do simulado</li><li>Funciona sem internet, sem instalação</li></ul></section>';
  W('index.html', layout('/', S.nome + ': ' + S.descritor, 'Simulados digitais de ' + P.length + ' cargos e matérias para concursos de nível médio. Resposta na hora, relatório por assunto e funciona offline. ' + BRL + ' cada.', body,
    { '@context': 'https://schema.org', '@type': 'WebSite', name: S.nome, url: S.url }));
}

function prod(p) {
  const path_ = '/' + p.slug + '/', n = p.questoes, nome = e(p.nome);
  const desc = n + ' questões de ' + p.nome + ' no estilo de bancas, com explicação das respostas. Simulado digital, ' + BRL + ', funciona offline.';
  const ass = (p.assuntos && p.assuntos.length) ? '<h2>Assuntos abordados</h2><ul class="t">' + p.assuntos.map(a => '<li>' + e(a) + '</li>').join('') + '</ul>' : '';
  const body = '<p class="tag"><a href="/#catalogo">← Todos os simulados</a></p><div class="pg"><div><span class="tag">' + e(p.tipo) + ' · ' + e(p.nivel) + '</span><h1>Simulado de ' + nome + ' para concurso</h1>' +
    '<p class="lede">São ' + n + ' questões de ' + nome + ' no estilo das bancas de concursos de nível médio. Você responde, vê na hora se acertou e lê a explicação de cada questão.</p>' + ass +
    '<h2>O que você recebe</h2><ul><li>' + n + ' questões de múltipla escolha, nível ' + e(p.nivel.toLowerCase()) + '</li><li>Resposta e explicação logo após cada questão</li><li>Relatório por assunto, para saber o que estudar primeiro</li><li>Revisão das questões que você errou</li><li>Exportação do progresso, para continuar depois</li></ul>' +
    '<h2>Perguntas frequentes</h2><details><summary>Preciso instalar alguma coisa?</summary><p>Não. Você extrai o ZIP e abre o arquivo HTML no navegador.</p></details>' +
    '<details><summary>Funciona no celular?</summary><p>Sim, no navegador do celular ou do computador. Depois do download, funciona sem internet.</p></details>' +
    '<details><summary>Como recebo o arquivo?</summary><p>O pagamento e a entrega são feitos pela Hotmart. Terminada a compra, você baixa o ZIP.</p></details>' +
    '<details><summary>O simulado garante aprovação?</summary><p>Não. É um material de treino. Confira sempre o edital do seu concurso.</p></details></div>' +
    '<aside class="box buy"><span class="tag">Simulado digital</span><div class="price">' + BRL + '</div><dl><div><dt>Questões</dt><dd>' + n + '</dd></div><div><dt>Nível</dt><dd>' + e(p.nivel) + '</dd></div><div><dt>Formato</dt><dd>ZIP com arquivo HTML</dd></div><div><dt>Internet</dt><dd>Só para baixar</dd></div></dl>' +
    '<a class="btn" style="display:block" href="' + e(p.link) + '" target="_blank" rel="noopener">Comprar na Hotmart</a><p class="tag">Pagamento e entrega pela Hotmart. ' + AV.split(';')[0] + '.</p></aside></div>';
  W(path_ + 'index.html', layout(path_, 'Simulado de ' + p.nome + ' para Concurso | ' + S.nome, desc, body, {
    '@context': 'https://schema.org', '@type': 'Product', name: 'Simulado de ' + p.nome + ' para concurso', description: desc, brand: { '@type': 'Brand', name: S.nome },
    offers: { '@type': 'Offer', price: '9.98', priceCurrency: 'BRL', availability: 'https://schema.org/InStock', url: p.link } }));
}

const info = (p, t, h) => W(p + 'index.html', layout(p, t + ' | ' + S.nome, t + ' da ' + S.nome + ', simulados para concursos de nível médio.', '<main style="max-width:680px;padding:24px 0"><h1>' + t + '</h1>' + h + '</main>'));
info('/sobre/', 'Sobre', '<p>A ' + S.nome + ' reúne simulados digitais para concursos de nível médio, por cargo e por matéria. Cada simulado é um arquivo HTML com questões, resposta na hora, explicação e relatório por assunto.</p><p>O material é produzido e mantido por ' + S.responsavel + '. As vendas são feitas pela Hotmart.</p><p>' + AV + '</p>');
info('/contato/', 'Contato', '<p>A compra, a entrega do arquivo e o suporte são feitos pela Hotmart. Para dúvidas sobre um pedido, use a área de compras da Hotmart ou o botão de suporte na página do produto.</p><p>Os simulados disponíveis estão na <a href="/#catalogo">página inicial</a>.</p>');
info('/privacidade/', 'Privacidade', '<p>Este site não tem cadastro, formulário nem cookies próprios, e não coleta dados pessoais. Ele é hospedado na Cloudflare, que pode registrar dados técnicos de acesso (como endereço IP) para manter o serviço funcionando.</p><p>Ao clicar em comprar, você vai para a Hotmart, que cuida do pagamento e dos seus dados conforme a política dela.</p><p>Responsável: ' + S.responsavel + '.</p>');

home(); P.forEach(prod);
['questoteca-logo.svg', 'questoteca-icone.svg'].forEach(f => { if (fs.existsSync(f)) fs.copyFileSync(f, path.join(OUT, f)); });
W('sitemap.xml', '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' + ['/'].concat(P.map(p => '/' + p.slug + '/'), ['/sobre/', '/contato/', '/privacidade/']).map(u => '<url><loc>' + U(u) + '</loc></url>').join('') + '</urlset>');
W('robots.txt', 'User-agent: *\nAllow: /\nSitemap: ' + U('/sitemap.xml') + '\n');
console.log('OK: ' + (P.length + 4) + ' páginas geradas em /' + OUT);
