import { InitialOptionsTsJest } from 'ts-jest';
export default {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        '^(\\.{1,2}/.*)\\.js$': '$1',
        '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/__mocks__/fileMock.ts',
        '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
        '^@equinor\\/http-client(.*)$': '<rootDir>/src/Core/httpClient$1',
        '^@equinor\\/lighthouse-portal-client(.*)$': '<rootDir>/src/Core/Client/index.ts$1',
        '^@equinor\\/sidesheet(.*)$': '<rootDir>/src/packages/Sidesheet$1',
        '^@equinor\\/ErrorBoundary(.*)$': '<rootDir>/src/Core/ErrorBoundary$1',
        '^@equinor\\/lighthouse-components(.*)$': '<rootDir>/src/packages/Components$1',
        '^@equinor\\/overlay-menu(.*)$': '<rootDir>/src/components/OverlayMenu$1',
        '^@equinor\\/lighthouse-confirmation-dialog(.*)$':
            '<rootDir>/src/Core/ConfirmationDialog$1',
        '^@equinor\\/lighthouse-functions(.*)$': '<rootDir>/src/Core/Functions$1',
        '^@equinor\\/lighthouse-widgets(.*)$': '<rootDir>/src/Core/Widgets$1',
        '^@equinor\\/hooks(.*)$': '<rootDir>/src/hooks$1',
        '^@equinor\\/Table(.*)$': '<rootDir>/src/packages/Table$1',
        '^@equinor\\/GardenUtils(.*)$': '<rootDir>/src/packages/GardenUtils$1',
        '^@equinor\\/WorkSpace(.*)$': '<rootDir>/src/Core/WorkSpace$1',
        '^@equinor\\/BookmarksManager(.*)$': '<rootDir>/src/packages/BookmarksManager$1',
        '^@equinor\\/lighthouse-utils(.*)$': '<rootDir>/src/packages/Utils$1',
        '^@equinor\\/JSX-Switch(.*)$': '<rootDir>/src/components/JSXSwitch$1',
        '^@equinor\\/filter(.*)$': '<rootDir>/src/packages/Filter$1',
        '^@equinor\\/atom(.*)$': '<rootDir>/src/Core/Atom$1',
        '^@equinor\\/lighthouse-powerbi-viewer(.*)$': '<rootDir>/src/Core/PowerBiViewer$1',
        '^@equinor\\/lighthouse-powerbi(.*)': '<rootDir>/src/modules/powerBI/index.ts$1',
        '^@equinor\\/Kpi(.*)': '<rootDir>/src/packages/KPI$1',
        '^@equinor\\/authentication(.*)': '<rootDir>/src/packages/authentication$1',
        '^@equinor\\/procosys-urls(.*)': '<rootDir>/src/packages/ProCoSysUrls$1',
        '^@equinor\\/lighthouse-fusion-modules(.*)$': '<rootDir>/src/FusionModules$1',
        '^@equinor\\/lighthouse-status-bar(.*)$': '<rootDir>/src/packages/StatusBar$1',
        '^@equinor\\/lighthouse-model-viewer(.*)$': '<rootDir>/src/packages/ModelViewer$1',
        '^@equinor\\/echo3dweb-viewer(.*)$': '<rootDir>/packages/echo3dViewer/src$1',
        '^@equinor\\/ParkView(.*)$': '<rootDir>/src/components/ParkView$1',
        '^@equinor\\/modal(.*)$': '<rootDir>/src/packages/Modal$1',
        '^@equinor\\/fam-request-builder(.*)$': '<rootDir>/src/packages/FamRequestBuilder$1',
        '^@equinor\\/CircuitDiagram(.*)$': '<rootDir>/src/packages/CircuitDiagram$1',
        '^@equinor\\/Admin(.*)$': '<rootDir>/src/packages/Admin$1',
        '^@equinor\\/Workflow(.*)$': '<rootDir>/src/packages/Workflow$1',
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    modulePathIgnorePatterns: ['<rootDir>/packages'],
} as InitialOptionsTsJest;
