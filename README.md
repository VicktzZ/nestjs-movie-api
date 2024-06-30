<h1 align="center">Movies Catalog API</h1>

## Description

A API about a movies catalog developed with [Nest](https://github.com/nestjs/nest) framework.
Technologies used:
- **TypeScript**;
- **Nestjs**;
- **TypeORM**;
- **Swagger**;
- **Class Validator**;
- **Docker**;
- **Redis**;
- **Bcrypt**;
- **Fakerjs**;
- **PostgreSQL**.

## Installation

```bash
$ npm install
```

or

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Build and Run with Docker

```bash
$ docker compose up -d db
$ docker compose build
$ docker compose up
```
