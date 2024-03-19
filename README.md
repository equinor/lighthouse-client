# Castberg ProjectPortal

Table of content

- [Castberg ProjectPortal](#castberg-projectportal)
  - [About](#about)
  - [Software - Required](#software---required)
    - [Required Software](#required-software)
    - [Optional Software](#optional-software)
- [How to run](#how-to-run)
- [Development](#development)
- [Docker & Docker Compose](#docker--docker-compose)
  - [Manual](#manual)
- [Libraries](#libraries)
  - [Microsoft Authentication Library (MSAL)](#microsoft-authentication-library-msal)
  - [React](#react)
- [Testing](#testing)
  - [JEST](#jest)
  - [TS-JEST](#ts-jest)
- [(Build) Tools for the job](#build-tools-for-the-job)
  - [Styled Components](#styled-components)
  - [TypeScript](#typescript)
  - [Vitejs](#vitejs)
- [Create new Release](#create-new-release)

## About

Client for the Castberg project portal. The client can be
viewed at:

- [https://jc.fusion.equinor.com/](https://jc.fusion.equinor.com/)
- [https://jc.fusion.test.equinor.com/](https://jc.fusion.test.equinor.com/)
- [https://jc.fusion.dev.equinor.com/](https://jc.fusion.dev.equinor.com/)

## Software - Required

### Required Software

- [NodeJS](https://nodejs.org/en/)
- [PNPM](https://pnpm.io/)([GitHub](https://github.com/pnpm/pnpm))

### Optional Software

- Docker - https://www.docker.com/ (Only if you want to test production environment)

# How to run

Be shure to uppdate the `client-config.json` file. this file is based on the `.env` file. To update run the following command.

```PS
$ yarn run create-config
```

If all looks up to date then run the following. Happy Coding

```PS
$ yarn install
$ yarn start
```

# Development

`yarn start` - Starts the dev environment with hot reloading
`yarn test` - runs the test suite
`yarn test-watch` - continual re-testing when files change

# Docker & Docker Compose

```
docker-compose up
```

This starts the application in a production like environment.

## Manual

```
$ docker build --force-rm -t ppo:latest -f .docker/Dockerfile .
$ docker run -it -p 3000:80 ppo:latest
```

# Libraries

### Microsoft Authentication Library (MSAL)

https://github.com/AzureAD/microsoft-authentication-library-for-js

### React

https://reactjs.org/

# Testing

### JEST

https://jestjs.io/
Testing Framework

### TS-JEST

https://github.com/kulshekhar/ts-jest
For running tests with Typescript and Typechecking

# (Build) Tools for the job

### Styled Components

General component styling

https://www.styled-components.com

### TypeScript

Better code quality and easier transition for developers coming from a typed language

https://Typescriptlang.org

### Vitejs

Building the application

https://vitejs.dev/

# Create new Release

To create a new Test Release, one must "publish" the changes in `dev` to `main` by going through the following steps:

1. Update the [Changelog.md](./Changelog.md) with the respective changes that is included in this release, and update the version property in [package.json](./package.json) with the next applicable version number. Have your PR reviewed and merge into `dev` by using `Squash Merge`.

2. Now you should "publish" all changes in `dev` by opening a new PR with all changes from `dev` to `main`. Get the PR reviewed and use `Merge Commits` when merging the PR.

3. The [Azure Pipeline](https://dev.azure.com/Equinor/Johan%20Castberg%20-%20Portal/_build) will now build `main` and deploy the artifacts to the Test environment automatically.

4. Verify that the test environment and have relevant stakeholders test the functionality being deployed before deploying to Production. Two reviewers must approve the deployment to Production.

> NB: make sure to align the deployment with backend changes.
