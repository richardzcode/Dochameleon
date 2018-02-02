class Analytics {
  constructor(site) {
    this.config = site.analyticsConfig
    if (!this.config) { return; }

    const { js } = this.config;
    if (js) { // add js to config js
      const js_ary = [].concat(js).filter(entry => typeof entry !== 'object');
      
      site.config.js = site.config.js? site.config.js.concat(js_ary) : js_ary;
    }
  }
}

module.exports = Analytics;
