const React = require('react');

const Container = require('../../core/Container.js');
const SideNav = require('../../core/nav/SideNav.js');

class BlogSidebar extends React.Component {
  render() {
    const { site, metadatas, current } = this.props;
    const sidebar = {
        'Recent Posts': metadatas
    };
    return (
      <Container className="docsNavContainer" id="docsNav" wrapper={false}>
        <SideNav
          root={site.config.baseUrl + 'blog/'}
          title="Blog"
          sidebar={sidebar}
          current={current}
        />
      </Container>
    );
  }
}

module.exports = BlogSidebar;
