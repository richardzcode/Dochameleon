const fs = require('fs-extra');
const path = require('path');

const Docs = require('../docs/Docs.js');
const Pages = require('../pages/Pages.js');
const Blog = require('../blog/Blog.js');
const Assets = require('./Assets.js');

const CWD = process.cwd();
const join = path.join;

const hasDocs = fs.existsSync(join(CWD, 'docs'));
const noDocsMessage =
  "You have 'doc' in your headerLinks, but no 'docs' folder exists under " +
  "'website' folder. Did you run `dochameleon-init` or `npm run examples`? If so, " +
  "make sure you rename 'docs-examples-from-dochameleon' to 'docs'.";

const hasPages = fs.existsSync(join(CWD, 'pages'));
const noPagesMessage =
  "You have 'page' in your headerLinks, but no 'pages' folder exists in your " +
  "'website' folder.";

const hasBlog = fs.existsSync(join(CWD, 'blog'));
const noBlogMessage =
  "You have 'blog' in your headerLinks, but no 'blog' folder exists under " +
  "'website' folder. Did you run `dochameleon-init` or `npm run examples`? If so, " +
  "make sure you rename 'blog-examples-from-dochameleon' to 'blog'.";

class Site {
  constructor(siteConfig) {
    this.config = siteConfig;
    this.docs = new Docs(siteConfig, join(CWD, 'docs'));
    this.pages = new Pages(siteConfig, join(CWD, 'pages'));
    this.blog = new Blog(siteConfig, join(CWD, 'blog'));
    this.assets = new Assets(CWD, this.docs, this.pages, this.blog);

    this.rootUrl = this.config.url + this.config.baseUrl;
    this.headerIcon = this.config.url + this.config.headerIcon;

    this.loadHeaderLinks();
  }

  convertHeaderLink(link) {
    const baseUrl = this.config.baseUrl;
    let href;
    if (link.doc) {
      href = this.docs.docLink(link.doc, this.config);
      if (!hasDocs) { throw new Error(noDocsMessage); }
    } else if (link.page) {
      href = baseUrl + link.page + '.html';
      if (!hasPages) { throw new Error(noPagesMessage); }
    } else if (link.blog) {
      href = baseUrl + 'blog';
      if (!hasBlog) { throw new Error(noBlogMessage); }
    }

    return Object.assign({}, link, { href: href });
  }

  loadHeaderLinks() {
    this.headerLinks = this.config.headerLinks
      .map(link => this.convertHeaderLink(link));
  }
}

module.exports = Site;
