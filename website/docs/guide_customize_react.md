---
id: guide_react
title: Customization - React Component
sidebar_label: React Component
---

Write web pages in React, then Dochameleon will convert them into static HTML files.

### Pages

Write web pages in `website/pages` folder. Each file exports an React component which will be rendered as one page.

### Components

You may write custom React components in `website/components` folder, and use them in pages.

Core library has React components too. At runtime, Dochameleon merges the two sets together.

Take a look at example site `components` folder. It has number of components. Among them, `Footer.js` will overwrite the core Footer. Try remove it, and run `npm run start`, you'll notice default footer is different.
