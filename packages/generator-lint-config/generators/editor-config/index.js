const Generator = require('yeoman-generator');
const _ = require('lodash');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
  }

  async prompting() {
    this.answers = await this.prompt([
      {
        type: 'list',
        name: 'includeEditorConfig',
        message: 'Do you want an editorconfig?',
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
    if (this.answers.includeEditorConfig) {
      this.fs.copy(this.templatePath('editorconfig'), this.destinationPath('.editorconfig'));
    }
  }
};
