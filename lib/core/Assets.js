const path = require('path');
const chalk = require('chalk');
const createSitemap = require('sitemap').createSitemap;

const dfs = require('./dfs.js');

const join = path.join;

class Assets {
  constructor(site, rootPath) {
    this.site = site;
    this.rootPath = rootPath;
  }

  sitemap() {
    let urls = [];

    this.site.pages.files()
      .forEach(file => {
        const url = file.split('/pages')[1]
          .replace(/\.js$/, '.html');
        urls.push({url, changefreq: 'weekly', priority: 0.5});
      });

    this.site.blog.metadatas
      .forEach(metadata => {
        const url = metadata.permalink();
        urls.push({url, changefreq: 'weekly', priority: 0.3});
      });

    this.site.docs.metadatas
      .forEach(metadata => {
        const url = metadata.permalink();
        urls.push({url, changefreq: 'weekly', priority: 0.3});
      });

    const sitemap = createSitemap({
      hostname: this.site.rootUrl,
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
    return dfs.files(join(this.rootPath, '**'));
  }
};

module.exports = Assets;
