# ESLint Config

Shared lint config for just-baiting projects

Has 4 different individual packages:

- Base JS (@just-baiting/eslint-config)
- React (@just-baiting/eslint-config-react)
- Typescript (@just-baiting/eslint-config-typescript)
- Prettier (@just-baiting/prettier-config)

## Installation

You can install each individually and extend them as you need them

```bash
yarn add -D @just-baiting/eslint-config
```

```bash
npm install -D @just-baiting/eslint-config
```

Alternatively if you're starting a new project you can run the following: 

```bash
npx create @just-baiting/lint-config
```

```bash
yarn create @just-baiting/lint-config
```

## Usage
If you've installed the packages manually you will need to edit your ```.eslintrc.json``` or ```.prettierrc.js``` based on what you installed.

### Core

```js
{
  "extends" : ["@just-baiting/eslint-config"]
}
```

### React
```js
{
  "extends" : ["@just-baiting/eslint-config", "@just-baiting/eslint-config-react"]
}
```

### Next.js

```js
{
  "extends": ["@just-baiting/eslint-config", "@just-baiting/eslint-config-react"],
  "rules": {
    "react/react-in-jsx-scope": "off"
  }
}
```

### Prettier
```js
module.exports = {
  ...require('@just-baiting/prettier-config'),
};
```