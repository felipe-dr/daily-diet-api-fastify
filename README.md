<p align="center">
  <img src="https://avatars.githubusercontent.com/u/28929274?s=200&v=4" alt="Rocketseat" />
  <hr>
  <h1 align="center">Desafio 02 Criando API Rest com Node.js</h1>
  <p align="center">Projeto desenvolvido durante a formação <strong>Node.js</strong> da Rocketseat.</p>
</p>

<p align="center">
  <img src="https://img.shields.io/github/repo-size/felipe-dr/daily-diet-api-fastify?style=for-the-badge&color=4e5acf" alt="Repo size" />
  <a aria-label="Last Commit" href="https://github.com/felipe-dr/daily-diet-api-fastify/commits/main">
    <img src="https://img.shields.io/github/last-commit/felipe-dr/daily-diet-api-fastify?style=for-the-badge&color=4e5acf" alt="Last commit on GitHub" />
  </a>
  <!-- <img src="https://img.shields.io/badge/license-MIT-4e5acf?style=for-the-badge" alt="License" /> -->
  <img src="https://img.shields.io/badge/status-in_progress-blue?style=for-the-badge" alt="Status" />
</p>

<br>

<p align="center">
  <a target="_blank" href="https://fastify.dev/">
    <img src="https://img.shields.io/static/v1?style=plastic&color=red&label=Fastify&message=TS&logo=fastify" alt="Fastify" />
  </a>
  <a target="_blank" href="https://www.typescriptlang.org/">
    <img src="https://img.shields.io/static/v1?style=plastic&color=red&label=Typescript&message=TS&logo=typescript" alt="Typescript" />
  </a>
  <a target="_blank" href="https://zod.dev/">
    <img src="https://img.shields.io/static/v1?style=plastic&color=red&label=Zod&message=TS&logo=zod" alt="Zod" />
  </a>
  <a target="_blank" href="https://eslint.org/">
    <img src="https://img.shields.io/static/v1?style=plastic&color=red&label=ESLint&message=JS&logo=eslint" alt="ESLint" />
  </a>
  <a target="_blank" href="https://vitest.dev/">
    <img src="https://img.shields.io/static/v1?style=plastic&color=red&label=Vitest&message=TS&logo=vitest" alt="Vitest" />
  </a>
  <a target="_blank" href="https://www.npmjs.com/package/supertest">
    <img src="https://img.shields.io/static/v1?style=plastic&color=red&label=Supertest&message=TS&logo=supertest" alt="Supertest" />
  </a>
</p>

<p align="center">
  <a target="_blank" href="https://knexjs.org/">
    <img src="https://img.shields.io/static/v1?style=plastic&color=yellow&label=Knex&message=QueryBuilder&logo=knex" alt="Knex" />
  </a>
</p>

## Índice

<ol>
  <li><a href="#sobre">Sobre</a></li>
  <li><a href="#requisitos-e-funcionalidades">Requisitos e funcionalidades</a></li>
  <li><a href="#como-executar">Como executar</a></li>
  <li><a href="#tecnologias">Tecnologias</a></li>
  <li><a href="#autor">Autor</a></li>
</ol>

## Sobre

API desenvolvida do desafio 02 em Node.js com o Fastify e Typescript, afim de se gerenciar a dieta diária.

## Requisitos e funcionalidades

### Funcionais

- [x] Deve ser possível criar um usuário
- [x] Deve ser possível registrar uma refeição feita, com as seguintes informações:
  - Nome
  - Descrição
  - Data e Hora
  - Está dentro ou não da dieta
  > *As refeições devem ser relacionadas a um usuário.*
- [x] Deve ser possível editar uma refeição de um usuário, podendo alterar todos os dados acima
- [x] Deve ser possível apagar uma refeição de um usuário
- [x] Deve ser possível listar todas as refeições de um usuário
- [x] Deve ser possível visualizar uma única refeição de um usuário
- [x] Deve ser possível recuperar as métricas de um usuário
  - Quantidade total de refeições registradas
  - Quantidade total de refeições dentro da dieta
  - Quantidade total de refeições fora da dieta
  - Melhor sequência de refeições dentro da dieta

### Négocios

- [x] Deve ser possível identificar o usuário entre as requisições
- [x] O usuário só pode visualizar, editar e apagar as refeições as quais ele criou

## Como executar

Se estiver utilizando outro gerenciador de pacotes, basta trocar o `pnpm` por `npm`, `yarn`, etc.

### Pré-requisitos

Instalar as dependências do projeto.

```bash
pnpm install
```

### Testes

Criar arquivo `.env.test` na raiz do projeto.

```text
DATABASE_CLIENT=sqlite
DATABASE_URL="./db/test.db"
```

Executar os testes.

```bash
pnpm test
```

### Localmente

Criar arquivo `.env` na raiz do projeto.

```text
NODE_ENV=development
DATABASE_CLIENT=sqlite
DATABASE_URL="./db/app.db"
```

Executar as `migrations`.

```bash
pnpm knex migrate:latest
```

Executar a aplicação.

```bash
pnpm dev
```

## Tecnologias

- [Node.js](https://nodejs.org/en)
- [Fastify](https://fastify.dev/)
- [Typescript](https://www.typescriptlang.org/)
- [Zod](https://zod.dev/)
- [ESLint](https://eslint.org/)
- [Vitest](https://vitest.dev/)
- [Supertest](https://www.npmjs.com/package/supertest)
- [Knex](https://knexjs.org/)

> **DICA !**
>
> Todas as demais dependências utilizadas podem ser visualizados acessando o [package.json](./package.json).

## Autor

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/felipe-dr">
        <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/62888625?s=96&v=4" width="100px;" alt="Avatar do autor" />
        <br />
        <sub>
          <b>Felipe DR</b>
        </sub>
      </a>
      <br />
      <a href="mailto:felipe.corp7@gmail.com" title="E-mail">📩</a>
    </td>
  </tr>
</table>
