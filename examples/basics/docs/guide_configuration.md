---
id: guide_configuration
title: Site Configuration
sidebar_label: Site Configuration
---

```bash
website/
└── siteConfig.js
```

Site configurations are defined in `website/siteConfig.js`, here is an example:

```
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

  css: [],
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
```

Dochameleon itself does not have css file. Theming is through CSS-in-JS. Extra css and js files can be specified in siteConfig.js

`headerLinks` defines what displayed on main menu. Memu items can be one of the four types: doc, blog, page, url
