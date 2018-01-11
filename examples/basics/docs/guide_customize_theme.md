---
id: guide_theme
title: Customization - Theme
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
