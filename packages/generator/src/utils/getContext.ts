import arg from "arg";

export interface Context {
  help: boolean;
  cwd: string;
  generator?: string;
  template?: ("base" | "react" | "typescript")[];
  environments?: (
    | "browser"
    | "node"
    | "es6"
    | "commonjs"
    | "amd"
    | "jest"
    | "mocha"
  )[];
  ref: string;
  fancy?: boolean;
  exit(code: number): never;
}

export async function getContext(argv: string[]): Promise<Context> {
  const flags = arg(
    {
      "--generator": String,
      "--template": [String],
      "-t": "--template",
      "--environments": [String],
      "-e": "--environments",
      "--ref": String,
      "--help": Boolean,
      "--fancy": Boolean,
      "-h": "--help",
    },
    { argv, permissive: false },
  );

  let cwd = flags["_"][0];
  let {
    "--help": help = false,
    "--generator": generator,
    "--template": template,
    "--environments": environments,
    "--fancy": fancy,
    "--ref": ref,
  } = flags;

  const context: Context = {
    help,
    generator,
    template: template as ("base" | "react" | "typescript")[],
    environments: environments as (
      | "browser"
      | "node"
      | "es6"
      | "commonjs"
      | "amd"
      | "jest"
      | "mocha"
    )[],
    fancy,
    ref: ref ?? "latest",
    cwd,
    exit(code) {
      process.exit(code);
    },
  };
  return context;
}
