---
id: guide_installation
title: Installation
sidebar_label: Installation
---

### Install via script

The easiest way to install Dochameleon is by using script `dochameleon-init`

First install the script

```
npm install --global dochameleon-init
```

Then, go to the folder that your'd like to create the documentation website, run

```
dochameleon-init
```

The init script does three things:

1. Create `website` folder
2. NPM install `dochameleon` package, which includes core library.
3. Copy a basic example website so you can start working on docs.

### Manual installation

If you do not want `dochameleon-init`, rather create website manually.

1. Create and go into the `website` folder
2. Create package.json with content,
```
{
  "scripts": {
    "examples": "dochameleon-examples"
  }
}
```
3. Install Dochameleon, run
```
npm install dochameleon
```
4. Init with basic example, run
```
npm run examples
```

### Run Local Dev Server

```
npm run start
```
