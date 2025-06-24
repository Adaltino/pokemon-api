# Pokémon Teams API

API RESTful construída com [NestJS](https://nestjs.com/) para gerenciamento de times de Pokémon criados por Treinadores. A aplicação integra-se com a [PokéAPI](https://pokeapi.co/) para obter os dados oficiais dos Pokémon.

---

## Tecnologias

- [NestJS](https://nestjs.com/) – Framework principal
- [TypeScript](https://www.typescriptlang.org/)
- [TypeORM](https://typeorm.io/) – ORM
- [PostgreSQL](https://www.postgresql.org/) – Banco de dados
- [Docker](https://www.docker.com/) & Docker Compose
- [Swagger](https://swagger.io/) – Documentação de API
- [PokéAPI](https://pokeapi.co/) – API pública de dados de Pokémon

---

## Funcionalidades

### Treinador (Trainer)
- Criar, visualizar, atualizar e remover treinadores
- Cada treinador pode ter múltiplos times

### Time (Team)
- CRUD completo de times
- Um time pertence a um treinador
- Listagem de times por treinador

### Gerenciamento de Pokémon nos Times
- Adicionar um Pokémon ao time (validando com a PokéAPI)
- Remover um Pokémon do time
- Listar os Pokémon de um time com **detalhes enriquecidos**: nome, tipos, sprite
- Limite de 6 Pokémon por time

---

## Arquitetura

- **Modularização** em camadas: `controllers`, `services`, `dtos`, `entities`
- **Validação** com `class-validator` e `class-transformer`
- **Integração externa** com serviço dedicado: `PokeApiService`
- **Swagger** para documentação automática da API
- **Ambiente isolado com Docker e PostgreSQL**

---


### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/pokemon-api.git
cd pokemon-api
```
### 2. Como rodar o projeto com Docker
```bash
docker compose build
docker compose up
```

Para parar o projeto

```bash
docker compose down
```

### 3. Como rodar o projeto local

#### Pré-requisitos

- **Node.js** v18 ou superior (recomendado: `24.2.0`)
- **PostgreSQL** instalado e em execução (recomendado: `15`)
- **NestJS CLI** global:

  ```bash
  npm install -g @nestjs/cli
  ```
  Configure o Banco de Dados PostgreSQL

  Crie o banco e o usuário:

  ```bash
  CREATE DATABASE "pokemon-api-db";
  CREATE USER postgres WITH ENCRYPTED PASSWORD 'postgres';
  GRANT ALL PRIVILEGES ON DATABASE "pokemon-api-db" TO postgres;
  ```
    
  Instale as dependências

  ```bash
  npm install
  ```
  Inicie o servidor
  
  ```bash
  npm run start:dev
  ```


### Documentação da API
Acesse o Swagger: http://localhost:3000/api-docs