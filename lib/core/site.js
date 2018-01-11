const path = require('path');

const dfs = require('./dfs.js');

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

    this.rootUrl = siteConfig.rootUrl || 'https://richardzcode.github.io';
    this.baseUrl = this.config.baseUrl || '/';
    this.icon = this.config.icon? this.url(this.config.icon) : '';
    this.favicon = this.config.favicon? this.url(this.config.favicon) : '';

    const Pages = require(join(this.stageRoot, 'Pages.js'));
    const Docs = require(join(this.stageRoot, 'Docs.js'));
    const Blog = require(join(this.stageRoot, 'Blog.js'));
    const Assets = require('./Assets.js');

    this.pages = new Pages(this, join(this.stageRoot, 'pages'));
    this.docs = new Docs(this, join(this.stageRoot, 'docs'));
    this.blog = new Blog(this, join(this.stageRoot, 'blog'));
    this.assets = new Assets(join(this.stageRoot, 'static'), this.docs, this.pages, this.blog);

    this.loadTheme();
    this.loadHeaderLinks();
  }

  stage() {
    this.siteRoot = CWD;
    this.libRoot = join(__dirname, '..');
    this.stageRoot = join(this.libRoot, 'stage');

    const libCore = join(this.libRoot, 'core');

    // clear
    dfs.remove(this.stageRoot);

    // core
    this.stageFiles(
      this.stageRoot,
      libCore,
      null,
      ['dfs.js', 'Pages.js', 'Docs.js', 'Blog.js']
    );

    // parse
    this.stageFiles(
      join(this.stageRoot, 'parse'),
      join(libCore, 'parse')
    );

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

    // docs
    this.stageFiles(
      join(this.stageRoot, 'docs'),
      join(CWD, 'docs')
    );

    // blog
    this.stageFiles(
      join(this.stageRoot, 'blog'),
      join(CWD, 'blog')
    );

    // static
    this.stageFiles(
      join(this.stageRoot, 'static'),
      join(this.libRoot, 'static'),
      join(this.siteRoot, 'static')
    );
  }

  stageFile(stagePath, libPath) {
    dfs.copy(libPath, stagePath);
  }

  stageFiles(stageDir, libDir, siteDir, matches) {
    dfs.files(join(libDir, '**'))
      .forEach(file => {
        if (matches) {
          const found = matches.filter(relative => {
            return join(libDir, relative) === file
          });
          if (found.length === 0) { return; }
        }

        const dest = file.replace(libDir, stageDir);
        dfs.copy(file, dest);
      });

    if (!siteDir) { return; }
    dfs.files(join(siteDir, '**'))
      .forEach(file => {
        if (matches) {
          const found = matches.filter(relative => join(siteDir, relative) === file);
          if (found.length === 0) { return; }
        }

        const dest = file.replace(siteDir, stageDir);
        dfs.copy(file, dest);
      });
  }

  loadTheme() {
    this.theme = {};
    const coreThemeFiles = ['blog.js', 'color.js', 'main.js', 'markdown.js', 'reset.js'];
    // core files first
    dfs.files(join(this.stageRoot, 'theme', '**/*.js'))
      .forEach(file => {
        if (!coreThemeFiles.includes(path.basename(file))) { return; }
        const theme = require(file);
        Object.assign(this.theme, theme);
      });
    // custom files second
    dfs.files(join(this.stageRoot, 'theme', '**/*.js'))
      .forEach(file => {
        if (coreThemeFiles.includes(path.basename(file))) { return; }
        const theme = require(file);
        Object.assign(this.theme, theme);
      });
  }

  loadHeaderLinks() {
    this.headerLinks = this.config.headerLinks
      .map(link => this.convertHeaderLink(link));
  }

  docUrl(id) {
    return this.url('docs/' + id + '.html');
  }

  pageUrl(path) {
    return this.url(path.endsWith('.html')? path : path + '.html');
  }

  url(path) {
    return this._joinUrl(this.baseUrl, path);
  }

  urlWithRoot(path) {
    const root = this._joinUrl(this.rootUrl, this.baseUrl);
    return this._joinUrl(root, path);
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

  _joinUrl(first, second) {
    return [
      first.endsWith('/')? first.slice(0, first.length - 1) : first,
      second.startsWith('/')? second.slice(1) : second
    ].join('/');
  }

}

module.exports = Site;
