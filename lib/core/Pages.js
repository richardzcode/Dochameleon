const path = require('path');
const React = require('react');
const renderToStaticMarkup = require('react-dom/server').renderToStaticMarkup;

const dfs = require('./dfs.js');
const Page = require('./components/Page.js');

const join = path.join;

class Pages {
  constructor(siteConfig, rootPath) {
    this.siteConfig = siteConfig;
    this.rootPath = rootPath;
  }

  files() {
    return dfs.files(join(this.rootPath, '**'));
  }

  render(site, uri) {
    let file = join(this.rootPath, uri);
    if (dfs.exists(file)) { return dfs.read(file); }

    file = file.replace(/\.html$/, '.js');
    if (!dfs.exists(file)) { return ''; }

    const ReactComp = require(file);
    return renderToStaticMarkup(
      <Page site={site}>
        <ReactComp site={site} />
      </Page>
    );
  }
}

module.exports = Pages;
