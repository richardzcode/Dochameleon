const path = require('path');

const dfs = require('./dfs.js');

const join = path.join;

class I18n {
  constructor(site, rootPath) {
    this.site = site;
    this.rootPath = rootPath;

    this.loadLanguages();
  }

  hasTranslation() {
    return this.languages && Object.keys(this.languages).length > 0;
  }

  langs() {
    return this.languages
      ? Object.keys(this.languages)
      : [];
  }

  translate(phrase, lang, defVal) {
    let val = defVal || phrase;
    if (!phrase || !lang) { return val; }
    if (typeof phrase !== 'string') { return val; }

    const language = this.languages[lang];
    if (!language) { return val; }

    phrase = phrase.trim();
    if (!phrase) { return val; }

    return language.dictionary[phrase] || val;
  }

  translateDoc(id, lang) {
    if (!id) { return null; }

    const language = this.languages[lang];
    if (!language) { return null; }

    return language.docs[id] || null;
  }

  renderElement(el, lang) {
    if (!el) { return el; }
    if (typeof el === 'string') { return this.translate(el, lang); }
    return el;
  }

  loadLanguages() {
    this.languages = {};

    console.log('check i18n directories from ' + this.rootPath);
    dfs.directories(join(this.rootPath, '*'))
      .forEach(dir => {
        console.log(dir);
        //TODO: parse out lang then call loadLanguage(lang)
        const match = dir.replace(this.rootPath, '')
          .match(/.([a-zA-Z]{2})$/);
        if (match) { this.loadLanguage(match[1]); }
      });

    // Default language pages also needed to be generated, if i18n is on.
    const defLang = this.site.config.defaultLanguage || 'en';
    if (this.langs().length > 0 && !this.languages[defLang]) {
      this.languages[defLang] = {
        dictionary: {},
        docs: {}
      };
    }
  }

  loadLanguage(lang) {
    console.log('load language ' + lang);
    const langRoot = join(this.rootPath, lang);
    const langDocsRoot = join(langRoot, 'docs');

    const configFile = join(langRoot, 'langConfig.js');
    const language = {
      config: dfs.exists(configFile)? require(configFile) : { label: lang },
      dictionary: {},
      docs: {}
    };
    this.languages[lang] = language;

    // load translated docs
    const site = this.site;
    const docPaths = [];
    dfs.files(join(langDocsRoot, '**'), ['.md', '.markdown'])
      .forEach(file => {
        docPaths.push(file); // to be excluded from loading vocabularies
        const doc = site.docs.processMetadata(file);
        if (doc && doc.id) {
          language.docs[doc.id] = Object.assign({}, site.docs.find(doc.id), doc);
        }
      });

    // load vocabularies
    dfs.files(join(langRoot, '**'))
      .filter(file => !docPaths.includes(file))
      .filter(file => !file.endsWith('langConfig.js'))
      .forEach(file => {
        //TODO: load vocabularies from file
        const set = require(file);
        Object.assign(language.dictionary, set);
      });
  }
}

module.exports = I18n;
