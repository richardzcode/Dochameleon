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
    const metadata = site.docs.findByUri(req.path.toString());
    if (metadata) {
        res.send(site.docs.render(site, metadata));
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
    res.send(site.blog.feed(site, type));
  });

  app.get(/blog\/.*html$/, (req, res) => {
    const path = req.path.toString();
    if (path.endsWith('/index.html')) {
      res.send(site.blog.renderPage(site));
      return;
    }

    const parts = path.split('/blog/');
    res.send(site.blog.render(site, parts[1]));
  });

  app.get('*.html', (req, res, next) => {
    let uri = req.path.toString().replace(siteConfig.baseUrl, '');
    const html = site.pages.render(site, uri);
    if (html) {
      res.send(html);
    } else {
      next();
    }
  });

  // serve static assets from these locations
  app.use(
    siteConfig.baseUrl + 'docs/assets/',
    express.static(CWD + '/docs/assets')
  );
  app.use(
    siteConfig.baseUrl + 'blog/assets/',
    express.static(CWD + '/blog/assets')
  );
  app.use(siteConfig.baseUrl, express.static(join(site.stageRoot, 'static')));

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
