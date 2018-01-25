---
id: guide_search
title: Search
sidebar_label: Search
---

Dochameleon support search by [Algolia](https://www.algolia.com). Algolia is super easy to setup, and its community plan is free.

### Configure

After setup Algolia for your project. Add `searchConfig.js` along with `siteConfig.js`

```bash
website/
└── searchConfig.js
```

Content similiar to this:
```
const searchConfig = {
  application_id: ...,
  search_api_key: ...,
  api_key: ...,
  js: 'https://cdn.jsdelivr.net/algoliasearch/3/algoliasearch.min.js'
}

module.exports = searchConfig;
```

Make sure searchConfig.js is in your `.gitignore`. You want to keep api_key safe.

### Add to Menu

Modify `siteConfig.js`, add this entry to headerLinks:
```
    {type: 'search'},
```

### Indexing

Indexing happens at site generation time. When you run `npm run build`, the latest docs are pushed to Algolia.
