const React = require('react');

const CollapseIcon = require('./CollapseIcon.js');

const Breadcrumb = (props) => {
  const { site, current } = props;
  if (!current) { return null; }

  const { theme } = site;
  return (
    <div style={theme.breadcrumb}>
      <CollapseIcon targetId="side_nav" />
      <i>›</i>
      <span>{current.sidebar_label}</span>
    </div>
  );
}

const Category = (props) => {
  const { site, name, items, metadatas, current } = props;
  const { theme } = site;
  const itemComps = items
    .map(metadata => <Item key={metadata.id} site={site} metadata={metadata} current={current} />);
  return (
    <div style={theme.sideNavCategory}>
      <h3 style={theme.sideNavCategoryCap}>{name}</h3>
      <ul style={theme.sideNavItems}>{itemComps}</ul>
    </div>
  );
}

const Item = (props) => {
  const { site, metadata, current } = props;
  const { theme } = site;
  const active = current && current.id === metadata.id;
  let linkStyle = theme.sideNavItemLink;
  if (current && current.id === metadata.id) {
    linkStyle = Object.assign({}, linkStyle, theme.sideNavItemLinkActive);
  }
  return (
    <li style={theme.sideNavItem}>
      <a style={linkStyle} href={metadata.permalink}>
        {metadata.sidebar_label || metadata.title}
      </a>
    </li>
  );
}

class SideNav extends React.Component {
  render() {
    const { site, sidebar, current } = this.props;
    const { theme } = site;
    const categoryComps = Object.keys(sidebar).map(name => {
      return (
        <Category
          key={name}
          site={site}
          name={name}
          items={sidebar[name]}
          current={current}
        />
      );
    });

    return (
      <React.Fragment>
      <Breadcrumb site={site} current={current} />
      <nav style={theme.sideNav} id="side_nav">
        <div className="toggleNav">
          <section className="navWrapper wrapper">
            <div className="navGroups">
              {categoryComps}
            </div>
          </section>
        </div>
      </nav>
      </React.Fragment>
    );
  }
}

module.exports = SideNav;
