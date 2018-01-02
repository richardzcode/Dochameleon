const path = require('path');

const dfs = require('./dfs.js');

const Docs = require('./docs/Docs.js');
const Pages = require('./pages/Pages.js');
const Blog = require('./blog/Blog.js');
const Assets = require('./Assets.js');

const CWD = process.cwd();
const join = path.join;

const noDocsMessage =
  "You have 'doc' in your headerLinks, but no 'docs' folder exists under " +
  "'website' folder. Did you run `dochameleon-init` or `npm run examples`? If so, " +
  "make sure you rename 'docs-examples-from-dochameleon' to 'docs'.";

const noPagesMessage =
  "You have 'page' in your headerLinks, but no 'pages' folder exists in your " +
  "'website' folder.";

const noBlogMessage =
  "You have 'blog' in your headerLinks, but no 'blog' folder exists under " +
  "'website' folder. Did you run `dochameleon-init` or `npm run examples`? If so, " +
  "make sure you rename 'blog-examples-from-dochameleon' to 'blog'.";

class Site {
  constructor(siteConfig) {
    this.config = siteConfig;
    this.stage();

    this.pages = new Pages(siteConfig, join(this.stageRoot, 'pages'));
    this.docs = new Docs(siteConfig, join(CWD, 'docs'));
    this.blog = new Blog(siteConfig, join(CWD, 'blog'));
    this.assets = new Assets(CWD, this.docs, this.pages, this.blog);

    this.rootUrl = this.config.url + this.config.baseUrl;
    this.headerIcon = this.config.url + this.config.headerIcon;

    this.loadHeaderLinks();
  }

  stage() {
    this.siteRoot = CWD;
    this.libRoot = join(__dirname, '..');
    this.stageRoot = join(this.libRoot, 'stage');

    const libCore = join(this.libRoot, 'core');

    this.stageComponents(
      join(this.stageRoot, 'components'),
      join(libCore, 'components'),
      join(this.siteRoot, 'components')
    );

    this.stagePages(
      join(this.stageRoot, 'pages'),
      join(libCore, 'pages', 'components'),
      join(this.siteRoot, 'pages')
    );
  }

  stageComponents(stageComponents, libComponents, siteComponents) {
    dfs.files(join(libComponents, '**'))
      .forEach(file => {
        const dest = file.replace(libComponents, stageComponents);
        dfs.copy(file, dest);
      });
    dfs.files(join(siteComponents, '**'))
      .forEach(file => {
        const dest = file.replace(siteComponents, stageComponents);
        dfs.copy(file, dest);
      });
  }

  stagePages(stagePages, pageComponents, sitePages) {
    dfs.files(join(pageComponents, '**'))
      .forEach(file => {
        const dest = file.replace(pageComponents, stagePages);
        dfs.copy(file, dest);
      });
    dfs.files(join(sitePages, '**'))
      .forEach(file => {
        const dest = file.replace(sitePages, stagePages);
        dfs.copy(file, dest);
      });
  }

  convertHeaderLink(link) {
    const baseUrl = this.config.baseUrl;
    let href;
    if (link.doc) {
      if (!dfs.exists(this.docs.rootPath)) { throw new Error(noDocsMessage); }
      href = this.docs.docLink(link.doc, this.config);
    } else if (link.page) {
      if (!dfs.exists(this.pages.rootPath)) { throw new Error(noPagesMessage); }
      href = baseUrl + link.page + '.html';
    } else if (link.blog) {
      if (!dfs.exists(this.blog.rootPath)) { throw new Error(noBlogMessage); }
      href = baseUrl + 'blog';
    }

    return Object.assign({}, link, { href: href });
  }

  loadHeaderLinks() {
    this.headerLinks = this.config.headerLinks
      .map(link => this.convertHeaderLink(link));
  }
}

module.exports = Site;
