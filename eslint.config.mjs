import globals from 'globals'
import pluginJs from '@eslint/js'
import pluginReact from 'eslint-plugin-react'
import pluginPrettier from 'eslint-plugin-prettier'
import pluginReactNative from 'eslint-plugin-react-native'
import react from 'eslint-plugin-react'

export default [
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
  },
  {
    languageOptions: {
      globals: globals.node,
    },
  },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
    plugins: {
      react,
      prettier: pluginPrettier,
      'react-native': pluginReactNative,
    },
    rules: {
      'prettier/prettier': 'error',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      // 'react-native/no-unused-styles': 'error',
      // 'react-native/split-platform-components': 'error',
      // 'react-native/no-inline-styles': 'error',
      // 'react-native/no-raw-text': 'error',
      // 'react-native/no-single-element-style-arrays': 'error',
      'no-console': 'error',
      'no-unused-vars': [
        'error',
        {
          vars: 'all',
          args: 'after-used',
          ignoreRestSiblings: true,
          caughtErrors: 'none',
        },
      ],
    },
  },
]
