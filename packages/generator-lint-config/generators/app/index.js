'use strict';

const Generator = require('yeoman-generator');
const _ = require('lodash');

// Inject the Install mixin
_.extend(Generator.prototype, require('yeoman-generator/lib/actions/install'));

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
  }

  initalizing() {
    this.composeWith(require.resolve('../eslint-config'));
  }
};
