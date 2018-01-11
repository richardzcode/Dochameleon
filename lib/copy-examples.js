#!/usr/bin/env node

const fs = require('fs-extra');
const glob = require('glob');
const path = require('path');
const chalk = require('chalk');

const join = path.join;
const CWD = process.cwd();

// add scripts to package.json file
const package_json = join(CWD, 'package.json');
if (fs.existsSync(package_json)) {
  const content = JSON.parse(
    fs.readFileSync(CWD + '/package.json', 'utf8')
  );
  if (!content.scripts) { content.scripts = {}; }
  content.scripts = Object.assign(
    {},
    content.scripts,
    {
      'start': 'dochameleon-start',
      'build': 'dochameleon-build',
      'publish-gh-pages': 'dochameleon-publish',
      'examples': 'dochameleon-examples'
    }
  );
  fs.writeFileSync(
    CWD + '/package.json',
    JSON.stringify(content, null, 2) + '\n'
  );
  console.log(
    `${chalk.green('Wrote dochameleon scripts to package.json file.')}\n`
  );
}

let docsCreated = false;
let blogCreated = false;
let exampleSiteCreated = false;
const exampleRoot = join(__dirname, '..', 'examples', 'basics');

// docs
const docsFrom = join(exampleRoot, 'docs');
const docsTo = join(CWD, 'docs');
if (fs.existsSync(docsTo)) {
  console.log(
    `${chalk.yellow('Example docs already exist!')}
     Rename or remove ${chalk.yellow(docsTo)} to regenerate example docs.\n`
  );
} else {
  fs.copySync(docsFrom, docsTo);
  exampleSiteCreated = true;
  docsCreated = true;
}

// blog
const blogFrom = join(exampleRoot, 'blog');
const blogTo = join(CWD, 'blog');
if (fs.existsSync(blogTo)) {
  console.log(
    `${chalk.yellow('Example blog posts already exist!')}
     Rename or remove ${chalk.yellow(blogTo)} to regenerate example blog posts.\n`
  );
} else {
  fs.copySync(blogFrom, blogTo);
  exampleSiteCreated = true;
  blogCreated = true;
}

// .gitignore
const gitignoreFrom = join(exampleRoot, 'gitignore');
const gitignoreTo = join(CWD, '.gitignore');
if (fs.existsSync(gitignoreTo)) {
  console.log(
    `${chalk.yellow('.gitignore already exists')} in ${chalk.yellow(CWD)}
     Rename or remove the file to regenerate an example version.\n`
  );
} else {
  fs.copySync(gitignoreFrom, gitignoreTo);
}

// copy other files
glob.sync(exampleRoot + '/**/*')
  .forEach(file => {
    if (fs.lstatSync(file).isDirectory()) { return; }

    const file_name = path.basename(file);
    if (file_name === 'gitignore') { return; }

    const folder = path.basename(path.dirname(file));
    if (folder === 'blog' || folder === 'docs') { return; }

    const targetFile = path.resolve(file).replace(basics_example, CWD);
    try {
      fs.copySync(file, targetFile, { overwrite: false, errorOnExist: true });
      exampleSiteCreated = true;
    } catch (e) {
      console.log(
        `${chalk.yellow(file_name + ' already exists')}
         Rename or remove the file to regenerate an example version.\n`
      );
    }
  });

if (exampleSiteCreated) {
  console.log(
    `${chalk.green('Website created')} in ${chalk.green('/website')}\n`
  );
}

if (docsCreated) {
  console.log(
    `Go to ${chalk.yellow('/website/docs')} to see the example docs on your site.\n`
  );
}

if (blogCreated) {
  console.log(
    `Go to ${chalk.yellow('/website/blog')} to see the example blog posts on your site.\n`
  );
}
