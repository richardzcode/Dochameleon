const React = require('react');
const { H3, Div, Row, Col } = require('fluid-react');

const MarkdownBlock = require('./MarkdownBlock.js');
const help = require('./help.json');

const HelpDetails = (props) => {
  const { site, lang } = props;
  const { theme } = site;
  const sectionComps = help.map((help_item, idx) => {
    return (
      <Col col={4} key={idx}>
        <Div style={theme.section}>
          <H3 style={theme.helpSectionTitle}>{help_item.title}</H3>
          <MarkdownBlock site={site} lang={lang}>{help_item.content}</MarkdownBlock>
        </Div>
      </Col>
    )
  });
  return <Row>{sectionComps}</Row>
}

module.exports = HelpDetails;
