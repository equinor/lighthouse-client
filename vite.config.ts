import react from '@vitejs/plugin-react';
import * as path from 'path';
import copy from 'rollup-plugin-copy';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [react()],

    preview: {
        port: 3000,
    },
    server: {
        // https: true,
    },
    define: {
        'process.env': {
        },
    },
    resolve: {
        alias: {
            '@equinor/portal-client': path.resolve(__dirname, './src/Core/Client'),
            '@equinor/sidesheet': path.resolve(__dirname, './src/packages/Sidesheet'),
            '@equinor/app-builder': path.resolve(__dirname, './src/Core/AppBuilder'),
            '@equinor/worker': path.resolve(__dirname, './src/packages/WebWorkers'),
            '@equinor/filter': path.resolve(__dirname, './src/packages/Filter'),
            '@equinor/VisualEditor': path.resolve(__dirname, './src/packages/VisualEditor'),
            '@equinor/Form': path.resolve(__dirname, './src/packages/Form'),
            '@equinor/WorkSpace': path.resolve(__dirname, './src/Core/WorkSpace'),
            '@equinor/PageViewer': path.resolve(__dirname, './src/Core/PageViewer'),
            '@equinor/GroupView': path.resolve(__dirname, './src/Core/GroupView'),
            '@equinor/DataFactory': path.resolve(__dirname, './src/Core/DataFactory'),
            '@equinor/StatusBar': path.resolve(__dirname, './src/packages/StatusBar'),
            '@equinor/Diagrams': path.resolve(__dirname, './src/packages/Diagrams'),
            '@equinor/ThreeDViewer': path.resolve(__dirname, './src/packages/ThreeDViewer'),
            '@equinor/Table': path.resolve(__dirname, './src/packages/Table'),
            '@equinor/authentication': path.resolve(__dirname, './packages/authentication/'),
            '@equinor/http-client': path.resolve(__dirname, './packages/httpClient/'),
            '@equinor/lighthouse-core': path.resolve(__dirname, './packages/core/'),
            '@equinor/lighthouse-hooks': path.resolve(__dirname, './packages/hooks/'),
            '@equinor/lighthouse-components': path.resolve(__dirname, './packages/components/'),
            '@equinor/lighthouse-util': path.resolve(__dirname, './packages/util/'),
            '@equinor/lighthouse-typeGuard': path.resolve(__dirname, './packages/typeGuard/'),
            '@equinor/lighthouse-conf': path.resolve(__dirname, './packages/configuration/'),
            '@equinor/Kpi': path.resolve(__dirname, './src/packages/KPI'),
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
