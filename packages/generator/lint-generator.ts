#!/usr/bin/env node

'use strict';

// import prettierConfig from '@just-baiting/prettier-config-package';
import chalk from 'chalk';
import { main } from './src/index';

const currentNodeVersion = process.versions.node;
const currentMajorNodeVersion = parseInt(currentNodeVersion.split('.')[0], 10);
const minimumMajorNodeVersion = 18;

if (currentMajorNodeVersion < minimumMajorNodeVersion) {
  console.error(
    chalk.red(
      `You are running Node ${currentNodeVersion} (${currentMajorNodeVersion}).`
    )
  );
  console.error(
    chalk.red(
      `Please upgrade to at least Node ${minimumMajorNodeVersion} (${minimumMajorNodeVersion}.x.x).`
    )
  );
  process.exit(1);
}

(async () => {
  await main();
})();
