# API NodeJS + MySQL
API em NodeJS consumindo do banco de dados MySQL

Recursos da API:
  - Listagem de Conteúdos
  - Criação de Conteúdos
  - Atualização de Conteúdos
  - Remoção de Conteúdos
  - Autenticação com JWT

# Endpoints
  - /highlight - Retorna os conteúdos de destaque
  - /projects - Retorna todos os projetos
  - /projects/related/:idSection/:idProject - Retorna projetos relacionados com o projeto selecionado
  - /section - Retorna todas as seções dos projetos
  - /section/:slugSection - Retorna uma seção
  - /:slugProject - Retorna um projeto

### Utilização
Instalação dos pacotes necessários para execução da API

```sh
$ npm install
```

Criar a estrutura do banco de dados MySQL com o arquivo structure-database.sql
- Em desenvolvimento api-portfolio-test
- Em produção api-portfolio

Execução no modo DEV

```sh
$ npm run dev
```

### Testes
Abaixo o comando para executar os testes unitários na API.
```sh
$ npm test
```