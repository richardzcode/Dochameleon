const React = require('react');

const SideNavItem = (props) => {
  const { site, item, current, lang } = props;
  const { theme } = site;
  const active = current && current.id === item.id;
  let linkStyle = theme.sideNavItemLink;
  if (current && current.id === item.id) {
    linkStyle = Object.assign({}, linkStyle, theme.sideNavItemLinkActive);
  }
  return (
    <li style={theme.sideNavItem}>
      <a style={linkStyle} href={item.permalink(lang)}>
        {site.i18n.translate(item.sidebar_label || item.title, lang)}
      </a>
    </li>
  );
};

module.exports = SideNavItem;
