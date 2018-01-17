const currentYear = new Date().getFullYear();

const siteConfig = {
  projectName: 'Dochameleon',
  title: 'Dochameleon',
  tagline: 'Open Source Documentation Site Generator',
  copyright: 'Copyright © ' + currentYear + ' Richard Zhang',

  rootUrl: 'https://richardzcode.github.io',
  baseUrl: '/Dochameleon',

  icon: 'img/dochameleon.png',
  favicon: 'img/favicon.png',

  js: [
    'https://buttons.github.io/buttons.js',
  ],

  headerLinks: [
    {doc: 'guide_installation', label: 'Docs'},
    {url: 'https://github.com/richardzcode/Dochameleon', label: 'GitHub'},
    {page: 'help', label: 'Help'},
    {blog: true, label: 'Blog'},
  ]
};

module.exports = siteConfig;
