# Storybook

[![Linkedin Badge](https://img.shields.io/badge/-LinkedIn-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/felps03)](https://www.linkedin.com/in/felps03/)

## Descrição do projeto

Este projeto é uma POC (prova de conceito) de utilização do [Storybook](https://storybook.js.org/) com React, criada para demonstrar componentização e desenvolvimento isolado de UI.

## Objetivo

Servir como exemplo mínimo e didático de como estruturar componentes React documentados no Storybook — sem a complexidade de uma aplicação completa.

## Funcionalidade

✅ Componentização do `Button`, com variações de cor e estado, documentadas via Storybook.

## Stack utilizada

- [React 19](https://react.dev/)
- [Storybook 10](https://storybook.js.org/) com o framework [`@storybook/react-vite`](https://storybook.js.org/docs/get-started/frameworks/react-vite)
- [Vite](https://vite.dev/) como bundler
- JavaScript (sem TypeScript)

> Este projeto não tem mais uma aplicação React "standalone" (o `create-react-app` original foi removido) — ele existe apenas para rodar o Storybook e documentar componentes.

## Pré-requisitos

- [Node.js 24 (LTS)](https://nodejs.org/en/download/) — versão fixada em [`.nvmrc`](./.nvmrc). Se você usa [nvm](https://github.com/nvm-sh/nvm), rode `nvm use` na raiz do projeto.
- npm (instalado junto com o Node)

## Como instalar

```bash
# Clone o repositório
$ git clone https://github.com/Felps03/storybook

# Entre na pasta
$ cd storybook

# Use a versão de Node recomendada (opcional, requer nvm)
$ nvm use

# Instale as dependências
$ npm install
```

## Como rodar o Storybook

```bash
$ npm run storybook
```

O Storybook sobe em `http://localhost:9009`.

## Visualização do projeto

<img src="https://raw.githubusercontent.com/Felps03/storybook/master/tmp/storyboo.gif">

## Como gerar o build do Storybook

```bash
$ npm run build-storybook
```

O resultado é gerado na pasta `storybook-static/`, pronta para ser publicada como site estático.

## Como rodar os testes

O projeto usa [`@storybook/addon-vitest`](https://storybook.js.org/docs/writing-tests/integrations/vitest-addon) para rodar as próprias stories como testes (via Vitest + Playwright, em um Chromium real e headless). Toda story roda como teste automaticamente; stories com uma função `play` (como `ClickInteraction` do `Button`) também têm suas interações simuladas e verificadas.

```bash
# Na primeira vez, baixe o navegador usado pelos testes
$ npx playwright install chromium

$ npm run test-storybook
```

## CI e deploy

- `.github/workflows/ci.yml`: em todo push/PR para `master`, instala dependências, builda o Storybook e roda os testes (`test-storybook`).
- `.github/workflows/deploy.yml`: em todo push para `master`, gera o build estático e publica no GitHub Pages.

> O deploy no GitHub Pages exige habilitar isso uma vez em **Settings → Pages → Source: GitHub Actions** no repositório. O workflow já está pronto, mas essa configuração de repositório não é feita por código.

## Estrutura de pastas

```
.
├── .github/workflows/   # CI (build + testes) e deploy no GitHub Pages
├── .storybook/          # Configuração do Storybook (main.js, preview.js)
├── src/
│   └── components/
│       └── Button/        # Um componente por pasta
│           ├── index.jsx          # Implementação do componente
│           ├── index.stories.jsx  # Stories do componente
│           └── styles.css         # Estilos do componente
├── vite.config.js       # Configuração do Vite (builder usado pelo Storybook)
├── vitest.config.js     # Configuração dos testes (Vitest + addon-vitest)
└── package.json
```

## Como criar um novo componente

1. Crie uma pasta em `src/components/<NomeDoComponente>/`.
2. Adicione `index.jsx` com a implementação e `PropTypes` para validar as props.
3. Se precisar de estilos, adicione um `styles.css` e importe no componente.
4. Crie a story correspondente (veja a seção abaixo).

> Use extensão `.jsx` (não `.js`) em qualquer arquivo que contenha JSX — o Vite só reconhece JSX em arquivos `.jsx`/`.tsx` por padrão.

## Como criar uma nova story

Crie um arquivo `index.stories.jsx` dentro da pasta do componente, seguindo o padrão CSF3:

```javascript
import MeuComponente from '.';

export default {
  title: 'Components/MeuComponente',
  component: MeuComponente,
  tags: ['autodocs'],
  args: {
    // props padrão usadas em todas as stories
  },
};

export const Default = {};

export const OutraVariacao = {
  args: {
    // props específicas dessa variação
  },
};
```

A tag `autodocs` gera a documentação do componente automaticamente a partir do próprio código — comentários acima do componente e de cada prop em `PropTypes` aparecem na aba "Docs" do Storybook (veja o exemplo em `src/components/Button/index.jsx`).

Para testar interações (cliques, digitação), adicione uma função `play` à story, usando os utilitários de `storybook/test`:

```javascript
import { expect, fn, userEvent, within } from 'storybook/test';

export const MinhaInteracao = {
  args: { onClick: fn() },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button'));
    await expect(args.onClick).toHaveBeenCalled();
  },
};
```

## O que foi modernizado

Este projeto era originalmente uma POC de 2020, criada com `create-react-app` e Storybook 5. A modernização envolveu:

- Node.js atualizado para a versão 24 (LTS).
- Storybook atualizado de 5.3.19 para 10.4.6 (reconfigurado do zero com `@storybook/react-vite`, em vez de migração incremental major a major, já que o preset antigo `@storybook/preset-create-react-app` não existe mais nas versões atuais).
- React e ReactDOM atualizados de 16 para 19.
- `create-react-app`/`react-scripts` removido (projeto descontinuado pela equipe do React) — o projeto passou a existir só para rodar o Storybook, sem uma aplicação standalone.
- Addons descontinuados removidos: `addon-knobs` (substituído por `args`/`argTypes`/Controls), `addon-notes` (substituído por `autodocs`), `addon-actions` e `addons` (funcionalidades incorporadas ao core do Storybook).
- Story do `Button` reescrita em CSF3, com variações `Default`, `Error`, `Disabled`, `Sizes` e `ClickInteraction`.
- `prop-types` adicionado como dependência explícita (antes era usado no código, mas não estava declarado no `package.json`).
- Configurações obsoletas removidas: `browserslist` (não é mais lido por nenhuma ferramenta do projeto), `eslintConfig` (dependia do `react-scripts`), lockfile duplicado (`yarn.lock` removido, `npm` como gerenciador único).
- Prop `size` (`small`/`medium`/`large`) adicionada ao `Button`.
- Testes de interação com `@storybook/addon-vitest` (Vitest + Playwright), rodando as próprias stories como testes.
- CI (`ci.yml`) validando build e testes a cada push/PR, e deploy automático do Storybook no GitHub Pages (`deploy.yml`).

## Possíveis próximos passos

- Adicionar ESLint (flat config) e um script `lint`, caso o projeto cresça e passe a ter múltiplos colaboradores.
- Adicionar `@storybook/addon-a11y` para checagem automática de acessibilidade nas stories.
- Adicionar mais componentes ao design system, seguindo o mesmo padrão de pasta usado pelo `Button`.
- Considerar TypeScript, caso o projeto cresça e a validação de tipos em runtime (`prop-types`) deixe de ser suficiente.

## Desenvolvedor

[<img src="https://avatars3.githubusercontent.com/u/12463786?s=460&u=b207ef729d05bef11262e4f11f26c11248284e46&v=4" width=115><br><sub>Felipe Santos</sub>](https://www.linkedin.com/in/felps03/)
