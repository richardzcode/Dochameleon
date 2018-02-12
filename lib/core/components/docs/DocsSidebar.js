const React = require('react');

const SideNav = require('../SideNav.js');

class DocsSidebar extends React.Component {
  render() {
    const { site, metadata, lang } = this.props;
    const { sidebar } = metadata;
    if (!sidebar) { return null; }

    const expand_sidebar = {};
    Object.keys(sidebar)
      .forEach(category => {
        expand_sidebar[category] = sidebar[category]
          .map(item => site.docs.find(item))
          .filter(metadata => !!metadata);
      });

    return (
      <SideNav
        site={site}
        current={metadata}
        sidebar={expand_sidebar}
        lang={lang}
      />
    );
  }
}

module.exports = DocsSidebar;
