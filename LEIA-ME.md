# Questoteca: como publicar e manter o site

O site é gerado pelo `build.js` a partir do `produtos.json`. O Cloudflare roda o build sozinho a cada alteração no GitHub.

## 1. Colocar no ar (uma vez)

1. No GitHub: **New repository**, nome `questoteca`, público. Crie.
2. Na página do repositório: **Add file → Upload files**. Arraste os 3 arquivos (`build.js`, `produtos.json`, `LEIA-ME.md`) e clique em **Commit changes**.
3. No Cloudflare: **Workers & Pages → Create → Pages → Connect to Git**. Escolha o repositório `questoteca`.
4. Preencha:
   - **Project name:** `questoteca`
   - **Framework preset:** None
   - **Build command:** `node build.js`
   - **Build output directory:** `dist`
5. **Save and Deploy**. Em cerca de 1 minuto o site abre em `questoteca.pages.dev`.
   - Se o endereço sair diferente (por exemplo `questoteca-abc.pages.dev`), troque o campo `url` no topo do `produtos.json` pelo endereço real. Isso vale para o sitemap e para os endereços canônicos.

## 2. Conferir antes de divulgar

- Abra o site no celular e toque em **Comprar na Hotmart** em cada um dos 10 produtos. Confirme o produto certo, **R$ 9,98** e **Pix e boleto**.
- Abra `/sitemap.xml` e `/robots.txt` no navegador.

## 3. Google Search Console

1. Em search.google.com/search-console, **Adicionar propriedade → Prefixo do URL**, com o endereço do site.
2. Escolha a verificação **Tag HTML** e copie só o valor do `content="..."`.
3. Cole esse valor no campo `verificacao` do `produtos.json` e faça o commit. Espere o deploy e clique em **Verificar**.
4. Em **Sitemaps**, envie `sitemap.xml`.
5. Volte em 4 a 8 semanas e veja por quais buscas o site aparece.

## 4. Adicionar assuntos a um produto

No `produtos.json`, preencha a lista do produto. Enquanto estiver vazia, a seção não aparece.

```json
"assuntos": ["Concordância verbal", "Crase", "Interpretação de texto"]
```

Use só o que o simulado realmente traz.

## 5. Adicionar um produto novo (cerca de 5 minutos)

Copie um bloco de produto, cole logo depois (com vírgula entre os blocos) e troque:
`slug` (endereço, sem acento e com hífens), `nome`, `tipo` ("Cargo" ou "Matéria"), `nivel`, `questoes`, `cor` e `link`.
Faça o commit. O produto aparece na página inicial, ganha página própria e entra no sitemap.

## 6. Editar pelo navegador

No GitHub, abra `produtos.json`, clique no lápis, edite e clique em **Commit changes**. Se houver erro de vírgula ou aspas, o build falha e o site anterior continua no ar. O erro aparece em Cloudflare → Deployments.

## 7. Domínio próprio (depois, se quiser)

Registre o domínio no Registro.br e ligue ao projeto em Cloudflare Pages → Custom domains. Troque o `url` do `produtos.json` pelo novo endereço.

## Cuidados

- Use nomes de bancas e instituições só de forma descritiva, com o cargo em destaque (ex.: "Técnico do Seguro Social (INSS)"). Sem logos e sem "oficial".
- Não prometa aprovação.
- Confirme a taxa atual da Hotmart no painel antes de montar combos.
