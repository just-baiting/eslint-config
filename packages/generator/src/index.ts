import prompts, { Answers } from "prompts";
import chalk from "chalk";
import fs from "fs";
import path from "path";
import { getContext, Context } from "./utils/getContext";
import { installDeps } from "./utils/installDeps";
import { version } from "../package.json";

export async function main(): Promise<void> {
  const argv = process.argv.slice(2).filter((arg) => arg !== "--");
  const context = await getContext(argv);

  if (context.help) {
    const helpText = `
      Usage:
        npx @just-baiting/lint-generator [options]
      
      Options:
        --help | -h           ${chalk.green("Display help text")}
        --version | -v        ${chalk.green("Show version number")}
        --generator | -g      ${chalk.green("Specify which generator to run out of prettier, eslint or editor")}
        --template | -t       ${chalk.green("Specify which template to use out of base, react or typescript (if using eslint generator)")}
        --environments | -e   ${chalk.green("Specify which environments to use out of browser, node, es6, commonjs, amd, jest, mocha (if using eslint generator)")}
      
      Examples:
        npx @just-baiting/lint-generator
        npx @just-baiting/lint-generator --generator prettier
        npx @just-baiting/lint-generator --generator eslint --template react --environments browser --environments node
        npx @just-baiting/lint-generator --generator editor
    `;
    console.log(helpText)
    return;
  }

  if (context.version) {
    console.log(chalk.redBright(`${version}`));
    return;
  }

  let generator = context.generator || null;

  // check to see if there is context for prettier or eslint
  if (!generator) {
    const res: Answers<string> = await prompts({
      type: "select",
      name: "generator",
      message: "What would you like to generate?",
      choices: [
        { title: "Prettier", value: "prettier" },
        { title: "ESLint", value: "eslint" },
        { title: "Editor Config", value: "editor" },
      ],
      initial: 0,
    });
    generator = res.generator;
  }

  if (generator === "prettier") {
    await runPrettierGenerator(context);
  }

  if (generator === "eslint") {
    await runESLintGenerator(context);
  }
  if (generator === "editor") {
    await runEditorGenerator();
  }

  return;
}

/**
 * Run the editor generator
 *
 * @returns void
 */
async function runEditorGenerator(): Promise<void> {
  const currentDir: string = process.cwd();
  const existingEditorFile: string[] = [".editorconfig"].filter((file) => {
    return fs.existsSync(path.join(currentDir, file));
  });

  if (existingEditorFile.length > 0) {
    console.log(
      chalk.redBright(`Editor file already exists ${existingEditorFile}\n`),
    );
    console.log(chalk.redBright("Delete the existing file and run again\n"));
    return;
  }

  fs.copyFileSync(
    path.join(__dirname, "template", "editor", "editorconfig"),
    path.join(currentDir, ".editorconfig"),
  );
  console.log(chalk.green("🎉 Editor config file created! 🎉"));

  return;
}

/**
 * Run the prettier generator
 *
 * @param context - The context object
 * @returns void
 */
async function runPrettierGenerator(context: Context): Promise<void> {
  const currentDir: string = process.cwd();
  const prettierFiles: string[] = [".prettierrc.js", ".prettierrc.config.js"];
  const existingPrettierFile: string[] = prettierFiles.filter((file) => {
    return fs.existsSync(path.join(currentDir, file));
  });

  if (existingPrettierFile.length > 0) {
    const file: string = path.join(currentDir, existingPrettierFile[0]);
    console.log(chalk.redBright(`Prettier file already exists ${file}\n`));
    console.log(
      chalk.redBright(
        "Add the following to your existing config file as part of your export or plugins\n",
      ),
    );
    console.log(
      chalk.redBright(`...require("@just-baiting/prettier-config")\n`),
    );
    console.log(
      chalk.redBright(`Or delete existing file [${file}] and run again\n`),
    );
  } else {
    // file doesnt exist create generator file
    fs.copyFileSync(
      path.join(__dirname, "template", "prettier", "prettierrc.js"),
      path.join(currentDir, ".prettierrc.js"),
    );
    console.log(chalk.green("🎉 Prettier file created! 🎉"));
  }

  // install prettier dev dependency
  await installDeps(["prettier", "@just-baiting/prettier-config"]);

  return;
}

/**
 * Run the eslint generator
 *
 * @param context - The context object
 * @returns void
 */
async function runESLintGenerator(context: Context): Promise<void> {
  let { template = [], environments = [] } = context;
  const currentDir: string = process.cwd();

  const eslintFiles: string[] = [
    ".eslintrc.js",
    ".eslintrc.config.js",
    ".eslintrc.json",
  ];
  const existingESLintFile: string[] = eslintFiles.filter((file) => {
    return fs.existsSync(path.join(currentDir, file));
  });

  // need to read existing file if it does then exit early
  if (existingESLintFile.length > 0) {
    const file: string = path.join(currentDir, existingESLintFile[0]);
    console.log(chalk.redBright(`ESLint file [${file}] already exists\n`));
    console.log(
      chalk.redBright(
        "Add the following to your existing config file as part of your extends\n",
      ),
    );
    return;
  }

  const pluginQuestions: prompts.PromptObject = {
    type: "multiselect" as const,
    name: "template",
    message: "What plugins would you like to include?",
    choices: [
      { title: "Base", value: "base" },
      { title: "React", value: "react" },
      {
        title: "Typescript",
        value: "typescript",
      },
    ],
    min: 1,
  };

  const environmentQuestions: prompts.PromptObject = {
    type: "multiselect" as const,
    name: "environments",
    message: "What environments would you like to include?",
    choices: [
      {
        title: "Browser",
        value: "browser",
      },
      {
        title: "Node",
        value: "node",
      },
      {
        title: "ES6",
        value: "es6",
      },
      {
        title: "CommonJS",
        value: "commonjs",
      },
      {
        title: "AMD",
        value: "amd",
      },
      {
        title: "Jest",
        value: "jest",
      },
      {
        title: "Mocha",
        value: "mocha",
      },
    ],
  };

  // need to check template context to see if values are passed
  // if no args passed to choose what plugins required then lets ask questions
  if (!template.length) {
    const res: Answers<string> = await prompts(pluginQuestions);
    template = res.template;
  }

  const pluginsMap = {
    base: "@just-baiting/eslint-config",
    react: "@just-baiting/eslint-config-react",
    typescript: "@just-baiting/eslint-config-typescript",
  };

  // map the plugins to the correct package names
  const plugins = template.map((plugin) => {
    return pluginsMap[plugin] || plugin;
  });

  // if no args passed to choose what environments required then lets ask questions
  if (!environments.length) {
    const res: Answers<string> = await prompts(environmentQuestions);
    environments = res.environments;
  }

  const envs = environments.reduce(
    (acc: Record<string, boolean>, env: string) => {
      acc[env] = true;
      return acc;
    },
    {},
  );
  const eslintConfigTemplate = fs.readFileSync(
    path.join(__dirname, "template", "eslint", "eslintrc.json"),
    "utf-8",
  );
  const eslintConfig = JSON.parse(eslintConfigTemplate);
  eslintConfig.extends = plugins;
  eslintConfig.env = envs;

  const fileName: string = ".eslintrc.json";

  fs.writeFileSync(
    path.join(currentDir, fileName),
    JSON.stringify(eslintConfig, null, 2),
  );
  fs.copyFileSync(
    path.join(__dirname, "template", "eslint", "eslintignore"),
    path.join(currentDir, ".eslintignore"),
  );

  await installDeps(plugins);
  return;
}
