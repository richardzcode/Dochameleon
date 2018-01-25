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
      site.docs.render(metadata)
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
      site.blog.render(metadata)
    );
  });

  // blog index
  const pageSize = 10;
  for (var i = 0; i < site.blog.metadatas.length; i += pageSize) {
    const pageNumber = Math.floor(i / pageSize) + 1;
    const content = site.blog.renderPage(pageNumber, pageSize);
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
      site.blog.feed('rss')
    );
    dfs.write(
      join(buildDir, 'blog', 'atom.xml'),
      site.blog.feed('atom')
    );
  }

  // copy blog assets if they exist
  if (dfs.exists(join(site.blog.rootPath, 'assets'))) {
    dfs.copy(join(site.blog.rootPath, 'assets'), join(buildDir, 'blog', 'assets'));
  }

  // create sitemap
  site.assets.sitemap(siteConfig)
    .then(xml => dfs.write(join(buildDir, 'sitemap.xml'), xml));

  // copy all static files
  site.assets.staticFiles()
    .forEach(file => {
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
        dfs.write(join(buildDir, uri), site.pages.render(uri));
        return;
      }

      const targetFile = join(buildDir, file.split('pages')[1]);
      dfs.copy(file, targetFile);
    });

  // Search Indexing
  site.docs.metadatas.forEach(metadata => {
    site.search.addDoc(metadata);
  });

  // Generate CNAME file if a custom domain is specified in siteConfig
  if (siteConfig.cname) {
    dfs.write(join(buildDir, 'CNAME'), siteConfig.cname);
  }
}

module.exports = execute;
