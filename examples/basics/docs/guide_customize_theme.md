---
id: guide_theme
title: UI Theme
sidebar_label: UI Theme
---

Like mentioned in [Customization - Color Scheme](./guide_color_scheme.html), Dochameleon defines UI style in `/theme` folder, in Javascript.

### Core and Custom Theme

Core theme located at `lib/core/theme` folder of the core library. Custom theme located at `website/theme` folder. Each file exports an object that defines a set of UI styles.

Two steps happening at runtime.

First step, files in the two folder will be merged together. If custom theme file has same name as core theme file then it will overwrite the core file.

Second step, Dochameleon reads all theme files and merge all objects into one final object. This is the theme object, contains defination of all UI styles.

### Customization

Customization is simply write theme files in `website/theme` folder.

Create a file `website/theme/custom.js`
```
const custom = {
  button: {
    margin: '4px',
    border: '1px solid blue',
    borderRadius: '3px',
    color: 'blue',
    display: 'inline-block',
    fontSize: '14px',
    fontWeight: '400',
    lineHeight: '1.2em',
    padding: '10px',
    textTransform: 'uppercase',
    textDecoration: 'none',
    transition: 'background 0.3s, color 0.3s'
  }
}

module.exports = custom;
```

run dev server again, `npm run start`. See how buttons look like now.
