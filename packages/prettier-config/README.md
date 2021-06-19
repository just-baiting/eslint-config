# `@just-baiting/prettier-config`

## Installation

Add it to your `devDependencies` by running:

```bash
yarn add -D @just-baiting/prettier-config
```

```bash
npm install -D @just-baiting/prettier-config
```

You should then set up Prettier to use the configuration by creating a file called `.prettierrc.js` with the following contents:

```js
module.exports = {
  ...require('@just-baiting/prettier-config'),
};
```

