---
id: guide_site_publishing
title: Site Publishing
sidebar_label: Site Publishing
---

Dochameleon converts Markdown and React source files into static HTML files. Then you put them on any of the web hosting solution, GitHub, Amazon S3, etc.

### Build

```
npm run build
```

Then all HTML files will be generated into `website/build` folder.

### Hosting

Now you may get all of the files inside `website/build` and copy over to web hosting.

### GitHub Pages

[GitHub Pages](https://pages.github.com/) is a very natural hosting choice for open source projects. To publish to GitHub Pages,

1. Follow steps to create your GitHub Pages. Select "master branch /docs folder" as `Source`
<img src="../img/github_pages.png" width="420px"/>
2. Copy `website/build/{projectName}` folder to your project `/docs` folder.
3. Commit and push your git repo.

That's it!
