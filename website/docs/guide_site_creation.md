---
id: guide_site_creation
title: Site Creation
sidebar_label: Site Creation
---

### File Structure

Once installation successful, here is the file structure you'll have under the `website` folder

```
website/
├── blog/
│   ├── 2018-01-08-why-dochameleon.md
│   └── 2018-01-10-staging-step.md
├── components/
├── docs/
│   ├── doc1.md
│   ├── doc2.md
│   ├── doc3.md
│   └── sidebars.json
├── pages
│   ├── help.js
│   ├── index.js
│   └── users.js
├── siteConfig.js
├── static/
└── theme/
```

### Docs

Write documentation under `website/docs` folder, with Markdown.

At beginning of each doc file, add metadata like this:

```
---
id: doc1
title: Latin-ish
sidebar_label: Example Page
---
```

### Blog

Write blog posts under `website/blog` folder, with Markdown.

File name must have the format of `yyyy-mm-dd-blog-file-name.md`

At begging of each blog post, add metadata like this:

```
---
title: Why Dochameleon
author: Richard Zhang
authorUrl: https://github.com/richardzcode
authorImage: https://github.com/richardzcode.png
authorGitHub: richardzcode
---
```

authorUrl and authorImage can be get by name/id of GitHub, Facebook, or Twitter, for example:

```
authorGitHub: richardzcode
```

or

```
authorFBID: ...
```

or

```
authorTwitter: ...
```

### Pages

Write web pages under `website/pages` folder, by writing React. Write components under `website/components` for pages to import.

### Site Configuration

Site configurations are defined in `website/siteConfig.js`

### UI Styling

Customize UI styling under `website/theme`, by writing Javascript. Dochameleon does not have CSS file, it styles UI with Javascript style object.

If prefer to have CSS files, write write under `website/static`. In order to have CSS files in HTML page, you'll need to add links to file in `siteConfig.js`, add to `config.stylesheets` array.
