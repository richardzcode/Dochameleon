const path = require('path');
const fs = require('fs');
const glob = require('glob');
const chalk = require('chalk');

const CWD = process.cwd();
const siteConfig = require(CWD + '/siteConfig.js');

function readSidebar() {
  let allSidebars = {};
  if (fs.existsSync(CWD + '/sidebars.json')) {
    allSidebars = require(CWD + '/sidebars.json');
  }

  const order = {};
  Object.keys(allSidebars).forEach(sidebar => {
    const categories = allSidebars[sidebar];

    let ids = [];
    let categoryOrder = [];
    Object.keys(categories).forEach(category => {
      ids = ids.concat(categories[category]);
      for (let i = 0; i < categories[category].length; i++) {
        categoryOrder.push(category);
      }
    });

    for (let i = 0; i < ids.length; i++) {
      const id = ids[i];
      let previous, next;
      if (i > 0) previous = ids[i - 1];
      if (i < ids.length - 1) next = ids[i + 1];
      order[id] = {
        previous: previous,
        next: next,
        sidebar: sidebar,
        category: categoryOrder[i],
      };
    }
  });
  return order;
}

// split markdown header
function splitHeader(content) {
  const lines = content.split(/\r?\n/);
  if (lines[0] !== '---') { return {}; }

  let i = 1;
  for (; i < lines.length - 1; ++i) {
    if (lines[i] === '---') { break; }
  }
  return {
    header: lines.slice(1, i + 1).join('\n'),
    content: lines.slice(i + 1).join('\n'),
  };
}

// Extract markdown metadata header
function extractMetadata(content) {
  const metadata = {};
  const both = splitHeader(content);
  if (Object.keys(both).length === 0) {
    return {metadata, rawContent: content};
  }
  const lines = both.header.split('\n');
  for (let i = 0; i < lines.length - 1; ++i) {
    const keyvalue = lines[i].split(':');
    const key = keyvalue[0].trim();
    let value = keyvalue
      .slice(1)
      .join(':')
      .trim();
    try {
      value = JSON.parse(value);
    } catch (e) {}
    metadata[key] = value;
  }
  return {metadata, rawContent: both.content};
}

// process the metadata for a document found in the docs folder
function processMetadata(file) {
  const result = extractMetadata(fs.readFileSync(file, 'utf8'));

  const metadata = result.metadata;
  const rawContent = result.rawContent;
  metadata.source = path.basename(file);

  if (!metadata.id) {
    metadata.id = path.basename(file, path.extname(file));
  }
  if (metadata.id.includes('/')) {
    throw new Error('Document id cannot include "/".');
  }
  if (!metadata.title) {
    metadata.title = metadata.id;
  }

  metadata.permalink = 'docs/' + metadata.id + '.html';

  const order = readSidebar();
  const id = metadata.id;

  if (order[id]) {
    metadata.sidebar = order[id].sidebar;
    metadata.category = order[id].category;

    if (order[id].next) {
      metadata.next_id = order[id].next;
      metadata.next = order[id].next;
    }
    if (order[id].previous) {
      metadata.previous_id = order[id].previous;
      metadata.previous = order[id].previous;
    }
  }

  return {metadata, rawContent: rawContent};
}

// process metadata for all docs and save into core/metadata.js
function generateMetadataDocs() {
  let order;
  try {
    order = readSidebar();
  } catch (e) {
    console.error(e);
    process.exit(1);
  }

  const metadatas = {};

  let files = glob.sync(CWD + '/docs/**');
  files.forEach(file => {
    const extension = path.extname(file);
    if (extension === '.md' || extension === '.markdown') {
      const res = processMetadata(file);
      if (!res) { return; }
      let metadata = res.metadata;
      metadatas[metadata.id] = metadata;
    }
  });

  // Get the titles of the previous and next ids so that we can use them in
  // navigation buttons in DocsLayout.js
  Object.keys(metadatas).forEach(id => {
    const metadata = metadatas[id];
    if (metadata.previous) {
      const previous = metadatas[metadata.previous];
      metadata.previous_title = previous? previous.title : 'Previous';
    }
    if (metadata.next) {
      const next = metadatas[metadata.next];
      metadata.next_title = next? next.title : 'Next';
    }
  });

console.log(__dirname + '/../core/metadata.js');
  fs.writeFileSync(
    __dirname + '/../core/metadata.js',
    '/**\n' +
      ' * @generated\n' +
      ' */\n' +
      'module.exports = ' +
      JSON.stringify(metadatas, null, 2) +
      ';\n'
  );
}

// process metadata for blog posts and save into core/MetadataBlog.js
function generateMetadataBlog() {
  const metadatas = [];

  let files = glob.sync(CWD + '/blog/**/*.*');
  files
    .sort()
    .reverse()
    .forEach(file => {
      const extension = path.extname(file);
      if (extension !== '.md' && extension !== '.markdown') {
        return;
      }
      // Transform
      //   2015-08-13-blog-post-name-0.5.md
      // into
      //   2015/08/13/blog-post-name-0-5.html
      const filePath = path
        .basename(file)
        .replace('-', '/')
        .replace('-', '/')
        .replace('-', '/')
        .replace(/\.md$/, '.html');
      const result = extractMetadata(fs.readFileSync(file, {encoding: 'utf8'}));
      const rawContent = result.rawContent;
      const metadata = Object.assign(
        {path: filePath, content: rawContent},
        result.metadata
      );

      metadata.id = metadata.title;

      // Extract, YYYY, MM, DD from the file name
      let filePathDateArr = path
        .basename(file)
        .toString()
        .split('-');
      metadata.date = new Date(
        filePathDateArr[0] +
          '-' +
          filePathDateArr[1] +
          '-' +
          filePathDateArr[2] +
          'T06:00:00.000Z'
      );

      metadatas.push(metadata);
    });

  fs.writeFileSync(
    __dirname + '/../core/MetadataBlog.js',
    '/**\n' +
      ' * @generated\n' +
      ' */\n' +
      'module.exports = ' +
      JSON.stringify(metadatas, null, 2) +
      ';\n'
  );
}

module.exports = {
  readSidebar,
  extractMetadata,
  processMetadata,
  generateMetadataDocs,
  generateMetadataBlog,
};
