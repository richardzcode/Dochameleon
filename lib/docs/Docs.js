const React = require('react');
const renderToStaticMarkup = require('react-dom/server').renderToStaticMarkup;
const path = require('path');

const Markdown = require('../parse/Markdown.js');
const DocsLayout = require('./components/DocsLayout.js');

const Sidebars = require('./Sidebars.js');
const Metadatas = require('./Metadatas.js');

const join = path.join;

const markdown = new Markdown();

class Docs {
  constructor(siteConfig, rootPath) {
    this.siteConfig = siteConfig;
    this.rootPath = rootPath;

    this.sidebars = new Sidebars(join(rootPath, 'sidebars.json'));
    this.metadatas = new Metadatas(siteConfig, rootPath, this.sidebars);
  }

  docLink(id, siteConfig) {
    const metadata = this.metadatas.metadatas[id];
    return metadata? metadata.permalink : null;
  }

  find(id) {
    return this.metadatas.metadatas[id];
  }

  findByUri(uri) {
    const metadatas = this.metadatas.metadatas;
    const found = Object.keys(metadatas)
      .map(id => metadatas[id])
      .filter(metadata => metadata.permalink === uri);
    return found.length > 0? found[0] : null;
  }

  render(metadata, site) {
    if (typeof metadata === 'string') { metadata = this.find(metadata); }
    if (!metadata) { return null; }

    const metadatas = this.metadatas.metadatas;

    let content = metadata.content;
    markdown.generateTOC(content);
    markdown.replaceDocLinksWithFull(content, metadatas, site.config);
    markdown.replaceAssetLinksWithFull(content, site.config);

    return renderToStaticMarkup(
      <DocsLayout
        site={site}
        current={metadata}
        metadatas={this.metadatas}
        sidebars={this.sidebars}
      >
        {content}
      </DocsLayout>
    );
  }
}

module.exports = Docs;
