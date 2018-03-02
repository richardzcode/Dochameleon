const express = require('express');
const request = require('request');
const path = require('path');

const Site = require('./site.js');

function execute(port) {
  const CWD = process.cwd();
  const join = path.join;

  const siteConfig = require(join(CWD, 'siteConfig.js'));
  const site = new Site(siteConfig);

  const app = express();

  app.get(/docs\/.*html$/, (req, res, next) => {
    let uri = req.path.toString();
    let lang = '';
    const i18nMatch = uri.match(/\/([a-zA-Z]{2})(\/docs\/.+)/);
    if (i18nMatch) {
      lang = i18nMatch[1];
      uri = i18nMatch[2];
    }

    const metadata = site.docs.findByUri(uri);
    if (metadata) {
        res.send(site.docs.render(metadata, lang));
    } else {
      next();
    }
  });

  app.get('/sitemap.xml', function(req, res) {
    site.assets.sitemap(siteConfig)
      .then(xml => {
        res.set('Content-Type', 'application/xml');
        res.send(xml);
      })
      .catch(err => {
        res.send(err);
      });
  });

  app.get(/blog\/.*xml$/, (req, res) => {
    const type = req.path.toString().match(/atom\.xml$/) ? 'atom' : 'rss';
    res.set('Content-Type', 'application/rss+xml');
    res.send(site.blog.feed(type));
  });

  app.get(/blog\/.*html$/, (req, res, next) => {
    let uri = req.path.toString();
    let lang = '';
    const i18nMatch = uri.match(/([a-zA-Z]{2})\/blog\/(.+)/);
    if (i18nMatch) {
      lang = i18nMatch[1];
      uri = i18nMatch[2];
    } else {
      uri = uri.replace('/blog/', '');
    }

    if (uri === 'index.html') {
      res.send(site.blog.renderPage(1, 10, lang));
    } else {
      res.send(site.blog.render(uri, lang));
    }
  });

  app.get('*.html', (req, res, next) => {
    let uri = req.path.toString().replace(siteConfig.baseUrl, '');
    if (uri.startsWith('/')) { uri = uri.substring(1); }

    let lang = '';
    const i18nMatch = uri.match(/^([a-zA-Z]{2})(\/.+)/);
    if (i18nMatch) {
      lang = i18nMatch[1];
      uri = i18nMatch[2];
    }

    const html = site.pages.render(uri, lang);
    if (html) {
      res.send(html);
    } else {
      next();
    }
  });

  // serve static assets from these locations
  app.use(
    site.url('/docs/assets'),
    express.static(join(site.stageRoot, 'docs', 'assets'))
  );
  app.use(
    site.url('/[a-zA-Z]{2}/docs/assets'),
    express.static(join(site.stageRoot, 'docs', 'assets'))
  );
  app.use(
    site.url('/blog/assets'),
    express.static(join(site.stageRoot, 'blog', 'assets'))
  );
  app.use(
    site.url('/[a-zA-Z]{2}/blog/assets'),
    express.static(join(site.stageRoot, 'blog', 'assets'))
  );
  app.use(
    site.url(''),
    express.static(join(site.stageRoot, 'static'))
  );

  // "redirect" requests to pages ending with "/" or no extension so that
  // request to "...blog" returns same result as "...blog/index.html"
  app.get(/\/[^\.]*\/?$/, (req, res) => {
    let path = req.path.toString();
    if (!path.endsWith('/')) { path = path + '/'; }
    request.get(
      'http://localhost:' + port + path + 'index.html',
      (err, response, body) => {
        if (!err) { res.send(body); }
      }
    );
  });

  app.listen(port);
  console.log('Open http://localhost:' + port + '/');
}

module.exports = execute;
