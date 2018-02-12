const path = require('path');
const React = require('react');
const renderToStaticMarkup = require('react-dom/server').renderToStaticMarkup;

const dfs = require('./dfs.js');
const Extractor = require('./Extractor.js');
const DocsLayout = require('./components/docs/DocsLayout.js');

const join = path.join;

const extractor = new Extractor();

class Docs {
  constructor(site, rootPath) {
    this.site = site;
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
      .filter(metadata => metadata.permalink() === uri);
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
    const metadata = extractor.extractMetadata(file_content);

    metadata.source = path.basename(file);
    if (!metadata.id) {
      metadata.id = path.basename(file, path.extname(file));
    }
    if (metadata.id.includes('/')) {
      throw new Error('Document id cannot include "/".');
    }
    if (!metadata.title) { metadata.title = metadata.id; }

    metadata.path = metadata.id + '.html';

    const site = this.site;
    metadata.permalink = function(lang) { return site.docUrl(this.id, lang); }

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

  render(metadata, lang) {
    if (typeof metadata === 'string') { metadata = this.find(metadata); }
    if (!metadata) { return null; }

    const site = this.site;
    if (lang) {
      const doc = site.i18n.translateDoc(metadata.id, lang);
      if (doc) { metadata = doc; }
    }
    const content = this._replaceDocLinksWithFull(metadata.content);

    return renderToStaticMarkup(
      <DocsLayout site={site} metadata={metadata} lang={lang}>
        {content}
      </DocsLayout>
    );
  }

  _replaceDocLinksWithFull(content) {
    this.metadatas
      .map(metadata => ({
        source: metadata.source,
        url: this.site.docUrl(metadata.id)
      }))
      .forEach(entry => {
        content = content.replace(
          new RegExp('\\]\\((\\./)?' + entry.source, 'g'),
          '](' + entry.url
        );
      });
    return content;
  }
}

module.exports = Docs;
