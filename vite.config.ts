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
        'process.env': {},
    },
    resolve: {
        alias: {
            '@equinor/portal-client': path.resolve(__dirname, './src/Core/Client'),
            '@equinor/lighthouse-components': path.resolve(__dirname, './src/packages/Components'),
            '@equinor/sidesheet': path.resolve(__dirname, './src/packages/Sidesheet'),
            '@equinor/worker': path.resolve(__dirname, './src/packages/WebWorkers'),
            '@equinor/filter': path.resolve(__dirname, './src/packages/Filter'),
            '@equinor/VisualEditor': path.resolve(__dirname, './src/packages/VisualEditor'),
            '@equinor/Form': path.resolve(__dirname, './src/packages/Form'),
            '@equinor/WorkSpace': path.resolve(__dirname, './src/Core/WorkSpace'),
            '@equinor/PageViewer': path.resolve(__dirname, './src/Core/PageViewer'),
            '@equinor/GroupView': path.resolve(__dirname, './src/Core/GroupView'),
            '@equinor/DataFactory': path.resolve(__dirname, './src/Core/DataFactory'),
            '@equinor/ErrorBoundary': path.resolve(__dirname, './src/Core/ErrorBoundary'),
            '@equinor/StatusBar': path.resolve(__dirname, './src/packages/StatusBar'),
            '@equinor/Diagrams': path.resolve(__dirname, './src/packages/Diagrams'),
            '@equinor/Table': path.resolve(__dirname, './src/packages/Table'),
            '@equinor/authentication': path.resolve(__dirname, './src/packages/authentication'),
            '@equinor/http-client': path.resolve(__dirname, './src/Core/httpClient/'),
            '@equinor/hooks': path.resolve(__dirname, './src/hooks'),
            '@equinor/Utils': path.resolve(__dirname, './src/packages/Utils/'),
            '@equinor/Kpi': path.resolve(__dirname, './src/packages/KPI'),
            '@equinor/ParkView': path.resolve(__dirname, './src/components/ParkView'),
            '@equinor/GardenUtils': path.resolve(__dirname, './src/packages/GardenUtils'),
            '@equinor/echo3dweb-viewer': path.resolve(__dirname, './packages/echo3dViewer/src'),
            '@equinor/lighthouse-powerbi': path.resolve(__dirname, './src/modules/powerBI'),
            '@equinor/lighthouse-powerbi-viewer': path.resolve(
                __dirname,
                './src/Core/PowerBiViewer'
            ),
            '@equinor/lighthouse-model-viewer': path.resolve(
                __dirname,
                './src/packages/ModelViewer'
            ),
            '@equinor/lighthouse-status-bar': path.resolve(__dirname, './src/packages/StatusBar'),
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
