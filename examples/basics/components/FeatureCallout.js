const React = require('react');
const { Div, P, A, Img, Row, Col } = require('fluid-react');

class FeatureCallout extends React.Component {
  render() {
    const { site, feature, odd } = this.props;
    const { theme } = site;
    return (
      <Row>
        { !odd && (
          <Col sm={12} md={4}>
            <A
              style={theme.featureCalloutTitle}
              href={site.docUrl(feature.doc)}
            >{feature.title}</A>
            <P style={theme.p} dangerouslySetInnerHTML={{__html: feature.content}} />
          </Col>
        )}
        <Col sm={12} md={8}>
          <Div style={theme.featureCalloutImageContainer}>
            <Img src={feature.img} style={theme.featureCalloutImage}/>
          </Div>
        </Col>
        { odd && (
          <Col sm={12} md={4}>
            <A
              style={theme.featureCalloutTitle}
              href={site.docUrl(feature.doc)}
            >{feature.title}</A>
            <P style={theme.p} dangerouslySetInnerHTML={{__html: feature.content}} />
          </Col>
        )}
      </Row>
    )
  }
}

module.exports = FeatureCallout;
