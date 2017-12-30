const fs = require('fs-extra');
const path = require('path');
const createSitemap = require('sitemap').createSitemap;

class Assets {
  constructor(docs, pages, blog) {
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

    this.blog.metadatas.metadatas
      .forEach(metadata => {
        const url = metadata.permalink;
        urls.push({url, changefreq: 'weekly', priority: 0.3});
      });

    const doc_metadatas = this.docs.metadatas.metadatas;
    Object.keys(doc_metadatas)
      .map(id => doc_metadatas[id])
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
};

module.exports = Assets;
