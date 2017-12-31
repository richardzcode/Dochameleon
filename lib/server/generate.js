function execute() {
  const fs = require('fs-extra');
  const path = require('path');
  const mkdirp = require('mkdirp');
  const glob = require('glob');

  const Docs = require('../docs/Docs.js');
  const Pages = require('../pages/Pages.js');
  const Blog = require('../blog/Blog.js');
  const Assets = require('./Assets.js');
  const Site = require('./site.js');

  const CWD = process.cwd();
  const join = path.join;

  const siteConfig = require(CWD + '/siteConfig.js');
  const docs = new Docs(siteConfig, join(CWD, 'docs'));
  const pages = new Pages(siteConfig, join(CWD, 'pages'));
  const blog = new Blog(siteConfig, join(CWD, 'blog'));
  const assets = new Assets(CWD, docs, pages, blog);
  const site = new Site(docs);

  console.log('generate.js triggered...');

  const buildDir = join(CWD, 'build', siteConfig.projectName);
  fs.removeSync(buildDir);

  function writeFileAndCreateFolder(file, content) {
    mkdirp.sync(file.replace(new RegExp('/[^/]*$'), ''));
    fs.writeFileSync(file, content);
  }

  // docs
  Object.keys(docs.metadatas.metadatas).forEach(id => {
    const metadata = docs.find(id);
    writeFileAndCreateFolder(
      join(buildDir, 'docs', metadata.path),
      docs.render(id, site)
    );
  });

  // copy docs assets if they exist
  if (fs.existsSync(join(docs.rootPath, 'assets'))) {
    fs.copySync(
      join(docs.rootPath, 'assets'),
      join(buildDir, 'docs', 'assets')
    );
  }

  // blog
  blog.metadatas.metadatas.forEach(metadata => {
    writeFileAndCreateFolder(
      join(buildDir, 'blog', metadata.path),
      blog.render(site, metadata)
    );
  });

  // blog index
  const blog_metadatas = blog.metadatas.metadatas;
  const pageSize = 10;
  for (var i = 0; i < blog_metadatas.length; i += pageSize) {
    const pageNumber = Math.floor(i / pageSize) + 1;
    const content = blog.renderPage(site, pageNumber, pageSize);
    writeFileAndCreateFolder(
      join(buildDir, 'blog', 'page' + pageNumber, 'index.html'),
      content
    );
    if (pageNumber === 1) {
      writeFileAndCreateFolder(
        join(buildDir, 'blog', 'index.html'),
        content
      );
    }
  }

  // blog feed
  if (blog_metadatas.length > 0) {
    writeFileAndCreateFolder(
      join(buildDir, 'blog', 'feed.xml'),
      blog.feed(site, 'rss')
    );
    writeFileAndCreateFolder(
      join(buildDir, 'blog', 'atom.xml'),
      blog.feed(site, 'atom')
    );
  }

  // copy blog assets if they exist
  if (fs.existsSync(join(CWD, 'blog', 'assets'))) {
    fs.copySync(join(CWD, 'blog', 'assets'), join(buildDir, 'blog', 'assets'));
  }

  // create sitemap
  assets.sitemap(siteConfig)
    .then(xml => writeFileAndCreateFolder(join(buildDir, 'sitemap.xml'), xml));

  // copy all static files from dochameleon
  glob.sync(join(__dirname, '..', 'static', '**'))
    .forEach(file => {
      if (fs.lstatSync(file).isDirectory()) { return; }

      let targetFile = join(buildDir, file.split('/static/')[1] || '');
      mkdirp.sync(targetFile.replace(new RegExp('/[^/]*$'), ''));

      if (file.match(/\.css$/)) {
        let css = fs.readFileSync(file, 'utf8');
        css = assets.cssReplaceColor(siteConfig, css);
        fs.writeFileSync(targetFile, css);
        return;
      }

      fs.copySync(file, targetFile);
    });

  // main.css
  fs.writeFileSync(
    join(buildDir, 'css', 'main.css'),
    assets.mainCss(siteConfig)
  );

  // copy all static files from user
  glob.sync(join(CWD, 'static', '**'), {dot: true})
    .forEach(file => {
      if (fs.lstatSync(file).isDirectory()) { return; }

      if (file.match(/\.css$/) && !assets.isSeparateCss(siteConfig, file)) { return; }

      let parts = file.split('/static/');
      let targetFile = join(buildDir, parts[1]);
      mkdirp.sync(targetFile.replace(new RegExp('/[^/]*$'), ''));
      fs.copySync(file, targetFile);
    });

  // pages
  glob.sync(join(CWD, 'pages', '**'))
    .forEach(file => {
      if (fs.lstatSync(file).isDirectory()) { return; }

      if (file.match(/\.js$/)) {
        const uri = file.replace(pages.rootPath, '')
          .replace(/\.js$/, '.html');
        writeFileAndCreateFolder(
          join(buildDir, uri),
          pages.render(uri, site)
        );
        return;
      }

      const targetFile = join(buildDir, file.split('pages')[1]);
      mkdirp.sync(targetFile.replace(new RegExp('/[^/]*$'), ''));
      fs.copySync(file, targetFile);
    });

  // Generate CNAME file if a custom domain is specified in siteConfig
  if (siteConfig.cname) {
    let targetFile = join(buildDir, 'CNAME');
    fs.writeFileSync(targetFile, siteConfig.cname);
  }
}

module.exports = execute;
