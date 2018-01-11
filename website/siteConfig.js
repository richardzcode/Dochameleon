const currentYear = new Date().getFullYear();

const siteConfig = {
  title: 'Test Site',
  tagline: 'A website for testing',
  url: 'https://richardzcode.github.io',
  baseUrl: '/test-site/',
  projectName: 'test-site',
  icon: 'img/dochameleon.png',
  favicon: 'img/favicon.png',
  headerLinks: [
    {doc: 'guide_installation', label: 'Docs'},
    {doc: 'doc1', label: 'Examples'},
    {page: 'help', label: 'Help'},
    {blog: true, label: 'Blog'},
  ],
  copyright: 'Copyright © ' + currentYear + ' Richard Zhang',
  scripts: ['https://buttons.github.io/buttons.js']
};

module.exports = siteConfig;
