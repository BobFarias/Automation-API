<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Project Description

This project is built using the [Nest](https://github.com/nestjs/nest) framework with TypeScript, tailored for a specific code challenge. It demonstrates an efficient and scalable approach to building server-side applications, focusing on creating and managing 'Automations'.

### Key Features

- **CRUD Operations**: Create, Read, Update, and Delete functionalities for 'Automations'.
- **Data Validation**: Robust validation for incoming data using class validators.
- **Database Integration**: Uses PostgreSQL for data persistence.
- **Testing**: Includes both unit tests and end-to-end (E2E) tests.

## Installation

```bash
$ npm install
```

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

## Code Challenge Overview

This application was developed as part of a code challenge, which required the implementation of a RESTful API for managing 'Automations'. The challenge emphasized CRUD operations, database integration, and testing.

## Important Configuration Notes

# Application Database Configuration

In app.module.ts, the database configuration is set for the main application. It's crucial to adjust these settings according to your development environment:

```bash
  $ const CONFIG_DATABASE: PostgresConnectionOptions = {
  $  type: 'postgres',
  $  host: 'localhost',
  $  port: 5432,
  $  username: 'postgres',
  $  password: 'your_password',
  $  database: 'automation-api-db',
  $  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  $  synchronize: true,
  $ };
```

Remember to replace 'your_password' with your actual PostgreSQL password.

# Testing Database Configuration

For end-to-end (E2E) tests, a separate database configuration is used to avoid interfering with the main application data. This configuration is located in automation.e2e-spec.ts:

```bash
  $ const DB_TESTING_CONFIG: PostgresConnectionOptions = {
  $   type: 'postgres',
  $   host: 'localhost',
  $   port: 5432,
  $   username: 'postgres',
  $   password: 'your_password',
  $   database: 'automation-api-test', // Use a separate test database
  $   entities: [__dirname + '/../../src/**/*.entity{.ts,.js}'], // Adjusted path
  $   synchronize: true,
  $ };
```

Ensure that the test database (automation-api-test) exists and the credentials are correct. The synchronize: true option will automatically handle the schema creation for the test database.


## How to Use

- Creating an Automation: Send a POST request to /automation/create with the automation data.

- Updating an Automation: Send a PUT request to /automation/update/critical-ratio/{id} with the updated data.

- Deleting an Automation: Send a DELETE request to /automation/delete/{id}.

- Fetching Automations: Send a GET request to /automation.

## License

Nest is [MIT licensed](LICENSE).
