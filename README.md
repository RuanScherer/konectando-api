# Konectando API

## Visão Geral
API desenvolvida para tratar os dados da aplicação [Konectando](https://github.com/RuanScherer/konectando-platform).

## Principais tecnologias utilizadas
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/pt-br/)
- [MySQL](https://www.mysql.com/)
- [Sequelize ORM](https://sequelize.org/)

## Como usar

### Requisitos
- [Node.js](https://nodejs.org)
- [Banco de dados MySQL](https://www.mysql.com/)

### Recomendação
Para poder utilizar todas as rotas da API é recomendado que seja usado algum client HTTP como o [Insomnia](insomnia.rest/) ou o [Postman](https://www.postman.com/).

### Instruções

#### Download via GitHub
- Baixe o código-fonte da aplicação diretamente no botão de download do GitHub.
- Extraia o arquivo .zip para um diretório de sua escolha.
- Abra o terminal e navegue até o diretório do projeto.
- Execute o comando `$ npm install` para instalar todas as dependências da aplicação.

#### Download via terminal
- Abra o terminal e navegue até o diretório que deseja alocar o projeto.
- Execute o comando `$ git clone https://github.com/RuanScherer/konectando-api.git` para clonar o repositório (é necessário possuir o [GIT](https://git-scm.com/) instalado).
- Execute o comando `$ npm install` para instalar todas as dependências da aplicação.

#### Configuração da base de dados
- Crie uma base de dados MySQL chamada `konectando`.
- Execute o comando `$ npx sequelize-cli db:migrate` para gerar a estrutura da base de dados.

#### Execução
- Execute o comando `$ npm run dev` para iniciar o servidor.
- O servidor deve estar disponível em `http://localhost:3333`.

Estou também no [Linkedin](https://www.linkedin.com/in/ruan-scherer/), conecte-se comigo! :rocket: