const React = require('react');

const CollapseIcon = require('./CollapseIcon.js');

const Breadcrumb = (props) => {
  const { site, current, lang } = props;
  if (!current) { return null; }

  const { theme } = site;
  return (
    <div style={theme.breadcrumb}>
      <CollapseIcon targetId="side_nav" />
      <i>›&nbsp;</i>
      <span>{site.i18n.translate(current.sidebar_label || current.title, lang)}</span>
    </div>
  );
}

const Category = (props) => {
  const { site, name, items, metadatas, current, lang } = props;
  const { theme } = site;
  const itemComps = items
    .map(metadata => (
      <Item
        key={metadata.id}
        site={site}
        metadata={metadata}
        current={current}
        lang={lang}
      />
    ));
  return (
    <div style={theme.sideNavCategory}>
      <h3 style={theme.sideNavCategoryCap}>{site.i18n.translate(name, lang)}</h3>
      <ul style={theme.sideNavItems}>{itemComps}</ul>
    </div>
  );
}

const Item = (props) => {
  const { site, metadata, current, lang } = props;
  const { theme } = site;
  const active = current && current.id === metadata.id;
  let linkStyle = theme.sideNavItemLink;
  if (current && current.id === metadata.id) {
    linkStyle = Object.assign({}, linkStyle, theme.sideNavItemLinkActive);
  }
  return (
    <li style={theme.sideNavItem}>
      <a style={linkStyle} href={metadata.permalink(lang)}>
        {site.i18n.translate(metadata.sidebar_label || metadata.title, lang)}
      </a>
    </li>
  );
}

class SideNav extends React.Component {
  render() {
    const { site, sidebar, current, lang } = this.props;
    const { theme } = site;
    const categoryComps = Object.keys(sidebar).map(name => {
      return (
        <Category
          key={name}
          site={site}
          name={name}
          items={sidebar[name]}
          current={current}
          lang={lang}
        />
      );
    });

    return (
      <React.Fragment>
        <Breadcrumb site={site} current={current} lang={lang} />
        <nav style={theme.sideNav} id="side_nav">
          {categoryComps}
        </nav>
      </React.Fragment>
    );
  }
}

module.exports = SideNav;
