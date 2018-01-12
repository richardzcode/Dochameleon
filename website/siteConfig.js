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

  headerLinks: [
    {doc: 'guide_installation', label: 'Docs'},
    {doc: 'doc1', label: 'Examples'},
    {page: 'help', label: 'Help'},
    {blog: true, label: 'Blog'},
  ]
};

module.exports = siteConfig;
