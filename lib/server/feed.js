const path = require('path');
const Feed = require('feed');

const CWD = process.cwd();

const siteConfig = require(CWD + '/siteConfig.js');

const blogFolder = path.resolve('../blog/');
const blogRootURL = siteConfig.url + '/blog';
const jestImage = siteConfig.url + siteConfig.headerIcon;

let readMetadata = require('./readMetadata.js');

module.exports = function(type) {
  console.log('feed.js triggered...');

  type = type || 'rss';

  readMetadata.generateMetadataBlog();
  const MetadataBlog = require('../core/MetadataBlog.js');

  const feed = new Feed({
    title: siteConfig.title + ' Blog',
    description:
      'The best place to stay up-to-date with the latest ' +
      siteConfig.title +
      ' news and events.',
    id: blogRootURL,
    link: blogRootURL,
    image: jestImage,
    copyright: siteConfig.copyright,
    updated: new Date(MetadataBlog[0].date),
  });

  MetadataBlog.forEach(post => {
    const url = blogRootURL + '/' + post.path;
    let content = '';
    if (post.content.indexOf('<!--truncate-->') == -1) {
      content = post.content.trim().substring(0, 250);
    } else {
      let contentArr = post.content.split('<!--truncate-->');
      if (contentArr.length > 0) {
        content = contentArr[0];
      }
    }

    feed.addItem({
      title: post.title,
      link: url,
      author: [
        {
          name: post.author,
          link: post.authorURL,
        },
      ],
      date: new Date(post.date),
      description: content,
    });
  });

  return type === 'rss' ? feed.rss2() : feed.atom1();
};
