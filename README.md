# Movies Catalog API

A REST API for a movie catalog with user accounts and JWT authentication,
built with NestJS for a backend coding challenge.

## Features

- CRUD for movies and users
- Authentication with Passport: a local strategy for login and a JWT strategy
  protecting every other route
- Passwords hashed with bcrypt
- Request validation with class-validator; unknown properties are stripped
- Response caching through Nest's cache interceptor
- Interactive Swagger documentation served at the root path
- Seed endpoints that generate random users and movies with Faker
- Docker Compose setup with PostgreSQL

## Endpoints

| Method | Path | Auth | Description |
| --- | --- | --- | --- |
| POST | `/auth/login` | none | Exchange credentials for a JWT |
| GET | `/auth/status` | JWT | Return the authenticated user |
| POST | `/users` | none | Register a user |
| GET | `/users` | JWT | List users |
| GET | `/users/:id` | JWT | Get a user |
| PATCH | `/users/:id` | JWT | Update a user |
| DELETE | `/users/:id` | JWT | Delete a user |
| POST | `/users/create_random` | JWT | Create a random user |
| POST | `/movies` | JWT | Create a movie |
| GET | `/movies` | JWT | List movies |
| GET | `/movies/:id` | JWT | Get a movie |
| PATCH | `/movies/:id` | JWT | Update a movie |
| DELETE | `/movies/:id` | JWT | Delete a movie |
| POST | `/movies/create_random` | JWT | Create a random movie |

## Stack

NestJS 10, TypeScript, TypeORM, PostgreSQL, Passport (local and JWT), Swagger,
cache-manager, Docker.

## Running with Docker

```bash
docker compose up -d db
docker compose build
docker compose up
```

The API listens on port 3000; open `http://localhost:3000` for the Swagger UI.

## Running without Docker

```bash
pnpm install
pnpm run start:dev
```

Set the database connection in `.env`:

| Variable | Example |
| --- | --- |
| `DB_TYPE` | `postgres` |
| `PG_HOST` | `localhost` |
| `PG_PORT` | `5432` |
| `PG_USER` | `postgres` |
| `PG_PASSWORD` | `postgres` |
| `PG_DB` | `postgres` |
| `DB_SYNCHRONIZE` | `true` (development only) |

## Tests

```bash
pnpm run test
pnpm run test:e2e
```

Test files are scaffolded for every controller and service; meaningful
assertions are still to be written.

## Project layout

```
src/auth/     Login, guards, Passport strategies
src/users/    User entity, DTOs, controller, service
src/movies/   Movie entity, DTOs, controller, service
test/         End-to-end test setup
```
