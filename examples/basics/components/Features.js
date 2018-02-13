const React = require('react');
const { H3, Div, Img, Row, Col } = require('fluid-react');

const MarkdownBlock = require('./MarkdownBlock.js');
const features = require('./features.json');

const header = features.header
  ? [].concat(features.header).join('')
  : '';
const footer = features.footer
  ? [].concat(features.footer).join('')
  : '';

const Features = (props) => {
  const { site, lang } = props;
  const { theme } = site;
  const sectionComps = features.features.map((feature, idx) => {
    const content = feature['content.token']
      ? [].concat(site.i18n.translate(feature['content.token'], lang, feature.content)).join('')
      : [].concat(feature.content).join('');
    return (
      <Col sm={12} md={6} xl={4} key={idx}>
        <Div style={theme.section}>
          <Div style={theme.featureImageContainer}>
            <Img src={site.url(feature.img)} style={theme.featureImage}/>
          </Div>
          <H3 style={theme.h3}>{site.i18n.translate(feature.title, lang)}</H3>
          <MarkdownBlock site={site} lang={lang}>{content}</MarkdownBlock>
        </Div>
      </Col>
    )
  });

  return (
    <React.Fragment>
      {header && <MarkdownBlock site={site} lang={lang}>{header}</MarkdownBlock>}
      <Row>{sectionComps}</Row>
      {footer && <MarkdownBlock site={site} lang={lang}>{footer}</MarkdownBlock>}
    </React.Fragment>
  )
}

module.exports = Features;
