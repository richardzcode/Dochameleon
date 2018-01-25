const algoliasearch = require('algoliasearch');

class Search {
  constructor(site) {
    this.config = site.searchConfig
    if (!this.config) { return; }

    const { application_id, api_key, js } = this.config;
    if (!appliction_id || !api_key) { return; }

    this.client = algoliasearch(application_id, api_key);

    if (js) { // add js to config js
      site.config.js = site.config.js? site.config.js.concat(js) : [js];
    }
  }

  getDocIndex() {
    if (!this.client) { return null; }
    if (!this.docIndex) {
      const index = this.client.initIndex('docs');
      const setting = {
        searchableAttributes: ['title', 'category', 'content']
      };
      index.setSettings(setting, function(err, content) {
        if (err) {
          console.log('set settings error', err);
        } else {
          console.log('set settings success', content);
        }
      });
      this.docIndex = index;
    }
    return this.docIndex;
  }

  addDoc(doc) {
    if (!this.client) { return; }
    if (!doc) { return; }

    const index = this.getDocIndex();
    const obj = {
      objectID: doc.id,
      title: doc.title,
      category: doc.category,
      permalink: doc.permalink,
      brief: doc.brief,
      content: doc.content
    };
    index.addObject(obj, function(err, content) {
      if (err) {
        console.log('search not able to add doc ' + doc.id);
      } else {
        console.log('search successfully added doc ' + doc.id);
      }
    });
  }
}

module.exports = Search;
