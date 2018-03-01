const currentYear = new Date().getFullYear();

const siteConfig = {
  projectName: 'Dochameleon',
  title: 'Dochameleon',
  tagline: 'Open Source Documentation Site Generator',
  copyright: 'Copyright © ' + currentYear + ' Richard Zhang',

  rootUrl: 'https://richardzcode.github.io',
  baseUrl: '',

  icon: 'img/dochameleon.png',
  favicon: 'img/favicon.png',

  js: [
    { src: 'https://buttons.github.io/buttons.js', async: true }
  ],

  buildDir: '../docs'
};

module.exports = siteConfig;
