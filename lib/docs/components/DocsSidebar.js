const React = require('react');

const Container = require('../../core/Container.js');
const SideNav = require('../../core/nav/SideNav.js');

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
      <Container className="docsNavContainer" id="docsNav" wrapper={false}>
        <SideNav
          current={metadata}
          sidebar={expand_sidebar}
        />
      </Container>
    );
  }
}

module.exports = DocsSidebar;
