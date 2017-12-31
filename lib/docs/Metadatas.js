const path = require('path');
const fs = require('fs');
const glob = require('glob');

const Markdown = require('../parse/Markdown.js');

const join = path.join;

const markdown = new Markdown();

class Metadatas {
  constructor(siteConfig, rootPath, sidebars) {
    this.siteConfig = siteConfig;
    this.rootPath = rootPath;
    this.sidebars = sidebars;

    this.loadMetadatas();
  }

  loadMetadatas() {
    const metadatas = {};
    this._files()
      .map(file => this.processMetadata(file))
      .filter(metadata => !!metadata)
      .forEach(metadata => metadatas[metadata.id] = metadata);

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

    this.metadatas = metadatas;
  }

  getMetadata(id) {
    return this.metadatas[id] || null;
  }

  processMetadata(file) {
    const file_content = fs.readFileSync(file, 'utf8');
    const metadata = markdown.extractMetadata(file_content);

    metadata.source = path.basename(file);
    if (!metadata.id) {
      metadata.id = path.basename(file, path.extname(file));
    }
    if (metadata.id.includes('/')) {
      throw new Error('Document id cannot include "/".');
    }
    if (!metadata.title) { metadata.title = metadata.id; }

    metadata.path = metadata.id + '.html';
    metadata.permalink = this.siteConfig.baseUrl + 'docs/' + metadata.path;

    const found = this.sidebars.sidebar_items
      .filter(item => item.id === metadata.id);
    if (found.length > 0) {
      const item = found[0];
      metadata.sidebar = item.sidebar;
      metadata.category = item.category;

      if (item.next) { metadata.next = item.next; }
      if (item.previous) { metadata.previous = item.previous; }
    }

    return metadata;
  }

  _files() {
    return glob.sync(join(this.rootPath, '**'))
      .filter(file => {
        const ext = path.extname(file);
        return ['.md', '.markdown'].includes(ext);
      });
  }
}

module.exports = Metadatas;
