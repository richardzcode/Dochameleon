const currentYear = new Date().getFullYear();

const siteConfig = {
  projectName: 'test-site',
  title: 'Test Site',
  tagline: 'A website for testing',
  copyright: 'Copyright © ' + currentYear + ' Richard Zhang',

  rootUrl: 'https://richardzcode.github.io',
  baseUrl: '/test-site',

  icon: 'img/dochameleon.png',
  favicon: 'img/favicon.png',

  js: [
    'https://buttons.github.io/buttons.js'
  ]
};

module.exports = siteConfig;
