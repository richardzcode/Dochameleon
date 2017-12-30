const fs = require('fs');
const Metadata = require('../core/metadata.js');

function readCategories(sidebar) {
  const metadatas = [];
  Object.keys(Metadata).forEach(id => {
    const metadata = Metadata[id];
    if (metadata.sidebar === sidebar) {
      metadatas.push(metadata);
    }
  });

  // Build a hashmap of article_id -> metadata
  const articles = {};
  for (let i = 0; i < metadatas.length; ++i) {
    const metadata = metadatas[i];
    articles[metadata.id] = metadata;
  }

  // Build a hashmap of article_id -> previous_id
  const previous = {};
  for (let i = 0; i < metadatas.length; ++i) {
    const metadata = metadatas[i];
    if (metadata.next) {
      if (!articles[metadata.next]) {
        throw new Error(
          `Improper sidebars.json file, document with id '${
            metadata.next
          }' not found. Make sure that documents with the ids specified in sidebars.json exist and that no ids are repeated.`
        );
      }
      previous[articles[metadata.next].id] = metadata.id;
    }
  }

  // Find the first element which doesn't have any previous
  let first = null;
  for (let i = 0; i < metadatas.length; ++i) {
    const metadata = metadatas[i];
    if (!previous[metadata.id]) {
      first = metadata;
      break;
    }
  }

  const categories = [];
  let currentCategory = null;

  let metadata = first;
  let i = 0;
  while (metadata && i++ < 1000) {
    if (!currentCategory || metadata.category !== currentCategory.name) {
      currentCategory && categories.push(currentCategory);
      currentCategory = {
        name: metadata.category,
        links: [],
      };
    }
    currentCategory.links.push(metadata);
    metadata = articles[metadata.next];
  }
  categories.push(currentCategory);

  return categories;
}

module.exports = readCategories;
