const React = require('react');
const { Div, Ul, Li, A, Row, Col } = require('fluid-react');

class HeaderNav extends React.Component {
  render() {
    const { site } = this.props;
    const { theme } = site;
    const linkComps = site.headerLinks.map(link => (
      <Li style={theme.navItem} key={link.label + 'page'}>
        <A style={theme.navItemLink} href={link.href} target={link.external ? '_blank' : '_self'}>
          {link.label}
        </A>
      </Li>
    ));
    return (
      <Row style={theme.nav}>
        <Col xs={12} md={4}>
          <A style={theme.navTitle} href={site.config.baseUrl}>
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
