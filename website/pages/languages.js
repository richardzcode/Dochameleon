const React = require('react');
const { Row, Col } = require('fluid-react');

class Languages extends React.Component {
  render() {
    const { site, lang } = this.props;
    const { theme } = site;
    const languages = site.i18n.langs()
      .map((language, i) => {
        return (
          <Col xs={6} sm={4} md={3} lg={2} xl={1} key={i}>
            <a style={theme.a} href={site.url('', language)}>
              {site.i18n.translate(language, lang)}
            </a>
          </Col>
        );
      });

    return (
      <div>
        <div style={theme.block}>
          <Row>
          {languages}
          </Row>
        </div>
      </div>
    );
  }
}

module.exports = Languages;
