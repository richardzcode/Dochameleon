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
    fs.readFileSync(package_json, 'utf8')
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
    package_json,
    JSON.stringify(content, null, 2) + '\n'
  );

  console.log(
    `${chalk.green('Wrote dochameleon scripts to package.json file.')}\n`
  );
}

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

    const targetFile = path.resolve(file).replace(exampleRoot, CWD);
    try {
      fs.copySync(file, targetFile, { overwrite: false, errorOnExist: true });
    } catch (e) {
      console.log(
        `${chalk.yellow(file_name + ' already exists')}
         Rename or remove the file to regenerate an example version.\n`
      );
    }
  });

const file_structure = `
    website/
    ├── blog/
    │   ├── 2018-01-08-why-dochameleon.md
    │   └── 2018-01-10-staging-step.md
    ├── components/
    ├── docs/
    │   ├── doc1.md
    │   ├── doc2.md
    │   ├── doc3.md
    │   └── sidebars.json
    ├── pages/
    │   ├── help.js
    │   ├── index.js
    │   └── users.js
    ├── siteConfig.js
    ├── static/
    └── theme/
`

const site_config = chalk.yellow('website/siteConfig.js');

const guide = `
${chalk.green('Website created')} in ${chalk.green('/website')}

Default website file structure:
${chalk.green.dim(file_structure)}

Go to ${chalk.yellow('/website/docs')} to write docs with Markdown.
Go to ${chalk.yellow('/website/blog')} to write blog posts with Markdown.
Go to ${chalk.yellow('/website/pages')} to write customized pages with React.
Go to ${chalk.yellow('/website/components')} to write React components.

Set ${chalk.green('docsDir')} in ${site_config} to change path to docs.
Set ${chalk.green('blogDir')} in ${site_config} to change path to blog posts.

Modify ${site_config} for project settings.
`
console.log(guide);
