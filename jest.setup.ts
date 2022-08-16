import '@testing-library/jest-dom';

// PowerBI package required crypto package to exist on window object.
// JestDOM does not have this, so we define it here
Object.defineProperty(window.self, 'crypto', {
    value: {
        getRandomValues: jest.fn().mockImplementation(),
    },
});

// Mock for now because Jest cannot transform some of this
jest.mock('@equinor/fusion-framework-module', () => ({
    __esModule: true, // this property makes it work
    default: 'mockedDefaultExport',
    namedExport: jest.fn(),
}));

// Mock, this is another repo inside ours.
jest.mock('@equinor/echo3dweb-viewer', () => ({
    __esModule: true, // this property makes it work
    default: 'mockedDefaultExport',
    namedExport: jest.fn(),
}));
