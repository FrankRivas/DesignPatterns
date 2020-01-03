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

- Singleton: Nest uses singleton in the instantiation of each of the components of the application, among which providers are mentioned, the different imports that are made in the different modules, among others.
- Chain of Responsibility: It is implemented in some scenarios, such as in middleware, since these may or may not perform an operation if appropriate or go to the next one, another case in which it is used is when the components of the api and nest goes looking for how to meet the different dependencies defined.
- Decorator: Nest uses decorators to perform different actions within the program, these decorators allow the use of middlewares, definition of classes of injectable type, entity, among others.
- Factory Method: It is used at the time of creation of the application instance within the main.ts file
- Dependency Injection: Nest uses dependency injection in the different providers that are defined within each module

2. Which patterns can be used on your application? How those patterns could be implemented?

- Singleton
- Chain of Responsability
- Decorator
- Factory Method
- Dependency Injection

The patterns mentioned above will be implemented in the way nest does by default.

- Repository: It will be implemented using TypeOrmModule, creating custom repositories, which will extend from the different repositories managed by the TypeORM, said repositories will be used to separate the data access logic from the services logic, the new custom repositories will be used instead of those provided by TypeOrmModule.
- Strategy: It will be implemented in two cases: in the first, making use of the different authentication strategies managed by the Passport library, in the second case, the implementation will be carried out within the news search functionality in third-party apis, having as a premise that each type of search would represent a search strategy, for its implementation, 3 strategy files will be created, 1 file to handle the context of the strategy, 1 file for interface management and the service that will be responsible for managing The context class.

- Observer
- Iterator

The patterns mentioned above (Observer and Iterator) will be implemented through the rxjs library, within the functionality of consulting the news apis, nest works in conjunction with rxjs, so when using the http module and consulting the different apis, they return objects observables, which are subsequently iterated and treated to be able to display the information extracted from the api

3. Explain in your own words, what an antipattern is. Also, explain how to implement the Dependency Injection pattern in Typescript (with an example)

An anti-pattern is a way to solve problems, however, generally, this way in which we solve a given problem can lead to more problems when trying to maintain the application, so it could be said that the application does not it can be scalable or this process would have greater difficulty than it would have when having implemented the correct design patterns.

#### Implementing Dependency Inyection

To implement the dependency injection, it is necessary to have two classes, of which one will be injected to the other, said injection can be done through the constructor or through a function that performs the injection.
The class that will receive the injection of dependencies, must have an attribute whose type corresponds to the second class in question and may have a constructor that receives as a parameter the second class, if the constructor is owned, the injection of dependencies will be carried out through the , if you don't have a builder, you must have a function that allows this action.
The method mentioned above is to perform a simple dependency injection.

To make a more robust dependency injection, we can use an interface, which will be used by both classes, in the first class (the one that will receive the dependency injection), that interface will be used to assign it as the type of its attribute in the which injection of dependencies will be saved. In the second class (the one that will be injected) will implement said interface and with that all the methods and attributes that are defined in it.

#### Dependency Inyection Example

```typescript
// class player

class Player {
  private team: Team;
  constructor(team: Team) {
    this.team = team;
  }
  setTeam(team: Team): void {
    this.team = team;
  }
  getTeam(): Team {
    return this.team;
  }
}

// class team

class Team {
  private name: string;
  constructor(name: string) {
    this.name = name;
  }
  getTeam(): string {
    return this.name;
  }
}

// class main

const player = new Player(new Team('Arsenal'));
console.log(player.getTeam());
```

### Second Part

1. Implement at least 2 design patterns in your API (the ones implemented by Nest.js won't be taken into account). Why did you use them?

- Strategy Design Pattern: I used the Strategy pattern because the problem that this pattern seeks to solve coincides with the requirement to search for news in third-party APIS. For its implementation, it was taken as consideration that each of the apis consulted represented a search strategy, taking that into account, create an interface that had two methods, search and transform, which should be implemented by any search strategy to be added to the api.

- Repository Design Pattern: I used the Repository pattern to separate the data management logic from the logic managed in the different services that the different functionalities of the api provide, separating these logics, the principle of sole responsibility is also fulfilled.

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
