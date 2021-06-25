const Generator = require('yeoman-generator');
const hasYarn = require('has-yarn');
const _ = require('lodash');

// Inject the Install mixin
_.extend(Generator.prototype, require('yeoman-generator/lib/actions/install'));

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
  }

  async prompting() {
    this.answers = await this.prompt([
      {
        type: 'checkbox',
        name: 'types',
        message: 'Select the ESLint configs you need',
        choices: [
          {
            name: 'Base',
            value: '@just-baiting/eslint-config',
            disabled: 'Required',
          },
          {
            name: 'React',
            value: '@just-baiting/eslint-config-react',
          },
          {
            name: 'Typescript',
            value: '@just-baiting/eslint-config-typescript',
          },
        ],
      },
      {
        type: 'checkbox',
        name: 'environments',
        message: 'Select the environments you need',
        choices: [
          {
            name: 'Browser',
            value: 'browser',
          },
          {
            name: 'Node',
            value: 'node',
          },
          {
            name: 'ES6',
            value: 'es6',
          },
          {
            name: 'CommonJS',
            value: 'commonjs',
          },
          {
            name: 'AMD',
            value: 'amd',
          },
          {
            name: 'Jest',
            value: 'jest',
          },
          {
            name: 'Mocha',
            value: 'mocha',
          },
        ],
      },
    ]);
    this.answers.types = ['@just-baiting/eslint-config', ...this.answers.types];
  }

  writing() {
    const envs = {};
    this.answers.environments.forEach((env) => (envs[env] = true));
    this.fs.copy(this.templatePath('eslintignore'), this.destinationPath('.eslintignore'));
    this.fs.writeJSON(this.destinationPath('.eslintrc.json'), {
      extends: [...this.answers.types],
      env: envs,
    });
  }

  install() {
    const installObject = {
      dev: true,
    };
    const deps = ['eslint', ...this.answers.types];
    if (hasYarn) {
      this.yarnInstall(deps, installObject);
    } else {
      this.npmInstall(deps, installObject);
    }
  }
};
