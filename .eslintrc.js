module.exports = {
    parser: '@typescript-eslint/parser',
    root: true,
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module'
    },
    plugins: ['@typescript-eslint'],
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
    rules: {
        '@typescript-eslint/no-use-before-define': 'off',
        'no-undef': 'off'
    }
};
