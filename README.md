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

This repository contains nine different apps and many different PBI reports. Six of the apps is read-only. Only "Release Control", "Scope Change Request" and partially "Piping and Heat trace" (Discipline Release Control) has read and write. The backend for Release Control, Scope Change Request and Piping and Heat Trace can be found [here](https://github.com/equinor/lighthouse-scope-change-control-api).

Client for the Castberg project portal. The client can be
viewed at:

- [https://jc.fusion.equinor.com/](https://jc.fusion.equinor.com/)
- [https://jc.fusion.dev.equinor.com/](https://jc.fusion.dev.equinor.com/)

## Software - Required

### Required Software

- [NodeJS](https://nodejs.org/en/)
- [PNPM](https://pnpm.io/)([GitHub](https://github.com/pnpm/pnpm))

### Optional Software

- Docker - https://www.docker.com/ (Only if you want to test production environment)

# How to run

```PS
$ pnpm install
$ pnpm start
```

# Development

`pnpm start` - Starts the dev environment with hot reloading

`pnpm test` - runs the test suite

`pnpm test-watch` - continual re-testing when files change

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

# Testing (Not in use)

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

# Create new release

> 🔴Make sure to align the deployment with [backend](https://github.com/equinor/lighthouse-scope-change-control-api) changes🔴

#### Deploy to dev

1. Create a pull request
2. Go to the GitHub actions page and click on "Deploy PR to dev" on the left-hand side
3. Click on "Run workflow", select your branch and a server to deploy too, click on the "Run workflow" button
4. Your branch will not get deployed to the respective dev server you selected

---

#### Deploy to production

> 🔴Make sure to align the deployment with [backend](https://github.com/equinor/lighthouse-scope-change-control-api) changes🔴

1. Merge your branch with main
2. Your changes will automatically get deployed to the production server
