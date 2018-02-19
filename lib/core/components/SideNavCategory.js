const React = require('react');

const SideNavItem = require('./SideNavItem.js');

const SideNavCategory = (props) => {
  const { site, name, items, current, lang } = props;
  const { theme } = site;
  return (
    <div style={theme.sideNavCategory}>
      <h3 style={theme.sideNavCategoryCap}>{site.i18n.translate(name, lang)}</h3>
      <ul style={theme.sideNavItems}>
        {items.map(item => (
          <SideNavItem
            key={item.id}
            site={site}
            item={item}
            current={current}
            lang={lang}
          />
        ))}
      </ul>
    </div>
  );
};

module.exports = SideNavCategory;
