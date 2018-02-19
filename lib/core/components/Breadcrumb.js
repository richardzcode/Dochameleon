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
};

module.exports = Breadcrumb;
