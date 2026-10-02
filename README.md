# JSB Soluções Ambientais — Site Institucional

Estrutura inicial de site estático, pronta para GitHub Pages.

## Estrutura

```text
/
├── index.html
├── style.css
├── script.js
├── 404.html
├── robots.txt
├── sitemap.xml
├── .gitignore
├── README.md
└── assets/
    └── img/
        └── favicon.svg
```

## Como publicar no GitHub Pages

1. Crie ou abra o repositório no GitHub.
2. Envie **o conteúdo desta pasta**, mantendo `index.html` na raiz.
3. Vá em **Settings → Pages**.
4. Em **Build and deployment**, selecione:
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/ (root)`
5. Clique em **Save**.
6. Aguarde alguns minutos.

Se o repositório for `Site`, o endereço ficará parecido com:

`https://SEU-USUARIO.github.io/Site/`

## Antes de publicar

Edite `index.html` e troque:

- E-mail
- WhatsApp
- Cidade/região de atendimento
- Textos institucionais
- Serviços
- Links de política de privacidade e termos de uso

## Imagens

Você pode adicionar fotos em:

`assets/img/`

Exemplo:

`assets/img/hero.jpg`

Depois, use a imagem no CSS ou HTML.

## Domínio próprio

Quando quiser conectar `jsbsolucoesambientais.com.br`, configure primeiro o site no GitHub Pages e depois adicione o domínio em **Settings → Pages → Custom domain**. Também será necessário ajustar o DNS no provedor do domínio.

## Observação

O formulário de contato não possui backend nesta versão. Os botões utilizam e-mail e WhatsApp. Isso deixa o site simples, rápido e compatível com GitHub Pages.
