# Plataforma de Reservas - API RESTful

Este projeto implementa uma **API RESTful** para uma plataforma de reservas de serviços. Clientes podem reservar serviços oferecidos por prestadores de serviço. A API também inclui funcionalidades de autenticação, autorização e gerenciamento de usuários e reservas.

## Funcionalidades

### Funcionalidades Básicas
1. **Cadastro de Usuários**
   - Usuários podem se cadastrar com nome completo, NIF (Número de Identificação Fiscal), e-mail e senha.
   - O sistema permite dois tipos de usuários: **Cliente** e **Prestador de Serviço**.
   - NIF e e-mail são únicos para cada usuário.

2. **Autenticação e Autorização**
   - A API utiliza **JWT (JSON Web Tokens)** para autenticação de usuários.
   - Usuários devem fazer login para acessar as funcionalidades da API.
   
3. **Gerenciamento de Serviços**
   - Prestadores de serviço podem cadastrar e gerenciar os serviços que oferecem.
   - Cada serviço tem um nome, descrição, preço e prestador de serviço associado.

4. **Reserva de Serviços**
   - Clientes podem realizar reservas em serviços oferecidos por prestadores.
   - Antes de fazer uma reserva, o sistema verifica se o cliente tem saldo suficiente.
   - O saldo do cliente é descontado após a reserva e o saldo do prestador é atualizado.

### Funcionalidades Avançadas
1. **Histórico de Reservas**
   - O sistema mantém um histórico de todas as reservas feitas pelos clientes.

2. **Validações**
   - O sistema valida as permissões dos usuários antes de permitir a criação, atualização ou cancelamento de reservas.
   - O saldo do cliente é atualizado de forma atômica para garantir consistência no banco de dados.

## Tecnologias Usadas

- **Node.js**: Ambiente de execução JavaScript no lado do servidor.
- **NestJS**: Framework progressivo para construir aplicações de servidor eficientes e escaláveis.
- **Sequelize**: ORM para integração com banco de dados SQL.
- **JWT (JSON Web Tokens)**: Para autenticação e autorização de usuários.
- **Mysql**: Banco de dados utilizado para armazenar os dados da aplicação.
- **Bcrypt**: Para criptografar as senhas dos usuários.

## Estrutura do Projeto

A estrutura do código está organizada da seguinte forma:

```bash
src/
│
├── auth/                # Módulo de autenticação
│
├── users/               # Módulo de gerenciamento de usuários
│
├── services/            # Módulo de serviços oferecidos
│
├── reservations/        # Módulo de reservas de serviços
│
|--- app.module.ts
└── main.ts              
```

## Configuração do Ambiente

### 1. Clone o repositório:

```bash
git clone https://github.com/sombo20/backend-bulir-teste
cd backend-bulir-teste
```

```bash
$ create .env file and copy .env.sample information
```

# documentation import postaman file 

```bash
  bulir-backend.postman_collection.json
````

## Compile and run the project

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Rodar Testes

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```
