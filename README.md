# Castberg ProjectPortal

![GitHub Workflow Status (with event)](https://img.shields.io/github/actions/workflow/status/equinor/lighthouse-client/ci-build.yml?label=Prod%20deployment)
![GitHub Workflow Status (with event)](https://img.shields.io/github/actions/workflow/status/equinor/lighthouse-client/deploy-pr.yml?label=PR%20deployment)
![GitHub issues](https://img.shields.io/github/issues/equinor/lighthouse-client)
![GitHub pull requests](https://img.shields.io/github/issues-pr-raw/equinor/lighthouse-client)
![SCM Compliance](https://scm-compliance-api.radix.equinor.com/repos/equinor/lighthouse-client/badge)
![Known Vulnerabilities](https://snyk.io/test/github/equinor/lighthouse-client/badge.svg)

This repository contains various applications and many different Power BI reports. Most of the applications are read-only, except *Release Control*, *Scope Change Request* and partially *Piping and Heat trace* (also called Discipline Release Control). The backend for *Release Control*, *Scope Change Request* and *Piping and Heat Trace* can be found [here](https://github.com/equinor/lighthouse-scope-change-control-api).

This project uses [NodeJS](https://nodejs.org/en/) and [PNPM](https://pnpm.io/). Applications are developed using [React](https://react.dev/), [Typescript](https://www.typescriptlang.org/) and [Vite](https://vitejs.dev/).

## Getting started 🚀

Create a .env file with the same format as the .env.default from root folder. Get your environment variables from the console in [Radix](https://console.radix.equinor.com/applications/lighthouse-client/envs/dev/component/frontend) (or ask a team-member). The, run the following commands:

```bash
pnpm install
pnpm start
```

Some other usefull commands are:

- `pnpm start` - starts the dev environment with hot reloading
- `pnpm test` - runs the test suite
- `pnpm test-watch` - continual re-testing when files change

## Contributing ⚒️

Contributing, check out our [contributing guide](./CONTRIBUTING.md)

Also, check out the [lighthouse team docs](https://github.com/equinor/lighthouse-docs) for information on how to stucture work.

## Issues ✨

To submit an issue, use one of the predefined issue types in Github Issues.
Be sure to give good explanation and context in the issue description.

Submitted issues will be prioritized and followed up in our Github Projects.

## CI/CD ⚙️

We continously build, test and verify all PRs submitted to GitHub.
PRs merged with main will automatically be deployed to production.

> [!WARNING]  
> Changes merged with main will be built and deployed to production without any additional approval steps.

> [!IMPORTANT]  
> 🚨 Make sure to align the deployment with [backend](https://github.com/equinor/lighthouse-scope-change-control-api) changes

**The following environments are availible:**

- [🧪 Test environment](https://jc.fusion.dev.equinor.com/)
- [🏭 Production environment](https://jc.fusion.equinor.com/)

**The following manual deployment actions are availible:**

- [Manual deployment to test](https://github.com/equinor/lighthouse-client/actions/workflows/deploy-pr.yml)
