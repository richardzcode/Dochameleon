const React = require('react');
const { Div, Ul, Li, A, Row, Col } = require('fluid-react');

const SearchBox = require('./SearchBox');

class HeaderNav extends React.Component {
  render() {
    const { site } = this.props;
    const { theme } = site;
    const linkComps = site.config.headerLinks.map(link => {
      const key = link.label || link.icon || link.type;
      if (link.type === 'search') {
        return <Li style={theme.navItem} key={key}><SearchBox site={site} /></Li>
      }

      let href = link.value;
      switch(link.type) {
        case 'doc':
          href = site.docUrl(link.value);
          break;
        case 'page':
          href = site.pageUrl(link.value);
          break;
        case 'blog':
          href = site.url('/blog/');
          break;
      }
      return (
        <Li style={theme.navItem} key={key}>
          <A style={theme.navItemLink} href={href} target={link.external ? '_blank' : '_self'}>
            {link.img
              ? <img src={site.url(link.img)} style={theme.navItemImage} title={link.label} />
              : link.label
            }
          </A>
        </Li>
      )
    });
    return (
      <Row style={theme.nav}>
        <Col xs={12} md={4}>
          <A style={theme.navTitle} href={site.config.baseUrl || '/'}>
            {site.icon && <img style={theme.navLogo} src={site.icon} />}
            {!site.config.disableHeaderTitle && (
              <Div style={theme.navTitleTitle}>{this.props.title}</Div>
            )}
          </A>
        </Col>
        <Col xs={12} md={8} style={theme.navItemsOuter}>
          <Ul style={theme.navItems}>
            {linkComps}
          </Ul>
        </Col>
      </Row>
    );
  }
}

module.exports = HeaderNav;
