const Generator = require('yeoman-generator');
const shell = require('shelljs');
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
        type: 'list',
        name: 'includePrettier',
        message: 'Do you want to include prettier?',
        choices: [
          {
            name: 'Yes',
            value: true,
          },
          {
            name: 'No',
            value: false,
          },
        ],
      },
    ]);
  }

  writing() {
    if (this.answers.includePrettier) {
      this.fs.copy(this.templatePath('prettierrc.js'), this.destinationPath('.prettierrc.js'));
    }
  }

  install() {
    const installObject = {
      dev: true,
    };
    const deps = ['prettier', '@just-baiting/prettier-config'];
    if (!this.answers.includePrettier) {
      return;
    }
    if (shell.which('yarn')) {
      this.yarnInstall(deps, installObject);
    } else {
      this.npmInstall(deps, installObject);
    }
  }
};
