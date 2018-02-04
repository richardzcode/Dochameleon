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

  headerLinks: [
    {type: 'doc', value: 'guide_installation', label: 'Docs'},
    {type: 'page', value: 'help', label: 'Help'},
    {type: 'blog', label: 'Blog'},
    {type: 'url', value: 'https://github.com/richardzcode/Dochameleon', img: 'img/github.png', label: 'GitHub'},
    {type: 'search'},
  ],

  buildDir: '../docs'
};

module.exports = siteConfig;
