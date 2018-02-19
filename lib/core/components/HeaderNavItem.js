const React = require('react');
const { Li, A } = require('fluid-react');

const SearchBox = require('./SearchBox.js');

const HeaderNavItem = (props) => {
  const { site, lang, link } = props;
  const { theme } = site;

  if (link.type === 'search') {
    return <Li style={theme.navItem}><SearchBox site={site} /></Li>
  }

  let href = link.value;
  switch(link.type) {
    case 'doc':
      href = site.docUrl(link.value, lang);
      break;
    case 'page':
      href = site.pageUrl(link.value, lang);
      break;
    case 'blog':
      href = site.url('/blog/', lang);
      break;
  }
  const label = site.i18n.translate(link.label, lang);

  return (
    <Li style={theme.navItem}>
      <A style={theme.navItemLink} href={href} target={link.external ? '_blank' : '_self'}>
        {link.img
          ? <img src={site.url(link.img)} style={theme.navItemImage} title={label} />
          : label
        }
      </A>
    </Li>
  )
};

module.exports = HeaderNavItem;
