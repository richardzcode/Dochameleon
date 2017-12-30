const fs = require('fs');

class Sidebars {
  constructor(sidebars_json) {
    this.sidebars_json = sidebars_json;

    this.loadSidebars();
  }

  loadSidebars() {
    let sidebars = {};
    if (fs.existsSync(this.sidebars_json)) {
      sidebars = require(this.sidebars_json);
    }

    const sidebar_items = [];
    Object.keys(sidebars)
      .forEach(key => {
        const sidebar = sidebars[key];
        Object.keys(sidebar)
          .forEach(category => {
            const doc_ids = sidebar[category];
            doc_ids.forEach(id => {
            const entry = {
              id: id,
              sidebar: sidebar,
              category: category
            };
            const last = sidebar_items.length > 0
              ? sidebar_items[sidebar_items.length-1]
              : null;
            if (last) {
              entry.previous = last.id;
              last.next = id;
            }
            sidebar_items.push(entry);
          });
        });
      });

    this.sidebars = sidebars;
    this.sidebar_items = sidebar_items;
  }

  getSidebarItem(id) {
    const found = this.sidebar_items.filter(item => item.id === id);
    return found.length > 0? found[0] : null;
  }
}

module.exports = Sidebars;
