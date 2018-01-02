const path = require('path');

const dfs = require('./dfs.js');
const Site = require('./site.js');

function execute() {
  const CWD = process.cwd();
  const join = path.join;

  const siteConfig = require(CWD + '/siteConfig.js');
  const site = new Site(siteConfig);

  console.log('generate.js triggered...');

  const buildDir = join(CWD, 'build', siteConfig.projectName);
  dfs.remove(buildDir);

  // docs
  site.docs.metadatas.forEach(metadata => {
    dfs.write(
      join(buildDir, 'docs', metadata.path),
      site.docs.render(site, metadata)
    );
  });

  // copy docs assets if they exist
  if (dfs.exists(join(site.docs.rootPath, 'assets'))) {
    dfs.copy(
      join(site.docs.rootPath, 'assets'),
      join(buildDir, 'docs', 'assets')
    );
  }

  // blog
  site.blog.metadatas.forEach(metadata => {
    dfs.write(
      join(buildDir, 'blog', metadata.path),
      site.blog.render(site, metadata)
    );
  });

  // blog index
  const pageSize = 10;
  for (var i = 0; i < site.blog.metadatas.length; i += pageSize) {
    const pageNumber = Math.floor(i / pageSize) + 1;
    const content = site.blog.renderPage(site, pageNumber, pageSize);
    dfs.write(
      join(buildDir, 'blog', 'page' + pageNumber, 'index.html'),
      content
    );
    if (pageNumber === 1) {
      dfs.write(
        join(buildDir, 'blog', 'index.html'),
        content
      );
    }
  }

  // blog feed
  if (site.blog.metadatas.length > 0) {
    dfs.write(
      join(buildDir, 'blog', 'feed.xml'),
      site.blog.feed(site, 'rss')
    );
    dfs.write(
      join(buildDir, 'blog', 'atom.xml'),
      site.blog.feed(site, 'atom')
    );
  }

  // copy blog assets if they exist
  if (dfs.exists(join(site.blog.rootPath, 'assets'))) {
    dfs.copy(join(site.blog.rootPath, 'assets'), join(buildDir, 'blog', 'assets'));
  }

  // create sitemap
  site.assets.sitemap(siteConfig)
    .then(xml => dfs.write(join(buildDir, 'sitemap.xml'), xml));

  // copy all static files from dochameleon
  dfs.files(join(__dirname, '..', 'static', '**'))
    .forEach(file => {
      let targetFile = join(buildDir, file.split('/static/')[1] || '');
      if (file.match(/\.css$/)) {
        let css = dfs.read(file);
        css = site.assets.cssReplaceColor(siteConfig, css);
        dfs.write(targetFile, css);
        return;
      }

      dfs.copy(file, targetFile);
    });

  // main.css
  dfs.write(
    join(buildDir, 'css', 'main.css'),
    site.assets.mainCss(siteConfig)
  );

  // copy all static files from user
  site.assets.staticFiles()
    .forEach(file => {
      if (file.match(/\.css$/) && !site.assets.isSeparateCss(siteConfig, file)) { return; }

      let parts = file.split('/static/');
      let targetFile = join(buildDir, parts[1]);
      dfs.copy(file, targetFile);
    });

  // pages
  site.pages.files()
    .forEach(file => {
      if (file.match(/\.js$/)) {
        const uri = file.replace(site.pages.rootPath, '')
          .replace(/\.js$/, '.html');
        dfs.write(join(buildDir, uri), site.pages.render(site, uri));
        return;
      }

      const targetFile = join(buildDir, file.split('pages')[1]);
      dfs.copy(file, targetFile);
    });

  // Generate CNAME file if a custom domain is specified in siteConfig
  if (siteConfig.cname) {
    dfs.write(join(buildDir, 'CNAME'), siteConfig.cname);
  }
}

module.exports = execute;
