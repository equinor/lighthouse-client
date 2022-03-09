# Echo 3D Web Viewer package

Echo 3D Web Viewer is a package that can be used to set up the 3d web viewer to stream echo models from any javascript application.

The Viewer is a bare-bones module for the Echo 3D Web solution. Its purpose is to make the Echo 3D models available "as-a-service".

## Echo 3D as a service

Echo 3D as a service is an internal offering from the Echo team, where we provide this module for integration in other Equinor Web-applications.

The Echo 3D Team supplies 3D models of assets, and builds simple integrations on top of that.

Contents:

- Instantly load 3D models for a subset of Equinor 3D models.
- Built in:
  - Highlighting
  - Selection
  - Navigation
- User and access control handled by the module
- Access to the core Cognite 3D Viewer for low level modifications and experimentation.

## How to use to Echo as a Service?

If you do not have an agreement with the Echo team we will not be able to support your integration with Echo 3D. We use the agreement term here, as we need to know who our users are and notify of breaking changes and required change periods.

Echo 3D as a service is a very early product, and we have not yet stabilized any part of the application.

Please contact any echo team member to learn more about Echo as a Service.

## I need a new feature 💡 or I found a bug 🐞

Lets try to fix it together. Echo 3D Viewer is internally open so everyone can contribute to this viewer.

Please start out by creating an issue, or asking any Echo team member if this is something to figure out.

If this is something we would like fixed, we might ask you to submit a PR. If you need help do not hesitate to ask us, we might be able to both help and pair program a solution with you! :)

## Developing

Below are some tips for dev-setup and a guide to the most common commands.

Please also check the root readme in the folder above here. [../README.md](../README.md)

### Available Scripts

In the project directory, you can run:

#### `npm test`

Launches the test runner in the interactive watch mode.

#### `npm test:coverage`

Runs all tests and produces a test coverage report for the project

#### `npm run build`

Builds the viewer for publishing the package into the `dist` folder, with typings.

#### `npm run lint`

Checks your app for any issues you'll have to fix before merging. These checks are run on the build server, and we do not tolerate warnings! See the points below here on how to handle issues :D

##### `npm lint:prettier`

Prettier can check if anything is out of order with code style. We recommend applying prettier on save in your tool of choice.

In VSCode search for the "prettier" plugin, and install it. Now press "Cmd-Shift-P" -> Format Document -> Pick Prettier as default formatter (if it was not from before). We also recommend that you enable "Format on Save" to avoid annoying build errors in the CI.

You can run `npm fix:prettier` to resolve any issues.

##### `npm lint:eslint`

Eslint is a strict code style utility. It might feel very limiting, but it helps us keep up guarantees about our code.
We recommend applying eslint on save in your tool of choice.

In VSCode search for the "eslint" plugin, and install it. This should give you information about stuff etc directly into your editor!

If you disable lints, please apply a comment describing WHY.

```ts
// Add -- before writing your reason for disabling.
// Example:
// eslint-disable-next-line @typescript-eslint/no-floating-promises -- useEffects cannot be async, need to ignore.
somethingAsync();
```

#### `npm run update-api-client`

We use NSwag to generate API clients based on their Swagger/OpenAPI schema. This allows us to easily sync changes, data-models and similar from the API to the Client.

Generating new api clients is a manual task for now. The generated code should be committed, but not manually changed.

##### Api Client: Echo Model Distribution

The OpenApi file for Echo Model Distribution is public, and can thereby be run at any time.

##### Api Client: Echo Hierarchy Service

The OpenApi file for Echo Hierarchy Service is not available online (for now). Generating this code requires that you run the Api service locally and use its local Swagger definition.

You might have to change the url in the package.json file to your local url: The default is <http://localhost:5000/swagger/v2/swagger.json>
