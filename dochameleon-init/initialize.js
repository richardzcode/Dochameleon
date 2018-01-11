#!/usr/bin/env node

const shell = require("shelljs");
const chalk = require("chalk");
const fs = require("fs");

const CWD = process.cwd();

const log = console.log;
const error = console.error;

let useYarn = !!(shell.which("yarn"));

if (fs.existsSync(CWD + "/website")) {
  error(chalk.yellow("/website folder already exists.\n"));
  log(
    "Dochameleon setup at 'website' folder. You will need to remove any existing 'website' folder from your root directory to let Dochameleon do its work."
  );
  process.exit(1);
}

shell.cd(CWD);
shell.mkdir("website");
log(chalk.green("Website folder created!\n"));

shell.cd("website");
log(chalk.yellow("Installing latest version of Dochameleon in website.\n"));

const content = { scripts: { examples: "dochameleon-examples" } };
fs.writeFileSync(
  CWD + "/website/package.json",
  JSON.stringify(content, null, 2) + "\n"
);

shell.exec(
  useYarn
    ? "yarn add dochameleon --dev"
    : "npm install dochameleon --save-dev"
);
log(chalk.green("Dochameleon installed in website folder!\n"));

shell.exec(
  useYarn
    ? "yarn run examples"
    : "npm run examples"
);
