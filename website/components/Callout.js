const React = require('react');
const { Div, A, Img, Row, Col } = require('fluid-react');

const MarkdownBlock = require('./MarkdownBlock');

class FeatureCallout extends React.Component {
  render() {
    const { site, lang, callout } = this.props;
    const { theme } = site;
    const title = site.i18n.translate(callout.title, lang);
    const content = callout['content.token']
      ? [].concat(site.i18n.translate(callout['content.token'], lang)).join('')
      : [].concat(callout.content).join('');
    return (
      <Row>
        {callout.imgFirst && (
          <Col sm={12} md={8}>
            <Div style={theme.calloutImageContainer}>
              <Img
                src={site.url(callout.img)}
                style={Object.assign({}, theme.calloutImage, callout.imgStyle)}
              />
            </Div>
          </Col>
        )}
        <Col sm={12} md={4}>
          {callout.doc
            ? <A
                style={theme.calloutTitle}
                href={site.docUrl(callout.doc)}
              >{title}</A>
            : <Div style={theme.calloutTitle}>{title}</Div>
          }
          <MarkdownBlock site={site}>{content}</MarkdownBlock>
        </Col>
        {!callout.imgFirst && (
          <Col sm={12} md={8}>
            <Div style={theme.calloutImageContainer}>
              <Img src={site.url(callout.img)} style={theme.calloutImage}/>
            </Div>
          </Col>
        )}
      </Row>
    )
  }
}

module.exports = FeatureCallout;
