const React = require('react');

const SideNav = require('../../components/SideNav.js');

class DocsSidebar extends React.Component {
  render() {
    const { site, metadata, docs } = this.props;
    const { sidebar } = metadata;
    if (!sidebar) { return null; }

    const expand_sidebar = {};
    Object.keys(sidebar)
      .forEach(category => {
        expand_sidebar[category] = sidebar[category]
          .map(item => docs.find(item))
          .filter(metadata => !!metadata);
      });

    return (
      <SideNav
        site={site}
        current={metadata}
        sidebar={expand_sidebar}
      />
    );
  }
}

module.exports = DocsSidebar;
