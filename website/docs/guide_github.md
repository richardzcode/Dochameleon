---
id: guide_github
title: Project on GitHub
sidebar_label: Project on GitHub
---

<AUTOGENERATED_TABLE_OF_CONTENTS>

Dochameleon is aware of GitHub conventions. Follow this steps to quickly create website for your GitHub project.

### Installation

Just make sure run `dochameleon-init` at your project repo root.

```
> cd $path_to_project$
> dochameleon-init
> cd website
> npm run start
```

### Configuration

Modify `siteConfig.js` with your project information, particularly:

* projectName
* title
* copyright
* rootUrl
* baseUrl
* icon
* favicon

### Home Page

You may want to make README.md as home page instead of the default one.

The library actually has already created a `readme.html` page with your README.md. You may just copy this source code

```
cp node_modules/dochameleon/lib/core/pages/readme.js pages/index.js
```

Now `npm run start`.