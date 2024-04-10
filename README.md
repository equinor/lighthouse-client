# Castberg ProjectPortal

Table of content

- [Castberg ProjectPortal](#castberg-projectportal)
  - [About](#about)
  - [Software - Required](#software---required)
    - [Required Software](#required-software)
    - [Optional Software](#optional-software)
- [How to run](#how-to-run)
- [Development](#development)
- [Create new Release](#create-new-release)
    - [Deployment dev environment](#deploy-to-dev)
    - [Deployment production environment](#deploy-to-production)

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

- Docker - https://www.docker.com/ 

# How to run

Create a .env file with the same format as the .env.default from root folder. Get your environment variables from the console in [radix](https://console.radix.equinor.com/applications/lighthouse-client/envs/dev/component/frontend)(or ask a team-member).

[Direct link to env variables](https://console.radix.equinor.com/applications/lighthouse-client/envs/dev/component/frontend)

```PS
$ pnpm install
$ pnpm start
```

# Development

`pnpm start` - Starts the dev environment with hot reloading

`pnpm test` - runs the test suite

`pnpm test-watch` - continual re-testing when files change

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
