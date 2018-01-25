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
  ],

  headerLinks: [
    {type: 'doc', value: 'guide_installation', label: 'Docs'},
    {type: 'doc', value: 'doc1', label: 'Examples'},
    {type: 'url', value: 'https://github.com/richardzcode/Dochameleon', label: 'GitHub'},
    {type: 'page', value: 'help', label: 'Help'},
    {type: 'blog', label: 'Blog'},
  ]
};

module.exports = siteConfig;
