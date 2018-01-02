const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');
const chalk = require('chalk');
const color = require('color');
const createSitemap = require('sitemap').createSitemap;

const join = path.join;

class Assets {
  constructor(rootPath, docs, pages, blog) {
    this.rootPath = rootPath;
    this.docs = docs;
    this.pages = pages;
    this.blog = blog;
  }

  sitemap(siteConfig) {
    let urls = [];

    this.pages.files()
      .forEach(file => {
        const url = file.split('/pages')[1]
          .replace(/\.js$/, '.html');
        urls.push({url, changefreq: 'weekly', priority: 0.5});
      });

    this.blog.metadatas
      .forEach(metadata => {
        const url = metadata.permalink;
        urls.push({url, changefreq: 'weekly', priority: 0.3});
      });

    this.docs.metadatas
      .forEach(metadata => {
        const url = metadata.permalink;
        urls.push({url, changefreq: 'weekly', priority: 0.3});
      });

    const sitemap = createSitemap({
      hostname: siteConfig.url,
      cacheTime: 600 * 1000, // 600 sec - cache purge period
      urls: urls,
    });

    return new Promise((resolve, reject) => {
      sitemap.toXML((err, xml) => {
        if (err) {
          reject('An error has occured.');
        } else {
          resolve(xml);
        }
      });
    });
  }

  staticFiles() {
    return glob.sync(join(this.rootPath, 'static', '**'), {dot: true})
      .filter(file => !fs.lstatSync(file).isDirectory());
  }

  cssFiles() {
    return glob.sync(join(this.rootPath, 'static', 'css', '*.css'));
  }

  isSeparateCss(siteConfig, file) {
    if (!siteConfig.separateCss) { return false; }
    const found = siteConfig.separateCss
      .filter(css => file.includes(css));
    return found.length > 0;
  }

  cssReplaceColor(siteConfig, content) {
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
      content = content.replace(new RegExp('\\$' + key, 'g'), color);
    });
    const codeColor = color(siteConfig.colors.primaryColor)
      .alpha(0.07)
      .string();
    return content.replace(new RegExp('\\$codeColor', 'g'), codeColor);
  }

  mainCss(siteConfig) {
    const basePath = __dirname + '/../static/css/main.css';
    const base = fs.readFileSync(basePath, {encoding: 'utf8'});

    const contents = this.cssFiles()
      .filter(file => !this.isSeparateCss(file))
      .map(file => fs.readFileSync(file, { encoding: 'utf8' }));

    let css = [base].concat(contents).join('\n');
    return this.cssReplaceColor(siteConfig, css);
  }
};

module.exports = Assets;
