const React = require('react');
const { Div, Ul, A, Row, Col } = require('fluid-react');

const HeaderNavItem = require('./HeaderNavItem.js');

class HeaderNav extends React.Component {
  render() {
    const { site, lang } = this.props;
    const { config, theme } = site;

    const home_url = site.url('/', lang);
    const title = site.i18n.translate(config.title, lang);
    return (
      <Row style={theme.nav}>
        <Col xs={12} md={4}>
          <A style={theme.navTitle} href={home_url}>
            {site.icon && <img style={theme.navLogo} src={site.icon} />}
            {!site.config.noHeaderTitle && <Div style={theme.navTitleTitle}>{title}</Div>}
          </A>
        </Col>
        <Col xs={12} md={8} style={theme.navItemsOuter}>
          <Ul style={theme.navItems}>
            {site.config.headerLinks.map((link, index) => (
              <HeaderNavItem
                key={index}
                site={site}
                lang={lang}
                link={link}
              />
            ))}
          </Ul>
        </Col>
      </Row>
    );
  }
}

module.exports = HeaderNav;
