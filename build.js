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
'.row{display:grid;grid-template-columns:1fr auto auto;gap:14px;align-items:center;padding:12px 0;border-top:1px solid var(--ln)}.rl{display:flex;gap:14px;align-items:center;text-decoration:none;min-width:0}.rl:hover b{text-decoration:underline}.pr{font-weight:600}.btn.sm{padding:8px 18px;font-size:14px}' +
'@media(max-width:560px){.row{grid-template-columns:1fr auto}.pr{display:none}}' +
'.tile{flex:none;width:40px;height:40px;border-radius:8px;background:var(--c);color:#fff;font:600 12px system-ui;display:grid;place-items:center}' +
'.box{background:#fff;border:1px solid var(--ln);border-radius:14px;padding:22px}.buy{position:sticky;top:16px;align-self:start}.price{font-size:2rem;font-weight:700}' +
'dl{margin:12px 0}dl div{display:flex;justify-content:space-between;padding:6px 0;border-top:1px solid var(--ln);font-size:14px}dt{color:var(--mu)}dd{margin:0}' +
'.o{display:block;width:100%;text-align:left;font:inherit;background:#fff;border:1px solid var(--ln);border-radius:10px;padding:10px 14px;margin:8px 0;cursor:pointer}.o:hover:enabled{border-color:var(--ac)}' +
'.o.ok{background:#E1F1E8;border-color:#1E7A52}.o.bad{background:#F7E4E0;border-color:#B3402F}#why{font-size:15px;margin-top:12px}' +
'details{border-top:1px solid var(--ln);padding:10px 0}summary{cursor:pointer;font-weight:600}ul.t{columns:2;padding-left:18px}@media(max-width:560px){ul.t{columns:1}}' +
'footer{border-top:1px solid var(--ln);margin-top:56px;padding:24px 0 48px;font-size:14px;color:var(--mu)}:focus-visible{outline:2px solid var(--ac);outline-offset:3px}' +
'.o{color:var(--ink)}.o b{margin-right:10px}.o:disabled{color:var(--ink);cursor:default}.o:disabled:not(.ok):not(.bad){opacity:.7}#qe{white-space:pre-line}#why .btn{margin-top:12px}' +
'.st{display:flex;gap:6px 18px;flex-wrap:wrap;list-style:none;padding:0;margin:14px 0 0;counter-reset:s;font-size:14px;color:var(--mu)}.st li::before{counter-increment:s;content:counter(s);display:inline-grid;place-items:center;width:20px;height:20px;border-radius:50%;background:var(--ac);color:#fff;font-size:12px;margin-right:6px}.sbar,.sp{display:none}' +
'@media(max-width:760px){.sp{display:block;height:80px}.sbar{display:flex;position:fixed;left:0;right:0;bottom:0;z-index:5;justify-content:space-between;align-items:center;gap:12px;background:#fff;border-top:1px solid var(--ln);padding:10px 16px calc(10px + env(safe-area-inset-bottom,0px))}.sbar .btn{padding:12px 28px}}';

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

const row = p => '<div class="row"><a class="rl" href="/' + p.slug + '/"><span class="tile" style="--c:' + p.cor + '">' + p.questoes + '</span><span><b>' + e(p.nome) + '</b><br><span class="tag">' + e(p.nivel) + ' · ' + p.questoes + ' questões</span></span></a><span class="pr">' + BRL + '</span><a class="btn sm" href="' + e(p.link) + '" target="_blank" rel="noopener">Comprar</a></div>';

// Questão de teste da página inicial: 1 de cada simulado, sorteada a cada carregamento
const mk = (slug, tag, q, ok, errs, pos, why) => { const alt = errs.slice(); alt.splice(pos, 0, ok); return { slug, tag, q, alt, ok: pos, why }; };
const QZ = [
  mk('simulado-informatica-concurso', 'Informática',
    'Em uma planilha, a célula B2 contém a fórmula =A2*10%. Ao copiar B2 e colar em B3, a fórmula que passa a constar em B3 é:',
    '=A3*10%', ['=A2*10%', '=$A$2*10%', '=A3*10', '=B2*10%'], 1,
    'Ao copiar B2 para a linha de baixo, a referência relativa A2 avança uma linha e vira A3, e o 10% é mantido. =A2*10% só ocorreria se a referência não acompanhasse a cópia. =$A$2*10% é referência absoluta, que fica fixa ao copiar. =A3*10 troca 10% por 10, e a conta passa a multiplicar por 10. =B2*10% trocaria a coluna A pela coluna da própria fórmula, o que a cópia para baixo não faz.'),
  mk('simulado-portugues-concurso', 'Língua Portuguesa',
    'Assinale a alternativa em que o uso do sinal indicativo de crase está correto.',
    'A reunião começará às nove horas, no auditório.',
    ['Entreguei os documentos à todos os servidores do setor.', 'O ofício foi encaminhado à Vossa Senhoria na terça-feira.', 'Os candidatos foram à pé até o local da prova.', 'Prefiro o atendimento presencial à atendimento por telefone.'], 2,
    'Antes de horas determinadas, ocorre a fusão da preposição a com o artigo feminino as: às nove horas. Não há crase antes de pronome indefinido masculino (a todos), de pronome de tratamento (a Vossa Senhoria), em locução com palavra masculina (a pé) nem diante de substantivo masculino (a atendimento).'),
  mk('simulado-raciocinio-logico-matematica-500-questoes', 'Raciocínio Lógico',
    'Considere a afirmação: “Se o protocolo foi registrado, então o processo foi encaminhado.” Uma afirmação logicamente equivalente a ela é:',
    'Se o processo não foi encaminhado, então o protocolo não foi registrado.',
    ['Se o processo foi encaminhado, então o protocolo foi registrado.', 'Se o protocolo não foi registrado, então o processo não foi encaminhado.', 'O protocolo foi registrado ou o processo foi encaminhado.', 'O protocolo foi registrado se, e somente se, o processo foi encaminhado.'], 3,
    'A condicional “se p, então q” é equivalente à sua contrapositiva: se não q, então não p. A recíproca (se encaminhado, então registrado) e a inversa (se não registrado, então não encaminhado) são equivalentes entre si, mas não à original. “p ou q” tem outra tabela-verdade, e o bicondicional exige as duas implicações.'),
  mk('simulado-raciocinio-logico-matematica-nivel-dificil', 'Matemática',
    'O preço de um produto foi aumentado em 25%. Para que ele volte exatamente ao valor original, o novo preço deve sofrer um desconto de:',
    '20%', ['25%', '12,5%', '15%', '30%'], 4,
    'Com P como preço original, o novo preço é 1,25P. Para voltar a P, é preciso reduzir 0,25P sobre uma base de 1,25P, ou seja, 0,25 ÷ 1,25 = 0,20, que é 20%. O desconto de 25% incide sobre uma base maior e leva a 0,9375P, abaixo do original. Já 12,5% e 15% deixam o preço acima de P, e 30% o leva a 0,875P.'),
  mk('simulado-direito-constitucional-concurso', 'Direito Constitucional',
    'Assinale a alternativa que apresenta corretamente a finalidade do habeas data.',
    'Assegurar o conhecimento e permitir a retificação de informações da própria pessoa constantes de registros ou bancos de dados de caráter público.',
    ['Proteger a liberdade de locomoção ameaçada por ilegalidade ou abuso de poder.', 'Proteger direito líquido e certo não amparado por habeas corpus ou habeas data, violado por autoridade.', 'Suprir a falta de norma regulamentadora que inviabilize o exercício de direitos e liberdades constitucionais.', 'Anular ato lesivo ao patrimônio público ou à moralidade administrativa.'], 0,
    'O habeas data garante à pessoa o acesso a informações sobre si em registros ou bancos de dados de caráter público e a retificação desses dados. A proteção da liberdade de locomoção é o habeas corpus. A proteção de direito líquido e certo, nos termos descritos, é o mandado de segurança. A falta de norma regulamentadora é combatida pelo mandado de injunção, e a anulação de ato lesivo ao patrimônio público é objeto da ação popular.'),
  mk('simulado-direito-publico-redacao-oficial-concurso', 'Direito Administrativo',
    'No Direito Administrativo, o princípio da legalidade impõe ao agente público o dever de:',
    'agir somente nos limites e conforme o que a lei autoriza.',
    ['agir de acordo com o que a lei não proíbe, como ocorre com os particulares.', 'atuar segundo a conveniência da chefia imediata quando a lei for omissa.', 'dispensar a motivação dos atos discricionários por serem de livre escolha.', 'praticar atos sem previsão legal sempre que isso aumentar a eficiência do serviço.'], 3,
    'Para a Administração, a legalidade significa agir apenas de acordo com a lei e dentro do que ela permite. A regra de poder fazer tudo o que a lei não proíbe vale para os particulares, não para o agente público. A conveniência da chefia não substitui a lei, a discricionariedade existe dentro dos limites legais sem afastar a motivação, e a eficiência não autoriza atuar sem previsão legal.'),
  mk('simulado-assistente-administrativo-concurso', 'Arquivologia',
    'Na Secretaria Municipal de Vila Nova, os processos em andamento e os documentos de consulta frequente ficam no próprio setor que os produziu. Segundo a teoria das três idades, esses documentos estão na fase:',
    'Corrente, porque são consultados com frequência pelo setor que os produziu.',
    ['Intermediária, porque aguardam o cumprimento do prazo de guarda.', 'Permanente, porque têm valor histórico e devem ser preservados.', 'De eliminação, porque já cumpriram a finalidade para a qual foram criados.', 'Morta, porque saíram do uso administrativo e não são mais consultados.'], 0,
    'Documentos em uso frequente, mantidos no setor que os produziu, estão na fase corrente. Na fase intermediária, a consulta já é rara e eles aguardam o prazo de guarda previsto na tabela de temporalidade. Na permanente, ficam guardados por seu valor histórico. A eliminação é o destino de documentos sem valor de guarda, e “arquivo morto” não é uma fase da teoria das três idades.'),
  mk('simulado-tecnico-judiciario-concurso', 'Direito Penal',
    'Uma conduta praticada em 2024 não era considerada crime naquela data. Em 2025, uma nova lei passou a tipificá-la como crime. Em relação a quem a praticou em 2024, é correto afirmar que:',
    'não poderá ser punido, pois a lei que cria crime não retroage para atingir fatos anteriores à sua vigência.',
    ['será punido pela nova lei, pois a conduta continua sendo investigada.', 'será punido pela nova lei, desde que o juiz considere a conduta grave.', 'será punido pela nova lei, com a pena reduzida pela metade.', 'será punido por analogia com o crime mais parecido previsto na lei anterior.'], 1,
    'Vale o princípio da legalidade e da irretroatividade da lei penal mais severa: não há crime sem lei anterior que o defina, e a lei que cria crime só alcança fatos posteriores à sua vigência. A gravidade da conduta, a investigação em andamento e a redução de pena não autorizam retroagir. A analogia que prejudica o réu também é vedada em matéria penal.'),
  mk('simulado-concurso-bancario', 'Sistema Financeiro',
    'No Sistema Financeiro Nacional, é correto afirmar que o Banco Central do Brasil:',
    'cumpre e faz cumprir as normas do Conselho Monetário Nacional, fiscalizando as instituições financeiras.',
    ['é o órgão normativo máximo do sistema e define as diretrizes gerais da política monetária e de crédito.', 'regula e fiscaliza o mercado de valores mobiliários, como as bolsas de valores.', 'garante os depósitos dos clientes até um limite por meio de um fundo próprio.', 'emite as normas de seguros privados e fiscaliza as seguradoras.'], 4,
    'O Banco Central é órgão executor: cumpre e faz cumprir as normas do CMN e fiscaliza as instituições financeiras. O papel de principal órgão normativo é do Conselho Monetário Nacional. O mercado de valores mobiliários é supervisionado pela CVM. A garantia de depósitos é feita pelo Fundo Garantidor de Créditos (FGC), e os seguros privados são regulados pelo CNSP e fiscalizados pela Susep.'),
  mk('simulado-tecnico-enfermagem-concurso', 'Enfermagem',
    'Segundo as recomendações da OMS e da Anvisa para a higiene das mãos nos serviços de saúde, a higiene com água e sabonete é a técnica indicada quando:',
    'as mãos estiverem visivelmente sujas ou contaminadas com sangue e outros fluidos corporais.',
    ['as mãos estiverem sem sujidade visível e for realizar contato com o paciente.', 'as mãos estiverem sem sujidade visível e forem tocadas superfícies próximas ao paciente.', 'as luvas forem retiradas e as mãos estiverem sem sujidade visível.', 'as mãos estiverem sem sujidade visível antes do preparo de medicamentos.'], 2,
    'Quando há sujidade visível ou contaminação com sangue e outros fluidos corporais, a higiene deve ser feita com água e sabonete. Se as mãos não estão visivelmente sujas, a fricção com preparação alcoólica é suficiente e é a opção preferencial nas demais situações citadas: antes do contato com o paciente, após tocar o entorno, após retirar luvas e antes de preparar medicamentos.'),
].filter(z => P.some(p => p.slug === z.slug)).map(z => Object.assign(z, { nome: P.find(p => p.slug === z.slug).nome }));

const QUIZ = '<div class="box" id="quiz"><span class="tag" id="qt">Teste uma questão</span><p id="qe"></p><div id="qo"></div><div id="why" hidden></div></div><script>' +
  '!function(){var Z=' + JSON.stringify(QZ).replace(/</g, '\\u003c') + ',n=Z.length,L=-1;try{L=+localStorage.getItem("qz")}catch(e){}' +
  'if(!n)return;var i=Math.floor(Math.random()*n);if(n>1&&i===L)i=(i+1+Math.floor(Math.random()*(n-1)))%n;try{localStorage.setItem("qz",i)}catch(e){}' +
  'var z=Z[i],$=function(x){return document.getElementById(x)},o=$("qo"),w=$("why");$("qt").textContent="Teste uma questão · "+z.tag;$("qe").textContent=z.q;' +
  'z.alt.forEach(function(t,j){var b=document.createElement("button"),l=document.createElement("b");b.className="o";l.textContent="ABCDE".charAt(j);b.appendChild(l);b.appendChild(document.createTextNode(t));' +
  'b.onclick=function(){var bs=o.children;for(var k=0;k<bs.length;k++){bs[k].disabled=true;if(k===z.ok)bs[k].classList.add("ok");else if(k===j)bs[k].classList.add("bad")}' +
  'w.textContent=(j===z.ok?"Correto. ":"Não foi dessa vez. ")+z.why;var a=document.createElement("a"),d=document.createElement("div");a.className="btn sm";a.href="/"+z.slug+"/";a.textContent="Ver o simulado de "+z.nome;d.appendChild(a);w.appendChild(d);w.hidden=false};o.appendChild(b)})}()</script>';

function home() {
  const cargos = P.filter(p => p.tipo === 'Cargo'), mats = P.filter(p => p.tipo === 'Matéria');
  const body = '<section class="hero"><div><span class="tag">Nível médio · Simulados digitais</span><h1>Simulados para concursos de nível médio</h1>' +
    '<p class="lede">Aqui você encontra simulados prontos por cargo e por matéria, com 300 a 500 questões cada. Você compra pela Hotmart, baixa o arquivo e estuda no celular ou no computador, com resposta na hora e relatório por assunto.</p>' +
    '<p><a class="btn" href="#catalogo">Escolher meu simulado</a></p><p class="tag">' + BRL + ' cada · Sem cadastro · Funciona offline</p><ol class="st"><li>Escolha o cargo ou a matéria</li><li>Compre na Hotmart</li><li>Baixe e estude</li></ol></div>' + QUIZ + '</section>' +
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
    '<a class="btn" style="display:block" href="' + e(p.link) + '" target="_blank" rel="noopener">Comprar na Hotmart</a><p class="tag">Pagamento e entrega pela Hotmart. ' + AV.split(';')[0] + '.</p></aside></div><div class="sp"></div><div class="sbar"><div><b>' + BRL + '</b><br><span class="tag">' + n + ' questões · Hotmart</span></div><a class="btn" href="' + e(p.link) + '" target="_blank" rel="noopener">Comprar</a></div>';
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
