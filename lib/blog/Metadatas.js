const path = require('path');
const fs = require('fs');
const glob = require('glob');

const Markdown = require('../parse/Markdown.js');

const join = path.join;

const markdown = new Markdown();

class Metadatas {
  constructor(siteConfig, rootPath) {
    this.siteConfig = siteConfig;
    this.rootPath = rootPath;

    this.loadMetadatas();
  }

  loadMetadatas() {
    this.metadatas = this._files()
      .sort()
      .reverse()
      .map(file => this._parseFile(file));
  }

  _parseFile(file) {
    const metadata = markdown.extractMetadata(fs.readFileSync(file, {encoding: 'utf8'}));
    // Transform
    //   2015-08-13-blog-post-name-0.5.md
    // into
    //   2015/08/13/blog-post-name-0-5.html
    metadata.path = path.basename(file)
      .replace('-', '/')
      .replace('-', '/')
      .replace('-', '/')
      .replace(/\.md$/, '.html');
    metadata.permalink = this.siteConfig.baseUrl + 'blog/' + metadata.path;

    metadata.id = metadata.title;

    // Extract, YYYY, MM, DD from the file name
    const dtStr = path.basename(file)
      .replace(/([0-9]+\-[0-9]+\-[0-9]+)\-.+/, (match, $1) => $1 + 'T06:00:00.000Z');
    metadata.date = new Date(dtStr);

    // brief
    const splitBrief = metadata.content.split('<!--truncate-->');
    metadata.brief = splitBrief.length > 1
      ? splitBrief[0].trim()
      : metadata.content.trim().substring(0, 250);

    // authorImage
    if (!metadata.authorImage && metadata.authorFBID) {
      metadata.authorImage = 'https://graph.facebook.com/' +
        metadata.authorFBID +
        '/picture/?height=200&width=200';
    }

    return metadata;
  }

  _files() {
    return glob.sync(join(this.rootPath, '**/*.*'))
      .filter(file => {
        const ext = path.extname(file);
        return ['.md', '.markdown'].includes(ext);
      });
  }
}

module.exports = Metadatas;
