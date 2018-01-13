---
id: guide_color_scheme
title: Customization - Color Scheme
sidebar_label: Color Scheme
---

Changing colors probably is the simplest way to differenciate a website.

Dochameleon does not have CSS file. All styles are defined in Javascript, which enables easy style customization. Changing color scheme is a perfect example.

The core library has a [theme](https://github.com/richardzcode/Dochameleon/tree/master/lib/core/theme) folder which defines UI style. Custom website also have a `theme` folder. At runtime the two folder will be combined together, with the custom file replace core file if names are same. 

Copy [color.js](https://github.com/richardzcode/Dochameleon/tree/master/lib/core/theme/color.js) into website folder `/theme`, then change `primary` and `secondary` color. So it becomes:

```
const color = {
  primary: '#283e4a',
  secondary: '#337ab7',
  tertiary: '#e0e0e0',
  font: '#393939',
  fontSecondary: '#000'
};

color.title = color.primary;
color.content = color.font;
color.contentSecondary = color.fontSecondary;
color.clickable = color.primary;

color.nav = {
  primary: color.primary,
  secondary: color.secondary,
  tertiary: color.tertiary,
  font: '#fff',
  fontSecondary: 'rgba(255, 255, 255, 0.8)',
  fontTertiary: 'rgba(255, 255, 255, 0.6)'
};

color.footer = '#808080';

module.exports = color;
```

run dev server again, `npm run start`. See what happens.
