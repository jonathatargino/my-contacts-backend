# MyContacts - backend

Este repositório funciona em conjunto com o <a href="https://github.com/jonathatargino/my-contacts-frontend">MyContacts Frontend<a>, atuando como backend da aplicação.

## Como executar o server
### Pré-requisitos
- git 
- Node.js
- NPM ou Yarn
- API no google cloud
- Postgresql

### Variáveis de Ambiente
Além das ferramentas anteriores é necessária criar um arquivo que conterá as váriaveis de ambiente da aplicação, o  .env, na raiz do projeto e adicionar as seguintes variáveis:

- PORT: Porta que do localhost que o servidor irá ouvir. Exemplo: 5000
- FRONTEND_URL: URL do em que o frontend estará rodando. Exemplo: http://localhost:3000
- PGUSER: Seu usuário do postgresql
- PGDATABASE: O nome do banco de dados usado na aplicação. Por padrão, como está contido no schema, está definido como "mycontacts"
- PGPASSWORD: A senha do seu postgresql
- PGPORT: A porta em que seu postgresql está executando. Exemplo: 5432
- CLIENT_ID: O ID provido nas credenciais da sua API do google cloud
- CLIENT_SECRET: O secret provido nas credenciais da sua API do google cloud


### Instalação
```
# Abra o terminal e copie este repositório com o comando
$ git clone https://github.com/jonathatargino/my-contacts-backend.git

# Acesse a pasta do projeto no editor de texto de sua preferencia 
$ code my-contacts-backend

# Instale as dependências
yarn install
ou
$ npm install

# Crie um arquivo .env e adicione as variáveis de ambientes citadas acima

# Execute a aplicação
$ yarn dev
ou
$ npm run dev
```

## 🚀 Tecnologias 
Tecnologias utilizadas para desenvolver o projeto:
- Node.js
- Express.js
- Passport.js
- Typescript

## 🦸‍♂️ **Autor**

<p>
 <sub><strong>🌟 Jonatha Targino🌟</strong></sub>
</p>

>Este projeto foi desenvolvido com ❤️ por **[Jonatha Targino](https://github.com/jonathaTargino)**

