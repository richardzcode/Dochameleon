const React = require('react');

const SideNav = require('../SideNav.js');

class BlogSidebar extends React.Component {
  render() {
    const { site, metadatas, current } = this.props;
    const sidebar = {
        'Recent Posts': metadatas
    };
    return <SideNav site={site} sidebar={sidebar} current={current} />
  }
}

module.exports = BlogSidebar;
