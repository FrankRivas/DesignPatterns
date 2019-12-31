<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Prerrequisites

- postman
- npm v6.12.1
- pgadmin4
- postgresql 11

## Installation

- Clone the repository

```bash
$ git clone https://github.com/FrankRivas/NestNewsApiv2
```

- Install dependencies

```bash
$ npm install
```

- Restore the database backup

- Configure .env file on the root directory of the project

- Configure ormconfig.json file on the root directory of the project

## Configuring .env File

### .env example file

#### #New York Time Variables

NYT_URL_BASE=https://api.nytimes.com/svc/search/v2/articlesearch.json?

NYT_URL_FILTERS=&sort=newest&fl=\_id, pub_date, snippet, web_url, byline, headline

NYT_KEY=[Your secret nyt key API]

#### #Guardian Variables

GUARDIAN_URL_BASE=https://content.guardianapis.com/search?

GUARDIAN_URL_FILTERS=&order-by=newest&show-fields=byline&show-tags=contributors

GUARDIAN_KEY=[Your secret guardian key API]

#### #NewsAPI Variables

GUARDIAN_URL_BASE=https://newsapi.org/v2/everything?

GUARDIAN_URL_FILTERS=&pageSize=10

GUARDIAN_KEY=[Your secret newsapi key]

#### #JWT Secret

SECRET_CODE_JWT=[Your secret token]

## Configuring ormconfig.json File

### ormconfig.json example file

{
"type": "postgres",
"host": "localhost",
"port": 5432,
"username": [Your username],
"password": [Your password],
"database": [Your database name],
"entities": ["dist/**/*.entity{.ts,.js}"],
"synchronize": true
}

## Restore Database

psql [DB name] < database/backup

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Getting token

In order to generate a token, you can use users from the database or create a new user

## Documentation

https://documenter.getpostman.com/view/3221284/SWLb8UW3

## Stay in touch

- Author - Francisco Rivas

## License

[MIT licensed](LICENSE).
