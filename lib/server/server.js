function execute(port) {
  const express = require('express');
  const request = require('request');
  const fs = require('fs-extra');
  const path = require('path');

  const Docs = require('../docs/Docs.js');
  const Pages = require('../pages/Pages.js');
  const Blog = require('../blog/Blog.js');
  const Assets = require('./Assets.js');
  const Site = require('./site.js');

  const CWD = process.cwd();
  const join = path.join;

  const siteConfig = require(join(CWD, 'siteConfig.js'));
  const docs = new Docs(siteConfig, join(CWD, 'docs'));
  const pages = new Pages(siteConfig, join(CWD, 'pages'));
  const blog = new Blog(siteConfig, join(CWD, 'blog'));
  const assets = new Assets(CWD, docs, pages, blog);
  const site = new Site(docs);

  // handle all requests for document pages
  const app = express();

  app.get(/docs\/.*html$/, (req, res, next) => {
    const metadata = docs.findByUri(req.path.toString());
    if (metadata) {
        res.send(docs.render(metadata, site));
    } else {
      next();
    }
  });

  app.get('/sitemap.xml', function(req, res) {
    assets.sitemap(siteConfig)
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
    res.send(blog.feed(site, type));
  });

  app.get(/blog\/.*html$/, (req, res) => {
    const path = req.path.toString();
    if (path.endsWith('/index.html')) {
      res.send(blog.renderPage(site));
      return;
    }

    const parts = path.split('/blog/');
    res.send(blog.render(site, parts[1]));
  });

  app.get('*.html', (req, res, next) => {
    let uri = req.path.toString().replace(siteConfig.baseUrl, '');
    const html = pages.render(uri, site);
    if (html) {
      res.send(html);
    } else {
      next();
    }
  });

  app.get(/main\.css$/, (req, res) => {
    res.set('Content-Type', 'text/css');
    res.send(assets.mainCss(siteConfig));
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
  app.use(siteConfig.baseUrl, express.static(CWD + '/static'));
  app.use(siteConfig.baseUrl, express.static(__dirname + '/../static'));

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
