// Viewer Eslint Config
module.exports = {
    root: false, // This is configured by the root esconfig
    extends: ['plugin:jsdoc/recommended'],
    plugins: ['jsdoc'],
    rules: {
        'jsdoc/require-jsdoc': [
            1, // Warn for failures, so you can build but not submit PRs
            {
                publicOnly: false,
                contexts: [
                    'ClassDeclaration',
                    'ClassProperty',
                    'ClassExpression',
                    'FunctionDeclaration',
                    'ArrowFunctionExpression',
                    'FunctionExpression',
                    'MethodDefinition'
                ],
                enableFixer: true // Automatically adds "suggested" fixes on lint
            }
        ]
    },
    overrides: [
        {
            // disable all documentation needed rules for tests
            files: ['*.test.ts', './src/setupTests.ts'],
            rules: {
                'jsdoc/require-jsdoc': 0
            }
        }
    ]
};
