# ESLint Config

Shared eslint config for just-baiting projects

Has 3 different individual packages:

- Base JS (@just-baiting/eslint-config)
- React (@just-baiting/eslint-config-react)
- Typescript (@just-baiting/eslint-config-typescript)

## Installation

You can install each individually and extend them as you need them

```bash
yarn add -D @just-baiting/eslint-config
```

```bash
npm install -D @just-baiting/eslint-config
```

## Usage
Edit your ```.eslintrc.json``` with one of the following to use.

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
