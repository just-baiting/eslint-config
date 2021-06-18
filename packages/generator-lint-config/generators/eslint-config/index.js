const Generator = require('yeoman-generator');
const hasYarn = require('has-yarn');

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
    ]);
    this.answers.types = ['@just-baiting/eslint-config', ...this.answers.types];
  }

  writing() {
    this.fs.copy(this.templatePath('eslintignore'), this.destinationPath('.eslintignore'));
    this.fs.writeJSON(this.destinationPath('.eslintrc.json'), {
      extends: [...this.answers.types],
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
