const path = require('path');
const Feed = require('feed');
const React = require('react');
const renderToStaticMarkup = require('react-dom/server').renderToStaticMarkup;

const dfs = require('./dfs.js');
const Extractor = require('./Extractor.js');
const BlogPageLayout = require('./components/blog/BlogPageLayout.js');
const BlogPostLayout = require('./components/blog/BlogPostLayout.js');

const join = path.join;

const extractor = new Extractor();

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
  constructor(site, rootPath) {
    this.site = site;
    this.rootPath = rootPath;

    this.loadMetadatas();
  }

  isEmpty() {
    return this.metadatas.length === 0;
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

  feed(type) {
    type = type || 'rss';

    const site = this.site;
    const rootUrl = site.urlWithRoot('blog');
    const metadatas = this.metadatas;
    const feed = new Feed({
      title: site.config.title + ' Blog',
      description: 'The best place to stay up-to-date with the latest ' +
        site.config.title + ' news and events.',
      id: rootUrl,
      link: rootUrl,
      image: site.headerIcon,
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

  renderPage(pageNumber, pageSize, lang) {
    pageNumber = pageNumber || 1;
    pageSize = pageSize || 10;

    const site = this.site;
    const from = (pageNumber - 1) * pageSize;
    const to = from + pageSize;
    const posts = this.metadatas.slice(from, to);
    const previous = pageNumber > 1
      ? site.url('/blog/page' + (pageNumber - 1) + '/index.html', lang)
      : null;
    const next = to < (this.metadatas.length - 1)
      ? site.url('/blog/page' + (pageNumber + 1) + '/index.html', lang)
      : null;
    const blogPageComp = (
      <BlogPageLayout
        site={site}
        posts={posts}
        previous={previous}
        next={next}
        lang={lang}
      />
    );
    return renderToStaticMarkup(blogPageComp);
  }

  render(post, lang) {
    if (typeof post === 'string') { post = this.findByPath(post); }
    if (!post) { return ''; }

    const site = this.site;
    const recent = this.metadatas.slice(0, 10);
    const blogPostComp = <BlogPostLayout site={site} post={post} recent={recent} lang={lang} />
    return renderToStaticMarkup(blogPostComp);
  }

  _parseFile(file) {
    const metadata = extractor.extractMetadata(dfs.read(file));
    // From 2015-08-13-blog-post-name-0.5.md to 2015/08/13/blog-post-name-0-5.html
    metadata.path = path.basename(file)
      .replace('-', '/')
      .replace('-', '/')
      .replace('-', '/')
      .replace(/\.md$/, '.html');

    const site = this.site;
    metadata.permalink = function(lang) { return site.blogUrl(this.path, lang); }

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
      : metadata.content.trim().substring(0, 250).trim();

    return metadata;
  }
}

module.exports = Blog;
