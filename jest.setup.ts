import '@testing-library/jest-dom';

Object.defineProperty(window.self, 'crypto', {
    value: {
        getRandomValues: jest.fn().mockImplementation(),
    },
});
