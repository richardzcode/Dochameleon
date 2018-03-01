const React = require('react');
const { Li, A } = require('fluid-react');

const SearchBox = require('./SearchBox.js');

const HeaderNavItem = (props) => {
  const { site, lang, link } = props;
  const { theme } = site;

  if (link.type === 'search') {
    return site.searchConfig && site.searchConfig.application_id
      ? <Li style={theme.navItem}><SearchBox site={site} /></Li>
      : null
  }

  let href = link.value;
  switch(link.type) {
    case 'doc':
      let doc_id = link.value;
      if (!doc_id && site.docs.metadatas.length > 0) {
        doc_id = site.docs.metadatas[0].id;
      }
      href = site.docUrl(doc_id, lang);
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
