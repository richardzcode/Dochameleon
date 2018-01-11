const React = require('react');
const { H3, Div, P, Row, Col } = require('fluid-react');

const help = require('./help.json');

const HelpDetails = (props) => {
  const { theme } = props.site;
  const sectionComps = help.map((help_item, idx) => {
    return (
      <Col col={4} key={idx}>
        <Div style={theme.section}>
          <H3 style={theme.helpSectionTitle}>{help_item.title}</H3>
          <P style={theme.p} dangerouslySetInnerHTML={{__html: help_item.content}} />
        </Div>
      </Col>
    )
  });
  return <Row>{sectionComps}</Row>
}

module.exports = HelpDetails;
