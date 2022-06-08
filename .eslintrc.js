module.exports = {
    extends: [
        'eslint:recommended',
        'prettier',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:react/recommended',
        'plugin:import/react',
        'plugin:react-hooks/recommended',
    ],

    // unignore implicit rules about what types of files can be linted
    ignorePatterns: ['!.*'],

    env: {
        browser: true,
        node: true,
        jest: true,
        es6: true,
    },

    parserOptions: {
        // latest standard is ok, eq. to 9
        ecmaVersion: 2018,
        ecmaFeatures: {
            jsx: true,
        },
        sourceType: 'module',
    },

    settings: {
        react: {
            version: 'detect',
        },
    },

    rules: {
        // Can do for react 18
        'react/react-in-jsx-scope': 'off',
        // it's annoying to have the app not render when
        // some vars are unused during development
        'no-unused-vars': ['warn'],
        'max-params': [
            'error',
            {
                max: 3,
            },
        ],
        'prefer-const': [
            'error',
            {
                destructuring: 'any',
                ignoreReadBeforeAssign: false,
            },
        ],
        'no-mixed-spaces-and-tabs': ['error'],
        'import/order': [
            'error',
            {
                'newlines-between': 'never',
                alphabetize: {
                    order: 'asc',
                    caseInsensitive: true,
                },
            },
        ],
        curly: ['error'],
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'error',
        'react/sort-prop-types': [
            'error',
            {
                requiredFirst: true,
                sortShapeProp: true,
                callbacksLast: true,
            },
        ],
        'react/no-unused-prop-types': 'error',
    },
}
