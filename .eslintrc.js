module.exports = {
    'env': {
        'browser': true,
        'es2021': true
    },
    'extends': ['eslint:recommended', 'plugin:react/recommended', 'plugin:storybook/recommended'],
    'parserOptions': {
        'ecmaFeatures': {
            'jsx': true
        },
        'ecmaVersion': 'latest',
        'sourceType': 'module'
    },
    'plugins': ['react'],
    'rules': {
        'indent': ['error', 4],
        'linebreak-style': ['error', 'windows'],
        'quotes': ['error', 'single'],
        'semi': ['error', 'always'],
        'no-unused-vars': ['error', {
            argsIgnorePattern: '^_',
            varsIgnorePattern: '^_',
            caughtErrorsIgnorePattern: '^_'
        }]
    }
};
