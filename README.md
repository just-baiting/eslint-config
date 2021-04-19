# ESLint Config

Shared eslint config for just-baiting projects

Has 3 different individual packages:

- Base JS (@just-baiting/eslint-config)
- React (@just-baiting/eslint-config-react)
- Typescript (@just-baiting/eslint-config-typescript)

## Installation

You can install each individually and extend them as you need them

```bash
yarn add @just-baiting/eslint-config -D
```

## Usage

```js
{
  "extends" : ["@just-baiting/eslint-config", "@just-baiting/react"]
}
```
