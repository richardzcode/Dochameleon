const path = require('path');
const Feed = require('feed');
const React = require('react');
const renderToStaticMarkup = require('react-dom/server').renderToStaticMarkup;

const dfs = require('../dfs.js');
const Markdown = require('../parse/Markdown.js');

const BlogPageLayout = require('./components/BlogPageLayout.js');
const BlogPostLayout = require('./components/BlogPostLayout.js');

const join = path.join;

const markdown = new Markdown();

const dtToString = dt => {
  const year = dt.getFullYear();
  const month = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ][dt.getMonth()];
  const day = dt.getDate();

  return month + ' ' + day + ', ' + year;
}

class Blog {
  constructor(siteConfig, rootPath) {
    this.siteConfig = siteConfig;
    this.rootPath = rootPath;

    this.loadMetadatas();
  }

  findByPath(path) {
    const found = this.metadatas
      .filter(metadata => metadata.path === path);
    return found.length > 0? found[0] : null;
  }

  files() {
    return dfs.files(join(this.rootPath, '**/*.*'), ['.md', '.markdown']);
  }

  loadMetadatas() {
    this.metadatas = this.files()
      .sort()
      .reverse()
      .map(file => this._parseFile(file));
  }

  feed(site, type) {
    type = type || 'rss';

    const rootUrl = site.config.url + '/blog';
    const icon = site.headerIcon;
    const metadatas = this.metadatas;
    const feed = new Feed({
      title: site.config.title + ' Blog',
      description:
        'The best place to stay up-to-date with the latest ' +
        site.config.title +
        ' news and events.',
      id: rootUrl,
      link: rootUrl,
      image: icon,
      copyright: site.config.copyright,
      updated: metadatas.length > 0? new Date(metadatas[0].date) : new Date(),
    });

    metadatas.forEach(post => {
      feed.addItem({
        title: post.title,
        link: rootUrl + '/' + post.path,
        author: [{
            name: post.author,
            link: post.authorURL,
          }],
        date: new Date(post.date),
        description: post.brief,
      });
    });

    return type === 'rss' ? feed.rss2() : feed.atom1();
  }

  renderPage(site, pageNumber, pageSize) {
    pageNumber = pageNumber || 1;
    pageSize = pageSize || 10;
    const from = (pageNumber - 1) * pageSize;
    const to = from + pageSize;
    const metadatas = this.metadatas.slice(from, to);
    const previous = pageNumber > 1
      ? site.config.url + '/blog/page' + (pageNumber - 1) + '/index.html'
      : null;
    const next = to < (this.metadatas.length - 1)
      ? site.config.url + '/blog/page' + (pageNumber + 1) + '/index.html'
      : null;
    const blogPageComp = (
      <BlogPageLayout
        metadatas={metadatas}
        site={site}
        pageNumber={pageNumber}
        pageSize={pageSize}
        previous={previous}
        next={next}
      />
    );
    return renderToStaticMarkup(blogPageComp);
  }

  render(site, metadata) {
    if (typeof metadata === 'string') { metadata = this.findByPath(metadata); }
    if (!metadata) { return ''; }

    const recent = this.metadatas.slice(0, 10);
    const blogPostComp = (
      <BlogPostLayout
        metadata={metadata}
        recent={recent}
        site={site}
      />
    );
    return renderToStaticMarkup(blogPostComp);
  }

  _parseFile(file) {
    const metadata = markdown.extractMetadata(dfs.read(file));
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
      .replace(/([0-9]+\-[0-9]+\-[0-9]+)\-.+/, (match, $1) => $1 + 'T06:00:00.000');
    metadata.date = new Date(dtStr);
    metadata.dtStr = dtToString(metadata.date);

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
}

module.exports = Blog;
