# Migrating from Webpack to Vite

### vite config
Vite comes with opinionated configs for both esbuild and rollup and supports typescript, jsx, css, svgs, workers out of the box.
Plugins can be added to support specific frameworks or libraries, i.e. HMR and fast refresh with React. 
To copy certain files when building, use the "rollup-plugin-copy" package and add it as a plugin for rolllup plugins. 
Both esbuild and rollup uses ES modules instead of CommonJS and others, and will transform CommonJS modules into ES modules. However, sometimes packages are weird and uses a mix of everything, which might cause rollup to break and not transform it into esmodules. `transformMixedEsModules: true` will help with transforming modules which are mixed. 
See [here](https://github.com/rollup/plugins/tree/master/packages/commonjs#transformmixedesmodules) for more.

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';
import copy from 'rollup-plugin-copy';
export default defineConfig({
    plugins: [react()],
    define: {
        'process.env': {},
    },
    resolve: {
        alias: {
            '@equinor/StatusBar': path.resolve(__dirname, './src/packages/StatusBar'),
            '@equinor/Diagrams': path.resolve(__dirname, './src/packages/Diagrams'),
            '@equinor/ThreeDViewer': path.resolve(__dirname, './src/packages/ThreeDViewer'),
            '@equinor/authentication': path.resolve(__dirname, './packages/authentication/'),
            '@equinor/http-client': path.resolve(__dirname, './packages/httpClient/'),
            '@equinor/client': path.resolve(__dirname, './packages/configuration/'),
        },
    },
    build: {
        commonjsOptions: {
            transformMixedEsModules: true,
        },
        rollupOptions: {
                
            plugins: [
                copy({
                    targets: [
                        {
                            src: './doc/dataView.md',
                            dest: 'dist/',
                        },
                    ],
                    hook: 'writeBundle',
                }),
            ],
        },
    },
});

```

### index.html
With vite, index.html has to be placed in the root of the project. If using webpack, you'll want to place the file under the `public` folder. 
With vite, you need to add `<script type="module" src="./index.tsx></scrip>`, remove this if using webpack.

### Importing workers
With vite, importing workers is done by adding `?worker` postfix, e.g. `import Worker from "./filterWorker?worker` and also exporting the worker. With webpack, you import with prefix `worker-loader!`, e.g. `import Worker from 'worker-loader!./filterworker.ts`.

### Tsconfig

Difference:
```diff
+ "module": "es6",
- "module": "commonjs",
+ "moduleResolution": "node",
+ "esModuleInterop": false,
+ "forceConsistentCasingInFileNames": true,
+ "resolveJsonModule": true,
+ "isolatedModules": true,
+ "noEmit": true,
+ "types": ["node", "vite/client"],
- "types: ["node]
```
With vite
```json
{
    "compilerOptions": {
        "strict": true,
        "jsx": "react-jsx",
        "target": "es6",
        "outDir": "dist",
        "skipLibCheck": true,
        "module": "es6",
        "moduleResolution": "node",
        "esModuleInterop": false,
        "allowSyntheticDefaultImports": true,
        "forceConsistentCasingInFileNames": true,
        "resolveJsonModule": true,
        "isolatedModules": true,
        "noEmit": true,
        "noImplicitAny": false,
        "types": ["node", "vite/client"],
        "sourceMap": true,
        "paths": {
            "@equinor/StatusBar": ["./src/packages/2StatusBar"],
            "@equinor/Diagrams": ["./src/packages/Diagrams"],
            "@equinor/ThreeDViewer": ["./src/packages/ThreeDViewer"],
            "@equinor/authentication": ["./packages/authentication"],
            "@equinor/http-client": ["./packages/httpClient"],
            "@equinor/util": ["./packages/util"],
            "@equinor/typeGuard": ["./packages/typeGuard"]
        }
    },
    "compileOnSave": true,
    "exclude": ["node_modules"],
    "include": ["./src", "src/components/Garden", "packages/components/NavigationView/TreeMoc.ts"],
    "typedocOptions": {
        "entryPoints": ["src/index.ts"],
        "out": "docs"
    }
}
```

With webpack:
```json
{
    "compilerOptions": {
        "strict": true,
        "jsx": "react-jsx",
        "target": "es6",
        "outDir": "dist",
        "skipLibCheck": true,
        "module": "commonjs",
        "esModuleInterop": true,
        "allowSyntheticDefaultImports": true,
        "noImplicitAny": false,
        "types": ["node"],
        "sourceMap": true,
        "paths": {
            "@equinor/StatusBar": ["./src/packages/2StatusBar"],
            "@equinor/Diagrams": ["./src/packages/Diagrams"],
            "@equinor/ThreeDViewer": ["./src/packages/ThreeDViewer"],
            "@equinor/authentication": ["./packages/authentication"],
            "@equinor/http-client": ["./packages/httpClient"],
            "@equinor/lighthouse-core": ["./packages/core"],
            "@equinor/lighthouse-hooks": ["./packages/hooks"],
            "@equinor/lighthouse-components": ["./packages/components"],
            "@equinor/client": ["./packages/configuration"],
            "@equinor/lighthouse-util": ["./packages/util"],
            "@equinor/lighthouse-typeGuard": ["./packages/typeGuard"]
        }
    },
    "compileOnSave": true,
    "exclude": ["node_modules"],
    "include": ["./src", "src/components/Garden", "packages/components/NavigationView/TreeMoc.ts"],
    "typedocOptions": {
        "entryPoints": ["src/index.ts"],
        "out": "docs"
    }
}
```
Also note that vite (esbuild) does not do any typescript checks, it should be handled by VSCode, or checked with `tsc`.

### package.json

```diff
"scripts": {
+ "start": "vite",
+ "build": "tsc & vite build"
- "start": "webpack serve --mode development --env development --open --hot",
- "build": "webpack",
+ "serve": "vite preview",
}
```

```diff
"devDependencies": {
+ "@vitejs/plugin-react": "^1.1.1",
+ "vite": "^2.7.1"
}
```

### docker
```diff
+ RUN yarn build
- RUN yarn build --mode=production
```

### Misc
Removed `moduleLoader.ts` from `index.tsx` when using Vite. With webpack, use it like this:
```jsx
if (authProvider && !(window !== window.parent && !window.opener)) {
	moduleLoader.register();
        render(
            <ProCoSysAppClient {...{ appConfig, authProvider }} />,
            document.getElementById('root')
        );
    }
```
Commented out the `umd.js` file in `public` folder.