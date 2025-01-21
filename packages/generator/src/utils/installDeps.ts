import chalk from "chalk";
import { execSync } from "child_process";
import { getPkgManager, PackageManager } from "./getPackageManager";

export async function installDeps(dependencies: string[]): Promise<void> {
  const packageManager: PackageManager = getPkgManager();
  const commands: Record<PackageManager, { install: string; devDep: string }> =
    {
      npm: { install: "install", devDep: "--save-dev" },
      pnpm: { install: "install", devDep: "--save-dev" },
      bun: { install: "add", devDep: "--dev" },
      yarn: { install: "add", devDep: "--dev" },
    };

  const command = commands[packageManager] || null;
  if (!command) {
    console.log(
      chalk.redBright(
        `No package command found for package manager ${packageManager}`,
      ),
    );
    return;
  }

  const { install, devDep } = command;

  const installCommand = `${packageManager} ${install} ${dependencies.join(" ")} ${devDep}`;

  execSync(installCommand, {
    cwd: process.cwd(),
    stdio: "inherit",
    encoding: "utf-8",
  });

  return;
}
