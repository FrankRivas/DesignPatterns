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
$ git clone https://github.com/FrankRivas/DesignPatterns.git
```

- Install dependencies

```bash
$ npm install
```

- Restore the database backup

- Configure .env file on the root directory of the project

## Restore Database

psql [DB name] < database/backup

## Running the app

```bash
# development
$ npm run start

# watch mode (recommended)
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Getting token

In order to generate a token, you can use users from the database or create a new user

## Documentation

https://documenter.getpostman.com/view/3221284/SWLb8UW3

## Stay in touch

- Author - Francisco Rivas

## License

[MIT licensed](LICENSE).

## Homework Questions

### First Part

1. Which patterns does Nest.JS use? Why? How are they implemented?

- Singleton
- Chain of Responsability
- Decorator
- Factory Method
- Dependency Injection

2. Which patterns can be used on your application? How those patterns could be implemented?

- Singleton
- Chain of Responsability
- Decorator
- Factory Method
- Dependency Injection
- Repository
- Strategy
- Observer
- Iterator

3. Explain in your own words, what an antipattern is. Also, explain how to implement the Dependency Injection pattern in Typescript (with an example)

An anti-pattern is a way to solve problems, however, generally, this way in which we solve a given problem can lead to more problems when trying to maintain the application, so it could be said that the application does not it can be scalable or this process would have greater difficulty than it would have when having implemented the correct design patterns.

#### Dependency Inyection Example

```typescript
// class x

// class y
```

### Second Part

1. Implement at least 2 design patterns in your API (the ones implemented by Nest.js won't be taken into account). Why did you use them?

- Strategy Design Pattern
- Decorator Design Pattern
- Repository Design Pattern

2. Remove all antipatterns that you can found on your API side. Why did you think it is an antipattern?

Anti patterns removed

- The lava flow: Within some files it had code fragments that were not used, specifically, within the pipes folder, there was a pipe that was not used in the application, likewise, within the app it had also kept the files generated by default by nest. To correct this anti pattern, I removed all the code blocks that were not used as well as all those default nest files that had no purpose within the api

- The blob: Some .service files contained code that had no relation to the main purpose of the class, for example in the usernews.service.ts file there were two functions that transformed data after querying the database, this also made the file become extensive, exceeding 100 lines of code. To correct this anti pattern, I extracted the data transformation functions and placed them in a class whose purpose is to perform the transformation, thereby reducing the lines of code and separating the responsibilities.

- Cut and Paste: For the validation of the payloads of the POST that were carried out to the api had created DTO classes and validation pipes for each variant, the validation pipe had similar code, whose only variation was the type of Dto it received. To solve this anti pattern, use the ValidationPipe that provides nest by default, removing all the pipes and only using the dto

3. Which patterns did you use? Which antipatterns did you remove? (if any)

Design Pattern Used

Provided by Nest

- Singleton
- Chain of Responsability
- Decorator
- Factory Method
- Dependency Injection

Others

- Repository
- Strategy
- Observer
- Iterator

Anti-Patterns Removed

- Lava Flow
- The Blob
- Cut and Paste
