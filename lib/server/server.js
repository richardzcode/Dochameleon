function execute(port) {
  const express = require('express');
  const request = require('request');
  const fs = require('fs-extra');
  const path = require('path');
  const color = require('color');
  const glob = require('glob');
  const chalk = require('chalk');

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
  const assets = new Assets(docs, pages, blog);
  const site = new Site(docs);

  function isSeparateCss(file) {
    if (!siteConfig.separateCss) { return false; }
    const found = siteConfig.separateCss
      .filter(css => file.includes(css));
    return found.length > 0;
  }

  // handle all requests for document pages
  const app = express();

  app.get(/docs\/.*html$/, (req, res, next) => {
    const html = docs.render(req.path.toString(), site);
    if (html) {
      res.send(html);
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
    res.set('Content-Type', 'application/rss+xml');
    const type = req.path.toString().match(/atom\.xml$/) ? 'atom' : 'rss';
    res.send(blog.feed(site, type));
  });

  // handle all requests for blog pages and posts
  app.get(/blog\/.*html$/, (req, res) => {
    const path = req.path.toString();
    if (path.endsWith('/index.html')) {
      res.send(blog.renderPage(site));
      return;
    }

    // else send corresponding blog post
    const parts = path.split('/blog/');
    res.send(blog.render(site, parts[1]));
  });

  // handle all other main pages
  app.get('*.html', (req, res, next) => {
    let uri = req.path.toString().replace(siteConfig.baseUrl, '');
    const html = pages.render(uri, site);
    if (html) {
      res.send(html);
    } else {
      next();
    }
  });

  // generate the main.css file by concatenating user provided css to the end
  app.get(/main\.css$/, (req, res) => {
    const mainCssPath =
      __dirname +
      '/../static/' +
      req.path.toString().replace(siteConfig.baseUrl, '/');
    const mainCss = fs.readFileSync(mainCssPath, {encoding: 'utf8'});

    const contents = glob.sync(CWD + '/static/**/*.css')
      .filter(file => !isSeparateCss(file))
      .map(file => fs.readFileSync(file, { encoding: 'utf8' }));

    let cssContent = [mainCss].concat(contents).join('\n');

    if (
      !siteConfig.colors ||
      !siteConfig.colors.primaryColor ||
      !siteConfig.colors.secondaryColor
    ) {
      console.error(
        `${chalk.yellow(
          'Missing color configuration.'
        )} Make sure siteConfig.colors includes primaryColor and secondaryColor fields.`
      );
    }

    Object.keys(siteConfig.colors).forEach(key => {
      const color = siteConfig.colors[key];
      cssContent = cssContent.replace(new RegExp('\\$' + key, 'g'), color);
    });
    const codeColor = color(siteConfig.colors.primaryColor)
      .alpha(0.07)
      .string();
    cssContent = cssContent.replace(new RegExp('\\$codeColor', 'g'), codeColor);

    res.set('Content-Type', 'text/css');
    res.send(cssContent);
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
