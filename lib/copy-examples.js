#!/usr/bin/env node

const chalk = require('chalk');
const fs = require('fs-extra');
const glob = require('glob');
const path = require('path');

const join = path.join;
const CWD = process.cwd();

// add scripts to package.json file
const package_json = join(CWD, 'package.json');
if (fs.existsSync(package_json)) {
  const content = JSON.parse(
    fs.readFileSync(CWD + '/package.json', 'utf8')
  );
  if (!content.scripts) {
    content.scripts = {};
  }
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
const basics_example = join(__dirname, '..', 'examples', 'basics');

// copy docs examples
const docs = join(CWD, 'docs-examles-from-dochameleon');
if (fs.existsSync(docs)) {
  console.log(
    `${chalk.yellow('Example docs already exist!')}
     Rename or remove ${chalk.yellow(docs)} to regenerate example docs.\n`
  );
} else {
  fs.copySync(
    join(basics_example, '/docs-examples-from-dochameleon'),
    docs
  );
  exampleSiteCreated = true;
  docsCreated = true;
}

// copy blog examples
const blog = join(CWD, 'blog-examles-from-dochameleon');
if (fs.existsSync(blog)) {
  console.log(
    `${chalk.yellow('Example blog posts already exist!')}
     Rename or remove ${chalk.yellow(blog)} to regenerate example blog posts.\n`
  );
} else {
  fs.copySync(
    join(basics_example, 'blog-examples-from-dochameleon'),
    blog
  );
  exampleSiteCreated = true;
  blogCreated = true;
}

// copy .gitignore file
const gitignore = join(CWD, '.gitignore');
if (fs.existsSync(gitignore)) {
  console.log(
    `${chalk.yellow('.gitignore already exists')} in ${chalk.yellow(CWD)}
     Rename or remove the file to regenerate an example version.\n`
  );
} else {
  fs.copySync(join(basics_example, 'gitignore'), gitignore);
}

// copy other files
let files = glob.sync(basics_example + '/**/*');
files.forEach(file => {
  if (fs.lstatSync(file).isDirectory()) { return; }
  if (path.basename(file) === 'gitignore') { return; }
  const containingFolder = path.basename(path.dirname(file));
  if (
    containingFolder === 'blog-examples-from-dochameleon' ||
    containingFolder === 'docs-examples-from-dochameleon'
  ) {
    return;
  }
  const filePath = path.resolve(file).split(path.resolve(basics_example))[1];
  try {
    fs.copySync(file, join(CWD, filePath), {
      overwrite: false,
      errorOnExist: true,
    });
    exampleSiteCreated = true;
  } catch (e) {
    const file_name = path.basename(filePath);
    console.log(
      `${chalk.yellow(file_name + ' already exists')}
       in ${chalk.yellow('website' + filePath.split(file_name)[0])}
       Rename or remove the file to regenerate an example version.\n`
    );
  }
});

if (exampleSiteCreated) {
  console.log(
    `${chalk.green('Example website created')} in ${chalk.green('/website')}\n`
  );
}

if (docsCreated) {
  console.log(
    `Rename ${chalk.yellow('/website/docs-examples-from-dochameleon')}
     to ${chalk.yellow('/docs')}
     to see the example docs on your site.\n`
  );
}

if (blogCreated) {
  console.log(
    `Rename ${chalk.yellow('/website/blog-examples-from-dochameleon')}
     to ${chalk.yellow('/website/blog')}
     to see the example blog posts on your site.\n`
  );
}
