const path = require('path');
const JS = require('fsts').JS;

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
    const I18n = require('./I18n.js');

    this.pages = new Pages(this, join(this.stageRoot, 'pages'));
    this.docs = new Docs(this, join(this.stageRoot, 'docs'));
    this.blog = new Blog(this, join(this.stageRoot, 'blog'));
    this.assets = new Assets(this, join(this.stageRoot, 'static'));
    this.search = new Search(this);
    this.analytics = new Analytics(this);
    this.i18n = new I18n(this, join(this.siteRoot, 'i18n'));

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
      this.config.componentsDir || join(this.siteRoot, 'components')
    );

    // theme
    this.stageFiles(
      join(this.stageRoot, 'theme'),
      join(libCore, 'theme'),
      this.config.themeDir || join(this.siteRoot, 'theme')
    );

    // pages
    this.stageFiles(
      join(this.stageRoot, 'pages'),
      join(libCore, 'pages'),
      this.config.pagesDir || join(this.siteRoot, 'pages')
    );

    // docs
    this.stageFiles(
      join(this.stageRoot, 'docs'),
      null,
      this.config.docsDir || join(this.siteRoot, 'docs')
    );

    // blog
    this.stageFiles(
      join(this.stageRoot, 'blog'),
      null,
      this.config.blogDir || join(this.siteRoot, 'blog')
    );

    // static
    this.stageFiles(
      join(this.stageRoot, 'static'),
      join(this.libRoot, 'static'),
      this.config.staticDir || join(this.siteRoot, 'static')
    );

    // repo
    const repo_dir = join(CWD, this.config.repoDir || '..');
    const readme_path = join(repo_dir, 'README.md');
    this.stageFile(
      join(this.stageRoot, 'pages', 'README.md'),
      readme_path
    );
    this.stageFiles(
      join(this.stageRoot, 'docs', 'assets'),
      null,
      join(repo_dir, 'docs', 'assets')
    ); // TODO: detect assets instead of just suggest docs/assets
  }

  stageFile(stagePath, srcPath) {
    if (dfs.exists(srcPath)) {
      dfs.copy(srcPath, stagePath);
    }
  }

  stageFiles(stageDir, libDir, siteDir, matches) {
    if (libDir) {
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
    }

    if (siteDir) {
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
  }

  loadTheme() {
    this.theme = {};
    const coreThemeFiles = ['blog.js', 'color.js', 'main.js', 'markdown.js', 'reset.js'];
    // core files first
    dfs.files(join(this.stageRoot, 'theme', '**/*.js'))
      .forEach(file => {
        if (!coreThemeFiles.includes(path.basename(file))) { return; }
        const theme = require(file);
        JS.deepAssign(this.theme, theme);
      });
    // custom files second
    dfs.files(join(this.stageRoot, 'theme', '**/*.js'))
      .forEach(file => {
        if (coreThemeFiles.includes(path.basename(file))) { return; }
        const theme = require(file);
        JS.deepAssign(this.theme, theme);
      });
  }

  loadConfigFile(filename) {
    const file = join(CWD, filename);
    return dfs.exists(file)? require(file) : null;
  }

  docUrl(id, lang) {
    return this.url('docs/' + id + '.html', lang);
  }

  blogUrl(path, lang) {
    return this.url('blog/' + path, lang);
  }

  pageUrl(path, lang) {
    if (!path.endsWith('.html')) { path += '.html'; }
    return this.url(path, lang);
  }

  url(path, lang) {
    if (path.startsWith('http')) { return path; }

    if (lang) { path = this._joinUrl(lang, path); }
    return this._joinUrl(this.baseUrl, path);
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
    if (this.config.headerLinks) {
      this.config.headerLinks
        .map(link => link.type)
        .forEach(type => {
          if (type === 'doc' && !dfs.exists(this.docs.rootPath)) {
            const msg = "Header links contain 'doc', but no 'docs' folder exists under 'website' folder.";
            throw new Error(msg);
          }
          if (type === 'page' && !dfs.exists(this.pages.rootPath)) {
            const msg = "Header links contain 'page', but no 'pages' folder exists under 'website' folder.";
            throw new Error(msg);
          }
          if (type === 'blog' && !dfs.exists(this.blog.rootPath)) {
            const msg = "Header links contain 'blog', but no 'blog' folder exists under 'website' folder";
            throw new Error(msg);
          }
        });
    }
  }
}

module.exports = Site;
