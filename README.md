# Castberg ProjectPortal

Table of content

- [Castberg ProjectPortal](#Castberg-ProjectPortal)
  

## About

Client for the Castberg project portal. The client can be 
viewed at [https://jc.fusion.equinor.com/](https://jc.fusion.equinor.com/)

## Software - Required
### Required Software
- NodeJS - https://nodejs.org/en/
- Yarn Pkg - https://yarnpkg.com/lang/en/

### Optional Software
- Docker - https://www.docker.com/ (Only if you want to test production environment)
- Python 3 - https://www.python.org/

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



