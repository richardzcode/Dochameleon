const React = require('react');
const { Div, P, A, Img, Row, Col } = require('fluid-react');

class FeatureCallout extends React.Component {
  render() {
    const { site, callout } = this.props;
    const { theme } = site;
    const content = [].concat(callout.content).join('');
    return (
      <Row>
        {callout.imgFirst && (
          <Col sm={12} md={8}>
            <Div style={theme.calloutImageContainer}>
              <Img src={site.url(callout.img)} style={theme.calloutImage}/>
            </Div>
          </Col>
        )}
        <Col sm={12} md={4}>
          {callout.doc
            ? <A
                style={theme.calloutTitle}
                href={site.docUrl(callout.doc)}
              >{callout.title}</A>
            : <Div style={theme.calloutTitle}>{callout.title}</Div>
          }
          <P style={theme.p} dangerouslySetInnerHTML={{__html: content}} />
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
