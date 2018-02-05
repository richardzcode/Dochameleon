const path = require('path');

const dfs = require('./dfs.js');
const Parser = require('./Parser.js');

const CWD = process.cwd();
const join = path.join;

class Site {
  constructor(siteConfig) {
    this.config = siteConfig;
    this.searchConfig = this.loadConfigFile('searchConfig.js');
    this.analyticsConfig = this.loadConfigFile('analyticsConfig.js');

    this.stage();

    this.rootUrl = siteConfig.rootUrl || 'https://richardzcode.github.io';
    this.baseUrl = this.config.baseUrl || '/';
    this.icon = this.config.icon? this.url(this.config.icon) : '';
    this.favicon = this.config.favicon? this.url(this.config.favicon) : '';

    this.parser = new Parser(this);

    const Pages = require(join(this.stageRoot, 'Pages.js'));
    const Docs = require(join(this.stageRoot, 'Docs.js'));
    const Blog = require(join(this.stageRoot, 'Blog.js'));
    const Assets = require('./Assets.js');
    const Search = require('./Search.js');
    const Analytics = require('./Analytics.js');

    this.pages = new Pages(this, join(this.stageRoot, 'pages'));
    this.docs = new Docs(this, join(this.stageRoot, 'docs'));
    this.blog = new Blog(this, join(this.stageRoot, 'blog'));
    this.assets = new Assets(this, join(this.stageRoot, 'static'));
    this.search = new Search(this);
    this.analytics = new Analytics(this);

    this.loadTheme();
    this._validate();
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
      ['dfs.js', 'Extractor.js', 'Pages.js', 'Docs.js', 'Blog.js']
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

  loadConfigFile(filename) {
    const file = join(CWD, filename);
    return dfs.exists(file)? require(file) : null;
  }

  docUrl(id) {
    return this.url('docs/' + id + '.html');
  }

  blogUrl(path) {
    return this.url('blog/' + path);
  }

  pageUrl(path) {
    return this.url(path.endsWith('.html')? path : path + '.html');
  }

  url(path) {
    return path.startsWith('http')
      ? path
      : this._joinUrl(this.baseUrl, path);
  }

  urlWithRoot(path) {
    if (path.startsWith('http')) { return path; }

    const root = path.startsWith(this.baseUrl)
      ? this.rootUrl
      : this._joinUrl(this.rootUrl, this.baseUrl);
    return this._joinUrl(root, path);
  }

  _joinUrl(first, second) {
    return [
      first.endsWith('/')? first.slice(0, first.length - 1) : first,
      second.startsWith('/')? second.slice(1) : second
    ].join('/');
  }

  _validate() {
    this.config.headerLinks
      .forEach(link => {
        switch(link.type) {
          case 'doc':
            if (!dfs.exists(this.docs.rootPath)) {
              const msg = "Header links contain 'doc', but no 'docs' folder exists under 'website' folder.";
              throw new Error(msg);
            }
            break;
          case 'page':
            if (!dfs.exists(this.pages.rootPath)) {
              const msg = "Header links contain 'page', but no 'pages' folder exists under 'website' folder.";
              throw new Error(msg);
            }
            break;
          case 'blog':
            if (!dfs.exists(this.blog.rootPath)) {
              const msg = "Header links contain 'blog', but no 'blog' folder exists under 'website' folder";
              throw new Error(msg);
            }
        }
      });
  }
}

module.exports = Site;
