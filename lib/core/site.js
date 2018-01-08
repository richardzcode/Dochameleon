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
    this.icon = this.config.icon? this.config.baseUrl + this.config.icon : '';
    this.favicon = this.config.favicon? this.config.baseUrl + this.config.favicon : '';

    this.theme = {};
    dfs.files(join(this.stageRoot, 'theme', '**/*.js'))
      .forEach(file => {
        const theme = require(file);
        Object.assign(this.theme, theme);
      });

    this.loadHeaderLinks();
  }

  stage() {
    this.siteRoot = CWD;
    this.libRoot = join(__dirname, '..');
    this.stageRoot = join(this.libRoot, 'stage');

    const libCore = join(this.libRoot, 'core');

    // clear
    dfs.remove(this.stageRoot);

    // components
    this.stageFiles(
      join(this.stageRoot, 'components'),
      join(libCore, 'components'),
      join(this.siteRoot, 'components')
    );

    // theme
    this.stageFiles(
      join(this.stageRoot, 'theme'),
      join(libCore, 'theme'),
      join(this.siteRoot, 'theme')
    );

    // pages
    this.stageFiles(
      join(this.stageRoot, 'pages'),
      join(libCore, 'pages', 'components'),
      join(this.siteRoot, 'pages')
    );
  }

  stageFiles(stageDir, libDir, siteDir) {
    dfs.files(join(libDir, '**'))
      .forEach(file => {
        const dest = file.replace(libDir, stageDir);
        dfs.copy(file, dest);
      });
    dfs.files(join(siteDir, '**'))
      .forEach(file => {
        const dest = file.replace(siteDir, stageDir);
        dfs.copy(file, dest);
      });
  }

  docUrl(id) {
    return this.config.baseUrl + 'docs/' + id + '.html';
  }

  pageUrl(path) {
    return this.config.baseUrl + (path.endsWith('.html')? path : path + '.html');
  }

  url(path) {
    return this.config.baseUrl + path;
  }

  convertHeaderLink(link) {
    const baseUrl = this.config.baseUrl;
    let href;
    if (link.doc) {
      if (!dfs.exists(this.docs.rootPath)) { throw new Error(noDocsMessage); }
      href = this.docUrl(link.doc);
    } else if (link.page) {
      if (!dfs.exists(this.pages.rootPath)) { throw new Error(noPagesMessage); }
      href = this.pageUrl(link.page);
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
