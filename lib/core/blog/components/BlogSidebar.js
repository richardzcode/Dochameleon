const React = require('react');

const Container = require('../../components/Container.js');
const SideNav = require('../../components/nav/SideNav.js');

class BlogSidebar extends React.Component {
  render() {
    const { site, metadatas, current } = this.props;
    const sidebar = {
        'Recent Posts': metadatas
    };
    return (
      <Container className="docsNavContainer" id="docsNav" wrapper={false}>
        <SideNav
          sidebar={sidebar}
          current={current}
        />
      </Container>
    );
  }
}

module.exports = BlogSidebar;
