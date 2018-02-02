class Analytics {
  constructor(site) {
    this.config = site.analyticsConfig
    if (!this.config) { return; }

    const { js } = this.config;
    if (js) { // add js to config js
      site.config.js = (site.config.js || []).concat(js);
    }
  }
}

module.exports = Analytics;
