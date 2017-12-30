const React = require('react');
const renderToStaticMarkup = require('react-dom/server').renderToStaticMarkup;
const path = require('path');
const Feed = require('feed');

const Metadatas = require('./Metadatas.js');

const BlogPageLayout = require('./components/BlogPageLayout.js');
const BlogPostLayout = require('./components/BlogPostLayout.js');

const join = path.join;

class Blog {
  constructor(siteConfig, rootPath) {
    this.siteConfig = siteConfig;
    this.rootPath = rootPath;

    this.metadatas = new Metadatas(siteConfig, rootPath);
  }

  feed(site, type) {
    type = type || 'rss';

    const rootUrl = site.config.url + '/blog';
    const icon = site.headerIcon;
    const metadatas = this.metadatas.metadatas;
    const feed = new Feed({
      title: siteConfig.title + ' Blog',
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
    const metadatas = this.metadatas.metadatas.slice(from, to);
    const previous = pageNumber > 1
      ? site.config.url + '/blog/page' + (pageNumber - 1) + '/index.html'
      : null;
    const next = to < (this.metadatas.metadatas.length - 1)
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

  render(site, path) {
    const recent = this.metadatas.metadatas.slice(0, 10);
    const found = this.metadatas.metadatas
      .filter(metadata => metadata.path === path);
    const metadata = found.length > 0? found[0] : null;

    const blogPostComp = (
      <BlogPostLayout
        metadata={metadata}
        recent={recent}
        site={site}
      />
    );
    return renderToStaticMarkup(blogPostComp);
  }
}

module.exports = Blog;
