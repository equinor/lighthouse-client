import react from '@vitejs/plugin-react';
import * as path from 'path';
import copy from 'rollup-plugin-copy';
import { defineConfig } from 'vite';
export default defineConfig({
    plugins: [react()],

    preview: {
        port: 3000,
    },
    define: {
        'process.env': {},
    },
    resolve: {
        alias: {
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
