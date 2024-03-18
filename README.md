# SendFlow Challenge

## Overview
O SendFlow Challenge é uma aplicação web desenvolvida como parte de um desafio. A aplicação permite aos usuários enviar mensagens para contatos previamente cadastrados.

## Funcionalidades
- Autenticação de usuários
- Cadastro e gerenciamento de contatos
- Envio de mensagens para contatos cadastrados
- Recuperação de senha por e-mail

## Tecnologias Utilizadas
- [React](https://reactjs.org/) - Biblioteca JavaScript para construção de interfaces de usuário
- [Firebase](https://firebase.google.com/) - Plataforma de desenvolvimento de aplicativos da Google
  - Firebase Authentication - Para autenticação de usuários
  - Firebase Firestore - Para armazenamento de dados
  - Firebase Hosting - Para hospedagem do aplicativo web
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS utilitário para construção de interfaces

## Pré-requisitos
- Node.js e npm instalados
- Conta no Firebase com projeto configurado
- Chave da API do Firebase configurada como variável de ambiente

## Instalação
1. Clone o repositório:
   ```sh
   git clone https://github.com/seu-usuario/sendflow-challenge.git
   ```
2. Instale as dependências do projeto
    ```   
    cd sendflow-challenge
    npm install
    ```
## Configuração do Firebase
 - Crie um novo projeto no Firebase Console.
 - Ative a autenticação de e-mail/senha e o armazenamento do Firestore no console do Firebase.
 - Copie as credenciais do SDK do Firebase para o arquivo de configuração do seu projeto.
 - Configure as regras de segurança do Firestore de acordo com as necessidades do seu aplicativo.

## Execução

1. Inicie o servidor de desenvolvimento
   ```
   npm start
   ```
2. Acesse o aplicativo em :
  ```
  http://localhost:3000
  ``` 
## Aplicação

A Aplicação está disponível em :

https://sendflow-challenge.web.app/


## Contribuição
  Contribuições são bem-vindas! Sinta-se à vontade para abrir um PR ou reportar problemas.

## Licença

  Este projeto está licenciado sob a MIT License.  