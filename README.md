# Babel Plugin Strip Glimmer Utils
[![Build Status](https://travis-ci.org/chadhietala/babel-plugin-strip-glimmer-utils.svg?branch=master)](https://travis-ci.org/chadhietala/babel-plugin-strip-glimmer-utils)

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
