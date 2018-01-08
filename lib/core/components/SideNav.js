const React = require('react');

const Breadcrumb = (props) => {
  const { current } = props;
  if (!current) { return null; }

  return (
    <div>
      <div className="navToggle" id="navToggler">
        <i />
      </div>
      <h2>
        <i>›</i>
        <span>{current.sidebar_label}</span>
      </h2>
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
      <nav style={theme.sideNav}>
        <div className="toggleNav">
          <section className="navWrapper wrapper">
            <Breadcrumb current={current} />
            <div className="navGroups">
              {categoryComps}
            </div>
          </section>
        </div>
        <script
          dangerouslySetInnerHTML={{
            __html: `
          var toggler = document.getElementById('navToggler');
          var nav = document.getElementById('docsNav');
          toggler.onclick = function() {
            nav.classList.toggle('docsSliderActive');
          };
        `,
          }}
        />
      </nav>
    );
  }
}

module.exports = SideNav;
