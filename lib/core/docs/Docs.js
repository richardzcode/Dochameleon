const path = require('path');
const React = require('react');
const renderToStaticMarkup = require('react-dom/server').renderToStaticMarkup;

const dfs = require('../dfs.js');
const Markdown = require('../parse/Markdown.js');
const DocsLayout = require('./components/DocsLayout.js');

const join = path.join;

const markdown = new Markdown();

class Docs {
  constructor(siteConfig, rootPath) {
    this.siteConfig = siteConfig;
    this.rootPath = rootPath;

    this.sidebars_json = join(rootPath, 'sidebars.json');
    this.loadSidebars();
    this.loadMetadatas();
  }

  files() {
    return dfs.files(join(this.rootPath, '**'), ['.md', '.markdown']);
  }

  find(id) {
    if (!id) { return null; }
    const found = this.metadatas
      .filter(metadata => metadata.id === id);
    return found.length > 0? found[0] : null;
  }

  findByUri(uri) {
    const found = this.metadatas
      .filter(metadata => metadata.permalink === uri);
    return found.length > 0? found[0] : null;
  }

  loadSidebars() {
    this.sidebars = {};
    if (dfs.exists(this.sidebars_json)) {
      this.sidebars = require(this.sidebars_json);
    }

    this.sidebar_items = [];
    Object.keys(this.sidebars)
      .forEach(key => {
        const sidebar = this.sidebars[key];
        Object.keys(sidebar)
          .forEach(category => {
            const doc_ids = sidebar[category];
            doc_ids.forEach(id => {
            const entry = {
              id: id,
              sidebar: sidebar,
              category: category
            };
            const last = this.sidebar_items.length > 0
              ? this.sidebar_items[this.sidebar_items.length-1]
              : null;
            if (last) {
              entry.previous = last.id;
              last.next = id;
            }
            this.sidebar_items.push(entry);
          });
        });
      });
  }

  loadMetadatas() {
    this.metadatas = this.files()
      .map(file => this.processMetadata(file))
      .filter(metadata => !!metadata);

    this.metadatas.forEach(metadata => {
      const previous = this.find(metadata.previous);
      if (previous) {
        metadata.previous_title = previous.title || 'Previous';
      }
      const next = this.find(metadata.next);
      if (next) {
        metadata.next_title = next.title || 'Next';
      }
    });
  }

  processMetadata(file) {
    const file_content = dfs.read(file);
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

    const found = this.sidebar_items
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

  render(site, metadata) {
    if (typeof metadata === 'string') { metadata = this.find(metadata); }
    if (!metadata) { return null; }

    let content = metadata.content;
    markdown.generateTOC(content);
    markdown.replaceDocLinksWithFull(content, this.metadatas, site.config);
    markdown.replaceAssetLinksWithFull(content, site.config);

    return renderToStaticMarkup(
      <DocsLayout
        site={site}
        metadata={metadata}
        docs={this}
      >
        {content}
      </DocsLayout>
    );
  }
}

module.exports = Docs;
