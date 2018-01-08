const React = require('react');
const { H3, Div, P, Img, Row, Col } = require('fluid-react');

const features = require('./features.json');

const Features = (props) => {
  const { theme } = props.site;
  const sectionComps = features.map((feature, idx) => {
    return (
      <Col sm={12} md={6} xl={4} key={idx}>
        <Div style={theme.section}>
          <Div style={theme.featureImageContainer}>
            <Img src={feature.img} style={theme.featureImage}/>
          </Div>
          <H3 style={theme.h3}>{feature.title}</H3>
          <P style={theme.p} dangerouslySetInnerHTML={{__html: feature.content}} />
        </Div>
      </Col>
    )
  });
  return <Row>{sectionComps}</Row>
}

module.exports = Features;
