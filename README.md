# Babel Plugin Strip Glimmer Utils

## Usage

### Installation
```sh
yarn add babel-plugin-strip-glimmer-utils

// or
npm install babel-plugin-strip-glimmer-utils
```

### Babel plugin example

```js
plugins: [
  ...
  ['strip-glimmer-utils', { source: '@glimmer/utils', bindings: ['unwrap' /*, 'expect' */] }]
]
```
